// Standard Gamepad API mapping: Xbox, PlayStation and compatible controllers.
export const DEAD_ZONE = 0.18;
export function stick(x = 0, y = 0) {
  x = Number.isFinite(x) ? x : 0;
  y = Number.isFinite(y) ? y : 0;
  const length = Math.hypot(x, y);
  if (length <= DEAD_ZONE) return [0, 0];
  const scale = Math.min(1, (length - DEAD_ZONE) / (1 - DEAD_ZONE)) / length;
  return [x * scale, y * scale];
}
export class PadReader {
  constructor() {
    this.index = null;
    this.previous = [];
    this.released = true;
  }
  read(pads = []) {
    const available = Array.from(pads).filter(
      (p) => p?.connected !== false && p,
    );
    // A button or stick on a second controller takes ownership.
    const hasInput = (p) =>
      p.buttons.some((b) => b.pressed) || p.axes.some((a) => Math.abs(a) > 0.3);
    const current = available.find((p) => p.index === this.index);
    const active =
      current && hasInput(current) ? current : available.find(hasInput);
    const pad = active || current || available[0];
    if (!pad) {
      this.index = null;
      this.previous = [];
      this.released = true;
      return {
        connected: false,
        left: [0, 0],
        right: [0, 0],
        pressed: [],
        buttons: [],
      };
    }
    if (pad.index !== this.index) {
      this.previous = [];
      this.released = false;
    }
    this.index = pad.index;
    const buttons = pad.buttons.map((b) => !!b.pressed);
    // Require release on connection so the browser's activation press cannot drop a claw.
    if (!buttons.some(Boolean)) this.released = true;
    const pressed = buttons.map(
      (b, i) => this.released && b && !this.previous[i],
    );
    this.previous = buttons;
    return {
      connected: true,
      index: pad.index,
      id: pad.id,
      left: stick(pad.axes[0], pad.axes[1]),
      right: stick(pad.axes[2], pad.axes[3]),
      buttons,
      pressed,
    };
  }
}
export const padReader = new PadReader();
export let padState = {
  connected: false,
  left: [0, 0],
  right: [0, 0],
  buttons: [],
  pressed: [],
};

export function installController(getScene, store) {
  const status = document.createElement("div");
  status.className = "controller-status";
  status.setAttribute("role", "status");
  document.body.append(status);
  let raf,
    lastText = "",
    repeatAt = 0,
    lastDirection = 0;
  const visible = (el) =>
    el.getClientRects().length &&
    !el.disabled &&
    getComputedStyle(el).visibility !== "hidden";
  function menuButtons() {
    const modal = document.querySelector('[role="dialog"]');
    return [
      ...(modal || document.getElementById("ui")).querySelectorAll(
        "button, a[href], select, input",
      ),
    ].filter(visible);
  }
  function moveFocus(direction) {
    const items = menuButtons();
    const current = items.indexOf(document.activeElement);
    items[(current + direction + items.length) % items.length]?.focus();
  }
  const escape = () =>
    (document.activeElement || document.body).dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "Escape",
        key: "Escape",
        bubbles: true,
      }),
    );
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || !document.hasFocus()) {
      padState = {
        connected: false,
        left: [0, 0],
        right: [0, 0],
        buttons: [],
        pressed: [],
      };
      padReader.released = false;
      return;
    }
    try {
      padState = padReader.read(navigator.getGamepads?.() || []);
    } catch {
      return;
    }
    const p = padState,
      state = store.getState(),
      scene = getScene();
    document.documentElement.classList.toggle("has-controller", p.connected);
    const modal = state.paused || state.collectionOpen || state.settingsOpen;
    const menu =
      modal || (!state.playing && !state.walking && !state.inspecting);
    const text = !p.connected
      ? "CONTROLLER READY · Press a pad button to connect"
      : menu
        ? "PAD CONNECTED · D-pad navigate · A / ✕ select · Y / △ games · RB Midway · B / ○ back"
        : state.playing
          ? state.activeMachine === "claw"
            ? "L aim X/Z · R walk around · A / ✕ drop · Y / △ view · X / □ retry · B / ○ leave"
            : "L / D-pad aim · A / ✕ play / drop · X / □ retry · B / ○ leave"
          : "L move · R look · A / ✕ inspect / play · Y / △ games · RB Midway · Start pause";
    if (text !== lastText) {
      status.textContent = text;
      lastText = text;
    }
    if (!p.connected || !scene || !state.ready) return;
    if (document.querySelector(".reference-arcade")) return;
    const b = p.pressed;
    if (b[5] && !state.playing && !modal) {
      document.querySelector(".midway-launch")?.click();
      return;
    }
    if (b[9]) {
      if (state.settingsOpen)
        document.getElementById("close-settings")?.click();
      else if (!modal) {
        document.exitPointerLock?.();
        store.setState({ settingsOpen: true, paused: true });
      }
      return;
    }
    if (b[1]) {
      escape();
      return;
    }
    if (menu) {
      if (b[3] && !modal) {
        document.querySelector(".arcade-launch")?.click();
        return;
      }
      const direction =
        p.buttons[13] || p.buttons[15] || p.left[1] > 0.55 || p.left[0] > 0.55
          ? 1
          : p.buttons[12] ||
              p.buttons[14] ||
              p.left[1] < -0.55 ||
              p.left[0] < -0.55
            ? -1
            : 0;
      if (direction && (direction !== lastDirection || now >= repeatAt)) {
        const el = document.activeElement;
        if (el?.tagName === "SELECT") {
          el.selectedIndex = Math.max(
            0,
            Math.min(el.options.length - 1, el.selectedIndex + direction),
          );
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (el?.tagName === "INPUT" && el.type === "range") {
          el.stepUp(direction);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        } else moveFocus(direction);
        repeatAt = now + (direction !== lastDirection ? 350 : 150);
      }
      lastDirection = direction;
      if (b[0]) {
        const focused = document.activeElement;
        if (menuButtons().includes(focused)) focused.click();
        else
          (modal
            ? menuButtons()[0]
            : document.getElementById("enter")
          )?.click();
      }
    } else {
      lastDirection = 0;
      if (b[0]) {
        if (state.playing) scene.dropClaw();
        else if (state.inspecting)
          state.activeMachine === "claw"
            ? scene.playClaw()
            : scene.playPrizeGame(state.activeMachine);
        else scene.input.interact = true;
      }
      if (b[2] && state.playing && state.machinePhase === "RESULT")
        scene.retryClaw();
      if (b[3]) {
        if (state.playing && state.activeMachine === "claw")
          scene.toggleClawCamera();
        else if (!state.playing)
          document.querySelector(".arcade-launch")?.click();
      }
      if (b[8] && !modal) document.querySelector(".collection-button")?.click();
    }
  }
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    status.remove();
  };
}

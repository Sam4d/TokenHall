import { saveCollection, g as collectionStatus } from "./arcade.js";
import { CABINETS, MidwayGame, TAU } from "./midway-physics.js";
import { padState } from "./gamepad.js";
export function installMidway(store) {
  const launch = document.createElement("button");
  launch.className = "midway-launch";
  launch.textContent = "✹ THE MIDWAY · 8 NEW MACHINES";
  document.body.append(launch);
  let overlay,
    raf,
    game,
    canvas,
    ctx,
    last = 0,
    debt = 0,
    held = false,
    keys = new Set(),
    previous = [],
    awarded = false,
    oldPaused = false,
    focus;
  const keydown = (e) => {
    if (!overlay) return;
    if (e.code === "Tab") {
      const items = [...overlay.querySelectorAll("button")];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      return;
    }
    if (e.code === "Escape") {
      e.preventDefault();
      e.stopImmediatePropagation();
      close();
      return;
    }
    if (["Space", "ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.code === "Space" && !e.repeat) game?.action();
      keys.add(e.code);
    }
  };
  const keyup = (e) => {
    if (!overlay) return;
    keys.delete(e.code);
    if (e.code === "Space") game?.release();
  };
  const blur = () => {
    keys.clear();
    held = false;
    game?.release();
  };
  window.addEventListener("blur", blur);
  window.addEventListener("keydown", keydown, true);
  window.addEventListener("keyup", keyup, true);
  function close() {
    if (!overlay) return;
    cancelAnimationFrame(raf);
    overlay.remove();
    overlay = null;
    game = null;
    launch.hidden = false;
    keys.clear();
    held = false;
    previous = [];
    store.setState({ paused: oldPaused });
    focus?.focus();
  }
  function open() {
    if (overlay) return;
    focus = document.activeElement;
    oldPaused = store.getState().paused;
    document.exitPointerLock?.();
    store.setState({ paused: true });
    launch.hidden = true;
    overlay = document.createElement("section");
    overlay.className = "reference-arcade";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "The Midway arcade");
    document.body.append(overlay);
    menu();
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function menu() {
    game = null;
    overlay.innerHTML =
      '<div class="midway-top"><span>THE MIDWAY / GOOD LUCK OUT THERE</span><button data-close>Back to the hall · B / Esc</button></div><h1>EIGHT MORE REASONS<br>TO MISS YOUR BUS.</h1><p>New floor. New bad decisions. All free play. All controller ready.</p><div class="midway-grid"></div>';
    overlay.querySelector("[data-close]").onclick = close;
    const grid = overlay.querySelector(".midway-grid");
    for (const [i, c] of CABINETS.entries()) {
      const button = document.createElement("button");
      button.style.setProperty("--cabinet", c.color);
      button.innerHTML = `<span>0${i + 1} / ${c.ref}</span><strong>${c.name}</strong><small>${c.hint}</small><b>PLAY →</b>`;
      button.onclick = () => play(c);
      grid.append(button);
    }
    grid.querySelector("button").focus();
  }
  function play(c) {
    game = new MidwayGame(c.id, Math.floor(Math.random() * 0xffffffff));
    awarded = false;
    debt = 0;
    keys.clear();
    overlay.innerHTML = `<div class="midway-top"><button data-menu>← Machine floor · B</button><span>${c.ref}</span><button data-close>Leave · Esc</button></div><div class="midway-game"><div class="midway-canvas"><canvas width="600" height="800" aria-label="${c.name} playfield"></canvas></div><aside><span class="midway-kicker">FREE PLAY / PHOTO-INSPIRED CABINET</span><h1>${c.name}</h1><p>${c.hint}</p><output aria-live="polite"></output><div class="midway-score"></div><button class="primary" data-action>${c.id === "bowl" ? "HOLD TO CHARGE" : "PLAY / DROP"} · A / Space</button><button data-retry>Fresh round · X</button><div class="midway-aim"><button aria-label="Aim left">←</button><span>L stick / arrows aim</span><button aria-label="Aim right">→</button></div><p class="midway-note">Tickets go to your existing prize collection. No money. No mystery rigging.</p></aside></div>`;
    canvas = overlay.querySelector("canvas");
    ctx = canvas.getContext("2d");
    overlay.querySelector("[data-menu]").onclick = menu;
    overlay.querySelector("[data-close]").onclick = close;
    const action = overlay.querySelector("[data-action]");
    action.onpointerdown = (e) => {
      e.preventDefault();
      action.setPointerCapture(e.pointerId);
      held = true;
      game.action();
    };
    action.onpointerup = action.onpointercancel = () => {
      held = false;
      game?.release();
    };
    action.onclick = (e) => {
      if (e.detail === 0) {
        game.action();
        if (game.kind === "bowl") game.release();
      }
    };
    overlay.querySelector("[data-retry]").onclick = () => play(c);
    overlay.querySelectorAll(".midway-aim button").forEach((b, i) => {
      const code = i ? "ArrowRight" : "ArrowLeft";
      b.onpointerdown = (e) => {
        b.setPointerCapture(e.pointerId);
        keys.add(code);
      };
      b.onpointerup = b.onpointercancel = () => keys.delete(code);
    });
    canvas.focus();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!overlay || document.hidden) return;
    const p = padState,
      buttons = p.buttons || [],
      edge = (i) => buttons[i] && !previous[i];
    if (game) {
      if (edge(1)) {
        menu();
        previous = [...buttons];
        return;
      }
      if (edge(0)) game.action();
      if (!buttons[0] && previous[0]) game.release();
      if (edge(2)) {
        const c = CABINETS.find((c) => c.id === game.kind);
        play(c);
      }
      const axis =
        (p.left?.[0] || 0) +
        Number(keys.has("ArrowRight") || keys.has("KeyD") || !!buttons[15]) -
        Number(keys.has("ArrowLeft") || keys.has("KeyA") || !!buttons[14]);
      debt = Math.min(debt + dt, 0.1);
      while (debt >= 1 / 240) {
        game.step(1 / 240, axis);
        debt -= 1 / 240;
      }
      draw();
      overlay.querySelector("output").textContent = game.message;
      overlay.querySelector(".midway-score").textContent =
        `${game.score} TICKETS · ${Math.min(game.attempts + 1, game.shots)} / ${game.shots} PLAYS`;
      if (game.phase === "result" && !awarded) {
        awarded = true;
        const c = store.getState().collection;
        const collection = { ...c, tickets: c.tickets + game.score };
        saveCollection(collection);
        store.setState({ collection, collectionStatus: collectionStatus() });
      }
    } else {
      if (edge(1)) {
        close();
        return;
      }
      const items = [...overlay.querySelectorAll("button")],
        i = items.indexOf(document.activeElement);
      if (edge(13) || edge(15)) items[(i + 1) % items.length]?.focus();
      if (edge(12) || edge(14))
        items[(i - 1 + items.length) % items.length]?.focus();
      if (edge(0)) document.activeElement?.click();
    }
    previous = [...buttons];
  }
  function draw() {
    const g = game,
      c = ctx;
    c.clearRect(0, 0, 600, 800);
    c.fillStyle = "#141326";
    c.fillRect(0, 0, 600, 800);
    const accent = CABINETS.find((x) => x.id === g.kind).color;
    c.strokeStyle = accent;
    c.lineWidth = 3;
    c.strokeRect(22, 22, 556, 756);
    c.font = "bold 16px monospace";
    c.textAlign = "center";
    c.fillStyle = accent;
    c.fillText("TOKEN HALL / " + g.kind.toUpperCase(), 300, 52);
    const circle = (x, y, r, fill) => {
      c.beginPath();
      c.arc(x, y, r, 0, TAU);
      c.fillStyle = fill;
      c.fill();
    };
    const text = (s, x, y, size = 20, color = "#fff1df") => {
      c.fillStyle = color;
      c.font = `bold ${size}px monospace`;
      c.fillText(s, x, y);
    };
    if (g.kind === "wheel" || g.kind === "bigwheel" || g.kind === "lucky") {
      const lucky = g.kind === "lucky",
        r = lucky ? 190 : 235;
      for (let i = 0; i < 16; i++) {
        const a = g.angle + (i * TAU) / 16;
        c.beginPath();
        c.moveTo(300, 390);
        c.arc(300, 390, r, a, a + TAU / 16);
        c.closePath();
        c.fillStyle = ["#fe79ad", "#a497ff", "#72e8df", "#e8f376"][i % 4];
        c.fill();
        if (!lucky) {
          c.save();
          c.translate(300, 390);
          c.rotate(a + TAU / 32);
          text(
            [
              20, 40, 60, 100, 20, 80, 40, 200, 20, 60, 40, 100, 20, 80, 40,
              500,
            ][i],
            r - 35,
            5,
            17,
            "#19152b",
          );
          c.restore();
        }
      }
      circle(300, 390, lucky ? 160 : 70, "#171427");
      text(lucky ? "KEY RELEASE" : "JUST ONE", 300, 385);
      text(lucky ? "STOP IN GREEN" : "MORE SPIN", 300, 415);
      if (lucky) {
        c.strokeStyle = "#6bffc2";
        c.lineWidth = 16;
        c.beginPath();
        c.arc(300, 390, r, -Math.PI / 2 - 0.16, -Math.PI / 2 + 0.16);
        c.stroke();
        circle(
          300 + Math.cos(g.angle) * r,
          390 + Math.sin(g.angle) * r,
          14,
          "#fff",
        );
      } else {
        c.fillStyle = "#fff";
        c.beginPath();
        c.moveTo(285, 125);
        c.lineTo(315, 125);
        c.lineTo(300, 160);
        c.fill();
      }
    } else if (g.kind === "flight") {
      const target =
        g.phase === "feedback"
          ? g.stopTarget
          : 390 + Math.sin(g.time * 0.7) * 180;
      c.fillStyle = "#244b44";
      c.fillRect(140, target - 28, 320, 56);
      text("LAND HERE", 300, target + 6, 18, "#77ffc9");
      for (let i = 0; i < 15; i++) {
        c.fillStyle = "#66527b";
        c.fillRect(70, 120 + i * 39, 20, 25);
        c.fillRect(510, 120 + i * 39, 20, 25);
      }
      const y =
        g.phase === "feedback" ? g.stopY : 390 + Math.sin(g.time * 2.2) * 220;
      c.fillStyle = "#edff69";
      c.fillRect(170, y - 8, 260, 16);
      text("A / SPACE TO STOP", 300, 725);
    } else {
      if (g.kind === "plinko") {
        for (const p of g.pegs) {
          circle(p.x, p.y, p.r + 3, "#45356a");
          circle(p.x, p.y, p.r, "#b4a6ee");
        }
        for (let i = 0; i < 7; i++) {
          c.fillStyle = i % 2 ? "#513269" : "#254d50";
          c.fillRect(24 + i * 79, 710, 76, 60);
          text([100, 40, 20, 200, 20, 40, 100][i], 62 + i * 79, 750, 18);
        }
      }
      if (g.kind === "tower" || g.kind === "magic")
        for (let i = 0; i < (g.kind === "tower" ? 5 : 3); i++) {
          const y = g.kind === "tower" ? 220 + i * 95 : 240 + i * 145,
            x = g.gap(i);
          c.fillStyle = accent;
          if (g.kind === "tower") {
            c.fillRect(24, y, x - 47 - 24, 12);
            c.fillRect(x + 47, y, 576 - x - 47, 12);
          } else {
            c.strokeStyle = accent;
            c.lineWidth = 7;
            c.beginPath();
            c.ellipse(x, y, 45, 13, 0, 0, TAU);
            c.stroke();
          }
          text("+" + (g.kind === "tower" ? 25 : 40), 65, y - 15, 13);
        }
      if (g.kind === "bowl" || g.kind === "magic") {
        const y = g.kind === "bowl" ? 300 : 730,
          x = g.target();
        c.strokeStyle = "#6bffc2";
        c.lineWidth = 8;
        c.beginPath();
        c.ellipse(x, y, 48, 18, 0, 0, TAU);
        c.stroke();
        if (g.kind === "bowl") {
          c.fillStyle = "#edff69";
          c.fillRect(100, 770, 400 * g.charge, 10);
          text("POWER · " + Math.round(g.charge * 100) + "%", 300, 745, 16);
        }
      }
      if (g.kind === "cut") {
        const cord = 300 + Math.sin(g.time * 0.8) * 70,
          x = 300 + Math.sin(g.time * 1.6) * 125;
        c.strokeStyle = "#fff";
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(cord, 100);
        c.lineTo(cord, g.cleanCut ? 180 : 400);
        c.stroke();
        text("✂", x, 280, 50, accent);
        const y = g.ball ? g.ball.y : 440;
        circle(cord - 30, y - 35, 21, accent);
        circle(cord + 30, y - 35, 21, accent);
        circle(cord, y, 55, accent);
        circle(cord - 18, y - 8, 6, "#222");
        circle(cord + 18, y - 8, 6, "#222");
      }
      if (g.phase === "ready" && !["cut"].includes(g.kind)) {
        c.strokeStyle = "#fff8";
        c.setLineDash([4, 9]);
        c.beginPath();
        c.moveTo(g.aim, 80);
        c.lineTo(g.aim, g.kind === "bowl" ? 690 : 160);
        c.stroke();
        c.setLineDash([]);
        circle(g.aim, g.kind === "bowl" ? 700 : 100, 13, accent);
      }
      if (g.ball && g.kind !== "cut") {
        for (let i = 0; i < g.trail.length; i++) {
          c.globalAlpha = (i / g.trail.length) * 0.3;
          circle(g.trail[i].x, g.trail[i].y, g.ball.r * 0.6, accent);
        }
        c.globalAlpha = 1;
        circle(g.ball.x, g.ball.y, g.ball.r, accent);
        circle(g.ball.x - 3, g.ball.y - 4, 3, "#fff");
      }
    }
    if (g.phase === "result") {
      c.fillStyle = "#0c0b16df";
      c.fillRect(55, 310, 490, 180);
      text("ROUND OVER", 300, 365, 30, accent);
      text(g.score + " TICKETS", 300, 415, 32);
      text("X / FRESH ROUND TO GO AGAIN", 300, 460, 16);
    }
  }
  launch.onclick = open;
  return () => {
    close();
    launch.remove();
    window.removeEventListener("keydown", keydown, true);
    window.removeEventListener("keyup", keyup, true);
    window.removeEventListener("blur", blur);
  };
}

import {
  G as Group,
  M as Mesh,
  B as Box,
  S as Sphere,
  T as Torus,
  g as Material,
  h as Color,
  f as CanvasTexture,
  e as SRGB,
  P as Plane,
  o as merge,
} from "../assets/renderer-W_eveQ7P.js";
import { CABINETS, MidwayGame, TAU } from "./midway-physics.js";
import { LaptopGame } from "./laptop-games.js";
import { padState, padReader } from "./gamepad.js";
export { CABINETS };
export const FLOOR_LAYOUT = CABINETS.map((c, i) => ({
  ...c,
  x: i < 6 ? -4.4 : 4.4,
  z: 1.5 + (i < 6 ? i : i - 6) * 1.65,
  yaw: i < 6 ? Math.PI / 2 : -Math.PI / 2,
}));
export const makeGame = (id) =>
  CABINETS.find((c) => c.id === id).original
    ? new LaptopGame(id)
    : new MidwayGame(id, Math.floor(Math.random() * 4294967295));
const X = (x) => (x - 300) * 0.0013,
  Y = (y) => 0.8 + (800 - y) * 0.0013;
function label(text, color, w = 0.94, h = 0.2) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const p = c.getContext("2d");
  p.fillStyle = "#131021";
  p.fillRect(0, 0, 512, 128);
  p.fillStyle = color;
  p.textAlign = "center";
  p.textBaseline = "middle";
  p.font = "40px Bungee";
  p.fillText(text, 256, 64, 490);
  const map = new CanvasTexture(c);
  map.colorSpace = SRGB;
  return new Mesh(
    new Plane(w, h),
    new Material({
      map,
      emissiveMap: map,
      emissive: 0xffffff,
      emissiveIntensity: 0.65,
      roughness: 0.55,
    }),
  );
}
export class FloorCabinet {
  constructor(def) {
    this.def = def;
    this.group = new Group();
    this.group.name = "floor-" + def.id;
    this.static = new Group();
    this.live = new Group();
    this.group.add(this.static, this.live);
    const dark = (this.dark = new Material({
        color: 0x17192b,
        roughness: 0.6,
        metalness: 0.35,
      })),
      trim = (this.trim = new Material({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.35,
        roughness: 0.3,
      })),
      metal = (this.metal = new Material({
        color: 0x8995ad,
        roughness: 0.3,
        metalness: 0.75,
      })),
      white = (this.white = new Material({
        color: 0xfff3d0,
        emissive: 0xffd783,
        emissiveIntensity: 0.15,
      })),
      screen = (this.screen = new Material({
        color: 0x070e20,
        roughness: 0.45,
      }));
    this.box = (w, h, d, x, y, z, mat = dark, parent = this.static) => {
      const m = new Mesh(new Box(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = false;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    };
    this.ballMesh = (r, x, y, z, mat = trim, parent = this.live) => {
      const m = new Mesh(new Sphere(r, 12, 8), mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };
    this.box(1.08, 0.65, 0.7, 0, 0.325, 0);
    this.box(1.08, 1.45, 0.08, 0, 1.36, -0.31);
    this.box(0.055, 1.5, 0.72, -0.52, 1.38, 0, trim);
    this.box(0.055, 1.5, 0.72, 0.52, 1.38, 0, trim);
    this.box(1.13, 0.28, 0.78, 0, 2.12, 0);
    this.box(1.02, 0.035, 0.04, 0, 1.97, 0.39, white);
    this.box(0.94, 1.35, 0.025, 0, 1.3, -0.25, screen);
    this.box(1.16, 0.1, 0.92, 0, 0.69, 0.14, metal);
    this.box(0.9, 0.012, 0.6, 0, 0.75, 0.16, dark);
    this.box(0.035, 0.12, 0.035, -0.3, 0.8, 0.32, metal);
    this.ballMesh(0.052, -0.3, 0.88, 0.32, trim, this.static);
    for (const [x, mat] of [
      [0.23, trim],
      [0.36, white],
    ]) {
      const b = new Mesh(new Box(0.07, 0.018, 0.07), mat);
      b.position.set(x, 0.765, 0.35);
      this.static.add(b);
    }
    const glow = new Material({
      color: def.color,
      emissive: def.color,
      emissiveIntensity: 2.2,
      roughness: 0.4,
    });
    for (const x of [-0.5, 0.5])
      this.box(0.012, 1.46, 0.018, x, 1.37, 0.372, glow);
    this.box(1.07, 0.012, 0.018, 0, 1.985, 0.402, glow);
    this.box(1.07, 0.012, 0.018, 0, 0.756, 0.48, glow);
    this.box(1.14, 0.012, 0.035, 0, 0.014, 0.68, glow);
    for (let bulb = 0; bulb < 10; bulb++)
      this.ballMesh(
        0.012,
        -0.46 + bulb * 0.102,
        2.23,
        0.402,
        white,
        this.static,
      );
    this.box(0.14, 0.04, 0.02, 0.18, 0.43, 0.36, metal);
    this.box(0.05, 0.025, 0.022, 0.18, 0.43, 0.38, screen);
    this.box(0.4, 0.13, 0.022, 0, 0.18, 0.36, screen);
    for (const x of [-0.42, 0.42])
      this.box(0.1, 0.05, 0.1, x, 0.025, 0.27, metal);
    const title = label(def.name.toUpperCase(), def.color);
    title.position.set(0, 2.13, 0.401);
    this.static.add(title);
    const serial = label("TOKEN HALL / FREE PLAY", "#b6a5cf", 0.7, 0.075);
    serial.position.set(0, 0.53, 0.365);
    this.static.add(serial);
    this.attract = label("ONE MORE GO", def.color, 0.7, 0.15);
    this.attract.position.set(0, 1.3, 0.035);
    this.attract.visible = false;
    this.group.add(this.attract);
    this.dynamic = [];
    const id = def.id;
    if (["wheel", "bigwheel", "lucky"].includes(id)) {
      this.wheel = new Group();
      this.wheel.position.set(0, 1.34, -0.02);
      this.live.add(this.wheel);
      for (let i = 0; i < 16; i++) {
        const a = (i * TAU) / 16;
        const m = this.box(
          0.12,
          0.08,
          0.045,
          Math.cos(a) * 0.33,
          Math.sin(a) * 0.33,
          0,
          i % 2 ? trim : white,
          this.wheel,
        );
        m.rotation.z = a;
      }
      const atlas = document.createElement("canvas");
      atlas.width = 512;
      atlas.height = 512;
      const paint = atlas.getContext("2d");
      paint.textAlign = "center";
      paint.textBaseline = "middle";
      paint.font = "bold 22px Atkinson Hyperlegible";
      for (let sector = 0; sector < 16; sector++) {
        const a = ((sector + 0.5) * TAU) / 16;
        paint.fillStyle = "#fff5ca";
        paint.fillText(
          id === "lucky"
            ? sector === 12
              ? "KEY"
              : "•"
            : String(
                [
                  20, 40, 60, 100, 20, 80, 40, 200, 20, 60, 40, 100, 20, 80, 40,
                  500,
                ][sector],
              ),
          256 + Math.cos(a) * 174,
          256 + Math.sin(a) * 174,
        );
      }
      const ink = new CanvasTexture(atlas);
      ink.colorSpace = SRGB;
      const numbers = new Mesh(
        new Plane(0.78, 0.78),
        new Material({
          map: ink,
          emissiveMap: ink,
          emissive: 0xffffff,
          emissiveIntensity: 0.8,
          transparent: true,
          depthWrite: false,
        }),
      );
      numbers.position.z = 0.04;
      this.wheel.add(numbers);
      const rim = new Mesh(new Torus(0.39, 0.009, 5, 48), glow);
      this.wheel.add(rim);
      if (id === "lucky") {
        this.keyMarker = this.ballMesh(0.03, 0.33, 1.34, 0.09, white);
        this.box(0.09, 0.04, 0.035, 0, 1.68, 0.07, glow);
      }
      this.ballMesh(0.1, 0, 0, 0.03, metal, this.wheel);
      const pointer = this.box(0.05, 0.11, 0.07, 0, 1.75, 0.07, white);
      pointer.rotation.z = Math.PI / 4;
    } else if (id === "plinko") {
      const g = new MidwayGame(id);
      for (const p of g.pegs)
        this.ballMesh(p.r * 0.0013, X(p.x), Y(p.y), 0, metal, this.static);
      for (let i = 0; i < 7; i++) {
        const sign = label(
          String([100, 40, 20, 200, 20, 40, 100][i]),
          def.color,
          0.105,
          0.055,
        );
        sign.position.set(-0.30745 + i * 0.1027, 0.85, 0.09);
        this.static.add(sign);
      }
      for (let i = 0; i < 8; i++)
        this.box(0.009, 0.09, 0.14, -0.3588 + i * 0.1027, 0.89, 0, trim);
    } else if (id === "magic" || id === "bowl") {
      this.hoops = [];
      for (let i = 0; i < (id === "magic" ? 3 : 1); i++) {
        const root = new Group();
        root.position.set(0, Y(id === "magic" ? 240 + i * 145 : 300), 0);
        this.live.add(root);
        this.hoops.push(root);
        for (let j = 0; j < 20; j++) {
          const a = (j * TAU) / 20;
          this.ballMesh(
            0.008,
            Math.cos(a) * (id === "bowl" ? 0.0624 : 0.0585),
            Math.sin(a) * 0.02,
            Math.sin(a) * 0.04,
            trim,
            root,
          );
        }
      }
      if (id === "magic") {
        this.cup = new Group();
        this.cup.position.y = Y(730);
        this.live.add(this.cup);
        this.box(0.16, 0.016, 0.14, 0, 0, 0.03, trim, this.cup);
        for (const x of [-0.08, 0.08])
          this.box(0.012, 0.1, 0.14, x, 0.045, 0.03, trim, this.cup);
      }
    } else if (id === "cut") {
      this.rope = this.box(0.005, 0.48, 0.005, 0, 1.59, 0, white, this.live);
      this.plush = new Group();
      this.live.add(this.plush);
      this.ballMesh(0.077, 0, 0, 0, trim, this.plush);
      for (const x of [-0.055, 0.055])
        this.ballMesh(0.032, x, 0.064, 0, trim, this.plush);
      for (const x of [-0.027, 0.027])
        this.ballMesh(0.008, x, 0.015, 0.07, screen, this.plush);
      this.scissors = new Group();
      this.scissors.position.set(0, 1.35, 0.09);
      this.live.add(this.scissors);
      for (const a of [-0.35, 0.35]) {
        const blade = this.box(
          0.13,
          0.008,
          0.015,
          0,
          0,
          0,
          metal,
          this.scissors,
        );
        blade.rotation.z = a;
      }
    } else if (id === "flight") {
      this.target = this.box(0.6, 0.08, 0.025, 0, 1.2, 0, trim, this.live);
      this.marker = this.box(
        0.57,
        0.016,
        0.04,
        0,
        1.2,
        0.035,
        white,
        this.live,
      );
      for (let i = 0; i < 15; i++)
        for (const x of [-0.39, 0.39])
          this.box(
            0.025,
            0.025,
            0.02,
            x,
            0.94 + i * 0.055,
            -0.02,
            i % 3 ? trim : white,
          );
    } else if (id === "bricks") {
      const g = new LaptopGame(id);
      this.bricks = g.blocks.map((b) =>
        this.box(
          b.w * 0.0013,
          b.h * 0.0013,
          0.028,
          X(b.x + b.w / 2),
          Y(b.y + b.h / 2),
          0,
          b.row % 2 ? trim : white,
          this.live,
        ),
      );
    }
    if (["rally", "bricks"].includes(id)) {
      this.paddle = this.box(
        0.156,
        0.025,
        0.035,
        0,
        Y(710),
        0.02,
        trim,
        this.live,
      );
      if (id === "rally")
        this.enemy = this.box(
          0.156,
          0.025,
          0.035,
          0,
          Y(110),
          0.02,
          white,
          this.live,
        );
    }
    if (id === "stack") {
      this.stackBlocks = Array.from({ length: 13 }, () =>
        this.box(0.3, 0.045, 0.07, 0, 1, 0, trim, this.live),
      );
      this.slider = this.box(0.3, 0.045, 0.07, 0, 1, 0, white, this.live);
    }
    this.ball = this.ballMesh(0.018, 0, 1.7, 0.025, white);
    this.ball.visible = false;
    // Batch only fixed geometry; moving parts remain independent world-space meshes.
    this.static.updateMatrixWorld(true);
    const batches = new Map();
    this.static.traverse((m) => {
      if (!m.isMesh || m.material.map) return;
      let a = batches.get(m.material);
      if (!a) batches.set(m.material, (a = []));
      a.push(m);
    });
    for (const [mat, meshes] of batches) {
      const geometries = meshes.map((m) =>
        (m.geometry.index
          ? m.geometry.toNonIndexed()
          : m.geometry.clone()
        ).applyMatrix4(m.matrixWorld),
      );
      const geo = merge(geometries);
      if (geo) {
        const combined = new Mesh(geo, mat);
        combined.receiveShadow = true;
        this.static.add(combined);
        for (const m of meshes) {
          m.removeFromParent();
          m.geometry.dispose();
        }
      }
      for (const g of geometries) g.dispose();
    }
    this.render(makeGame(id));
  }
  render(g) {
    const id = this.def.id;
    if (this.wheel) this.wheel.rotation.z = -g.angle;
    if (this.keyMarker)
      this.keyMarker.position.set(
        Math.cos(g.angle) * 0.33,
        1.34 - Math.sin(g.angle) * 0.33,
        0.09,
      );
    if (this.ball) {
      this.ball.visible =
        !!g.ball ||
        (g.phase === "ready" &&
          ["plinko", "magic", "bowl", "bricks", "rally"].includes(id));
      const b = g.ball || {
        x: g.aim,
        y: ["bricks", "rally", "bowl"].includes(id) ? 675 : 100,
      };
      this.ball.position.set(X(b.x), Y(b.y), 0.035);
      this.ball.scale.setScalar(((b.r || 11) * 0.0013) / 0.018);
    }
    if (this.hoops)
      for (let i = 0; i < this.hoops.length; i++)
        this.hoops[i].position.x = X(id === "bowl" ? g.target() : g.gap(i));
    if (this.cup) this.cup.position.x = X(g.target());
    if (this.plush) {
      const x = 300 + Math.sin(g.time * 0.8) * 70;
      this.plush.position.set(X(x), Y(g.ball?.y || 440), 0);
      this.rope.visible = !g.cleanCut;
      this.rope.position.x = X(x);
      this.scissors.position.x = X(300 + Math.sin(g.time * 1.6) * 125);
    }
    if (this.marker) {
      this.marker.position.y = Y(
        g.phase === "feedback" ? g.stopY : 390 + Math.sin(g.time * 2.2) * 220,
      );
      this.target.position.y = Y(
        g.phase === "feedback"
          ? g.stopTarget
          : 390 + Math.sin(g.time * 0.7) * 180,
      );
    }
    if (this.bricks)
      g.blocks.forEach((b, i) => (this.bricks[i].visible = b.alive));
    if (this.paddle) this.paddle.position.x = X(g.aim);
    if (this.enemy) this.enemy.position.x = X(g.enemy);
    if (this.stackBlocks) {
      this.stackBlocks.forEach((m, i) => {
        const b = g.stack[i];
        m.visible = !!b;
        if (b) {
          m.position.set(X(b.x + b.w / 2), Y(b.y + 15), 0);
          m.scale.x = (b.w * 0.0013) / 0.3;
        }
      });
      const top = g.stack.at(-1);
      this.slider.visible = g.phase === "ready";
      this.slider.position.set(X(g.slide + top.w / 2), Y(top.y - 25), 0);
      this.slider.scale.x = (top.w * 0.0013) / 0.3;
    }
  }
  dispose() {
    const geos = new Set(),
      mats = new Set();
    this.group.traverse((m) => {
      if (m.isMesh) {
        geos.add(m.geometry);
        for (const mat of Array.isArray(m.material) ? m.material : [m.material])
          mats.add(mat);
      }
    });
    for (const g of geos) g.dispose();
    for (const m of mats) {
      m.map?.dispose();
      m.dispose();
    }
    this.group.removeFromParent();
  }
}
export function mountFloor(hall) {
  for (const def of FLOOR_LAYOUT) {
    const view = new FloorCabinet(def);
    view.group.position.set(def.x, 0, def.z);
    view.group.rotation.y = def.yaw;
    hall.group.add(view.group);
    hall.cabinets.push({
      kind: def.id,
      id: "added-" + def.id,
      name: def.name,
      group: view.group,
      x: def.x,
      z: def.z,
      yaw: def.yaw,
      claw: new Group(),
      floorView: view,
    });
    hall.colliders.push({
      minX: def.x - 0.43,
      maxX: def.x + 0.43,
      minZ: def.z - 0.59,
      maxZ: def.z + 0.59,
    });
  }
}
export function beginFloorSession(scene, id, store, save, status) {
  const cabinet = scene.hall.cabinets.find((c) => c.kind === id && c.floorView);
  if (!cabinet) return;
  scene.exitFloorGame?.();
  scene.exitClaw();
  scene.floorSession = {
    cabinet,
    game: makeGame(id),
    previous: [...(padState.buttons || [])],
    award: false,
    cam: 0,
    wasWalking: store.getState().walking,
  };
  document.exitPointerLock?.();
  scene.input.reset();
  scene.clock.reset();
  store.setState({
    floorPlaying: true,
    walking: false,
    inspecting: false,
    paused: false,
  });
  scene.resize();
  scene.beginBlend();
  const ui = document.createElement("section");
  ui.className = "floor-game-hud";
  ui.setAttribute("aria-label", cabinet.name + " 3D cabinet");
  ui.innerHTML = `<button data-exit>← Back to arcade · B / Esc</button><aside><span class="serial">ON THE FLOOR / FREE PLAY</span><h1>${cabinet.name}</h1><p>${cabinet.floorView.def.hint}</p><output aria-live="polite"></output><strong data-score></strong><button class="primary" data-action>${id === "bowl" ? "HOLD TO CHARGE" : id === "stack" ? "LOCK BLOCK" : "PLAY / SERVE"} · A / Space</button><button data-retry>New round · X</button><button data-camera>Side / front view · Y</button><p>Arrows / WASD / L stick aim<br>Right stick rotates the cabinet view</p><div class="floor-aim"><button data-left aria-label="Aim left">←</button><button data-right aria-label="Aim right">→</button></div></aside>`;
  document.body.append(ui);
  scene.floorSession.ui = ui;
  try {
    scene.audio.start(store.getState().muted, "hall");
  } catch {}
  let lastSound = 0;
  function tone(f = 500) {
    const a = scene.audio.context;
    if (
      store.getState().muted ||
      !a ||
      a.state !== "running" ||
      a.currentTime - lastSound < 0.06
    )
      return;
    lastSound = a.currentTime;
    const osc = a.createOscillator(),
      gain = a.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f, a.currentTime);
    gain.gain.setValueAtTime(0.025, a.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(scene.audio.master);
    osc.start();
    osc.stop(a.currentTime + 0.1);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  const action = () => {
      if (scene.floorSession?.game.action()) tone(550);
    },
    release = () => scene.floorSession?.game.release();
  ui.querySelector("[data-action]").onpointerdown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    action();
  };
  ui.querySelector("[data-action]").onpointerup = release;
  ui.querySelector("[data-action]").onpointercancel = release;
  ui.querySelector("[data-action]").onclick = (e) => {
    if (e.detail === 0) {
      action();
      release();
    }
  };
  ui.querySelector("[data-exit]").onclick = () => scene.exitFloorGame();
  ui.querySelector("[data-retry]").onclick = () => {
    scene.floorSession.game = makeGame(id);
    scene.floorSession.award = false;
  };
  ui.querySelector("[data-camera]").onclick = () => {
    scene.floorSession.cam = scene.floorSession.cam > 0.2 ? 0 : 0.55;
    scene.beginBlend();
  };
  for (const [selector, code] of [
    ["[data-left]", "ArrowLeft"],
    ["[data-right]", "ArrowRight"],
  ]) {
    const b = ui.querySelector(selector);
    b.onpointerdown = (e) => {
      b.setPointerCapture(e.pointerId);
      scene.input.keys.add(code);
    };
    b.onpointerup = b.onpointercancel = () => scene.input.keys.delete(code);
  }
  const key = (e) => {
      if (
        !scene.floorSession ||
        store.getState().settingsOpen ||
        store.getState().collectionOpen
      )
        return;
      if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        scene.input.keys.add(e.code);
        return;
      }
      if (["Space", "Escape", "KeyX", "KeyV"].includes(e.code)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.repeat) return;
        if (e.code === "Escape") scene.exitFloorGame();
        if (e.code === "Space") action();
        if (e.code === "KeyX") ui.querySelector("[data-retry]").click();
        if (e.code === "KeyV") ui.querySelector("[data-camera]").click();
      }
    },
    up = (e) => {
      scene.input.keys.delete(e.code);
      if (e.code === "Space") release();
    },
    blur = () => {
      release();
      scene.input.reset();
    };
  window.addEventListener("keydown", key, true);
  window.addEventListener("keyup", up, true);
  window.addEventListener("blur", blur);
  scene.floorSession.cleanup = () => {
    window.removeEventListener("keydown", key, true);
    window.removeEventListener("keyup", up, true);
    window.removeEventListener("blur", blur);
    ui.remove();
  };
  scene.renderer.domElement.focus();
  scene.floorSession.step = (dt) => {
    const s = scene.floorSession,
      p = padState,
      b = p.buttons || [],
      edge = (i) => padReader.released && b[i] && !s.previous[i];
    if (edge(1)) {
      scene.exitFloorGame();
      return;
    }
    if (edge(0)) action();
    if (!b[0] && s.previous[0]) s.game.release();
    if (edge(2)) ui.querySelector("[data-retry]").click();
    if (edge(3)) ui.querySelector("[data-camera]").click();
    s.previous = [...b];
    s.cam = Math.max(-0.7, Math.min(0.7, s.cam + (p.right?.[0] || 0) * dt));
    s.game.step(dt / 2, scene.input.horizontal);
    s.game.step(dt / 2, scene.input.horizontal);
    if (s.game.hits > s.lastHits) tone(700);
    s.lastHits = s.game.hits || 0;
    s.cabinet.floorView.render(s.game);
    ui.querySelector("output").textContent = s.game.message;
    ui.querySelector("[data-score]").textContent = s.game.score + " TICKETS";
    if (s.game.phase === "result" && !s.award) {
      s.award = true;
      tone(s.game.score ? 1000 : 220);
      const c = store.getState().collection,
        next = { ...c, tickets: c.tickets + s.game.score };
      save(next);
      store.setState({ collection: next, collectionStatus: status() });
    }
  };
}

import { LAPTOP_CABINETS } from "./laptop-games.js";
export const CABINETS = [
  ...LAPTOP_CABINETS,
  {
    id: "wheel",
    name: "Neon Fortune",
    ref: "Multi-colour ticket wheel",
    hint: "Press to spin. The wheel coasts under friction; the top pointer decides your tickets.",
    color: "#f8dc58",
  },
  {
    id: "bigwheel",
    name: "Big Night Spin",
    ref: "Big Spin wheel",
    hint: "A bigger wheel, a longer coast. Press to spin for the top pointer.",
    color: "#ff81bc",
  },
  {
    id: "flight",
    name: "Skyline Sprint",
    ref: "Superhero timing cabinet",
    hint: "Stop your rising light inside the moving green zone. Three chances.",
    color: "#67c8ff",
  },
  {
    id: "magic",
    name: "Magic Drop",
    ref: "Magic Drop",
    hint: "Aim left or right. Drop a ball through the moving hoops into the cup.",
    color: "#b3a0ff",
  },
  {
    id: "bowl",
    name: "Bowl-a-Ball",
    ref: "Bowl-O-Ball",
    hint: "Aim for the ring. Hold action to charge your launch, release to bowl.",
    color: "#ffb269",
  },
  {
    id: "lucky",
    name: "Lucky Loop",
    ref: "Free Lucky",
    hint: "Stop the rotating key inside the green release window. Three attempts.",
    color: "#62ffc6",
  },
  {
    id: "plinko",
    name: "Peg Riot",
    ref: "Plinko",
    hint: "Choose your drop point. Real peg collisions decide the landing slot. Three balls.",
    color: "#ff7ba7",
  },
  {
    id: "cut",
    name: "Skill Snip",
    ref: "Skill Cut",
    hint: "Stop the scissors on the swaying cord. A clean cut sends your plush falling.",
    color: "#d6a5ff",
  },
];
export const TAU = Math.PI * 2;
export function angularDistance(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}
export class MidwayGame {
  constructor(kind, seed = 41) {
    this.kind = kind;
    this.seed = seed >>> 0;
    this.time = 0;
    this.phase = "ready";
    this.score = 0;
    this.attempts = 0;
    this.aim = 300;
    this.angle = 0;
    this.speed = 0;
    this.charge = 0;
    this.ball = null;
    this.trail = [];
    this.hits = 0;
    this.message = "READY WHEN YOU ARE";
    this.cleared = new Set();
    this.shots = ["plinko", "flight", "lucky"].includes(kind) ? 3 : 1;
    this.pegs = [];
    if (kind === "plinko")
      for (let row = 0; row < 9; row++)
        for (let col = 0; col < 7; col++) {
          const x = 65 + col * 75 + (row % 2 ? 37.5 : 0);
          if (x < 560) this.pegs.push({ x, y: 180 + row * 47, r: 7 });
        }
  }
  random() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  target() {
    return 300 + Math.sin(this.time * 1.3) * 160;
  }
  gap(level) {
    return (
      300 + Math.sin(this.time * (0.65 + level * 0.13) + level * 1.7) * 145
    );
  }
  action() {
    if (this.phase !== "ready") return false;
    this.flightTime = 0;
    const k = this.kind;
    if (k === "bowl") {
      this.phase = "charging";
      this.charge = 0;
      return true;
    }
    if (k === "wheel" || k === "bigwheel") {
      this.speed = 7 + this.random() * 5;
      this.phase = "spinning";
      this.message = "LET IT RIDE";
      return true;
    }
    if (k === "flight") {
      const y = 390 + Math.sin(this.time * 2.2) * 220,
        target = 390 + Math.sin(this.time * 0.7) * 180;
      this.stopY = y;
      this.stopTarget = target;
      const error = Math.abs(y - target);
      this.score += error < 28 ? 150 : error < 65 ? 40 : 0;
      this.attempts++;
      this.message =
        error < 28
          ? "RIGHT ON THE MONEY"
          : error < 65
            ? "CLOSE CALL"
            : "MISSED THE WINDOW";
      this.phase = "feedback";
      this.feedback = 0;
      return true;
    }
    if (k === "lucky") {
      const err = angularDistance(this.angle, -Math.PI / 2);
      this.score += err < 0.16 ? 200 : err < 0.35 ? 25 : 0;
      this.attempts++;
      this.message =
        err < 0.16
          ? "KEY RELEASED!"
          : err < 0.35
            ? "SO CLOSE"
            : "MISSED THE SLOT";
      this.phase = "feedback";
      this.feedback = 0;
      return true;
    }
    if (k === "cut") {
      const x = 300 + Math.sin(this.time * 1.6) * 125,
        cord = 300 + Math.sin(this.time * 0.8) * 70;
      this.cleanCut = Math.abs(x - cord) < 24;
      this.phase = "falling";
      this.message = this.cleanCut ? "SNIP!" : "JUST MISSED";
      this.ball = { x: cord, y: 400, vx: 0, vy: 0, r: 30 };
      return true;
    }
    this.ball = {
      x: this.aim,
      y: 100,
      vx: k === "plinko" ? (this.random() - 0.5) * 8 : 0,
      vy: 0,
      r: k === "plinko" ? 11 : 13,
    };
    this.phase = "falling";
    this.message = "MAKE SOME NOISE";
    return true;
  }
  release() {
    if (this.phase === "charging") {
      this.ball = {
        x: this.aim,
        y: 700,
        vx: (300 - this.aim) * 0.15,
        vy: -(390 + this.charge * 540),
        r: 15,
      };
      this.phase = "falling";
      this.message = "NICE AND EASY";
      this.launched = false;
    }
  }
  finish() {
    this.phase = "result";
    this.message =
      this.score > 0
        ? `${this.score} TICKETS. ABSOLUTE SCENES.`
        : "THE MACHINE WINS THIS ONE.";
  }
  next() {
    this.landingSlot = undefined;
    this.ball = null;
    this.trail = [];
    this.attempts++;
    this.phase = this.attempts >= this.shots ? "result" : "ready";
    if (this.phase === "result") this.finish();
  }
  step(dt, axis = 0) {
    if (!Number.isFinite(dt) || dt <= 0 || dt > 1 / 60 + 0.000001)
      throw new RangeError("Use bounded fixed steps");
    if (!Number.isFinite(axis)) throw new RangeError("Aim must be finite");
    if (this.phase === "result") return;
    this.time += dt;
    if (this.phase === "ready")
      this.aim = Math.max(
        45,
        Math.min(555, this.aim + Math.max(-1, Math.min(1, axis)) * 260 * dt),
      );
    if (this.kind === "lucky" && this.phase === "ready") this.angle += dt * 2.1;
    if (this.phase === "feedback") {
      this.feedback += dt;
      if (this.feedback > 1.1) {
        if (this.attempts >= this.shots) this.finish();
        else this.phase = "ready";
      }
      return;
    }
    if (this.phase === "charging") {
      this.charge = Math.min(1, this.charge + dt * 0.65);
      return;
    }
    if (this.phase === "spinning") {
      // Integrate exponential drag analytically so the final sector is independent of frame cadence.
      const decay = this.kind === "bigwheel" ? 0.32 : 0.43;
      this.angle += (this.speed * (1 - Math.exp(-decay * dt))) / decay;
      this.speed *= Math.exp(-decay * dt);
      if (this.speed < 0.045) {
        const sector = Math.floor(
          ((((-Math.PI / 2 - this.angle) % TAU) + TAU) % TAU) / (TAU / 16),
        );
        this.score = [
          20, 40, 60, 100, 20, 80, 40, 200, 20, 60, 40, 100, 20, 80, 40, 500,
        ][sector];
        this.finish();
      }
      return;
    }
    if (this.phase !== "falling" || !this.ball) return;
    this.flightTime = (this.flightTime || 0) + dt;
    const b = this.ball,
      oldY = b.y;
    b.vy += 650 * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x < b.r + 24) {
      b.x = b.r + 24;
      b.vx = Math.abs(b.vx) * 0.72;
    }
    if (b.x > 576 - b.r) {
      b.x = 576 - b.r;
      b.vx = -Math.abs(b.vx) * 0.72;
    }
    const rims = [];
    if (this.kind === "magic")
      for (let l = 0; l < 3; l++)
        for (const side of [-1, 1])
          rims.push({ x: this.gap(l) + side * 45, y: 240 + l * 145, r: 5 });
    if (this.kind === "bowl")
      for (const side of [-1, 1])
        rims.push({ x: this.target() + side * 48, y: 300, r: 7 });
    for (const peg of [...this.pegs, ...rims]) {
      let dx = b.x - peg.x,
        dy = b.y - peg.y,
        dist = Math.hypot(dx, dy),
        r = b.r + peg.r;
      if (dist < r) {
        if (dist < 1e-8) {
          dx = 0.001;
          dy = -1;
          dist = Math.hypot(dx, dy);
        }
        const nx = dx / dist,
          ny = dy / dist;
        b.x = peg.x + nx * (r + 0.02);
        b.y = peg.y + ny * (r + 0.02);
        const vn = b.vx * nx + b.vy * ny;
        if (vn < 0) {
          b.vx -= 1.55 * vn * nx;
          b.vy -= 1.55 * vn * ny;
          this.hits++;
        }
      }
    }
    if (this.kind === "tower")
      for (let l = 0; l < 5; l++) {
        const y = 220 + l * 95;
        if (!this.cleared.has(l) && oldY + b.r < y && b.y + b.r >= y) {
          this.cleared.add(l);
          if (Math.abs(b.x - this.gap(l)) < 47 - b.r) {
            this.score += 25;
          } else {
            b.y = y - b.r;
            b.vy = -Math.abs(b.vy) * 0.35;
            b.vx += (b.x < this.gap(l) ? -1 : 1) * 160;
          }
        }
      }
    if (this.kind === "bowl" && b.vy < 0 && oldY > 300 && b.y <= 300) {
      this.launched = true;
      const error = Math.abs(b.x - this.target());
      this.score = error < 32 ? 200 : error < 65 ? 50 : 0;
    }
    if (this.kind === "magic")
      for (let l = 0; l < 3; l++) {
        const y = 240 + l * 145;
        if (!this.cleared.has(l) && oldY < y && b.y >= y) {
          this.cleared.add(l);
          if (Math.abs(b.x - this.gap(l)) < 40) this.score += 40;
        }
      }
    if (this.kind === "cut" && !this.cleanCut) {
      b.y = 400;
      this.feedback = (this.feedback || 0) + dt;
      if (this.feedback > 1.2) this.finish();
      return;
    }
    this.trail.push({ x: b.x, y: b.y });
    if (this.trail.length > 20) this.trail.shift();
    if (this.kind === "plinko" && b.y > 710) {
      if (this.landingSlot === undefined)
        this.landingSlot = Math.min(
          6,
          Math.max(0, Math.floor((b.x - 24) / 79)),
        );
      const left = 24 + this.landingSlot * 79 + b.r,
        right = 24 + (this.landingSlot + 1) * 79 - b.r;
      if (b.x < left) {
        b.x = left;
        b.vx = Math.abs(b.vx) * 0.5;
      }
      if (b.x > right) {
        b.x = right;
        b.vx = -Math.abs(b.vx) * 0.5;
      }
    }
    if (b.y > 740) {
      if (this.kind === "plinko") {
        const slot = Math.min(6, Math.max(0, Math.floor((b.x - 24) / 79)));
        this.score += [100, 40, 20, 200, 20, 40, 100][slot];
      }
      if (this.kind === "magic" && Math.abs(b.x - this.target()) < 50)
        this.score += 100;
      if (this.kind === "cut" && this.cleanCut) this.score = 150;
      this.next();
    }
    // A shallow bowl shot returns to the floor; no permanent airborne state.
    if (this.flightTime > 25) this.finish();
  }
}

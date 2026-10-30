export const LAPTOP_CABINETS = [
  {
    id: "rally",
    name: "Neon Rally",
    ref: "SPORTS / ORIGINAL",
    hint: "Move your paddle with the stick or arrows. Beat the rival to five goals. A / Space serves.",
    color: "#51e5ff",
    original: true,
  },
  {
    id: "bricks",
    name: "Brick Blitz",
    ref: "CLASSICS / ORIGINAL",
    hint: "Catch the ball with your paddle and clear the neon wall. Three lives. A / Space serves.",
    color: "#ff657e",
    original: true,
  },
  {
    id: "stack",
    name: "Stack Attack",
    ref: "SKILL / ORIGINAL",
    hint: "Press A / Space to lock each sliding block. Only the overlap survives. Reach twelve floors.",
    color: "#ffe35a",
    original: true,
  },
];
export class LaptopGame {
  constructor(kind) {
    this.kind = kind;
    this.phase = "ready";
    this.time = 0;
    this.elapsed = 0;
    this.score = 0;
    this.aim = 300;
    this.attempts = 0;
    this.shots = 1;
    this.trail = [];
    this.ball = null;
    this.lives = 3;
    this.goals = 0;
    this.rival = 0;
    this.enemy = 300;
    this.message = "A / SPACE TO START";
    this.blocks = [];
    this.stack = [{ x: 170, w: 260, y: 710 }];
    this.slide = 170;
    this.slideDirection = 1;
    this.feedback = 0;
    if (kind === "bricks")
      for (let row = 0; row < 5; row++)
        for (let col = 0; col < 8; col++)
          this.blocks.push({
            x: 34 + col * 67,
            y: 150 + row * 28,
            w: 62,
            h: 20,
            alive: true,
            row,
          });
  }
  action() {
    if (this.phase !== "ready") return false;
    if (this.kind === "stack") {
      const top = this.stack.at(-1),
        left = Math.max(top.x, this.slide),
        right = Math.min(top.x + top.w, this.slide + top.w),
        w = right - left;
      if (w <= 0) {
        this.finish("MISSED IT. ONE MORE GO?");
        return true;
      }
      this.stack.push({ x: left, w, y: top.y - 40 });
      this.score += 20;
      this.phase = "feedback";
      this.feedback = 0;
      this.message = w > top.w - 8 ? "PERFECT ALIGNMENT!" : "KEEP IT GOING";
      if (this.stack.length === 13) {
        this.score += 200;
        this.finish("TWELVE FLOORS. TOP OF THE WORLD.");
      }
      return true;
    }
    this.ball = { x: this.aim, y: 675, vx: 120, vy: -340, r: 9 };
    this.phase = "playing";
    this.message = "KEEP IT ALIVE";
    return true;
  }
  release() {}
  finish(message) {
    this.phase = "result";
    this.message = message;
  }
  resetServe() {
    this.ball = null;
    this.trail = [];
    this.phase = "ready";
    this.message = "A / SPACE TO SERVE";
  }
  step(dt, axis = 0) {
    if (
      !Number.isFinite(dt) ||
      dt <= 0 ||
      dt > 1 / 60 + 0.000001 ||
      !Number.isFinite(axis)
    )
      throw new RangeError("Use finite bounded input");
    if (this.phase === "result") return;
    this.time += dt;
    if (this.kind === "stack") {
      if (this.phase === "feedback") {
        this.feedback += dt;
        if (this.feedback > 0.45) {
          this.phase = "ready";
          this.slide = 30;
        }
      }
      if (this.phase === "ready") {
        const w = this.stack.at(-1).w;
        this.slide += this.slideDirection * (135 + this.stack.length * 16) * dt;
        if (this.slide < 25) {
          this.slide = 25;
          this.slideDirection = 1;
        }
        if (this.slide > 575 - w) {
          this.slide = 575 - w;
          this.slideDirection = -1;
        }
      }
      return;
    }
    this.aim = Math.max(
      78,
      Math.min(522, this.aim + Math.max(-1, Math.min(1, axis)) * 440 * dt),
    );
    if (this.phase !== "playing") return;
    this.elapsed += dt;
    const b = this.ball,
      oldX = b.x,
      oldY = b.y;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x < 33) {
      b.x = 33;
      b.vx = Math.abs(b.vx);
    }
    if (b.x > 567) {
      b.x = 567;
      b.vx = -Math.abs(b.vx);
    }
    if (
      b.vy > 0 &&
      oldY + b.r <= 704 &&
      b.y + b.r >= 704 &&
      Math.abs(b.x - this.aim) < 66
    ) {
      b.y = 704 - b.r;
      const offset = (b.x - this.aim) / 66,
        speed = Math.min(650, Math.hypot(b.vx, b.vy) * 1.025);
      b.vx = offset * speed * 0.85;
      b.vy = -Math.sqrt(speed * speed - b.vx * b.vx);
    }
    if (this.kind === "rally") {
      this.enemy +=
        Math.max(-1, Math.min(1, (b.x - this.enemy) / 50)) * 235 * dt;
      this.enemy = Math.max(78, Math.min(522, this.enemy));
      if (
        b.vy < 0 &&
        oldY - b.r >= 116 &&
        b.y - b.r <= 116 &&
        Math.abs(b.x - this.enemy) < 66
      ) {
        b.y = 116 + b.r;
        b.vy = Math.abs(b.vy) * 1.025;
        b.vx += (b.x - this.enemy) * 2;
      }
      if (b.y < 65) {
        this.goals++;
        this.score += 40;
        this.resetServe();
      } else if (b.y > 755) {
        this.rival++;
        this.resetServe();
      }
      if (this.goals >= 5 || this.rival >= 5)
        this.finish(
          this.goals >= 5 ? "MATCH WON. NICE HANDS." : "RIVAL TAKES THE MATCH.",
        );
    } else {
      if (b.y < 90) {
        b.y = 90;
        b.vy = Math.abs(b.vy);
      }
      for (const block of this.blocks) {
        if (!block.alive) continue;
        if (
          b.x + b.r > block.x &&
          b.x - b.r < block.x + block.w &&
          b.y + b.r > block.y &&
          b.y - b.r < block.y + block.h
        ) {
          block.alive = false;
          this.score += 10;
          if (oldY + b.r <= block.y || oldY - b.r >= block.y + block.h)
            b.vy = -b.vy;
          else b.vx = -b.vx;
          break;
        }
      }
      if (b.y > 755) {
        this.lives--;
        this.resetServe();
        if (!this.lives) this.finish("OUT OF LIVES. REMATCH?");
      }
      if (this.blocks.every((x) => !x.alive)) {
        this.score += 200;
        this.finish("WALL CLEARED. ABSOLUTE LEGEND.");
      }
    }
    if (this.ball) {
      this.trail.push({ x: this.ball.x, y: this.ball.y });
      if (this.trail.length > 18) this.trail.shift();
    }
    if (this.elapsed > 90)
      this.finish("TIME! " + this.score + " TICKETS BANKED.");
  }
}

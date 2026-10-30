import { test } from "node:test";
import assert from "node:assert/strict";
import { LaptopGame } from "../src/laptop-games.js";
test("rally paddle returns the ball with directional control", () => {
  const g = new LaptopGame("rally");
  g.action();
  g.ball = { x: 320, y: 690, vx: 0, vy: 300, r: 9 };
  for (let i = 0; i < 12; i++) g.step(1 / 240);
  assert.ok(g.ball.vy < 0);
  assert.ok(g.ball.vx > 0);
});
test("brick impacts remove one brick and award points", () => {
  const g = new LaptopGame("bricks");
  g.action();
  const brick = g.blocks[32];
  g.ball = {
    x: brick.x + 30,
    y: brick.y + brick.h + 12,
    vx: 0,
    vy: -300,
    r: 9,
  };
  for (let i = 0; i < 8; i++) g.step(1 / 240);
  assert.equal(brick.alive, false);
  assert.equal(g.score, 10);
  assert.ok(g.ball.vy > 0);
});
test("stacker rewards twelve accurate placements and stops awarding after result", () => {
  const g = new LaptopGame("stack");
  for (let i = 0; i < 12; i++) {
    g.slide = g.stack.at(-1).x;
    assert.equal(g.action(), true);
    for (let k = 0; k < 120; k++) g.step(1 / 240);
  }
  assert.equal(g.phase, "result");
  assert.equal(g.score, 440);
  assert.equal(g.action(), false);
});
test("a missed stack ends the round without a phantom platform", () => {
  const g = new LaptopGame("stack");
  g.slide = 500;
  g.action();
  assert.equal(g.phase, "result");
  assert.equal(g.stack.length, 1);
});
for (const kind of ["rally", "bricks"])
  test(kind + " rounds terminate with finite ball positions", () => {
    const g = new LaptopGame(kind);
    for (let i = 0; i < 240 * 100 && g.phase !== "result"; i++) {
      if (g.phase === "ready") g.action();
      g.step(1 / 240, Math.sin(i * 0.005));
      if (g.ball)
        assert.ok(Number.isFinite(g.ball.x) && Number.isFinite(g.ball.y));
    }
    assert.equal(g.phase, "result");
  });

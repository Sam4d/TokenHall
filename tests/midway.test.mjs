import { test } from "node:test";
import assert from "node:assert/strict";
import { CABINETS, MidwayGame } from "../src/midway-physics.js";
const advance = (g, n) => {
  for (let i = 0; i < n; i++) g.step(1 / 240);
};
for (const c of CABINETS.filter((c) => !c.original))
  test(`${c.name}: complete rounds are finite, scored once, and reject duplicate actions`, () => {
    const g = new MidwayGame(c.id, 31);
    for (let round = 0; round < g.shots; round++) {
      assert.equal(g.action(), true);
      assert.equal(g.action(), false);
      if (c.id === "bowl") {
        advance(g, 300);
        g.release();
      }
      for (let i = 0; i < 16000 && !["ready", "result"].includes(g.phase); i++)
        g.step(1 / 240);
      assert.ok(["ready", "result"].includes(g.phase));
    }
    assert.equal(g.phase, "result");
    assert.ok(Number.isFinite(g.score));
    assert.ok(g.score >= 0);
    const score = g.score;
    advance(g, 500);
    assert.equal(g.score, score);
  });
test("seeded wheel results are reproducible across integration rates", () => {
  const a = new MidwayGame("wheel", 41),
    b = new MidwayGame("wheel", 41);
  a.action();
  b.action();
  for (let i = 0; i < 4000 && a.phase !== "result"; i++) a.step(1 / 240);
  for (let i = 0; i < 1000 && b.phase !== "result"; i++) b.step(1 / 60);
  assert.equal(a.phase, "result");
  assert.equal(b.phase, "result");
  assert.equal(a.score, b.score);
  assert.ok(Math.abs(a.angle - b.angle) < 0.01);
});
test("plinko collides with pegs and stays within the playfield", () => {
  const g = new MidwayGame("plinko", 4);
  g.action();
  for (let i = 0; i < 2500 && g.phase === "falling"; i++) {
    g.step(1 / 240);
    if (g.ball) {
      assert.ok(g.ball.x >= 24);
      assert.ok(g.ball.x <= 576);
    }
  }
  assert.ok(g.hits > 0);
  assert.ok(g.score > 0);
});
test("bowling power changes trajectory; aim clamps and invalid time is rejected", () => {
  const low = new MidwayGame("bowl"),
    high = new MidwayGame("bowl");
  low.action();
  low.release();
  high.action();
  advance(high, 360);
  high.release();
  assert.ok(high.ball.vy < low.ball.vy);
  const g = new MidwayGame("magic");
  for (let i = 0; i < 1000; i++) g.step(1 / 240, 1);
  assert.equal(g.aim, 555);
  assert.throws(() => g.step(Infinity), RangeError);
});

test("waiting before a ball launch does not prematurely terminate its flight", () => {
  const g = new MidwayGame("magic");
  for (let i = 0; i < 17000; i++) g.step(1 / 240);
  g.action();
  g.step(1 / 240);
  assert.equal(g.phase, "falling");
  assert.ok(g.ball.y < 110);
});

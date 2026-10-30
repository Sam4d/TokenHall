import { test } from "node:test";
import assert from "node:assert/strict";
import { SimulationClock } from "../src/clock.js";
test("normal frames run exact physics steps with interpolation", () => {
  const c = new SimulationClock();
  let n = 0;
  c.advance(1 / 60, (dt) => {
    assert.equal(dt, 1 / 120);
    n++;
  });
  assert.equal(n, 2);
  const alpha = c.advance(1 / 240, () => n++);
  assert.equal(n, 2);
  assert.ok(Math.abs(alpha - 0.5) < 1e-10);
});
test("a long suspension never creates unbounded simulation debt", () => {
  const c = new SimulationClock();
  let n = 0;
  c.advance(120, () => n++);
  assert.equal(n, 6);
  assert.ok(c.backlogSeconds <= 0.1);
  for (let i = 0; i < 5; i++) c.advance(1 / 60, () => {});
  assert.equal(c.backlogSeconds, 0);
});
test("reset discards old debt and rejects non-finite time", () => {
  const c = new SimulationClock();
  c.advance(0.1, () => {});
  c.reset();
  assert.equal(c.backlogSeconds, 0);
  assert.equal(
    c.advance(0, () => assert.fail("unexpected simulation")),
    0,
  );
  assert.throws(() => c.advance(NaN, () => {}), RangeError);
});

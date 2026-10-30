import { test } from "node:test";
import assert from "node:assert/strict";
import { stick, PadReader } from "../src/gamepad.js";
const pad = (index = 0, axes = [0, 0, 0, 0], held = []) => ({
  index,
  connected: true,
  id: "Test standard pad",
  axes,
  buttons: Array.from({ length: 17 }, (_, i) => ({
    pressed: held.includes(i),
  })),
});
test("radial dead zone eliminates drift and preserves fine analog control", () => {
  assert.deepEqual(stick(0.1, -0.1), [0, 0]);
  assert.deepEqual(stick(NaN, Infinity), [0, 0]);
  const half = stick(0.5, 0)[0];
  assert.ok(half > 0 && half < 0.5);
  assert.deepEqual(stick(1, 0), [1, 0]);
  assert.ok(Math.abs(Math.hypot(...stick(1, 1)) - 1) < 1e-12);
  assert.ok(stick(0, -1)[1] === -1);
});
test("connect requires release; held buttons produce one action, then rearm", () => {
  const r = new PadReader();
  assert.equal(r.read([pad(0, undefined, [0])]).pressed[0], false);
  r.read([pad()]);
  assert.equal(r.read([pad(0, undefined, [0])]).pressed[0], true);
  assert.equal(r.read([pad(0, undefined, [0])]).pressed[0], false);
  r.read([pad()]);
  assert.equal(r.read([pad(0, undefined, [0])]).pressed[0], true);
});
test("nonzero slots, disconnects and reconnection never leave stale axes or actions", () => {
  const r = new PadReader();
  r.read([null, pad(1)]);
  const s = r.read([null, pad(1, [0.7, -0.8, 0.4, 0.5], [12])]);
  assert.ok(s.left[0] > 0 && s.left[1] < 0);
  assert.ok(s.right[0] > 0);
  assert.equal(s.pressed[12], true);
  const gone = r.read([null, null]);
  assert.equal(gone.connected, false);
  assert.deepEqual(gone.left, [0, 0]);
  assert.equal(r.read([null, pad(1, undefined, [0])]).pressed[0], false);
});
test("active second controller takes ownership without a phantom button press", () => {
  const r = new PadReader();
  r.read([pad(), pad(1)]);
  assert.equal(r.read([pad(), pad(1, undefined, [0])]).index, 1);
  assert.equal(r.read([pad(), pad(1, undefined, [0])]).pressed[0], false);
});

test("two held controllers do not fight over ownership each frame", () => {
  const r = new PadReader();
  r.read([pad()]);
  r.read([pad(), pad(1, undefined, [0])]);
  for (let i = 0; i < 8; i++)
    assert.equal(
      r.read([pad(0, undefined, [0]), pad(1, undefined, [0])]).index,
      1,
    );
});

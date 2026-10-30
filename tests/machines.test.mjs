import { test } from "node:test";
import assert from "node:assert/strict";
// The recovered Vite preload shim is browser-only; machine physics itself is not.
globalThis.document = {
  createElement: () => ({ relList: { supports: () => true } }),
};
const { h: Claw, j: PrizeGame, g: CoinGame } = await import("../src/games.js");
const dt = 1 / 120;
function finish(game, limit = 7200) {
  for (let i = 0; i < limit && game.phase !== "RESULT"; i++) game.step(dt);
  assert.equal(
    game.phase,
    "RESULT",
    "a complete physical round must terminate",
  );
}
test("physical claw moves on both axes, completes a drop and restocks the next attempt", async () => {
  const g = await Claw.create(1701, 72, true);
  try {
    const x = g.x,
      z = g.z;
    for (let i = 0; i < 60; i++) g.step(dt, 0.6, 0.6);
    assert.ok(g.x > x);
    assert.ok(g.z < z);
    g.drop();
    assert.notEqual(g.phase, "POSITIONING");
    finish(g);
    g.retry();
    assert.equal(g.phase, "POSITIONING");
    assert.equal(g.remaining, 20);
  } finally {
    g.dispose();
  }
});
for (const kind of ["cut", "spin"])
  test(`${kind}: action completes a physical round and retry rearms it`, async () => {
    const g = await PrizeGame.create(kind);
    try {
      assert.equal(g.action(), true);
      assert.equal(g.action(), false);
      finish(g);
      g.retry();
      assert.equal(g.phase, "READY");
      assert.equal(g.action(), true);
    } finally {
      g.dispose();
    }
  });
for (const kind of ["pusher", "tower"])
  test(`${kind}: analog aim, coin delivery, cooldown and complete round`, async () => {
    const g = await CoinGame.create(kind);
    try {
      const x = g.aimX,
        z = g.aimZ;
      for (let i = 0; i < 60; i++) g.step(dt, 0.6, 0.6);
      assert.ok(g.aimX > x);
      if (kind === "tower") assert.ok(g.aimZ < z);
      const ammo = g.ammo;
      assert.equal(g.action(), true);
      assert.equal(g.ammo, ammo - 1);
      assert.equal(g.action(), false, "cooldown prevents double drop");
      finish(g);
      assert.equal(g.retry(), true);
      assert.equal(g.ammo, 12);
      assert.equal(g.phase, "READY");
    } finally {
      g.dispose();
    }
  });

import { b as l } from "../assets/physics-DnKIsk7E.js";
import { V as f, Q as M, U as W } from "../assets/renderer-W_eveQ7P.js";
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const t of o)
      if (t.type === "childList")
        for (const n of t.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const t = {};
    return (
      o.integrity && (t.integrity = o.integrity),
      o.referrerPolicy && (t.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
      t
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const t = s(o);
    fetch(o.href, t);
  }
})();
const E = { simDt: 1 / 120, maxSteps: 6 },
  re = {
    low: { pixelRatio: 1, bloom: !1, reflection: !1 },
    medium: { pixelRatio: 1.5, bloom: !0, reflection: !1 },
    high: { pixelRatio: 2, bloom: !0, reflection: !0 },
    ultra: { pixelRatio: 2, bloom: !0, reflection: !0 },
  },
  Z = [
    ["fox", "Fable Fox", 15240013],
    ["dog", "Biscuit Pup", 13014631],
    ["panda", "Pebble Panda", 15526367],
    ["frog", "Puddle Frog", 9752952],
    ["axolotl", "Bubble Axolotl", 15772611],
    ["dragon", "Ember Dragon", 8961984],
    ["dinosaur", "Sprout Dino", 11126898],
    ["unicorn", "Daydream Unicorn", 15325682],
    ["owl", "Twilight Owl", 11900093],
    ["penguin", "Button Penguin", 4810636],
    ["duck", "Daffodil Duck", 16045672],
    ["octopus", "Noodle Octopus", 14132703],
    ["jellyfish", "Lumi Jellyfish", 12180716],
    ["turtle", "Moss Turtle", 8761228],
    ["robot", "Pixel Robot", 10665951],
    ["cloud", "Nimbus Cloud", 15067891],
    ["star", "Stella Star", 15780722],
    ["raccoon", "Bandit Raccoon", 10202048],
    ["koala", "Kiki Koala", 11383999],
    ["hamster", "Honey Hamster", 15121799],
  ],
  U = ["mini", "pillow", "hood", "figure", "dessert"],
  X = {
    mini: "Pocket Pal",
    pillow: "Cloud Pillow",
    hood: "Cosy Hoodie",
    figure: "Adventure Figure",
    dessert: "Cupcake Costume",
  },
  Y = { mini: 0.72, pillow: 1.05, hood: 0.9, figure: 1, dessert: 0.95 };
function q() {
  const a = [];
  for (const [e, s, i] of Z)
    for (const [o, t] of U.entries()) {
      const n = Y[t];
      a.push({
        id: `${e}-${t}`,
        name: `${s} ${X[t]}`,
        kind: "plush",
        family: e,
        form: t,
        size: n,
        color: i,
        accent: [16768943, 16758224, 11183852, 8051657, 15776899][o],
        mass: (t === "pillow" ? 0.075 : 0.065) * n ** 3,
        tickets: 10 + o * 5,
      });
    }
  for (const [e, s, i] of [
    ["rose-phone", "Rose Quartz Phone", 14652861],
    ["glacier-phone", "Glacier Phone", 9424095],
    ["graphite-phone", "Graphite Phone", 5593968],
  ])
    a.push({
      id: e,
      name: s,
      kind: "phone",
      color: i,
      accent: 15064822,
      mass: 0.16,
      tickets: 30,
    });
  for (const [e, s, i, o] of [
    ["peach-egg", "Peach Surprise Capsule", 15840659, 16376753],
    ["ocean-egg", "Ocean Surprise Capsule", 9293796, 13168074],
    ["rose-egg", "Rose Surprise Capsule", 15117776, 16371654],
    ["forest-egg", "Forest Surprise Capsule", 10143650, 14996639],
  ])
    a.push({
      id: e,
      name: s,
      kind: "egg",
      color: i,
      accent: o,
      mass: 0.05,
      tickets: 20,
    });
  return a;
}
const $ = [
    {
      id: "cocoa",
      name: "Cocoa Bear",
      kind: "bear",
      color: 10578762,
      accent: 16309440,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "milk",
      name: "Milk Bear",
      kind: "bear",
      color: 16771531,
      accent: 12420705,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "bow-cat",
      name: "Rosie Bow Cat",
      kind: "cat",
      color: 16774126,
      accent: 16014225,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "midnight",
      name: "Midnight Hood Bunny",
      kind: "bunny",
      color: 3748167,
      accent: 13210340,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "lilac",
      name: "Lilac Hood Bunny",
      kind: "bunny",
      color: 11836128,
      accent: 16757973,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "mint",
      name: "Mint Bow Cat",
      kind: "cat",
      color: 8444097,
      accent: 16766841,
      mass: 0.08,
      tickets: 0,
    },
    {
      id: "phone",
      name: "Aurora Phone Pack",
      kind: "phone",
      color: 8558552,
      accent: 14801407,
      mass: 0.16,
      tickets: 0,
    },
    {
      id: "tickets",
      name: "100 Ticket Bundle",
      kind: "tickets",
      color: 16758353,
      accent: 16772821,
      mass: 0.035,
      tickets: 100,
    },
    {
      id: "star-egg",
      name: "Starlight Surprise Egg",
      kind: "egg",
      color: 12825855,
      accent: 7728864,
      mass: 0.05,
      tickets: 20,
    },
    {
      id: "gold-egg",
      name: "Golden Surprise Egg",
      kind: "egg",
      color: 16764002,
      accent: 16773309,
      mass: 0.05,
      tickets: 250,
    },
    {
      id: "coin-ticket",
      name: "5-ticket Gold Coin",
      kind: "coin",
      color: 15316563,
      accent: 16772532,
      mass: 0.012,
      tickets: 5,
    },
  ],
  x = [...$, ...q()],
  A = (a) =>
    a.kind === "bear" ||
    a.kind === "cat" ||
    a.kind === "bunny" ||
    a.kind === "plush",
  J = (a) => x[a % 8],
  _ = [
    {
      id: "club",
      name: "Grab-a-Pal",
      tagline: "Pocket pals, classic favourites & peach capsules",
      definitions: x.filter(
        (a) =>
          a.form === "mini" ||
          [
            "cocoa",
            "milk",
            "bow-cat",
            "midnight",
            "lilac",
            "mint",
            "peach-egg",
          ].includes(a.id),
      ),
    },
    {
      id: "pillows",
      name: "Pillow Parade",
      tagline: "Big soft shapes, tiny faces & ocean capsules",
      definitions: x.filter((a) => a.form === "pillow" || a.id === "ocean-egg"),
    },
    {
      id: "costumes",
      name: "Cosy Carnival",
      tagline: "Hoodies, cupcake costumes & rose capsules",
      definitions: x.filter(
        (a) => a.form === "hood" || a.form === "dessert" || a.id === "rose-egg",
      ),
    },
    {
      id: "figures",
      name: "Figure Studio",
      tagline: "Adventure figures, phone packs & forest surprises",
      definitions: x.filter(
        (a) =>
          a.form === "figure" ||
          a.kind === "phone" ||
          ["forest-egg", "gold-egg"].includes(a.id),
      ),
    },
  ];
function ae(a) {
  return _.find((e) => e.id === a);
}
function Q(a, e) {
  if (a.kind !== "egg") return;
  if (a.id === "gold-egg") return x.find((i) => i.id === "phone");
  const s = x.filter((i) => i.form === "mini");
  return s[Math.floor(e() * s.length)];
}
function j(a) {
  const e = [],
    s = (c, d, m, g = "body", u = {}) =>
      e.push({ shape: c, position: d, radius: m, material: g, ...u }),
    i = a.form === "pillow",
    o = a.form === "figure",
    t = a.form === "dessert",
    n = a.form === "hood";
  if (i)
    s("box", [0, 0, 0], 0.003, "body", { halfExtents: [0.054, 0.032, 0.019] });
  else if (o) {
    (s("capsule", [0, -0.012, 0], 0.023, "accent", { halfHeight: 0.015 }),
      s("sphere", [0, 0.047, 0], 0.031));
    for (const c of [-1, 1])
      (s("capsule", [c * 0.014, -0.054, 0.003], 0.011, "body", {
        halfHeight: 0.012,
      }),
        s("capsule", [c * 0.033, -0.004, 0], 0.009, "body", {
          halfHeight: 0.014,
          rotation: [0, 0, -c * 0.35],
        }));
  } else {
    (s(
      t ? "cylinder" : "sphere",
      [0, 0, 0],
      0.035,
      t ? "accent" : "body",
      t ? { halfHeight: 0.025 } : {},
    ),
      t && s("sphere", [0, 0.027, 0], 0.036, "cream"),
      s("sphere", [0, 0.051, 0], n ? 0.035 : 0.031));
    for (const c of [-1, 1])
      (s("sphere", [c * 0.033, -0.006, 0.002], 0.014),
        s("sphere", [c * 0.02, -0.029, 0.012], 0.015));
  }
  const r = i ? 0.032 : o ? 0.072 : 0.078,
    h = a.family;
  for (const c of [-1, 1]) {
    if (
      (["fox", "raccoon"].includes(h) &&
        s("cone", [c * 0.024, r + 0.008, 0], 0.012, "body", {
          halfHeight: 0.014,
        }),
      ["koala", "hamster", "panda"].includes(h) &&
        s(
          "sphere",
          [c * 0.028, r, 0],
          h === "koala" ? 0.015 : 0.011,
          h === "panda" ? "dark" : "body",
        ),
      h === "dog" &&
        s("capsule", [c * 0.031, r - 0.008, 0], 0.009, "accent", {
          halfHeight: 0.013,
          rotation: [0, 0, c * 0.15],
        }),
      ["duck", "owl", "penguin"].includes(h) &&
        s(
          "cone",
          [0, i ? 0.005 : o ? 0.049 : 0.052, i ? 0.025 : 0.033],
          0.007,
          "accent",
          { halfHeight: 0.009, rotation: [Math.PI / 2, 0, 0] },
        ),
      h === "unicorn" &&
        s("capsule", [c * 0.023, r + 0.004, 0], 0.007, "body", {
          halfHeight: 0.007,
        }),
      h === "axolotl")
    )
      for (let d = 0; d < 3; d++)
        s(
          "capsule",
          [c * (0.04 + d * 0.002), r - 0.012 - d * 0.012, 0],
          0.004,
          "accent",
          { halfHeight: 0.009, rotation: [0, 0, c * (1.05 + d * 0.25)] },
        );
    if (
      (h === "frog" && s("sphere", [c * 0.021, r, 0.011], 0.011, "body"),
      ["dragon", "owl", "penguin", "duck"].includes(h) &&
        s(
          "capsule",
          [c * (i ? 0.058 : 0.037), i ? 0 : 0.013, -0.004],
          0.008,
          "accent",
          { halfHeight: 0.015, rotation: [0, 0, c * 0.6] },
        ),
      h === "octopus" || h === "jellyfish")
    )
      for (let d = 0; d < 3; d++)
        s(
          "capsule",
          [c * (0.012 + d * 0.015), i ? -0.034 : -0.027, d * 0.009],
          0.007,
          "body",
          {
            halfHeight: h === "jellyfish" ? 0.022 : 0.009,
            rotation: [0, 0, c * (d * 0.25)],
          },
        );
    (h === "cloud" &&
      s("sphere", [c * (i ? 0.043 : 0.028), i ? 0.008 : 0.051, 0], 0.022),
      h === "robot" &&
        s("box", [c * 0.035, r - 0.026, 0], 0.002, "accent", {
          halfExtents: [0.006, 0.008, 0.008],
        }));
  }
  if (
    (["duck", "owl", "penguin"].includes(h) &&
      s(
        "cone",
        [0, i ? 0.005 : o ? 0.049 : 0.052, i ? 0.025 : 0.033],
        0.007,
        "accent",
        { halfHeight: 0.009, rotation: [Math.PI / 2, 0, 0] },
      ),
    h === "unicorn" &&
      s("cone", [0, r + 0.014, 0.008], 0.007, "accent", { halfHeight: 0.018 }),
    h === "robot" &&
      (s("capsule", [0, r + 0.012, 0], 0.003, "dark", { halfHeight: 0.009 }),
      s("sphere", [0, r + 0.024, 0], 0.006, "accent")),
    h === "star")
  )
    for (let c = 0; c < 5; c++) {
      const d = (c * Math.PI * 2) / 5;
      s(
        "cone",
        [Math.sin(d) * 0.035, (i ? 0 : 0.05) + Math.cos(d) * 0.035, 0],
        0.013,
        "body",
        { halfHeight: 0.017, rotation: [0, 0, -d] },
      );
    }
  if (
    (h === "turtle" &&
      s("sphere", [0, i ? 0 : -0.002, -0.024], 0.032, "accent"),
    h === "dinosaur" || h === "dragon")
  ) {
    s("capsule", [0, -0.012, -0.04], 0.009, "accent", {
      halfHeight: 0.018,
      rotation: [Math.PI / 2, 0, 0],
    });
    for (let c = 0; c < 3; c++)
      s("cone", [0, 0.005 + c * 0.014, -0.029], 0.007, "accent", {
        halfHeight: 0.008,
        rotation: [-Math.PI / 2, 0, 0],
      });
  }
  n && s("sphere", [0, 0.09, 0], 0.009, "accent");
  const p = a.size ?? 1;
  for (const c of e)
    ((c.position = c.position.map((d) => d * p)),
      (c.radius *= p),
      c.halfHeight && (c.halfHeight *= p),
      c.halfExtents && (c.halfExtents = c.halfExtents.map((d) => d * p)));
  return {
    parts: e,
    face: [
      0,
      (i ? 0.006 : o ? 0.049 : 0.052) * p,
      (i ? 0.023 : n ? 0.035 : 0.031) * p,
    ],
    faceWidth: (i ? 0.035 : 0.019) * p,
  };
}
function I(a) {
  let e = a >>> 0;
  return Object.assign(
    () => {
      e = (e + 1831565813) >>> 0;
      let i = e;
      return (
        (i = Math.imul(i ^ (i >>> 15), i | 1)),
        (i ^= i + Math.imul(i ^ (i >>> 7), i | 61)),
        ((i ^ (i >>> 14)) >>> 0) / 4294967296
      );
    },
    { getState: () => e },
  );
}
function B(a) {
  const e = (a * Math.PI * 2) / 3;
  return new f(-Math.cos(e) * 0.018, -0.12, -Math.sin(e) * 0.018);
}
function he(a, e, s, i = 1.18, o = new f()) {
  return (
    o.copy(B(a)),
    (o.y -= 0.008),
    o.applyQuaternion(s).add(e),
    (o.y = i),
    o
  );
}
function V(a = 0) {
  const e = (a * Math.PI * 2) / 3,
    s = [],
    i = (o, t, n) => {
      s.push(
        o * Math.cos(e) - n * Math.sin(e),
        t,
        o * Math.sin(e) + n * Math.cos(e),
      );
    };
  for (const [o, t] of [
    [0.006, 0.0052],
    [0, 0.008],
  ])
    for (let n = 0; n < 16; n++) {
      const r = (n * Math.PI * 2) / 16;
      i(Math.cos(r) * t, o, Math.sin(r) * t);
    }
  for (let o = 0; o < 8; o++) {
    const t = (o * Math.PI * 2) / 8;
    i(Math.cos(t) * 3e-4, -0.008, Math.sin(t) * 3e-4);
  }
  return new Float32Array(s);
}
function L(a) {
  return a.shape === "sphere"
    ? (4 / 3) * Math.PI * a.radius ** 3
    : a.shape === "capsule"
      ? Math.PI * a.radius ** 2 * 2 * a.halfHeight +
        (4 / 3) * Math.PI * a.radius ** 3
      : a.shape === "box"
        ? a.halfExtents.reduce((e, s) => e * 2 * (s + a.radius), 1)
        : (Math.PI * a.radius ** 2 * 2 * a.halfHeight) /
          (a.shape === "cone" ? 3 : 1);
}
function K(a, e, s) {
  if (s.kind === "plush") {
    const i = j(s).parts,
      o = i.reduce((t, n) => t + L(n), 0);
    for (const t of i) {
      let n;
      (t.shape === "sphere"
        ? (n = l.ColliderDesc.ball(t.radius))
        : t.shape === "capsule"
          ? (n = l.ColliderDesc.capsule(t.halfHeight, t.radius))
          : t.shape === "cone"
            ? (n = l.ColliderDesc.cone(t.halfHeight, t.radius))
            : t.shape === "cylinder"
              ? (n = l.ColliderDesc.cylinder(t.halfHeight, t.radius))
              : (n = l.ColliderDesc.roundCuboid(...t.halfExtents, t.radius)),
        n
          .setTranslation(...t.position)
          .setMass((s.mass * L(t)) / o)
          .setFriction(0.9)
          .setRestitution(0),
        t.rotation && n.setRotation(new M().setFromEuler(new W(...t.rotation))),
        a.createCollider(n, e));
    }
  } else if (s.kind === "egg") {
    const i = [];
    for (let t = 0; t <= 12; t++)
      for (let n = 0; n < 20; n++) {
        const r = (t * Math.PI) / 12,
          h = (n * Math.PI) / 10;
        i.push(
          0.033 * Math.sin(r) * Math.cos(h),
          0.045 * Math.cos(r),
          0.033 * Math.sin(r) * Math.sin(h),
        );
      }
    const o = l.ColliderDesc.convexHull(new Float32Array(i));
    if (!o) throw new Error("Egg convex shape could not be constructed");
    a.createCollider(
      o.setMass(s.mass).setFriction(0.65).setRestitution(0.04),
      e,
    );
  } else
    throw new Error(
      "Specialized collider requires a designed plush or capsule",
    );
}
let F;
async function D() {
  (F ?? (F = l.init()), await F);
  const a = new l.World({ x: 0, y: -9.81, z: 0 });
  return (
    (a.timestep = E.simDt),
    (a.integrationParameters.numSolverIterations = 4),
    a
  );
}
class ee {
  constructor() {
    ((this.compression = 0),
      (this.previous = 0),
      (this.velocity = 0),
      (this.axis = new f(0, 1, 0)),
      (this.previousAxis = this.axis.clone()),
      (this.pending = new f()));
  }
  kick(e, s) {
    if (s <= 0 || e.lengthSq() < 1e-12) return;
    const i = e.clone().normalize();
    (i.dot(this.axis) < 0 && i.negate(),
      this.pending.addScaledVector(i, s),
      (this.velocity = Math.min(0.45, this.velocity + Math.min(0.3, s * 3))));
  }
  step(e) {
    ((this.previous = this.compression),
      this.previousAxis.copy(this.axis),
      this.pending.lengthSq() > 1e-12 &&
        this.axis.lerp(this.pending.normalize(), 0.25).normalize(),
      this.pending.set(0, 0, 0),
      (this.velocity += (-210 * this.compression - 24 * this.velocity) * e),
      (this.compression = Math.max(
        -0.006,
        Math.min(0.035, this.compression + this.velocity * e),
      )));
  }
  principalScale(e, s, i) {
    const t =
        1 - (s ? 0 : this.previous + (this.compression - this.previous) * e),
      n = 1 / Math.sqrt(t);
    return i.set(n, t, n);
  }
  matrix(e, s, i) {
    const o = this.principalScale(e, s, new f()),
      t = this.previousAxis.clone().lerp(this.axis, e).normalize(),
      n = o.x,
      r = o.y - n;
    return i.set(
      n + r * t.x * t.x,
      r * t.x * t.y,
      r * t.x * t.z,
      0,
      r * t.y * t.x,
      n + r * t.y * t.y,
      r * t.y * t.z,
      0,
      r * t.z * t.x,
      r * t.z * t.y,
      n + r * t.z * t.z,
      0,
      0,
      0,
      0,
      1,
    );
  }
}
class G {
  constructor(e, s, i, o) {
    ((this.world = e),
      (this.anchor = s),
      (this.head = i),
      (this.sensor = o),
      (this.prizes = []),
      (this.fingers = []),
      (this.awarded = new Set()),
      (this.events = new l.EventQueue(!0)),
      (this.colliderPrizes = new Map()),
      (this.visualResponseEnabled = !0),
      (this.phase = "POSITIONING"),
      (this.elapsed = 0),
      (this.remaining = 20),
      (this.positioningTimerStarted = !0),
      (this.x = 0),
      (this.z = 0),
      (this.y = 1.88),
      (this.vx = 0),
      (this.vz = 0),
      (this.winchVelocity = 0),
      (this.liftJoltEnabled = !0),
      (this.stepMs = 0),
      (this.attempts = 0),
      (this.roundStartAwards = 0),
      (this.maxLift = 0),
      (this.gripProfile = "strong"),
      (this.gripSeconds = 0),
      (this.gripPower = 1),
      (this.phaseTime = 0),
      (this.gripAngle = 0.8),
      (this.ropeLength = 0.23),
      (this.headPrevious = new f()),
      (this.headPreviousRotation = new M()));
  }
  setGripProfile(e) {
    return this.phase !== "POSITIONING" ? !1 : ((this.gripProfile = e), !0);
  }
  static async create(e = 1701, s = 60, i = !1, o = 0, t) {
    if (t && !t.length) throw new RangeError("Claw stock cannot be empty");
    const n = await D();
    n.integrationParameters.numSolverIterations = 12;
    const r = n.createRigidBody(l.RigidBodyDesc.fixed()),
      h = (u, b, R, T, z, C) =>
        n.createCollider(
          l.ColliderDesc.cuboid(u, b, R)
            .setTranslation(T, z, C)
            .setFriction(0.7)
            .setRestitution(0),
          r,
        );
    (h(0.35, 0.025, 0.25, 0, 0.9, -0.1),
      h(0.25, 0.025, 0.1, 0.1, 0.9, 0.25),
      h(0.01, 0.06, 0.1, -0.16, 0.97, 0.25),
      h(0.09, 0.06, 0.01, -0.26, 0.97, 0.15),
      h(0.012, 0.5, 0.35, -0.362, 1.38, 0),
      h(0.012, 0.5, 0.35, 0.362, 1.38, 0),
      h(0.35, 0.5, 0.012, 0, 1.38, -0.362),
      h(0.35, 0.5, 0.012, 0, 1.38, 0.362),
      h(0.35, 0.015, 0.35, 0, 0.55, 0),
      h(0.012, 0.2, 0.35, -0.362, 0.7, 0),
      h(0.012, 0.2, 0.35, 0.362, 0.7, 0),
      h(0.35, 0.2, 0.012, 0, 0.7, -0.362),
      h(0.35, 0.2, 0.012, 0, 0.7, 0.362));
    const p = n.createCollider(
        l.ColliderDesc.cuboid(0.078, 0.055, 0.085)
          .setTranslation(-0.26, 0.73, 0.25)
          .setSensor(!0),
        r,
      ),
      c = n.createRigidBody(
        l.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 1.88, 0),
      ),
      d = n.createRigidBody(
        l.RigidBodyDesc.dynamic()
          .setTranslation(0, 1.65, 0)
          .setLinearDamping(0.9)
          .setAngularDamping(2)
          .setCcdEnabled(!0),
      );
    n.createCollider(
      l.ColliderDesc.cylinder(0.022, 0.032)
        .setMass(0.18)
        .setFriction(0.6)
        .setCollisionGroups(131077),
      d,
    );
    const m = new G(n, c, d, p);
    ((m.rope = n.createImpulseJoint(
      l.JointData.rope(0.23, { x: 0, y: 0, z: 0 }, { x: 0, y: 0.02, z: 0 }),
      c,
      d,
      !0,
    )),
      m.rope.setContactsEnabled(!1));
    for (let u = 0; u < 3; u++) {
      const b = (u * Math.PI * 2) / 3,
        R = new f(Math.cos(b), 0, Math.sin(b)),
        T = new f(-Math.sin(b), 0, Math.cos(b)),
        z = R.clone().multiplyScalar(0.045);
      z.y = -0.015;
      const C = new M().setFromAxisAngle(T, 0.8),
        S = new f(0, 1.65, 0).add(z),
        y = n.createRigidBody(
          l.RigidBodyDesc.dynamic()
            .setTranslation(S.x, S.y, S.z)
            .setRotation(C)
            .setAngularDamping(0.3)
            .setCcdEnabled(!0),
        );
      n.createCollider(
        l.ColliderDesc.capsule(0.043, 0.006)
          .setTranslation(0, -0.049, 0)
          .setMass(0.018)
          .setFriction(2.5)
          .setCollisionGroups(131077),
        y,
      );
      const v = B(u),
        P = l.ColliderDesc.convexHull(V(u));
      if (!P) throw new Error("Degenerate claw tooth");
      n.createCollider(
        P.setTranslation(v.x, v.y, v.z)
          .setMass(0.009)
          .setFriction(3)
          .setCollisionGroups(131077),
        y,
      );
      const w = n.createImpulseJoint(
        l.JointData.revolute(z, { x: 0, y: 0, z: 0 }, T),
        d,
        y,
        !0,
      );
      (w.setLimits(-0.42, 0.95),
        w.setContactsEnabled(!1),
        m.fingers.push({
          body: y,
          axis: T,
          previous: new f(),
          previousRotation: new M(),
        }));
    }
    const g = I(e);
    for (let u = 0; u < s; u++) {
      const b = u % 6,
        R = Math.floor(u / 6) % 6,
        T = Math.floor(u / 36),
        z = -0.27 + b * 0.103 + (g() - 0.5) * 0.025,
        C = -0.26 + R * 0.087,
        S = new M().setFromAxisAngle(
          new f(g(), g(), g()).normalize(),
          g() * Math.PI,
        ),
        y = n.createRigidBody(
          l.RigidBodyDesc.dynamic()
            .setTranslation(
              z < -0.15 && C > 0.07 ? -0.08 : z,
              1.03 + T * 0.15 + (u % 3) * 0.07,
              C,
            )
            .setRotation(S)
            .setLinearDamping(0.7)
            .setAngularDamping(1.3)
            .setCcdEnabled(!0),
        ),
        v = t ? t[u % t.length] : J(i ? u + o : u % 6);
      if (v.kind === "plush" || v.kind === "egg") K(n, y, v);
      else if (A(v)) {
        (n.createCollider(
          l.ColliderDesc.ball(0.038)
            .setTranslation(0, 0, 0)
            .setMass(0.045)
            .setFriction(0.9),
          y,
        ),
          n.createCollider(
            l.ColliderDesc.ball(0.033)
              .setTranslation(0, 0.051, 0)
              .setMass(0.023)
              .setFriction(0.9),
            y,
          ));
        for (const w of [-1, 1])
          n.createCollider(
            l.ColliderDesc.ball(0.017)
              .setTranslation(w * 0.037, -0.01, 0)
              .setMass(0.006)
              .setFriction(0.9),
            y,
          );
      } else {
        const w = v.kind === "phone";
        n.createCollider(
          l.ColliderDesc.roundCuboid(
            w ? 0.034 : 0.035,
            w ? 0.015 : 0.009,
            w ? 0.061 : 0.027,
            0.002,
          )
            .setMass(v.mass)
            .setFriction(w ? 0.7 : 1.4)
            .setRestitution(0),
          y,
        );
      }
      const P = {
        id: u,
        definition: v,
        contents: Q(v, g),
        body: y,
        previous: new f(),
        previousRotation: new M(),
        won: !1,
        peak: 0,
        collected: !1,
        response: new ee(),
      };
      m.prizes.push(P);
      for (let w = 0; w < y.numColliders(); w++) {
        const k = y.collider(w);
        (k.setActiveEvents(l.ActiveEvents.CONTACT_FORCE_EVENTS),
          k.setContactForceEventThreshold(4),
          m.colliderPrizes.set(k.handle, P));
      }
    }
    for (let u = 0; u < 360; u++) m.simulate(1 / 120);
    return (m.remember(), m);
  }
  drop() {
    this.phase === "POSITIONING" &&
      ((this.roundStartAwards = this.awarded.size),
      this.attempts++,
      this.transition("SETTLE"));
  }
  retry() {
    if (this.phase === "RESULT") {
      for (const e of this.prizes)
        if (e.won && !e.collected) {
          for (let s = 0; s < e.body.numColliders(); s++)
            this.colliderPrizes.delete(e.body.collider(s).handle);
          (this.world.removeRigidBody(e.body), (e.collected = !0));
        }
      ((this.roundStartAwards = this.awarded.size),
        (this.remaining = 20),
        (this.maxLift = 0),
        this.transition("POSITIONING"));
    }
  }
  transition(e) {
    ((this.phase = e),
      (this.phaseTime = 0),
      (e === "GRIP" || e === "POSITIONING") && (this.gripSeconds = 0),
      e !== "DESCEND" && e !== "LIFT" && (this.winchVelocity = 0));
  }
  remember() {
    (this.headPrevious.copy(this.head.translation()),
      this.headPreviousRotation.copy(this.head.rotation()));
    for (const e of [...this.prizes, ...this.fingers])
      ("collected" in e && e.collected) ||
        (e.previous.copy(e.body.translation()),
        e.previousRotation.copy(e.body.rotation()));
  }
  step(e, s = 0, i = 0) {
    if (!Number.isFinite(e) || Math.abs(e - E.simDt) > 1e-12)
      throw new RangeError("Claw physics requires a 1/120-second fixed step");
    if (!Number.isFinite(s) || !Number.isFinite(i))
      throw new RangeError("Claw input must be finite");
    if (
      (this.remember(),
      (this.elapsed += e),
      (this.phaseTime += e),
      this.phase === "POSITIONING")
    ) {
      this.positioningTimerStarted &&
        (this.remaining = Math.max(0, this.remaining - e));
      const t = Math.max(1, Math.hypot(s, i));
      (this.move((s / t) * 0.18, (-i / t) * 0.18, e),
        this.remaining === 0 && this.drop());
    } else if (this.phase === "SETTLE")
      (this.move(0, 0, e), this.phaseTime > 0.65 && this.transition("DESCEND"));
    else if (this.phase === "DESCEND") {
      this.moveWinch(1.25, 0.22, 0.7, e);
      let t = !1;
      (this.world.contactPairsWith(this.head.collider(0), (n) => {
        this.prizes.some((r) => r.body.handle === n.parent()?.handle) &&
          this.world.contactPair(this.head.collider(0), n, (r) => {
            r.numSolverContacts() > 0 && (t = !0);
          });
      }),
        (this.y <= 1.25 || (t && this.phaseTime > 0.4) || this.phaseTime > 4) &&
          this.transition("GRIP"));
    } else if (this.phase === "GRIP")
      ((this.gripAngle = 0.8 - Math.min(1, this.phaseTime / 0.6) * 1.12),
        this.phaseTime > 1.8 && this.transition("LIFT"));
    else if (this.phase === "LIFT") {
      const t = this.liftJoltEnabled && this.phaseTime <= 0.18;
      (this.moveWinch(1.88, t ? 0.2 : 0.14, t ? 1.6 : 0.5, e),
        this.y >= 1.88 && this.transition("CARRY"));
    } else if (this.phase === "CARRY") {
      const t = -0.26 - this.x,
        n = 0.25 - this.z,
        r = Math.hypot(t, n);
      (this.move(
        r > 0.002 ? (t / r) * Math.min(0.16, Math.sqrt(1.6 * r)) : 0,
        r > 0.002 ? (n / r) * Math.min(0.16, Math.sqrt(1.6 * r)) : 0,
        e,
      ),
        ((r < 0.008 && Math.hypot(this.vx, this.vz) < 0.015) ||
          this.phaseTime > 8) &&
          this.transition("RELEASE"));
    } else
      this.phase === "RELEASE" &&
        (this.move(0, 0, e),
        (this.gripAngle = -0.32 + Math.min(1, this.phaseTime / 0.6) * 1.12),
        this.phaseTime > 2.5 && this.transition("RESULT"));
    this.anchor.setNextKinematicTranslation({ x: this.x, y: 1.88, z: this.z });
    const o = 0.23 + (1.88 - this.y);
    (Math.abs(o - this.ropeLength) > 1e-8 &&
      (this.rope && this.world.removeImpulseJoint(this.rope, !0),
      (this.rope = this.world.createImpulseJoint(
        l.JointData.rope(o, { x: 0, y: 0, z: 0 }, { x: 0, y: 0.02, z: 0 }),
        this.anchor,
        this.head,
        !0,
      )),
      this.rope.setContactsEnabled(!1),
      (this.ropeLength = o)),
      this.simulate(e));
    for (const t of this.prizes) {
      if (t.won) continue;
      const n = t.body.translation();
      if (
        ((this.maxLift = Math.max(this.maxLift, n.y)),
        (t.peak = Math.max(t.peak, n.y)),
        n.y < 0.78 && t.previous.y >= 0.78)
      ) {
        const r = (t.previous.y - 0.78) / (t.previous.y - n.y),
          h = {
            x: t.previous.x + (n.x - t.previous.x) * r,
            y: 0.78,
            z: t.previous.z + (n.z - t.previous.z) * r,
          };
        this.sensor.containsPoint(h) &&
          ((t.won = !0), (t.awardPhase = this.phase), this.awarded.add(t.id));
      }
    }
  }
  moveWinch(e, s, i, o) {
    const t = e - this.y,
      n = Math.sign(t) * Math.min(s, Math.sqrt(2 * i * Math.abs(t))),
      r = i * o;
    this.winchVelocity += Math.max(-r, Math.min(r, n - this.winchVelocity));
    const h = this.y + this.winchVelocity * o;
    (t < 0 && h <= e) || (t > 0 && h >= e) || t === 0
      ? ((this.y = e), (this.winchVelocity = 0))
      : (this.y = h);
  }
  move(e, s, i) {
    const o = e - this.vx,
      t = s - this.vz,
      n = Math.hypot(o, t),
      r = this.vx * o + this.vz * t < 0,
      h = Math.min(n, (r || (e === 0 && s === 0) ? 0.8 : 0.5) * i);
    (n > 0 && ((this.vx += (o / n) * h), (this.vz += (t / n) * h)),
      (this.x = Math.max(-0.26, Math.min(0.26, this.x + this.vx * i))),
      (this.z = Math.max(-0.26, Math.min(0.25, this.z + this.vz * i))),
      ((this.x === -0.26 && this.vx < 0) || (this.x === 0.26 && this.vx > 0)) &&
        (this.vx = 0),
      ((this.z === -0.26 && this.vz < 0) || (this.z === 0.25 && this.vz > 0)) &&
        (this.vz = 0));
  }
  simulate(e) {
    const s = performance.now();
    ["GRIP", "LIFT", "CARRY"].includes(this.phase) && (this.gripSeconds += e);
    const i = Math.max(0, Math.min(1, (this.gripSeconds - 2.1) / 0.35));
    this.gripPower =
      this.gripProfile === "loose" &&
      ["GRIP", "LIFT", "CARRY"].includes(this.phase)
        ? 1 - i * 0.45
        : 1;
    const o = new M().copy(this.head.rotation()),
      t = o.clone().invert(),
      n = new f().copy(this.head.angvel());
    for (const r of this.fingers) {
      const h = t.clone().multiply(new M().copy(r.body.rotation()));
      let p = 2 * Math.atan2(new f(h.x, h.y, h.z).dot(r.axis), h.w);
      p = Math.atan2(Math.sin(p), Math.cos(p));
      const c = r.axis.clone().applyQuaternion(o),
        d = new f().copy(r.body.angvel()).sub(n).dot(c),
        m = Math.max(
          -0.9,
          Math.min(0.9, (this.gripAngle - p) * 0.3 - d * 0.003),
        ),
        g = c.multiplyScalar(m * this.gripPower * e);
      (r.body.applyTorqueImpulse(g, !0),
        this.head.applyTorqueImpulse(g.multiplyScalar(-1), !0));
    }
    (this.world.step(this.events),
      this.events.drainContactForceEvents((r) => {
        if (!this.visualResponseEnabled) return;
        const h = Math.max(0, r.totalForceMagnitude() - 4) * e,
          p = new f().copy(r.totalForce());
        for (const c of [r.collider1(), r.collider2()]) {
          const d = this.colliderPrizes.get(c);
          if (!d || d.collected) continue;
          const m = p
            .clone()
            .applyQuaternion(new M().copy(d.body.rotation()).invert());
          A(d.definition) && d.response.kick(m, h);
        }
      }));
    for (const r of this.prizes) r.collected || r.response.step(e);
    this.stepMs = performance.now() - s;
  }
  snapshot() {
    return {
      phase: this.phase,
      remaining: this.remaining,
      x: this.x,
      y: this.y,
      z: this.z,
      awarded: [...this.awarded],
      bodies: this.world.bodies.len(),
      head: this.head.translation(),
      maxLift: this.maxLift,
      roundWins: this.awarded.size - this.roundStartAwards,
      prizes: this.prizes.map((e) => ({
        id: e.id,
        p: e.collected ? e.previous : e.body.translation(),
        v: e.collected ? { x: 0, y: 0, z: 0 } : e.body.linvel(),
        won: e.won,
        collected: e.collected,
        peak: e.peak,
        awardPhase: e.awardPhase,
      })),
    };
  }
  dispose() {
    (this.events.free(), this.colliderPrizes.clear(), this.world.free());
  }
}
const N = Array.from({ length: 16 }, (a, e) =>
  e === 0 ? "gold-egg" : e % 2 ? "star-egg" : "tickets",
);
class H {
  constructor(e, s, i, o, t) {
    ((this.kind = e),
      (this.world = s),
      (this.anchor = i),
      (this.sensor = o),
      (this.prizes = []),
      (this.awarded = new Set()),
      (this.phase = "READY"),
      (this.time = 0),
      (this.phaseTime = 0),
      (this.round = 0),
      (this.roundStartAwards = 0),
      (this.cutterX = 0),
      (this.cutterY = 1.64),
      (this.wheelAngle = 0),
      (this.previousWheelAngle = 0),
      (this.previousCutterX = 0),
      (this.cut = !1),
      (this.cutError = 0),
      (this.detail = ""),
      (this.stepMs = 0),
      (this.selectedSector = 0),
      (this.wheelStart = 0),
      (this.wheelEnd = 0),
      (this.attachmentWorld = { x: 0, y: 0, z: 0 }),
      (this.rng = I(t)),
      (this.time = this.rng() * 8),
      this.prepareRound());
  }
  static async create(e, s = 3917) {
    const i = await D();
    i.integrationParameters.numSolverIterations = 12;
    const o = i.createRigidBody(l.RigidBodyDesc.fixed());
    i.createCollider(
      l.ColliderDesc.cuboid(0.35, 0.025, 0.3)
        .setTranslation(0, 0.8, 0)
        .setFriction(0.7),
      o,
    );
    for (const r of [-1, 1])
      i.createCollider(
        l.ColliderDesc.cuboid(0.015, 0.35, 0.3).setTranslation(
          r * 0.36,
          1.1,
          0,
        ),
        o,
      );
    for (const r of [-1, 1])
      i.createCollider(
        l.ColliderDesc.cuboid(0.35, 0.35, 0.015).setTranslation(
          0,
          1.1,
          r * 0.31,
        ),
        o,
      );
    const t = i.createCollider(
        l.ColliderDesc.cuboid(0.33, 0.045, 0.28)
          .setTranslation(0, 0.96, 0)
          .setSensor(!0),
        o,
      ),
      n = i.createRigidBody(l.RigidBodyDesc.fixed().setTranslation(0, 1.9, 0));
    return new H(e, i, n, t, s);
  }
  get currentPrize() {
    return this.active;
  }
  get strandX() {
    if (!this.active) return 0;
    const e = this.tiePoint;
    return (e.x * (1.9 - this.cutterY)) / Math.max(0.01, 1.9 - e.y);
  }
  get tiePoint() {
    if (!this.active) return this.attachmentWorld;
    const { body: e, attachment: s } = this.active,
      i = e.rotation(),
      o = e.translation(),
      t = 2 * (i.y * s.z - i.z * s.y),
      n = 2 * (i.z * s.x - i.x * s.z),
      r = 2 * (i.x * s.y - i.y * s.x);
    return (
      (this.attachmentWorld.x = o.x + s.x + i.w * t + i.y * r - i.z * n),
      (this.attachmentWorld.y = o.y + s.y + i.w * n + i.z * t - i.x * r),
      (this.attachmentWorld.z = o.z + s.z + i.w * r + i.x * n - i.y * t),
      this.attachmentWorld
    );
  }
  action() {
    if (this.phase !== "READY") return !1;
    if (((this.phaseTime = 0), this.kind === "cut")) this.phase = "CLOSING";
    else {
      ((this.selectedSector = Math.floor(this.rng() * N.length)),
        (this.wheelStart = this.wheelAngle));
      const s =
        (((((this.selectedSector + 0.5) * Math.PI * 2) / 16 - this.wheelStart) %
          (Math.PI * 2)) +
          Math.PI * 2) %
        (Math.PI * 2);
      ((this.wheelEnd = this.wheelStart + Math.PI * 2 * 5 + s),
        (this.phase = "SPINNING"));
    }
    return !0;
  }
  spawn(e, s) {
    const i = this.world.createRigidBody(
      l.RigidBodyDesc.dynamic()
        .setTranslation(s ? 0.012 : 0, s ? 1.42 : 1.3, s ? 0 : 0.13)
        .setLinearDamping(0.15)
        .setAngularDamping(0.8)
        .setCcdEnabled(!0),
    );
    s &&
      e.kind === "phone" &&
      i.setRotation({ x: Math.SQRT1_2, y: 0, z: 0, w: Math.SQRT1_2 }, !0);
    const o =
      e.kind === "phone"
        ? l.ColliderDesc.roundCuboid(0.034, 0.015, 0.061, 0.002)
        : e.kind === "tickets"
          ? l.ColliderDesc.roundCuboid(0.035, 0.009, 0.027, 0.002)
          : e.kind === "egg"
            ? l.ColliderDesc.capsule(0.012, 0.033)
            : l.ColliderDesc.capsule(0.025, 0.035).setTranslation(0, 0.025, 0);
    this.world.createCollider(
      o.setMass(e.mass).setFriction(0.7).setRestitution(0.08),
      i,
    );
    const t = {
      id: this.prizes.length,
      definition: e,
      body: i,
      previous: { ...i.translation() },
      won: !1,
      attachment:
        s && e.kind === "phone"
          ? { x: 0, y: 0, z: -0.064 }
          : { x: 0, y: 0.084, z: 0 },
      ...(e.kind === "egg"
        ? {
            contents:
              e.id === "gold-egg" ? x[6] : x[Math.floor(this.rng() * 6)],
          }
        : {}),
    };
    (this.prizes.push(t),
      (this.active = t),
      s &&
        ((this.rope = this.world.createImpulseJoint(
          l.JointData.rope(0.429, { x: 0, y: 0, z: 0 }, t.attachment),
          this.anchor,
          i,
          !0,
        )),
        i.setLinvel({ x: 0.025, y: 0, z: 0 }, !0)));
  }
  prepareRound() {
    ((this.phase = "READY"),
      (this.phaseTime = 0),
      (this.cut = !1),
      (this.cutError = 0),
      (this.detail =
        this.kind === "cut"
          ? "Stop the blades on the moving thread."
          : "Random draw · gold 1/16 · eggs 8/16 · tickets 7/16"),
      (this.roundStartAwards = this.awarded.size),
      (this.cutterX = Math.sin(this.time * 1.45) * 0.24),
      (this.previousCutterX = this.cutterX),
      this.kind === "cut" && this.spawn(x[this.round % 2 ? 2 : 6], !0));
  }
  retry() {
    return this.phase !== "RESULT"
      ? !1
      : (this.rope && this.world.removeImpulseJoint(this.rope, !0),
        (this.rope = void 0),
        this.active && this.world.removeRigidBody(this.active.body),
        (this.active = void 0),
        this.round++,
        this.prepareRound(),
        !0);
  }
  step(e) {
    if (!Number.isFinite(e) || Math.abs(e - E.simDt) > 1e-12)
      throw new RangeError("Prize games require a 1/120-second fixed step");
    const s = performance.now();
    if (
      ((this.time += e),
      (this.phaseTime += e),
      (this.previousCutterX = this.cutterX),
      (this.previousWheelAngle = this.wheelAngle),
      this.active &&
        (this.active.previous = { ...this.active.body.translation() }),
      this.phase === "READY" &&
        this.kind === "cut" &&
        (this.cutterX = Math.sin(this.time * 1.45) * 0.24),
      this.phase === "CLOSING" &&
        this.phaseTime >= 0.1 &&
        ((this.cutError = Math.abs(this.cutterX - this.strandX)),
        (this.cut = this.cutError <= 0.009),
        this.cut && this.rope
          ? (this.world.removeImpulseJoint(this.rope, !0),
            (this.rope = void 0),
            (this.phase = "FALLING"),
            (this.detail = "Thread severed. Waiting for physical delivery…"))
          : ((this.phase = "RESULT"),
            (this.detail = `Thread intact · missed by ${(this.cutError * 1e3).toFixed(1)} mm`)),
        (this.phaseTime = 0)),
      this.phase === "SPINNING")
    ) {
      const i = Math.min(1, this.phaseTime / 4.8),
        o = i * i * i * (10 + i * (-15 + 6 * i));
      ((this.wheelAngle =
        this.wheelStart + (this.wheelEnd - this.wheelStart) * o),
        i === 1 &&
          (this.spawn(
            x.find((t) => t.id === N[this.selectedSector]),
            !1,
          ),
          (this.phase = "FALLING"),
          (this.phaseTime = 0),
          (this.detail = "Dispenser open. Waiting for physical delivery…")));
    }
    if ((this.world.step(), this.phase === "FALLING" && this.active)) {
      const i = this.active,
        o = i.body.translation();
      if (!i.won && i.previous.y >= 0.96 && o.y < 0.96) {
        const t = (i.previous.y - 0.96) / (i.previous.y - o.y);
        this.sensor.containsPoint({
          x: i.previous.x + (o.x - i.previous.x) * t,
          y: 0.96,
          z: i.previous.z + (o.z - i.previous.z) * t,
        }) &&
          ((i.won = !0),
          this.awarded.add(i.id),
          (this.detail = `Collected ${i.definition.name}${i.contents ? ` · inside: ${i.contents.name}` : ""}`),
          (this.phase = "RESULT"));
      }
      this.phase === "FALLING" &&
        this.phaseTime > 4 &&
        ((this.phase = "RESULT"),
        (this.detail =
          "Delivery did not reach the collection zone. No prize credited."));
    }
    this.stepMs = performance.now() - s;
  }
  dispose() {
    this.world.free();
  }
}
const te = 0.023,
  ie = 0.003;
class O {
  constructor(e, s, i, o, t) {
    ((this.kind = e),
      (this.world = s),
      (this.pusher = i),
      (this.sensor = o),
      (this.prizes = []),
      (this.awarded = new Set()),
      (this.phase = "READY"),
      (this.time = 0),
      (this.phaseTime = 0),
      (this.round = 0),
      (this.roundStartAwards = 0),
      (this.ammo = 12),
      (this.remaining = 30),
      (this.aimX = 0),
      (this.aimZ = -0.115),
      (this.pusherZ = -0.31),
      (this.previousPusherZ = -0.31),
      (this.stepMs = 0),
      (this.cooldown = 0),
      (this.running = !1),
      (this.motorTime = 0),
      (this.nextId = 0),
      (this.rng = I(t)));
  }
  static async create(e, s = 7139) {
    const i = await D();
    ((i.integrationParameters.numSolverIterations = 12),
      (i.integrationParameters.contact_natural_frequency = 120),
      (i.integrationParameters.normalizedAllowedLinearError = 1e-4));
    const o = i.createRigidBody(l.RigidBodyDesc.fixed()),
      t = (p, c, d, m, g, u) =>
        i.createCollider(
          l.ColliderDesc.cuboid(p, c, d)
            .setTranslation(m, g, u)
            .setFriction(0.45)
            .setRestitution(0),
          o,
        );
    (t(0.32, 0.025, 0.2875, 0, 1.005, -0.0525),
      t(0.34, 0.025, 0.38, 0, 0.745, 0.015));
    for (const p of [-1, 1]) t(0.012, 0.3, 0.38, p * 0.335, 1.045, 0.015);
    (t(0.32, 0.3, 0.012, 0, 1.045, -0.35), t(0.32, 0.14, 0.012, 0, 0.9, 0.4));
    const n = i.createCollider(
        l.ColliderDesc.cuboid(0.322, 0.04, 0.085)
          .setTranslation(0, 0.92, 0.32)
          .setSensor(!0),
        o,
      ),
      r = i.createRigidBody(
        l.RigidBodyDesc.kinematicPositionBased().setTranslation(
          0,
          1.055,
          -0.31,
        ),
      );
    i.createCollider(
      l.ColliderDesc.cuboid(0.31, 0.03, 0.075).setFriction(0.45),
      r,
    );
    const h = new O(e, i, r, n, s);
    h.stock();
    for (let p = 0; p < 180; p++) i.step();
    for (const p of h.prizes)
      (p.previous.copy(p.body.translation()),
        p.previousRotation.copy(p.body.rotation()));
    return h;
  }
  get landingHeight() {
    const e = new l.Ray(
        {
          x: this.aimX,
          y: 1.48,
          z: this.kind === "tower" ? this.aimZ : -0.115,
        },
        { x: 0, y: -1, z: 0 },
      ),
      s = this.world.castRay(e, 1, !0, l.QueryFilterFlags.EXCLUDE_SENSORS);
    return s ? 1.48 - s.timeOfImpact + 0.001 : 1.031;
  }
  get detail() {
    return this.phase === "RESULT"
      ? `${this.awarded.size - this.roundStartAwards} coins delivered · ${(this.awarded.size - this.roundStartAwards) * 5} tickets.`
      : this.phase === "SETTLING"
        ? `${Math.max(0, Math.ceil(8 - this.phaseTime))}s to settle · Only coins falling into the front trough count.`
        : this.kind === "tower"
          ? `${this.ammo} drops · ${Math.ceil(this.remaining)}s · WASD aims over the tower. Land off centre to change its balance.`
          : `${this.ammo} drops · ${Math.ceil(this.remaining)}s · A/D chooses a lane. Time the shelf, then drop.`;
  }
  get currentPrize() {
    return [...this.prizes].reverse().find((e) => e.won);
  }
  get motorActive() {
    return this.running && this.phase !== "RESULT";
  }
  get canDrop() {
    return this.phase === "READY" && this.cooldown <= 0 && this.ammo > 0;
  }
  spawn(e, s, i, o = !1) {
    const t = this.world.createRigidBody(
      l.RigidBodyDesc.dynamic()
        .setTranslation(e, s, i)
        .setLinearDamping(0.12)
        .setAngularDamping(0.3)
        .setCcdEnabled(!0),
    );
    se(this.world, t);
    const n = {
      id: this.nextId++,
      body: t,
      previous: new f(e, s, i),
      previousRotation: new M(),
      definition: x.find((r) => r.id === "coin-ticket"),
      won: !1,
      collected: !1,
      tower: o,
    };
    return (this.prizes.push(n), n);
  }
  stock() {
    for (let e = 0; e < 9; e++)
      for (let s = 0; s < 12; s++) {
        const i = -0.278 + s * 0.05 + (e % 2) * 0.025,
          o = -0.125 + e * 0.041;
        (this.kind === "tower" && Math.hypot(i, o - 0.055) < 0.105) ||
          this.spawn(i + (this.rng() - 0.5) * 0.001, 1.034, o);
      }
    if (this.kind === "tower")
      for (let e = 0; e < 16; e++) {
        this.spawn(0, 1.034 + e * 0.0062, 0.055, !0);
        for (let s = 0; s < 6; s++) {
          const i = (s * Math.PI) / 3;
          this.spawn(
            Math.cos(i) * 0.046,
            1.034 + e * 0.0062,
            0.055 + Math.sin(i) * 0.046,
            !0,
          );
        }
      }
  }
  action() {
    return this.canDrop
      ? (this.spawn(
          this.aimX,
          1.48,
          this.kind === "tower" ? this.aimZ : -0.115,
        ),
        (this.cooldown = 0.38),
        this.ammo--,
        (this.running = !0),
        this.ammo === 0 && ((this.phase = "SETTLING"), (this.phaseTime = 0)),
        !0)
      : !1;
  }
  step(e, s = 0, i = 0) {
    if (!Number.isFinite(e) || Math.abs(e - E.simDt) > 1e-12)
      throw new RangeError("Coin games require a 1/120-second fixed step");
    if (!Number.isFinite(s) || !Number.isFinite(i))
      throw new RangeError("Coin aim must be finite");
    if (this.phase === "RESULT") return;
    const o = performance.now();
    if (
      ((this.time += e),
      (this.phaseTime += e),
      this.running &&
        this.phase === "READY" &&
        ((this.remaining = Math.max(0, this.remaining - e)),
        this.remaining === 0 &&
          ((this.phase = "SETTLING"), (this.phaseTime = 0))),
      (this.cooldown = Math.max(0, this.cooldown - e)),
      this.phase === "READY")
    ) {
      const t = Math.max(1, Math.hypot(s, i));
      ((this.aimX = Math.max(
        -0.275,
        Math.min(0.275, this.aimX + (s / t) * 0.28 * e),
      )),
        this.kind === "tower" &&
          (this.aimZ = Math.max(
            -0.12,
            Math.min(0.17, this.aimZ - (i / t) * 0.28 * e),
          )));
    }
    for (const t of this.prizes)
      t.collected ||
        (t.previous.copy(t.body.translation()),
        t.previousRotation.copy(t.body.rotation()));
    ((this.previousPusherZ = this.pusherZ),
      this.running && (this.motorTime += e),
      (this.pusherZ =
        -0.31 + 0.09 * (1 - Math.cos((this.motorTime * Math.PI * 2) / 2.8))),
      this.pusher.setNextKinematicTranslation({
        x: 0,
        y: 1.055,
        z: this.pusherZ,
      }),
      this.world.step());
    for (const t of this.prizes) {
      if (t.won || t.collected) continue;
      const n = t.body.translation();
      if (t.previous.y >= 0.95 && n.y < 0.95) {
        const r = (t.previous.y - 0.95) / (t.previous.y - n.y),
          h = {
            x: t.previous.x + (n.x - t.previous.x) * r,
            y: 0.95,
            z: t.previous.z + (n.z - t.previous.z) * r,
          };
        this.sensor.containsPoint(h) && ((t.won = !0), this.awarded.add(t.id));
      }
    }
    if (this.phase === "SETTLING" && this.phaseTime >= 8) {
      ((this.phase = "RESULT"),
        (this.running = !1),
        (this.phaseTime = 0),
        (this.previousPusherZ = this.pusherZ));
      for (const t of this.prizes)
        t.collected ||
          (t.previous.copy(t.body.translation()),
          t.previousRotation.copy(t.body.rotation()));
    }
    this.stepMs = performance.now() - o;
  }
  retry() {
    if (this.phase !== "RESULT") return !1;
    for (const s of this.prizes)
      s.won &&
        !s.collected &&
        (this.world.removeRigidBody(s.body), (s.collected = !0));
    const e = this.prizes.filter((s) => !s.collected);
    if (this.kind === "tower" || e.length > 220 || e.length < 30) {
      for (const s of e)
        (this.world.removeRigidBody(s.body), (s.collected = !0));
      ((this.motorTime = 0),
        (this.running = !1),
        (this.pusherZ = this.previousPusherZ = -0.31),
        this.pusher.setTranslation({ x: 0, y: 1.055, z: -0.31 }, !0),
        this.pusher.setNextKinematicTranslation({ x: 0, y: 1.055, z: -0.31 }),
        this.stock());
      for (let s = 0; s < 180; s++) this.world.step();
      for (const s of this.prizes)
        s.collected ||
          (s.previous.copy(s.body.translation()),
          s.previousRotation.copy(s.body.rotation()));
    }
    return (
      this.prizes.splice(
        0,
        this.prizes.length,
        ...this.prizes.filter((s) => !s.collected),
      ),
      this.round++,
      (this.roundStartAwards = this.awarded.size),
      (this.ammo = 12),
      (this.remaining = 30),
      (this.running = !1),
      (this.phase = "READY"),
      (this.phaseTime = 0),
      (this.cooldown = 0),
      !0
    );
  }
  snapshot() {
    return {
      kind: this.kind,
      phase: this.phase,
      ammo: this.ammo,
      remaining: this.remaining,
      aimX: this.aimX,
      aimZ: this.aimZ,
      pusherZ: this.pusherZ,
      awarded: [...this.awarded],
      bodies: this.world.bodies.len(),
      coins: this.prizes
        .filter((e) => !e.collected)
        .map((e) => ({
          id: e.id,
          p: { ...e.body.translation() },
          v: { ...e.body.linvel() },
          won: e.won,
          tower: e.tower,
        })),
    };
  }
  dispose() {
    this.world.free();
  }
}
function se(a, e) {
  a.createCollider(
    l.ColliderDesc.cylinder(ie, te)
      .setMass(0.012)
      .setFriction(0.45)
      .setRestitution(0.03),
    e,
  );
}
export {
  _ as C,
  N as E,
  x as P,
  re as Q,
  V as a,
  E as b,
  ae as c,
  he as d,
  te as e,
  ie as f,
  O as g,
  G as h,
  A as i,
  H as j,
  j as p,
  I as s,
};

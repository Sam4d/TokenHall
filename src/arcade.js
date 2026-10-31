import { SimulationClock as ns } from "./clock.js";
import { padState } from "./gamepad.js";
import {
  V as O,
  S as de,
  C as Ne,
  a as ke,
  b as H,
  R as K,
  M as V,
  T as ee,
  B as Z,
  c as Ke,
  d as _e,
  e as te,
  f as he,
  g as A,
  h as fe,
  P as ae,
  i as Qe,
  L as $e,
  j as Re,
  k as ze,
  l as se,
  G as _,
  m as je,
  n as at,
  o as Pe,
  p as Je,
  Q as pe,
  D as rt,
  q as ht,
  r as ct,
  E as De,
  s as lt,
  t as ne,
  u as Ge,
  v as xe,
  I as et,
  O as tt,
  w as Oe,
  x as dt,
  y as pt,
  z as Ee,
  A as Se,
  F as We,
  H as ut,
  J as mt,
  K as ft,
  N as wt,
  U as gt,
  W as yt,
  X as vt,
  Y as bt,
  Z as xt,
  _ as St,
  $ as Mt,
  a0 as kt,
  a1 as zt,
  a2 as Pt,
  a3 as Et,
  a4 as Ue,
  a5 as Tt,
  a6 as At,
  a7 as Gt,
  a8 as It,
  a9 as qe,
  aa as Ct,
  ab as Lt,
  ac as Rt,
  ad as Ot,
} from "../assets/renderer-W_eveQ7P.js";
import {
  P as j,
  p as Vt,
  s as Me,
  i as Ie,
  a as Nt,
  C as Dt,
  b as ue,
  d as Wt,
  E as Ut,
  e as He,
  f as qt,
  g as ve,
  c as Ht,
  h as Ft,
  j as Xt,
  Q as Fe,
} from "./games.js";
import { c as Bt } from "../assets/ui-BJl9JnxJ.js";
class Te {
  constructor() {
    ((this.active = !1),
      (this.angle = Math.atan2(0.26, 2.05)),
      (this.radius = Math.hypot(0.26, 2.05)),
      (this.previous = new O(0.26, 1.72, 2.05)),
      (this.position = this.previous.clone()),
      (this.strafeVelocity = 0),
      (this.forwardVelocity = 0));
  }
  step(e, t, n) {
    if (![e, t, n].every(Number.isFinite) || e <= 0 || e > 0.1)
      throw new RangeError("Cabinet movement requires finite bounded inputs");
    if ((this.previous.copy(this.position), !this.active && !t && !n))
      return !1;
    const s = !this.active;
    this.active = !0;
    const o = Math.max(1, Math.hypot(t, n)),
      a = 1 - Math.exp(-e / 0.08);
    return (
      (this.strafeVelocity += ((t / o) * 1.1 - this.strafeVelocity) * a),
      (this.forwardVelocity += ((n / o) * 0.8 - this.forwardVelocity) * a),
      (this.angle += (this.strafeVelocity * e) / this.radius),
      (this.radius = Math.max(
        1,
        Math.min(2.8, this.radius - this.forwardVelocity * e),
      )),
      (this.radius === 1 || this.radius === 2.8) && (this.forwardVelocity = 0),
      this.position.set(
        Math.sin(this.angle) * this.radius,
        1.72,
        Math.cos(this.angle) * this.radius,
      ),
      s
    );
  }
  stop() {
    ((this.strafeVelocity = this.forwardVelocity = 0),
      this.previous.copy(this.position));
  }
}
let le = "available";
const Ce = () => le,
  gs = (d) =>
    ({
      available: "Saving available on this PC",
      saved: "Saved on this PC",
      recovered: "Recovered an empty save",
      session: "Session only · saving unavailable",
    })[d],
  st = [
    { id: "classic", name: "Velvet evening", cost: 0 },
    { id: "sundae", name: "Strawberry sundae", cost: 100 },
    { id: "neon", name: "Neon midnight", cost: 200 },
  ],
  Ae = () => ({ version: 1, counts: {}, tickets: 0 });
function Yt(d) {
  try {
    const e = JSON.parse(d ?? "null");
    if (
      e?.version !== 1 ||
      !e.counts ||
      typeof e.counts != "object" ||
      Array.isArray(e.counts) ||
      !Number.isSafeInteger(e.tickets) ||
      e.tickets < 0
    )
      return null;
    const t = {};
    for (const o of j) {
      const a = e.counts[o.id];
      Number.isSafeInteger(a) && a > 0 && (t[o.id] = a);
    }
    const n = { version: 1, counts: t, tickets: e.tickets },
      s = st
        .filter(
          (o) =>
            o.id !== "classic" &&
            Array.isArray(e.studios) &&
            e.studios.includes(o.id),
        )
        .map((o) => o.id);
    return (
      s.length && (n.studios = s),
      (e.studio === "classic" || s.includes(e.studio)) && (n.studio = e.studio),
      n
    );
  } catch {
    return null;
  }
}
function Zt() {
  try {
    const d = localStorage.getItem("token-hall.collection.v1");
    if (d === null) return ((le = "available"), Ae());
    const e = Yt(d);
    if (e) return ((le = "saved"), e);
    const t = Ae();
    return (
      localStorage.setItem("token-hall.collection.v1", JSON.stringify(t)),
      (le = "recovered"),
      t
    );
  } catch {
    return ((le = "session"), Ae());
  }
}
const Xe = new WeakMap();
function Be(d, e) {
  const t = Xe.get(d) ?? new Set();
  Xe.set(d, t);
  let n = e;
  for (const s of d.awarded) {
    if (t.has(s)) continue;
    const o = d.prizes.find((a) => a.id === s);
    o &&
      (t.add(s),
      (n = {
        ...n,
        version: 1,
        counts: {
          ...n.counts,
          [o.definition.id]: (n.counts[o.definition.id] ?? 0) + 1,
          ...(o.contents
            ? { [o.contents.id]: (n.counts[o.contents.id] ?? 0) + 1 }
            : {}),
        },
        tickets: n.tickets + o.definition.tickets,
      }));
  }
  return (n !== e && it(n), n);
}
function it(d) {
  try {
    (localStorage.setItem("token-hall.collection.v1", JSON.stringify(d)),
      (le = "saved"));
  } catch {
    le = "session";
  }
}
function ys(d, e) {
  const t = st.find((o) => o.id === e);
  if (!t || d.studio === e) return d;
  const n = e === "classic" || d.studios?.includes(t.id);
  if (!n && d.tickets < t.cost) return d;
  const s = {
    ...d,
    tickets: d.tickets - (n ? 0 : t.cost),
    studio: t.id,
    ...(n ? {} : { studios: [...(d.studios ?? []), t.id] }),
  };
  return (it(s), s);
}
const Kt = { front: 36, overhead: 40 },
  _t = new O(0.001, 2.7, 0.14);
class Ye {
  constructor() {
    ((this.position = new O(0.26, 1.8, 2.05)),
      (this.target = new O(0, 1.25, 0)),
      (this.desiredTarget = new O()),
      (this.desiredPosition = new O()));
  }
  update(e, t, n, s) {
    const a =
        !n && (t === "DESCEND" || t === "GRIP" || t === "LIFT")
          ? Math.max(0, Math.min(1, (1.52 - e) / 0.24))
          : 0,
      r = 1.25 + (Math.max(1.11, Math.min(1.29, (e + 0.98) / 2)) - 1.25) * a,
      f = this.desiredTarget.set(0, r, 0),
      b = this.desiredPosition.set(0.26, r + 0.55 - a * 0.1, 2.05 - a * 0.25),
      u = n ? 1 : 1 - Math.exp(-Math.min(s, 0.1) * 6);
    (this.target.lerp(f, u), this.position.lerp(b, u));
  }
}
function Qt(d, e, t, n, s, o) {
  const a = Vt(e),
    i = e.size ?? 1,
    r = { body: t, accent: n, cream: s, dark: o };
  for (const l of a.parts) {
    let S;
    if (l.shape === "sphere") S = new de(l.radius, 24, 16);
    else if (l.shape === "capsule")
      S = new Ne(l.radius, l.halfHeight * 2, 6, 16);
    else if (l.shape === "cone") S = new ke(l.radius, l.halfHeight * 2, 20);
    else if (l.shape === "cylinder")
      S = new H(l.radius, l.radius, l.halfHeight * 2, 24);
    else {
      const M = l.halfExtents;
      S = new K(
        2 * (M[0] + l.radius),
        2 * (M[1] + l.radius),
        2 * (M[2] + l.radius),
        3,
        l.radius,
      );
    }
    const G = new V(S, r[l.material]);
    (G.position.set(...l.position),
      l.rotation && G.rotation.set(...l.rotation),
      (G.castShadow = G.receiveShadow = !0),
      d.add(G));
  }
  const [f, b, u] = a.face,
    k = a.faceWidth,
    w = (l, S, G, M, T, q = 1, B = 1, $ = 1) => {
      const h = new V(new de(M, 16, 10), T);
      return (h.position.set(l, S, G), h.scale.set(q, B, $), d.add(h), h);
    },
    E = (l, S, G = 5e-4 * i) =>
      d.add(new V(new Ke(new _e(l), 16, G, 5, !1), S));
  for (const l of [-1, 1]) {
    const S = f + l * k * 0.55;
    ((e.family === "panda" || e.family === "raccoon") &&
      w(S, b, u - 0.001 * i, 0.007 * i, o, 1.25, 1, 0.35),
      e.form === "pillow" || e.form === "hood"
        ? E(
            [
              new O(S - 0.004 * i, b, u),
              new O(S, b - 0.002 * i, u + 0.001 * i),
              new O(S + 0.004 * i, b, u),
            ],
            o,
            8e-4 * i,
          )
        : (w(S, b, u, 0.0028 * i, o, 1, 1.3, 0.55),
          w(S - 7e-4 * i, b + 0.001 * i, u + 0.0018 * i, 7e-4 * i, s)),
      w(
        S + l * 0.005 * i,
        b - 0.007 * i,
        u - 4e-4 * i,
        0.004 * i,
        n,
        1.25,
        0.55,
        0.18,
      ));
  }
  if (
    (["dog", "fox", "koala", "hamster", "raccoon"].includes(e.family) &&
      w(0, b - 0.008 * i, u + 0.001 * i, 0.003 * i, o, 1.4, 0.7, 0.8),
    E(
      [
        new O(-0.004 * i, b - 0.012 * i, u),
        new O(0, b - 0.014 * i, u + 8e-4 * i),
        new O(0.004 * i, b - 0.012 * i, u),
      ],
      o,
      55e-5 * i,
    ),
    e.form === "figure")
  ) {
    const l = new V(new ee(0.023 * i, 0.002 * i, 6, 24, Math.PI * 1.4), n);
    ((l.position.y = -0.012 * i),
      (l.rotation.x = Math.PI / 2),
      d.add(l),
      w(0.017 * i, -0.007 * i, 0.019 * i, 0.003 * i, s));
  }
  if (e.form === "hood")
    for (const l of [-1, 1])
      E(
        [
          new O(l * 0.007 * i, 0.026 * i, 0.027 * i),
          new O(l * 0.008 * i, 0.013 * i, 0.034 * i),
          new O(l * 0.01 * i, 0.002 * i, 0.035 * i),
        ],
        s,
        7e-4 * i,
      );
  if (e.form === "dessert")
    for (let l = 0; l < 10; l++) {
      const S = (l * Math.PI * 2) / 10,
        G = new V(new Ne(7e-4 * i, 0.003 * i, 3, 6), n);
      (G.position.set(
        Math.cos(S) * 0.027 * i,
        0.045 * i,
        Math.sin(S) * 0.027 * i,
      ),
        (G.rotation.z = S),
        d.add(G));
    }
  if (e.form === "pillow") {
    const l = [];
    for (let G = 0; G <= 48; G++) {
      const M = (G / 48) * Math.PI * 2;
      l.push(new O(Math.cos(M) * 0.052 * i, Math.sin(M) * 0.03 * i, 0.023 * i));
    }
    E(l, s, 5e-4 * i);
    const S = new V(new Z(0.012 * i, 0.005 * i, 0.001 * i), n);
    (S.position.set(0.047 * i, -0.027 * i, 0.024 * i), d.add(S));
  }
}
function Ve(d, e = 512) {
  const t = document.createElement("canvas");
  ((t.width = t.height = e), d(t.getContext("2d"), e));
  const n = new he(t);
  return ((n.wrapS = n.wrapT = Qe), (n.anisotropy = 8), n);
}
function Le(d = !1) {
  const e = Ve((t, n) => {
    const s = Me(21),
      o = t.createImageData(n, n);
    for (let a = 0; a < n; a++)
      for (let i = 0; i < n; i++) {
        const r = (a * n + i) * 4,
          f = Math.sin(i * 0.42 + Math.sin(a * 0.07) * 0.7) * 7,
          b = Math.sin(a * 0.83 + Math.sin(i * 0.11) * 0.5) * 6,
          u = (s() - 0.5) * 20 + f + b,
          k = d ? 234 + u * 0.4 : 145 + u;
        ((o.data[r] = o.data[r + 1] = o.data[r + 2] = k),
          (o.data[r + 3] = 255));
      }
    t.putImageData(o, 0, 0);
  });
  return (d && (e.colorSpace = te), e);
}
function $t() {
  const d = Ve((e, t) => {
    const n = Me(144);
    ((e.fillStyle = "#151326"), e.fillRect(0, 0, t, t));
    for (let s = 0; s < 42e3; s++) {
      const o = Math.floor(25 + n() * 28);
      ((e.fillStyle = `rgb(${o},${o - 4},${o + 20})`),
        e.fillRect(n() * t, n() * t, 1, 1));
    }
    for (let s = -128; s < t + 128; s += 128)
      for (let o = -128; o < t + 128; o += 128)
        (e.save(),
          e.translate(s + 64, o + 64),
          e.rotate(Math.PI / 4),
          (e.strokeStyle = "#52435e"),
          (e.lineWidth = 2),
          e.strokeRect(-18, -18, 36, 36),
          (e.strokeStyle = "#257b80"),
          e.strokeRect(-12, -12, 24, 24),
          e.restore());
  });
  return ((d.colorSpace = te), d.repeat.set(12, 9), d);
}
function jt() {
  const d = Ve((e, t) => {
    ((e.fillStyle = "#14131c"), e.fillRect(0, 0, t, t));
    const n = Me(72);
    for (let s = 0; s < 2e4; s++) {
      const o = 15 + n() * 15;
      ((e.fillStyle = `rgb(${o},${o},${o + 6})`),
        e.fillRect(n() * t, n() * t, 1, 1));
    }
    ((e.strokeStyle = "#333039"),
      (e.lineWidth = 3),
      e.strokeRect(1, 1, t - 2, t - 2),
      (e.strokeStyle = "#07070c"),
      (e.lineWidth = 1),
      e.strokeRect(4, 4, t - 8, t - 8));
  });
  return ((d.colorSpace = te), d.repeat.set(20, 16), d);
}
function we(d, e, t, n, s = "#11101b", o = "Bungee", a = 100) {
  const i = document.createElement("canvas");
  ((i.width = 2048), (i.height = 512));
  const r = i.getContext("2d");
  ((r.fillStyle = s),
    r.fillRect(0, 0, i.width, i.height),
    (r.fillStyle = n),
    (r.font = `${a * 2}px ${o}`),
    (r.textAlign = "center"),
    (r.textBaseline = "middle"),
    r.fillText(d, 1024, 272, 1940));
  const f = new he(i);
  ((f.colorSpace = te), (f.anisotropy = 8));
  const b = new A({
    map: f,
    emissiveMap: f,
    emissive: new fe(n),
    emissiveIntensity: 1.8,
    roughness: 0.4,
  });
  return new V(new ae(e, t), b);
}
function oe(d) {
  const e = [],
    t = (h, z, c, y = 0, p = 0, m = 0) => {
      const x = new V(z, c);
      return (
        x.position.set(y, p, m),
        (x.castShadow = x.receiveShadow = !0),
        h.add(x),
        x
      );
    },
    n = new de(1, 24, 16),
    s = new A({ color: 1447717, roughness: 0.7 }),
    o = new A({ color: 16771804, roughness: 1 }),
    a = Le();
  a.repeat.set(2, 2);
  const i = Le(!0);
  i.repeat.set(2, 2);
  const r = new Map(),
    f = [...new Set(d)],
    u = f
      .map((h) => h.color)
      .map(
        (h) =>
          new se({
            color: h,
            map: i,
            roughness: 0.94,
            sheen: 0.65,
            sheenRoughness: 0.8,
            sheenColor: new fe(h).lerp(new fe("white"), 0.3),
            bumpMap: a,
            bumpScale: 0.0011,
          }),
      ),
    k = (h, z, c, y, p, m, x = m, g = m) => {
      const P = t(h, n, z, c, y, p);
      return (P.scale.set(m, x, g), P);
    },
    w = document.createElement("canvas");
  ((w.width = 512), (w.height = 1024));
  const E = w.getContext("2d"),
    l = E.createLinearGradient(0, 0, 512, 1024);
  (l.addColorStop(0, "#142142"),
    l.addColorStop(0.5, "#8b55b9"),
    l.addColorStop(1, "#37a6be"),
    (E.fillStyle = l),
    E.fillRect(0, 0, 512, 1024),
    (E.strokeStyle = "#c6a9ff"),
    (E.lineWidth = 16));
  for (let h = 0; h < 4; h++)
    (E.beginPath(), E.arc(390, 560, 180 + h * 35, 0, Math.PI * 2), E.stroke());
  ((E.fillStyle = "white"),
    (E.textAlign = "center"),
    (E.font = "bold 100px Atkinson Hyperlegible"),
    E.fillText("22:08", 256, 210),
    (E.font = "24px Atkinson Hyperlegible"),
    E.fillText("AURORA", 256, 263));
  for (let h = 0; h < 6; h++)
    ((E.fillStyle = ["#ffeaa8", "#b3ffee", "#ffb9ce"][h % 3]),
      E.beginPath(),
      E.roundRect(
        57 + (h % 3) * 144,
        750 + Math.floor(h / 3) * 100,
        70,
        70,
        18,
      ),
      E.fill(),
      (E.fillStyle = "#344365"),
      (E.font = "bold 30px Atkinson Hyperlegible"),
      E.fillText(
        ["♪", "✦", "●"][h % 3],
        92 + (h % 3) * 144,
        796 + Math.floor(h / 3) * 100,
      ));
  const S = new he(w);
  S.colorSpace = te;
  const G = new A({
      map: S,
      roughness: 0.2,
      emissive: 16777215,
      emissiveMap: S,
      emissiveIntensity: 0.15,
    }),
    M = document.createElement("canvas");
  ((M.width = 256), (M.height = 384));
  const T = M.getContext("2d");
  ((T.fillStyle = "#ffefd3"),
    T.fillRect(0, 0, 256, 384),
    (T.strokeStyle = "#ad5826"),
    (T.lineWidth = 10),
    T.strokeRect(15, 15, 226, 354),
    (T.fillStyle = "#793657"),
    (T.textAlign = "center"),
    (T.font = "bold 84px Atkinson Hyperlegible"),
    T.fillText("100", 128, 174),
    (T.font = "bold 28px Atkinson Hyperlegible"),
    T.fillText("TICKETS", 128, 222));
  for (let h = 0; h < 22; h++)
    T.fillRect(34 + h * 9, 268, h % 3 === 0 ? 4 : 2, 56);
  const q = new he(M);
  q.colorSpace = te;
  const B = new A({ map: q, roughness: 0.95 }),
    $ = new ke(0.013, 0.027, 16);
  for (const [h, z] of d.entries()) {
    const c = r.get(z.id);
    if (c) {
      const v = c.clone(!0);
      ((v.name = `pal-${h}`), e.push(v));
      continue;
    }
    const y = { id: h, definition: z },
      p = new _();
    ((p.name = `pal-${y.id}`), e.push(p));
    const m = y.definition,
      x = u[f.indexOf(m)],
      g = new A({ color: m.accent, roughness: 0.8 }),
      P = m.kind === "cat" ? 2 : m.kind === "bunny" ? 1 : 0;
    if (m.kind === "plush") Qt(p, m, x, g, o, s);
    else if (Ie(m)) {
      const v = m.id === "milk" || m.id === "lilac",
        R = P === 2,
        W = P === 1,
        U = new A({ color: 15836338, roughness: 1 }),
        F = (Y, Q, re = 65e-5) => {
          const ie = new _e(Y.map((ot) => new O(...ot)));
          t(p, new Ke(ie, 16, re, 6, !1), Q);
        };
      (k(p, x, 0, 0, 0, 0.038, 0.04, 0.036),
        k(p, x, 0, 0.051, 0, 0.033, R ? 0.031 : 0.033, 0.033));
      for (const Y of [-1, 1]) {
        const Q = k(p, x, Y * 0.037, -0.01, 0.003, 0.017, 0.018, 0.016);
        if (
          ((Q.rotation.z = Y * 0.16),
          k(p, x, Y * 0.022, -0.036, 0.008, 0.017, 0.014, 0.019),
          k(p, W ? g : o, Y * 0.022, -0.038, 0.025, 0.009, 0.007, 0.0025),
          R)
        ) {
          const re = t(p, $, x, Y * 0.023, 0.078, 0);
          re.rotation.z = -Y * 0.12;
          const ie = t(p, $, U, Y * 0.023, 0.079, 0.006);
          (ie.scale.set(0.5, 0.65, 0.4), (ie.rotation.z = -Y * 0.12));
        } else {
          const re = k(
            p,
            x,
            Y * 0.023,
            0.08,
            0,
            0.013,
            W ? 0.028 : 0.013,
            0.011,
          );
          ((re.rotation.z = W ? Y * 0.13 : 0),
            k(
              p,
              W ? g : o,
              Y * 0.023,
              0.082,
              0.01,
              0.007,
              W ? 0.019 : 0.007,
              0.003,
            ));
        }
      }
      (k(
        p,
        W ? g : o,
        0,
        -0.012,
        0.034,
        R ? 0.018 : 0.015,
        R ? 0.015 : 0.018,
        0.004,
      ),
        W
          ? k(p, o, 0, 0.05, 0.026, 0.025, 0.023, 0.012)
          : R || k(p, o, 0, 0.041, 0.029, 0.015, 0.01, 0.006));
      const J = W ? 0.038 : 0.0315;
      for (const Y of [-1, 1]) {
        const Q = Y * (W ? 0.01 : 0.012);
        (v
          ? F(
              [
                [Q - 0.0035, 0.055, J],
                [Q, 0.0525, J + 5e-4],
                [Q + 0.0035, 0.055, J],
              ],
              s,
              9e-4,
            )
          : (k(p, s, Q, 0.055, J, 0.0034, W ? 0.004 : 0.0046, 0.002),
            k(p, o, Q - 8e-4, 0.0565, J + 0.0018, 85e-5)),
          k(
            p,
            U,
            Y * (W ? 0.016 : 0.021),
            0.047,
            W ? 0.0355 : 0.026,
            0.0045,
            0.0024,
            0.001,
          ),
          m.id === "midnight" &&
            F(
              Y < 0
                ? [
                    [Q - 0.004, 0.062, J - 0.001],
                    [Q, 0.065, J],
                    [Q + 0.003, 0.064, J - 0.001],
                  ]
                : [
                    [Q - 0.004, 0.0605, J - 0.001],
                    [Q, 0.062, J],
                    [Q + 0.003, 0.062, J - 0.001],
                  ],
              s,
              65e-5,
            ));
      }
      k(
        p,
        R ? g : s,
        0,
        W ? 0.047 : 0.045,
        W ? 0.039 : R ? 0.033 : 0.0355,
        R ? 0.0033 : 0.003,
        0.0021,
        0.0015,
      );
      const ye = W ? 0.0385 : R ? 0.031 : 0.035;
      if (
        (F(
          [
            [-0.005, 0.04, ye],
            [0, 0.0375, ye + 3e-4],
            [0.005, m.id === "midnight" ? 0.0415 : 0.04, ye],
          ],
          s,
        ),
        R)
      ) {
        const Y = k(p, g, -0.025, 0.076, 0.022, 0.013, 0.008, 0.0035);
        Y.rotation.z = -0.22;
        const Q = k(p, g, -0.004, 0.076, 0.026, 0.013, 0.008, 0.0035);
        ((Q.rotation.z = 0.22),
          t(p, new K(0.007, 0.01, 0.006, 2, 0.0015), g, -0.014, 0.076, 0.028),
          F(
            [
              [-0.026, 0.08, 0.024],
              [-0.021, 0.076, 0.025],
              [-0.017, 0.076, 0.027],
            ],
            U,
            45e-5,
          ),
          F(
            [
              [-0.002, 0.08, 0.028],
              [-0.007, 0.076, 0.029],
              [-0.011, 0.076, 0.029],
            ],
            U,
            45e-5,
          ));
        for (const re of [-1, 1])
          for (let ie = 0; ie < 2; ie++)
            F(
              [
                [re * 0.021, 0.044 + ie * 0.005, 0.026],
                [re * 0.028, 0.044 + ie * 0.005, 0.021],
                [re * 0.033, 0.043 + ie * 0.006, 0.015],
              ],
              s,
              45e-5,
            );
      }
      W &&
        (k(p, g, 0, 0.086, 0.023, 0.009, 0.008, 0.004),
        k(p, s, -0.003, 0.087, 0.027, 0.0015),
        k(p, s, 0.003, 0.087, 0.027, 0.0015),
        F(
          [
            [-0.004, 0.017, 0.035],
            [0, 0.012, 0.038],
            [0.004, 0.017, 0.035],
          ],
          o,
          0.001,
        ));
      for (const Y of [-1, 1])
        for (let Q = 0; Q < 3; Q++)
          F(
            [
              [Y * 0.022 - 0.003 + Q * 0.003, -0.039, 0.027],
              [Y * 0.022 - 0.003 + Q * 0.003, -0.035, 0.027],
            ],
            s,
            3e-4,
          );
    } else if (m.kind === "coin") {
      const v = new A({ color: m.color, metalness: 0.82, roughness: 0.3 });
      t(p, new H(0.023, 0.023, 0.006, 40), v);
      for (const R of [-1, 1]) {
        const W = t(p, new ee(0.0205, 6e-4, 6, 40), g, 0, R * 0.0031, 0);
        ((W.rotation.x = Math.PI / 2),
          t(p, new H(0.008, 0.008, 5e-4, 6), g, 0, R * 0.0033, 0));
      }
    } else if (m.kind === "egg") {
      const v = new se({
        color: m.color,
        metalness: m.id === "gold-egg" ? 0.82 : 0.16,
        roughness: 0.25,
        clearcoat: 1,
      });
      k(p, v, 0, 0, 0, 0.033, 0.045, 0.033);
      const R = t(p, new ee(0.0328, 8e-4, 8, 40), g);
      R.rotation.x = Math.PI / 2;
      for (let W = 0; W < 5; W++) {
        const U = (W * Math.PI * 2) / 5;
        k(
          p,
          o,
          Math.sin(U) * 0.032,
          0.011,
          Math.cos(U) * 0.032,
          0.0035,
          0.004,
          0.0015,
        ).rotation.y = U;
      }
    } else if (m.kind === "phone") {
      t(p, new K(0.072, 0.009, 0.126, 3, 0.002), o, 0, -0.0125, 0);
      for (const U of [-1, 1])
        (t(p, new K(0.004, 0.034, 0.126, 2, 0.001), o, U * 0.034, 0, 0),
          t(p, new K(0.064, 0.034, 0.004, 2, 0.001), o, 0, 0, U * 0.061));
      const v = new _();
      ((v.position.y = 0.008), p.add(v));
      const R = new se({ color: m.color, metalness: 0.8, roughness: 0.25 });
      (t(v, new K(0.062, 0.014, 0.118, 3, 0.004), R),
        t(
          v,
          new K(0.051, 0.001, 0.105, 3, 0.006),
          new se({ color: 1120558, metalness: 0.15, roughness: 0.12 }),
          0,
          0.0075,
          0,
        ));
      const W = t(v, new ae(0.049, 0.1), G, 0, 0.0088, 0);
      ((W.rotation.x = -Math.PI / 2),
        t(v, new K(0.014, 0.001, 0.003, 2, 0.001), s, 0, 0.009, -0.045));
      for (const U of [-0.012, 0.002]) {
        const F = t(p, new H(0.006, 0.006, 0.003, 20), s, U, -0.008, -0.037);
        F.rotation.x = Math.PI;
      }
    } else {
      t(
        p,
        new K(0.074, 0.022, 0.058, 3, 0.002),
        new A({ color: m.color, roughness: 0.9 }),
      );
      for (let v = 0; v < 6; v++)
        t(p, new Z(0.073, 8e-4, 0.057), o, 0, -0.008 + v * 0.003, 0);
      t(p, new Z(0.012, 0.023, 0.059), g);
      for (const v of [-0.026, 0.026]) {
        const R = t(p, new ae(0.017, 0.04), B, v, 0.0128, 0);
        ((R.rotation.x = -Math.PI / 2),
          t(p, new Z(0.015, 0.001, 0.025), g, v, 0.0115, 0));
        for (let W = 0; W < 5; W++)
          t(p, new Z(0.001, 0.001, 0.02), s, v - 0.005 + W * 0.002, 0.0122, 0);
      }
    }
    const I = [];
    for (let v = 0; v < 7; v++) {
      const R = -0.025 + v * 0.004;
      I.push(new O(-0.002, R, 0.039), new O(0.002, R + 0.001, 0.039));
    }
    const C = new Re(new je().setFromPoints(I), new at({ color: 7692925 }));
    (Ie(m) ? p.add(C) : (C.geometry.dispose(), C.material.dispose()),
      p.updateMatrixWorld(!0));
    const N = new Map(),
      D = [];
    p.traverse((v) => {
      if (v instanceof V && !Array.isArray(v.material)) {
        const R = N.get(v.material) ?? [];
        (R.push(
          (v.geometry.index
            ? v.geometry.toNonIndexed()
            : v.geometry.clone()
          ).applyMatrix4(v.matrixWorld),
        ),
          N.set(v.material, R),
          D.push(v));
      }
    });
    for (const [v, R] of N) {
      const W = Pe(R);
      if (!W) throw new Error("Prize geometry merge failed");
      const U = new V(W, v);
      ((U.castShadow = U.receiveShadow = !0),
        p.add(U),
        R.forEach((F) => F.dispose()));
    }
    D.forEach((v) => v.removeFromParent());
    const L = new _();
    ((L.name = "soft-shell"), (L.matrixAutoUpdate = !1));
    for (const v of [...p.children]) L.add(v);
    (p.add(L), r.set(m.id, p));
  }
  return (n.dispose(), $.dispose(), e);
}
function ce(d) {
  const e = new Set(),
    t = new Set(),
    n = new Set();
  (d.traverse((s) => {
    if (
      (s instanceof $e && "shadow" in s && s.shadow.dispose(),
      s instanceof V || s instanceof Re)
    ) {
      e.add(s.geometry);
      for (const o of Array.isArray(s.material) ? s.material : [s.material]) {
        t.add(o);
        for (const a of Object.values(o)) a instanceof ze && n.add(a);
      }
    }
  }),
    e.forEach((s) => s.dispose()),
    t.forEach((s) => s.dispose()),
    n.forEach((s) => s.dispose()),
    d.removeFromParent());
}
function Jt() {
  const d = new Je();
  return (
    d.moveTo(-0.006, -0.056),
    d.lineTo(0.005, -0.056),
    d.bezierCurveTo(0.008, -0.08, 0.006, -0.105, -0.016, -0.124),
    d.quadraticCurveTo(-0.019, -0.126, -0.022, -0.122),
    d.bezierCurveTo(-0.01, -0.108, -0.004, -0.08, -0.006, -0.056),
    d.closePath(),
    d
  );
}
class nt {
  constructor() {
    ((this.group = new _()),
      (this.head = new _()),
      (this.fingers = []),
      (this.suspensionEye = new O(0, 0.066, 0)),
      (this.yoke = new _()),
      (this.links = []),
      (this.disposed = !1),
      (this.inverse = new pe()),
      (this.point = new O()),
      (this.delta = new O()),
      (this.up = new O(0, 1, 0)),
      (this.group.name = "silver-claw-hardware"),
      (this.head.name = "actuator-housing"),
      this.group.add(this.head));
    const e = new Uint8Array(8 * 256 * 4);
    let t = 913;
    for (let g = 0; g < 256; g++) {
      t = (Math.imul(t, 1664525) + 1013904223) >>> 0;
      const P = 110 + (t % 36);
      for (let I = 0; I < 8; I++) {
        const C = (g * 8 + I) * 4;
        ((e[C] = e[C + 1] = e[C + 2] = P), (e[C + 3] = 255));
      }
    }
    const n = new rt(e, 8, 256, ht);
    ((n.wrapS = n.wrapT = Qe), (n.needsUpdate = !0));
    const s = new se({
        color: 13226714,
        metalness: 1,
        roughness: 0.28,
        bumpMap: n,
        bumpScale: 45e-6,
        clearcoat: 0.25,
      }),
      o = new se({
        color: 15199730,
        metalness: 1,
        roughness: 0.16,
        clearcoat: 0.4,
      }),
      a = new A({ color: 10136505, metalness: 1, roughness: 0.36 }),
      i = new A({ color: 3160902, metalness: 0.65, roughness: 0.48 }),
      r = new A({ color: 13687263, metalness: 1, roughness: 0.3 }),
      f = (g, P, I, C = 0, N = 0, D = 0, L = "") => {
        const v = new V(P, I);
        return (
          v.position.set(C, N, D),
          (v.name = L),
          (v.castShadow = v.receiveShadow = !0),
          g.add(v),
          v
        );
      };
    (f(
      this.head,
      new H(0.029, 0.029, 0.04, 48),
      s,
      0,
      0.033,
      0,
      "upper-canister",
    ),
      f(
        this.head,
        new H(0.032, 0.032, 0.034, 48),
        s,
        0,
        -0.004,
        0,
        "lower-canister",
      ));
    const b = new H(0.035, 0.035, 0.005, 48);
    for (const g of [0.014, -0.023])
      f(this.head, b, o, 0, g, 0, "machined-collar");
    f(this.head, new H(0.0305, 0.0305, 0.003, 48), o, 0, 0.054, 0, "top-cap");
    const u = new ee(0.0323, 65e-5, 6, 48);
    for (const g of [0.01, -0.017])
      f(this.head, u, i, 0, g).rotation.x = Math.PI / 2;
    (f(
      this.head,
      new H(0.022, 0.026, 0.005, 40),
      a,
      0,
      -0.027,
      0,
      "bottom-cap",
    ),
      f(
        this.head,
        new ee(0.008, 0.0025, 8, 32),
        o,
        0,
        0.066,
        0,
        "suspension-eye",
      ).scale.set(0.75, 1, 1),
      f(
        this.head,
        new K(0.009, 0.012, 0.006, 2, 0.001),
        s,
        0,
        0.057,
        0,
        "eye-foot",
      ),
      (this.rod = f(
        this.head,
        new H(0.0045, 0.0045, 0.05, 20),
        o,
        0,
        -0.052,
        0,
        "sliding-piston",
      )),
      (this.yoke.name = "hexagonal-crosshead"),
      this.head.add(this.yoke),
      (f(
        this.yoke,
        new H(0.022, 0.022, 0.009, 6),
        a,
        0,
        0,
        0,
        "crosshead",
      ).rotation.y = Math.PI / 6),
      f(
        this.yoke,
        new H(0.009, 0.009, 0.006, 24),
        o,
        0,
        0.006,
        0,
        "piston-collar",
      ),
      (f(
        this.head,
        new ee(0.006, 0.0011, 8, 32),
        i,
        0,
        -0.0305,
        0,
        "piston-wiper-seal",
      ).rotation.x = Math.PI / 2),
      f(
        this.head,
        new H(0.0075, 0.0075, 0.003, 24),
        o,
        0,
        -0.029,
        0,
        "rod-retaining-collar",
      ));
    const w = new H(0.0022, 0.0022, 6e-4, 6),
      E = new H(0.0042, 0.0042, 0.0016, 24),
      l = new H(0.0035, 0.0035, 0.018, 16),
      S = new H(0.0055, 0.0055, 0.0014, 20),
      G = new K(0.02, 0.013, 0.012, 2, 0.0015),
      M = new Je();
    (M.moveTo(-0.006, 0.005),
      M.lineTo(0.006, 0.005),
      M.lineTo(0.006, -0.055),
      M.quadraticCurveTo(0.005, -0.065, 0, -0.065),
      M.quadraticCurveTo(-0.005, -0.065, -0.006, -0.055),
      M.closePath());
    const T = new ct();
    (T.moveTo(-0.002, -0.013),
      T.lineTo(-0.002, -0.046),
      T.quadraticCurveTo(0, -0.049, 0.002, -0.046),
      T.lineTo(0.002, -0.013),
      T.quadraticCurveTo(0, -0.01, -0.002, -0.013),
      M.holes.push(T));
    const q = new De(M, {
        depth: 0.002,
        bevelEnabled: !0,
        bevelThickness: 4e-4,
        bevelSize: 4e-4,
        bevelSegments: 2,
        curveSegments: 12,
      }),
      B = Jt(),
      $ = new De(B, {
        depth: 0.006,
        bevelEnabled: !0,
        bevelThickness: 6e-4,
        bevelSize: 6e-4,
        bevelSegments: 2,
        curveSegments: 24,
      }),
      h = new K(0.0075, 0.018, 0.005, 2, 0.001),
      z = new K(0.005, 0.05, 0.0028, 2, 8e-4),
      c = Nt(),
      y = [];
    for (let g = 0; g < c.length; g += 3)
      y.push(new O(c[g], c[g + 1], c[g + 2]));
    const p = new lt(y),
      m = (g, P, I, C = 0) =>
        new O(
          Math.cos(g) * P - Math.sin(g) * C,
          I,
          Math.sin(g) * P + Math.cos(g) * C,
        ),
      x = (g, P, I) => {
        const C = new O(-Math.sin(P), 0, Math.cos(P)),
          N = f(g, l, o, ...I.toArray());
        N.quaternion.setFromUnitVectors(this.up, C);
        for (const D of [-1, 1]) {
          const L = I.clone().addScaledVector(C, D * 0.009);
          f(g, S, o, ...L.toArray()).quaternion.copy(N.quaternion);
          const R = I.clone().addScaledVector(C, D * 0.0104);
          f(g, E, o, ...R.toArray(), "socket-bolt-head").quaternion.copy(
            N.quaternion,
          );
          const U = R.clone().addScaledVector(C, D * 85e-5);
          f(g, w, i, ...U.toArray(), "hexagonal-bolt-socket").quaternion.copy(
            N.quaternion,
          );
        }
      };
    for (let g = 0; g < 3; g++) {
      const P = (g * Math.PI * 2) / 3,
        I = new _();
      ((I.name = `curved-finger-${g}`),
        this.fingers.push(I),
        this.group.add(I));
      const C = f(this.head, G, s, ...m(P, 0.036, -0.015).toArray());
      C.rotation.y = -P;
      for (const L of [-1, 1]) {
        const v = f(I, q, s);
        ((v.rotation.y = -P), v.position.copy(m(P, 0, 0, L * 0.005 - 0.001)));
      }
      const N = f(I, $, o);
      ((N.rotation.y = -P),
        N.position.copy(m(P, 0, 0, -0.003)),
        x(I, P, new O()),
        x(I, P, new O(0, -0.059, 0)),
        x(this.yoke, P, m(P, 0.022, 0)));
      const D = f(
        I,
        p,
        r,
        ...m(P, -0.018, -0.12).toArray(),
        "calibrated-tip-contact",
      );
      D.rotation.y = -P;
      for (const L of [-1, 1]) {
        const v = f(this.group, z, a);
        v.name = `inner-link-${g}-${L}`;
        const R = f(this.group, h, o);
        ((R.name = "telescopic-link-sleeve"),
          this.links.push({
            mesh: v,
            sleeve: R,
            start: new O(),
            end: new O(),
            finger: g,
            side: L,
          }));
      }
    }
  }
  updateLinks() {
    this.inverse.copy(this.head.quaternion).invert();
    let e = 0;
    for (let o = 0; o < 3; o++) {
      const a = (o * Math.PI * 2) / 3;
      (this.point
        .set(0, -0.059, 0)
        .applyQuaternion(this.fingers[o].quaternion)
        .add(this.fingers[o].position)
        .sub(this.head.position)
        .applyQuaternion(this.inverse),
        (e +=
          (this.point.x * Math.cos(a) + this.point.z * Math.sin(a) - 0.045) /
          0.059));
    }
    const t = ne.clamp((e / 3 + 0.4) / 1.15, 0, 1);
    this.yoke.position.y = -0.041 - 0.024 * t;
    const n = -0.029,
      s = this.yoke.position.y + 0.006;
    ((this.rod.position.y = (n + s) / 2),
      (this.rod.scale.y = Math.max(0.001, n - s) / 0.05));
    for (const o of this.links) {
      const a = (o.finger * Math.PI * 2) / 3,
        i = o.side * 0.006;
      (o.start
        .set(
          Math.cos(a) * 0.022 - Math.sin(a) * i,
          this.yoke.position.y,
          Math.sin(a) * 0.022 + Math.cos(a) * i,
        )
        .applyQuaternion(this.head.quaternion)
        .add(this.head.position),
        o.end
          .set(-Math.sin(a) * i, -0.059, Math.cos(a) * i)
          .applyQuaternion(this.fingers[o.finger].quaternion)
          .add(this.fingers[o.finger].position),
        this.delta.copy(o.end).sub(o.start),
        o.mesh.position.copy(o.start).add(o.end).multiplyScalar(0.5),
        (o.mesh.scale.y = this.delta.length() / 0.05),
        o.mesh.quaternion.setFromUnitVectors(this.up, this.delta.normalize()),
        o.sleeve.position.copy(o.mesh.position),
        o.sleeve.quaternion.copy(o.mesh.quaternion));
    }
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = !0;
    const e = new Set(),
      t = new Set(),
      n = new Set();
    (this.group.traverse((s) => {
      s instanceof V &&
        (t.add(s.geometry),
        (Array.isArray(s.material) ? s.material : [s.material]).forEach((o) =>
          n.add(o),
        ));
    }),
      n.forEach((s) =>
        Object.values(s).forEach((o) => {
          o instanceof ze && e.add(o);
        }),
      ),
      e.forEach((s) => s.dispose()),
      t.forEach((s) => s.dispose()),
      n.forEach((s) => s.dispose()),
      this.group.removeFromParent());
  }
}
function ge(d = !0, e = !0, t = !1) {
  const n = new _(),
    s = new _();
  ((s.name = "roof"), n.add(s));
  const o = new se({
      color: 2432583,
      roughness: 0.25,
      metalness: 0.42,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    }),
    a = new A({ color: 1052709, roughness: 0.62 }),
    i = new A({ color: 15261907, roughness: 0.3, metalness: 0.3 }),
    r = new A({ color: 15198447, metalness: 1, roughness: 0.14 }),
    f = new A({
      color: 16727423,
      emissive: 16719461,
      emissiveIntensity: 4.5,
      roughness: 0.35,
    }),
    b = new A({ color: 1364416, emissive: 1364416, emissiveIntensity: 3.5 }),
    u = new A({ color: 16763196, emissive: 16758568, emissiveIntensity: 3 }),
    k = new se({
      color: 14481663,
      roughness: 0.08,
      metalness: 0.02,
      envMapIntensity: 0.35,
      clearcoat: 0.3,
      ior: 1.47,
      transparent: !0,
      opacity: e ? 0.045 : 0.012,
      depthWrite: !1,
      side: Ge,
    });
  function w(h, z, c, y, p, m, x, g = n) {
    const P = new V(new K(h, z, c, 2, Math.min(h, z, c, 0.08) * 0.22), x);
    return (
      P.position.set(y, p, m),
      (P.castShadow = !x.transparent),
      (P.receiveShadow = !0),
      g.add(P),
      P
    );
  }
  function E(h, z, c, y, p, m = n, x = 1, g = 1, P = 1) {
    const I = new V(new de(h, d ? 24 : 12, d ? 16 : 8), p);
    return (
      I.position.set(z, c, y),
      I.scale.set(x, g, P),
      (I.castShadow = !0),
      m.add(I),
      I
    );
  }
  function l(h, z, c, y, p, m, x = n) {
    const g = new V(new H(h, h, z, d ? 32 : 12), m);
    return (g.position.set(c, y, p), (g.castShadow = !0), x.add(g), g);
  }
  function S(h, z, c, y, p, m, x, g, P = 90, I = n) {
    const C = document.createElement("canvas");
    ((C.width = 2048), (C.height = 512));
    const N = C.getContext("2d");
    ((N.fillStyle = g),
      N.fillRect(0, 0, 2048, 512),
      (N.fillStyle = x),
      (N.font = `${P * 2}px Bungee`),
      (N.textAlign = "center"),
      (N.textBaseline = "middle"),
      N.fillText(h, 1024, 276, 1960));
    const D = new he(C);
    D.colorSpace = te;
    const L = new xe({ map: D, toneMapped: !1 }),
      v = new V(new ae(z, c), L);
    return (v.position.set(y, p, m), I.add(v), v);
  }
  (w(1.12, 0.68, 0.9, 0, 0.45, 0, o),
    w(1.04, 0.06, 0.84, 0, 0.78, 0, i),
    w(1.04, 1.16, 0.06, 0, 1.37, t ? -0.56 : -0.42, a),
    e && w(0.97, 0.035, 0.8, 0, 0.83, 0, i),
    w(0.98, 0.04, 0.81, 0, 1.94, 0, a, s),
    w(1.18, 0.32, 0.96, 0, 2.13, 0, o, s),
    w(1.2, 0.055, 0.98, 0, 2.3, 0, i, s));
  for (const h of [-0.53, 0.53])
    for (const z of [-0.42, 0.42])
      (w(0.06, 1.17, 0.06, h, 1.365, z, i),
        w(0.018, 1.05, 0.025, h, 1.37, z + 0.035, z > 0 ? f : b));
  w(0.99, 1.05, 0.009, 0, 1.38, 0.449, k);
  for (const h of [-0.52, 0.52]) w(0.009, 1.05, 0.8, h, 1.38, 0, k);
  S("GRAB-A-PAL", 1.04, 0.255, 0, 2.13, 0.486, "#ffe0aa", "#27184e", 99, s);
  for (let h = 0; h < 14; h++) E(0.014, -0.51 + h * 0.078, 2.285, 0.5, u, s);
  (e &&
    (S("PLUSH CLUB", 0.62, 0.13, 0, 1.69, -0.382, "#14d1c0", "#101025", 82),
    S(
      "TAKE HOME A LITTLE PAL",
      0.74,
      0.105,
      0,
      1.55,
      -0.38,
      "#fff0c9",
      "#101025",
      56,
    )),
    w(0.97, 0.02, 0.024, 0, 0.86, 0.424, b));
  const G = w(1.17, 0.12, 0.37, 0, 0.77, 0.51, o);
  ((G.rotation.x = 0.12),
    l(0.068, 0.012, -0.3, 0.846, 0.58, r),
    l(0.012, 0.11, -0.3, 0.9, 0.58, r),
    E(0.042, -0.3, 0.961, 0.58, f),
    l(0.064, 0.02, 0.29, 0.861, 0.58, r),
    l(0.052, 0.026, 0.29, 0.88, 0.58, u),
    S("MOVE", 0.18, 0.046, -0.3, 0.738, 0.708, "#f2f4ff", "#352464", 75),
    S("DROP", 0.18, 0.046, 0.29, 0.738, 0.708, "#f2f4ff", "#352464", 75),
    w(0.44, 0.27, 0.035, -0.2, 0.36, 0.465, i),
    w(0.37, 0.205, 0.04, -0.2, 0.36, 0.486, a),
    w(0.37, 0.035, 0.17, -0.2, 0.26, 0.43, r),
    S("PRIZE OUT", 0.33, 0.052, -0.2, 0.542, 0.477, "#ffe2a5", "#352464", 77),
    w(0.16, 0.24, 0.034, 0.33, 0.39, 0.474, r),
    w(0.025, 0.1, 0.012, 0.33, 0.426, 0.497, a),
    E(0.015, 0.33, 0.32, 0.505, b),
    S("FREE PLAY", 0.22, 0.055, 0.33, 0.59, 0.475, "#f2f4ff", "#352464", 70),
    w(1.1, 0.055, 0.89, 0, 0.13, 0, a));
  for (const h of [-0.44, 0.44])
    for (const z of [-0.32, 0.32]) l(0.035, 0.12, h, 0.06, z, r);
  for (const h of [-0.48, 0.48])
    for (const z of [0.21, 0.65]) E(0.008, h, z, 0.457, r);
  for (let h = 0; h < 6; h++)
    w(0.004, 0.012, 0.29, 0.564, 0.29 + h * 0.026, -0.02, a);
  const M = S(
    `PAL
CLUB`,
    0.54,
    0.22,
    0.568,
    0.52,
    0,
    "#ffcf72",
    "#352464",
    100,
  );
  M.rotation.y = Math.PI / 2;
  for (const h of [-0.5, 0.5]) {
    w(0.014, 1.04, 0.014, h, 1.38, 0.463, a);
    for (const z of [1.02, 1.75]) l(0.012, 0.065, h, z, 0.465, r);
  }
  (w(0.035, 0.19, 0.028, 0.465, 1.3, 0.478, r),
    w(0.12, 0.015, 0.13, 0.36, 1.85, -0.18, r, s));
  for (let h = 0; h < 8; h++)
    w(0.32, 0.006, 0.008, 0.1, 1.921, -0.22 + h * 0.06, b, s);
  w(0.9, 0.015, 0.025, 0, 1.945, 0.42, f, s);
  const T = S(
    e ? "PRIZE ARCADE" : "FREE PLAY",
    0.47,
    0.072,
    0,
    0.684,
    0.722,
    "#1b1646",
    "#ffe0aa",
    68,
  );
  T.name = "maintenance";
  for (const h of [-0.475, 0.475])
    for (const z of [0.21, 0.61]) {
      const c = l(0.009, 0.005, h, z, 0.463, r);
      ((c.rotation.x = Math.PI / 2), w(0.012, 0.001, 0.002, h, z, 0.467, a));
    }
  for (let h = 0; h < 9; h++)
    w(0.004, 0.014, 0.33, -0.565, 0.25 + h * 0.025, -0.02, a);
  for (const h of [-0.31, 0.31]) w(0.008, 0.44, 0.015, 0.566, 0.44, h, i);
  const q = new _();
  if (((q.name = "claw"), n.add(q), e)) {
    let h = function (D, L, v, R, W, U, F, J, ye) {
      const Y = new V(L, v);
      (Y.position.set(R, W, U),
        Y.scale.set(F, J, ye),
        (Y.castShadow = !0),
        D.add(Y));
    };
    const z = new de(1, d ? 32 : 14, d ? 24 : 10),
      c = new de(1, d ? 16 : 10, d ? 12 : 6),
      y = new A({ color: 1381420, roughness: 0.4 }),
      p = new A({ color: 16777215 }),
      m = [12689901, 16758991, 7460803, 16764533, 10731505],
      x = Le();
    x.repeat.set(4, 4);
    const g = m.map(
        (D) =>
          new se({
            color: D,
            roughness: 0.95,
            sheen: 1,
            sheenColor: new fe(D).lerp(new fe(16777215), 0.5),
            sheenRoughness: 0.65,
            bumpMap: x,
            bumpScale: 0.0025,
          }),
      ),
      P = new A({ color: 16772575, roughness: 1 }),
      I = Me(73);
    for (let D = 0; D < 18; D++) {
      const L = new _();
      L.name = "preview-stock";
      const v = g[D % 5],
        R = Math.floor(D / 6),
        W = ((D % 6) - 2.5) * 0.15 + (I() - 0.5) * 0.025;
      (L.position.set(W, 0.92 + R * 0.022, -0.23 + R * 0.21),
        (L.rotation.y = (I() - 0.5) * 0.65),
        (L.rotation.z = (I() - 0.5) * 1.1),
        (L.rotation.x = (I() - 0.5) * 0.55));
      const U = 0.83 + I() * 0.24;
      (L.scale.setScalar(U),
        h(L, z, v, 0, 0.072, 0, 0.068, 0.083, 0.06),
        h(L, z, v, 0, 0.18, 0, 0.079, 0.071, 0.065));
      for (const F of [-1, 1])
        (h(
          L,
          z,
          v,
          F * 0.06,
          D % 3 === 1 ? 0.26 : 0.238,
          0,
          0.03,
          D % 3 === 1 ? 0.06 : 0.03,
          0.022,
        ),
          h(
            L,
            z,
            P,
            F * 0.06,
            D % 3 === 1 ? 0.265 : 0.24,
            0.019,
            0.017,
            D % 3 === 1 ? 0.041 : 0.017,
            0.006,
          ),
          h(L, z, v, F * 0.073, 0.085, 0, 0.031, 0.044, 0.029),
          h(L, z, v, F * 0.04, 0.014, 0.025, 0.036, 0.032, 0.035),
          h(L, c, y, F * 0.029, 0.19, 0.06, 0.009, 0.012, 0.006),
          h(L, c, p, F * 0.027, 0.194, 0.066, 0.003, 0.003, 0.002));
      (h(L, z, P, 0, 0.16, 0.06, 0.035, 0.025, 0.013),
        h(L, c, y, 0, 0.168, 0.073, 0.009, 0.005, 0.003),
        n.add(L));
    }
    (w(0.91, 0.025, 0.029, 0, 1.88, 0.03, r),
      w(0.11, 0.05, 0.12, 0.1, 1.84, 0.03, a),
      q.position.set(0.1, 1.81, 0.03),
      n.add(q));
    const C = new nt();
    C.group.position.y = -0.32;
    for (let D = 0; D < 3; D++) {
      const L = (D * Math.PI * 2) / 3;
      (C.fingers[D].position.set(
        Math.cos(L) * 0.045,
        -0.015,
        Math.sin(L) * 0.045,
      ),
        C.fingers[D].quaternion.setFromAxisAngle(
          new O(-Math.sin(L), 0, Math.cos(L)),
          0.45,
        ));
    }
    (C.updateLinks(), q.add(C.group));
    const N = 0.32 - C.suspensionEye.y;
    l(0.002, N, 0, -N / 2, 0, a, q);
  }
  n.updateMatrixWorld(!0);
  const B = new Map(),
    $ = new Set();
  n.traverse((h) => {
    if (
      !(h instanceof V) ||
      Array.isArray(h.material) ||
      h.material.transparent
    )
      return;
    let z = h;
    for (; z;) {
      if (z === q || z === s) return;
      z = z.parent;
    }
    let c = B.get(h.material);
    (c || ((c = { meshes: [], geometry: [] }), B.set(h.material, c)),
      c.meshes.push(h),
      c.geometry.push(
        (h.geometry.index
          ? h.geometry.toNonIndexed()
          : h.geometry.clone()
        ).applyMatrix4(h.matrixWorld),
      ),
      $.add(h.geometry));
  });
  for (const [h, z] of B) {
    const c = Pe(z.geometry);
    if (!c) throw new Error("Cabinet geometry could not be batched");
    const y = new V(c, h);
    ((y.castShadow = !h.transparent), (y.receiveShadow = !0), n.add(y));
    for (const p of z.meshes) p.removeFromParent();
    for (const p of z.geometry) p.dispose();
  }
  return ($.forEach((h) => h.dispose()), { group: n, claw: q, light: f });
}
function es(d) {
  const e = ge(!0, !1),
    t = we(
      d === "cut"
        ? "SNIP & WIN"
        : d === "pusher"
          ? "COIN CASCADE"
          : d === "tower"
            ? "TOWER TUMBLE"
            : "EGG ORBIT",
      0.96,
      0.15,
      d === "cut" ? "#ffbe9c" : "#d9b2ff",
    );
  (t.position.set(0, 2.12, 0.5), e.group.add(t));
  const n = new A({ color: 12440543, metalness: 0.8, roughness: 0.3 }),
    s = (o, a, i, r, f) => {
      const b = new V(o, a);
      return (
        b.position.set(i, r, f),
        (b.castShadow = b.receiveShadow = !0),
        e.group.add(b),
        b
      );
    };
  if (d === "pusher" || d === "tower") {
    const o = new A({ color: 15316563, roughness: 0.3, metalness: 0.8 }),
      a = new et(new H(0.023, 0.023, 0.006, 24), o, 120),
      i = new tt();
    let r = 0;
    for (let f = 0; f < 6; f++)
      for (let b = 0; b < 10; b++)
        (i.position.set(-0.25 + b * 0.052, 1.045, -0.16 + f * 0.065),
          i.updateMatrix(),
          a.setMatrixAt(r++, i.matrix));
    if (d === "tower")
      for (let f = 0; f < 10; f++)
        for (let b = 0; b < 6; b++) {
          const u = (b * Math.PI) / 3;
          (i.position.set(
            Math.cos(u) * 0.055,
            1.055 + f * 0.006,
            Math.sin(u) * 0.055,
          ),
            i.updateMatrix(),
            a.setMatrixAt(r++, i.matrix));
        }
    ((a.count = r),
      (a.castShadow = a.receiveShadow = !0),
      e.group.add(a),
      s(new Z(0.63, 0.045, 0.15), n, 0, 1.06, -0.25));
  } else if (d === "spin") {
    const o = [16763487, 9407188, 2589836].map(
      (i) => new A({ color: i, roughness: 0.4, metalness: 0.25 }),
    );
    for (let i = 0; i < 16; i++)
      s(
        new Oe(0.25, 8, (i * Math.PI * 2) / 16, (Math.PI * 2) / 16),
        o[i === 0 ? 0 : i % 2 ? 1 : 2],
        0,
        1.45,
        -0.13,
      );
    (s(new ee(0.258, 0.009, 8, 64), n, 0, 1.45, -0.12),
      (s(new ke(0.026, 0.055, 3), o[0], 0, 1.72, -0.09).rotation.z = Math.PI),
      oe([j[8], j[8], j[9], j[8], j[8]]).forEach((i, r) => {
        (i.position.set(-0.25 + r * 0.125, 0.95, -0.12), e.group.add(i));
      }));
  } else {
    (s(new Z(0.65, 0.023, 0.028), n, 0, 1.65, 0),
      s(
        new H(0.0015, 0.0015, 0.42, 8),
        new A({ color: 16772013 }),
        0,
        1.67,
        -0.06,
      ));
    const o = oe([j[6]])[0];
    (o.position.set(0, 1.4, -0.06),
      (o.rotation.x = Math.PI / 2),
      e.group.add(o));
    for (const i of [-1, 1]) {
      const r = s(new Z(0.065, 0.008, 0.019), n, i * 0.022, 1.65, 0.02);
      r.rotation.z = i * 0.4;
    }
    oe([j[2], j[6], j[5]]).forEach((i, r) => {
      (i.position.set(-0.22 + r * 0.22, 0.95, -0.17), e.group.add(i));
    });
  }
  return e;
}
function ts() {
  const d = new _(),
    e = [],
    t = [],
    n = [],
    s = new A({ color: 1118754, roughness: 0.82 }),
    o = new A({ color: 2303798, roughness: 0.34, metalness: 0.65 }),
    a = new A({ color: 9279664, roughness: 0.25, metalness: 0.9 }),
    i = new A({ color: 3679292, roughness: 0.92 }),
    r = new A({ color: 16727423, emissive: 16718205, emissiveIntensity: 5 }),
    f = new A({ color: 1364416, emissive: 786416, emissiveIntensity: 4 }),
    b = new A({ color: 16765333, emissive: 16761715, emissiveIntensity: 3 });
  function u(c, y, p, m, x, g, P, I = !1) {
    const C = new V(
      I ? new K(c, y, p, 2, Math.min(c, y, p, 0.12) * 0.22) : new Z(c, y, p),
      P,
    );
    return (
      C.position.set(m, x, g),
      (C.receiveShadow = !0),
      (C.castShadow = !0),
      d.add(C),
      C
    );
  }
  function k(c, y, p, m, x, g, P, I = 0) {
    const C = we(c, y, p, P);
    return (C.position.set(m, x, g), (C.rotation.y = I), d.add(C), C);
  }
  function w(c, y, p, m, x, g) {
    const P = new Se(m, x, g, 2);
    return (P.position.set(c, y, p), d.add(P), n.push(P), P);
  }
  (u(30, 4.6, 0.25, 0, 2.3, -11, s),
    u(0.25, 4.6, 22, -15, 2.3, 0, s),
    u(0.25, 4.6, 22, 15, 2.3, 0, s),
    u(30, 0.2, 22, 0, 4.7, 0, s));
  const E = new V(
    new ae(30, 22),
    new se({
      map: jt(),
      color: 11450319,
      metalness: 0.45,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    }),
  );
  ((E.rotation.x = -Math.PI / 2), (E.receiveShadow = !0), d.add(E));
  const l = new dt(new ae(30, 22), {
    textureWidth: 1024,
    textureHeight: 768,
    color: 6177380,
    multisample: 0,
    clipBias: 0.003,
  });
  ((l.rotation.x = -Math.PI / 2), (l.position.y = 0.003));
  const S = l.material;
  ((S.transparent = !0),
    (S.depthWrite = !1),
    (S.fragmentShader = S.fragmentShader
      .replace(
        "vec4 base = texture2DProj( tDiffuse, vUv );",
        "vec2 rUv=vUv.xy/vUv.w; vec2 delta=vec2(0.0025); vec4 base=texture2D(tDiffuse,rUv)*0.40+texture2D(tDiffuse,rUv+vec2(delta.x,0.0))*0.15+texture2D(tDiffuse,rUv-vec2(delta.x,0.0))*0.15+texture2D(tDiffuse,rUv+vec2(0.0,delta.y))*0.15+texture2D(tDiffuse,rUv-vec2(0.0,delta.y))*0.15;",
      )
      .replace(
        "gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );",
        "gl_FragColor = vec4( blendOverlay( base.rgb, color ), 0.13 );",
      )),
    d.add(l));
  const G = new V(
    new ae(17, 6.4),
    new A({ map: $t(), color: 13220847, roughness: 1 }),
  );
  ((G.rotation.x = -Math.PI / 2),
    G.position.set(1, 0.009, -5.4),
    (G.receiveShadow = !0),
    d.add(G));
  for (let c = -14; c <= 14; c += 2)
    (u(0.15, 4.35, 0.15, c, 2.2, -10.8, o),
      u(1.7, 2.8, 0.035, c + 0.8, 1.6, -10.845, i),
      u(0.018, 2.85, 0.02, c + 0.05, 1.65, -10.79, c < 0 ? r : f));
  for (let c = -9; c < 11; c += 3) {
    u(30, 0.18, 0.18, 0, 4.34, c, o);
    for (let y = -14; y < 15; y += 4) {
      const p = u(1.12, 0.035, 0.06, y, 4.04, c, o);
      p.rotation.z = Math.PI / 6;
    }
    (u(11, 0.022, 0.04, -2, 4.19, c, r), u(5, 0.022, 0.04, 8, 4.19, c, f));
  }
  (u(29, 0.04, 0.035, 0, 3.8, -10.76, r),
    u(29, 0.02, 0.025, 0, 0.28, -10.77, f),
    u(5.4, 0.7, 0.18, 0, 3.18, -5.5, o, !0),
    k("CLAW ALLEY", 5.05, 0.52, 0, 3.18, -5.392, "#ff6caa"));
  for (const c of [-2.4, 2.4]) u(0.012, 1.16, 0.012, c, 3.95, -5.5, a);
  (u(5.1, 0.02, 0.025, 0, 2.865, -5.39, r),
    k("TOKEN HALL", 7.5, 1.06, 0, 3.17, -10.72, "#56eee2"),
    k("PLAY. WIN. REPEAT.", 5.2, 0.36, 0, 2.39, -10.71, "#e8d7ff"),
    k("PRIZE COUNTER", 3.8, 0.48, -8.5, 3.05, -6.9, "#ffd18a"),
    k("LUCK LOUNGE", 3.3, 0.48, 9, 3.05, -7, "#70baff"));
  const M = ge(),
    T = ge(!1);
  [
    [0, 0],
    [-5.3, -5.0],
    [-3.6, -5.9],
    [-1.85, -5.3],
    [0, -6.2],
    [1.8, -5.1],
    [3.65, -5.85],
    [5.3, -4.8],
  ].forEach(([c, y], p) => {
    const m =
        p === 1
          ? "cut"
          : p === 2
            ? "spin"
            : p === 3
              ? "pusher"
              : p === 4
                ? "tower"
                : "claw",
      x = m === "claw" ? void 0 : es(m),
      g = x?.group ?? (p === 0 ? M.group : M.group.clone(!0)),
      P = x ? x.group.clone(!0) : p === 0 ? T.group : T.group.clone(!0),
      I = m === "claw" ? Dt[p === 0 ? 0 : p - 4] : void 0;
    if (I) {
      const L = oe(
        Array.from(
          { length: 18 },
          (v, R) => I.definitions[R % I.definitions.length],
        ),
      );
      for (const v of [g, P]) {
        const R = [];
        (v.traverse((U) => {
          U.name === "preview-stock" && R.push(U);
        }),
          R.forEach((U) => U.removeFromParent()),
          (v === g ? L : L.map((U) => U.clone(!0))).forEach((U, F) => {
            ((U.name = "preview-stock"),
              U.position.set(
                ((F % 6) - 2.5) * 0.135,
                1 + Math.floor(F / 6) * 0.012,
                -0.21 + Math.floor(F / 6) * 0.19,
              ),
              U.rotation.set(
                0.12 * (F % 3),
                0.3 * (F % 4),
                0.17 * ((F % 3) - 1),
              ),
              U.scale.setScalar(1.5),
              v.add(U));
          }));
      }
    }
    const C = new pt();
    (C.addLevel(g, 0), C.addLevel(P, 7.5));
    const N = new _();
    (N.add(C),
      N.position.set(c, 0, y),
      (N.rotation.y = p === 0 ? -0.07 : Math.sin(p * 2.4) * 0.11),
      d.add(N));
    const D = N.getObjectByName("claw");
    (t.push({
      kind: m,
      ...(I ? { stockId: I.id } : {}),
      id: `${m}-${p}`,
      name:
        m === "cut"
          ? "Snip & Win"
          : m === "spin"
            ? "Egg Orbit"
            : m === "pusher"
              ? "Coin Cascade"
              : m === "tower"
                ? "Tower Tumble"
                : I.name,
      group: N,
      claw: D,
      x: c,
      z: y,
    }),
      e.push({
        minX: c - 0.73,
        maxX: c + 0.73,
        minZ: y - 0.58,
        maxZ: y + 0.86,
      }),
      u(1.35, 0.018, 0.024, c, 0.018, y + 0.92, p % 2 ? r : f));
  });
  const B = new Ee(16767927, 32, 11, 0.48, 0.65, 1.3);
  (B.position.set(1.6, 3.75, 2.3),
    B.target.position.set(0, 0.95, 0),
    (B.castShadow = !0),
    B.shadow.mapSize.set(2048, 2048),
    (B.shadow.bias = -3e-4),
    (B.shadow.normalBias = 0.018),
    d.add(B, B.target),
    n.push(B),
    w(-1.4, 1.8, 0.1, 16721006, 5, 5),
    w(1.6, 1.6, -0.4, 1376242, 6, 5),
    w(-3.3, 2.8, -4.6, 16722308, 10, 10),
    w(3.5, 2.8, -4.6, 2156543, 10, 10),
    w(-8.5, 2.7, -6.5, 16758863, 12, 8),
    w(9, 2.8, -6, 7839231, 9, 8),
    u(4.3, 2.4, 0.46, -8.5, 1.55, -7.35, o, !0));
  const $ = [15383770, 10938839, 16177309, 12689901].map(
    (c) => new se({ color: c, roughness: 0.95, sheen: 1, sheenRoughness: 0.6 }),
  );
  for (let c = 0; c < 3; c++) {
    (u(4.15, 0.04, 0.65, -8.5, 0.72 + c * 0.66, -7.06, a),
      u(4.05, 0.016, 0.018, -8.5, 0.735 + c * 0.66, -6.73, b));
    for (let y = 0; y < 8; y++) {
      const p = $[(c + y) % 4],
        m = new _();
      m.position.set(-10.2 + y * 0.48, 0.88 + c * 0.66, -6.99);
      for (const [x, g, P, I, C, N, D] of [
        [0.12, 0, 0, 0, 1, 1.2, 0.8],
        [0.11, 0, 0.18, 0, 1, 0.85, 0.85],
        [0.04, -0.08, 0.27, 0, 1, 1, 0.6],
        [0.04, 0.08, 0.27, 0, 1, 1, 0.6],
      ]) {
        const L = new V(new de(x, 20, 12), p);
        (L.position.set(g, P, I), L.scale.set(C, N, D), m.add(L));
      }
      d.add(m);
    }
  }
  (u(4.6, 0.92, 1.1, -8.5, 0.46, -4.6, i, !0),
    u(4.75, 0.1, 1.22, -8.5, 0.95, -4.6, a, !0),
    u(4.3, 0.025, 0.04, -8.5, 0.8, -4.025, b),
    k("YOUR NEXT LITTLE OBSESSION", 3.7, 0.33, -8.5, 0.45, -4.033, "#ffe2bb"),
    e.push({ minX: -10.9, maxX: -6.1, minZ: -5.2, maxZ: -4 }),
    e.push({ minX: -10.8, maxX: -6.2, minZ: -7.7, maxZ: -6.7 }));
  for (const c of [-5.5, 6.7]) {
    (u(2.5, 0.4, 0.7, c, 0.5, 2.8, i, !0),
      u(2.5, 0.48, 0.16, c, 0.94, 2.52, i, !0));
    for (const y of [-1, 1]) u(0.045, 0.4, 0.54, c + y, 0.2, 2.8, a);
    e.push({ minX: c - 1.35, maxX: c + 1.35, minZ: 2.4, maxZ: 3.2 });
  }
  for (let c = 0; c < 2; c++) {
    const y = 8.1 + c * 1.12;
    (u(0.76, 1.64, 0.55, y, 0.82, 4, o, !0),
      u(0.81, 0.1, 0.6, y, 1.7, 4, a, !0),
      k("TOKENS", 0.64, 0.17, y, 1.43, 4.284, "#ffcf76"),
      u(0.46, 0.28, 0.018, y, 1.07, 4.286, b),
      u(0.19, 0.035, 0.035, y, 0.76, 4.3, s),
      k("OUT OF ORDER", 0.56, 0.12, y, 0.5, 4.29, "#ffcfa0"),
      e.push({ minX: y - 0.43, maxX: y + 0.43, minZ: 3.7, maxZ: 4.35 }));
  }
  // Hand-taped flyers and floor litter. Static props merge with the room geometry.
  const paper = new A({ color: 0xffdc78, roughness: 1 });
  const pinkPaper = new A({ color: 0xff4c8b, roughness: 1 });
  for (let q = 0; q < 24; q++) {
    const x = Math.sin(q * 13.17) * 6.2;
    const z = Math.cos(q * 7.31) * 3.8 - 1.5;
    // Keep the central cabinet footprint clear.
    if (Math.abs(x) < 0.9 && Math.abs(z) < 1) continue;
    const scrap = u(
      0.1 + (q % 3) * 0.035,
      0.004,
      0.24,
      x,
      0.014,
      z,
      q % 4 ? paper : pinkPaper,
    );
    scrap.rotation.y = q * 1.73;
  }
  const flyers = [
    [-5.8, 2.9, "ONE MORE GO", "#ffe156", -0.08],
    [4.9, 2.2, "NO REFUNDS ON LUCK", "#ff609f", 0.11],
    [8.6, 1.9, "LOCAL LEGENDS ONLY", "#91ffb4", -0.07],
    [-11.7, 2.0, "HIGH SCORES / LOW SLEEP", "#d9c4ff", 0.06],
  ];
  for (const [x, y, text, color, tilt] of flyers) {
    const flyer = we(text, 2.1, 0.5, color);
    flyer.position.set(x, y, -10.65);
    flyer.rotation.z = tilt;
    d.add(flyer);
    u(0.4, 0.065, 0.014, x, y + 0.28, -10.63, paper).rotation.z = -tilt;
  }
  const crooked = we("GOOD LUCK. YOU'LL NEED IT.", 3.8, 0.35, "#ffe156");
  crooked.position.set(3.2, 3.95, -6.6);
  crooked.rotation.z = -0.065;
  d.add(crooked);
  // Overhead aisle lighting and cabinet marquees: a physical arcade floor, not a showroom.
  for (let aisle = 0; aisle < 3; aisle++) {
    const z = -7 + aisle * 4.5;
    for (const x of [-6.4, 6.4]) {
      u(.065,.045,3.4,x,3.85,z,aisle % 2 ? r : f);
      u(.085,.045,3.4,x+.15,3.85,z,aisle % 2 ? f : r);
    }
  }
  for (const [label,x,color] of [["TICKET GAMES",-5.4,"#ffe24c"],["PLAY ZONE",4.8,"#52e6ff"]]) {
    u(3.7,.62,.12,x,3.55,-4.1,o,true);
    k(label,3.35,.40,x,3.55,-4.02,color);
    u(3.7,.025,.03,x,3.21,-4.01,x<0?b:f);
  }
  for (let n=0;n<8;n++) {
    const x=-5.3+n*1.5;
    u(.65,.007,.045,x,.018,-2.6,n%2?r:f);
  }
  d.updateMatrixWorld(!0);
  const h = new Map(),
    z = [];
  d.traverse((c) => {
    if (!(c instanceof V)) return;
    let y = c;
    for (; y;) {
      if (t.some((p) => y === p.group)) return;
      y = y.parent;
    }
    z.push(c);
  });
  for (const c of z) {
    if (
      !(c instanceof V) ||
      c === E ||
      c === G ||
      c === l ||
      Array.isArray(c.material) ||
      c.material.transparent ||
      (c.material instanceof A && c.material.map)
    )
      continue;
    let y = h.get(c.material);
    (y || ((y = { meshes: [], geometries: [] }), h.set(c.material, y)),
      y.meshes.push(c),
      y.geometries.push(
        (c.geometry.index
          ? c.geometry.toNonIndexed()
          : c.geometry.clone()
        ).applyMatrix4(c.matrixWorld),
      ));
  }
  for (const [c, y] of h) {
    const p = Pe(y.geometries);
    if (!p) throw new Error("Hall geometry merge failed");
    const m = new V(p, c);
    ((m.castShadow = !0),
      (m.receiveShadow = !0),
      d.add(m),
      y.meshes.forEach((x) => {
        (x.removeFromParent(), x.geometry.dispose());
      }),
      y.geometries.forEach((x) => x.dispose()));
  }
  return { group: d, cabinets: t, colliders: e, reflector: l, lights: n };
}
class ss {
  constructor(e) {
    ((this.colliders = e),
      (this.x = 0),
      (this.z = 4.2),
      (this.previousX = 0),
      (this.previousZ = 4.2),
      (this.yaw = 0),
      (this.pitch = 0),
      (this.vx = 0),
      (this.vz = 0));
  }
  step(e, t, n, s) {
    ((this.previousX = this.x), (this.previousZ = this.z));
    const o = s ? 3.2 : 1.6,
      a = Math.max(1, Math.hypot(t, n)),
      i = ((t * Math.cos(this.yaw) - n * Math.sin(this.yaw)) * o) / a,
      r = ((-t * Math.sin(this.yaw) - n * Math.cos(this.yaw)) * o) / a,
      f = 1 - Math.exp(-e / 0.08);
    ((this.vx += (i - this.vx) * f),
      (this.vz += (r - this.vz) * f),
      (this.x = this.resolve(this.x + this.vx * e, this.z, !0)),
      (this.z = this.resolve(this.z + this.vz * e, this.x, !1)));
  }
  resolve(e, t, n) {
    let s = Math.min(n ? 14.55 : 10.55, Math.max(n ? -14.55 : -10.55, e));
    const o = 0.3;
    for (const a of this.colliders) {
      const i = n ? a.minX : a.minZ,
        r = n ? a.maxX : a.maxZ,
        f = n ? a.minZ : a.minX,
        b = n ? a.maxZ : a.maxX;
      if (t <= f - o || t >= b + o || s <= i - o || s >= r + o) continue;
      s = (n ? this.x : this.z) < (i + r) * 0.5 ? i - o : r + o;
    }
    return s;
  }
  look(e, t) {
    ((this.yaw -= e),
      (this.pitch = Math.min(1.25, Math.max(-1.15, this.pitch - t))));
  }
  reset() {
    ((this.x = this.previousX = 0),
      (this.z = this.previousZ = 4.2),
      (this.yaw = this.pitch = this.vx = this.vz = 0));
  }
}
class is {
  constructor(e) {
    ((this.canvas = e),
      (this.horizontal = 0),
      (this.vertical = 0),
      (this.gantryHorizontal = 0),
      (this.gantryVertical = 0),
      (this.walkHorizontal = 0),
      (this.walkVertical = 0),
      (this.zoom = 0),
      (this.lookX = 0),
      (this.lookY = 0),
      (this.running = !1),
      (this.interact = !1),
      (this.lastPadAction = !1),
      (this.ignoreNextMouse = !1),
      (this.keys = new Set()),
      (this.pointer = null),
      (this.x = 0),
      (this.y = 0),
      (this.dragX = 0),
      (this.dragY = 0),
      (this.keyDown = (t) => {
        t.target.closest?.("button,input,select,summary,[role=dialog]") ||
          (t.code.startsWith("Arrow") && t.preventDefault(),
          this.keys.add(t.code),
          t.code === "KeyE" && !t.repeat && (this.interact = !0));
      }),
      (this.keyUp = (t) => {
        this.keys.delete(t.code);
      }),
      (this.lockChange = () => {
        ((this.lookX = this.lookY = this.dragX = this.dragY = 0),
          (this.pointer = null),
          (this.ignoreNextMouse = !0));
      }),
      (this.mouse = (t) => {
        if (document.pointerLockElement === this.canvas) {
          if (this.ignoreNextMouse) {
            this.ignoreNextMouse = !1;
            return;
          }
          ((this.lookX += Math.max(-100, Math.min(100, t.movementX)) * 0.002),
            (this.lookY += Math.max(-100, Math.min(100, t.movementY)) * 0.002));
        }
      }),
      (this.clear = () => {
        (this.keys.clear(), (this.pointer = null));
      }),
      (this.down = (t) => {
        ((this.pointer = t.pointerId),
          (this.x = t.clientX),
          (this.y = t.clientY),
          this.canvas.setPointerCapture(t.pointerId));
      }),
      (this.move = (t) => {
        document.pointerLockElement !== this.canvas &&
          this.pointer === t.pointerId &&
          ((this.dragX += (t.clientX - this.x) * 0.007),
          (this.dragY += (t.clientY - this.y) * 0.004),
          (this.x = t.clientX),
          (this.y = t.clientY));
      }),
      (this.up = () => {
        this.pointer = null;
      }),
      (this.wheel = (t) => {
        (t.preventDefault(), (this.zoom += t.deltaY * 0.002));
      }),
      window.addEventListener("keydown", this.keyDown),
      window.addEventListener("keyup", this.keyUp),
      window.addEventListener("blur", this.clear),
      document.addEventListener("mousemove", this.mouse),
      document.addEventListener("pointerlockchange", this.lockChange),
      e.addEventListener("pointerdown", this.down),
      e.addEventListener("pointermove", this.move),
      e.addEventListener("pointerup", this.up),
      e.addEventListener("pointercancel", this.up),
      e.addEventListener("wheel", this.wheel, { passive: !1 }));
  }
  sample(allowLook = true) {
    ((this.running = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight")),
      (this.horizontal =
        (this.keys.has("ArrowRight") || this.keys.has("KeyD") ? 1 : 0) -
        (this.keys.has("ArrowLeft") || this.keys.has("KeyA") ? 1 : 0)),
      (this.vertical =
        (this.keys.has("ArrowUp") || this.keys.has("KeyW") ? 1 : 0) -
        (this.keys.has("ArrowDown") || this.keys.has("KeyS") ? 1 : 0)),
      (this.gantryHorizontal =
        Number(this.keys.has("ArrowRight")) -
        Number(this.keys.has("ArrowLeft"))),
      (this.gantryVertical =
        Number(this.keys.has("ArrowUp")) - Number(this.keys.has("ArrowDown"))),
      (this.walkHorizontal =
        Number(this.keys.has("KeyD")) - Number(this.keys.has("KeyA"))),
      (this.walkVertical =
        Number(this.keys.has("KeyW")) - Number(this.keys.has("KeyS"))));
    if (allowLook) {
      this.lookX += (Number(this.keys.has("KeyL")) - Number(this.keys.has("KeyJ"))) * .012;
      this.lookY += (Number(this.keys.has("KeyK")) - Number(this.keys.has("KeyI"))) * .009;
    }
    const p = padState;
    if (p.connected) {
      const [x, y] = p.left,
        [rx, ry] = p.right;
      const dx = Number(!!p.buttons[15]) - Number(!!p.buttons[14]);
      const dy = Number(!!p.buttons[12]) - Number(!!p.buttons[13]);
      this.horizontal = Math.max(-1, Math.min(1, this.horizontal + x + dx));
      this.vertical = Math.max(-1, Math.min(1, this.vertical - y + dy));
      this.gantryHorizontal = Math.max(
        -1,
        Math.min(1, this.gantryHorizontal + x + dx),
      );
      this.gantryVertical = Math.max(
        -1,
        Math.min(1, this.gantryVertical - y + dy),
      );
      this.walkHorizontal += rx;
      this.walkVertical -= ry;
      if (allowLook) {
        this.lookX += rx * 0.018;
        this.lookY += ry * 0.018;
      }
      this.running ||= !!p.buttons[10];
    }
  }
  reset() {
    (this.clear(),
      (this.interact = !1),
      (this.horizontal =
        this.vertical =
        this.gantryHorizontal =
        this.gantryVertical =
        this.walkHorizontal =
        this.walkVertical =
          0),
      (this.dragX = this.dragY = this.zoom = this.lookX = this.lookY = 0));
  }
  dispose() {
    (window.removeEventListener("keydown", this.keyDown),
      window.removeEventListener("keyup", this.keyUp),
      window.removeEventListener("blur", this.clear),
      document.removeEventListener("mousemove", this.mouse),
      document.removeEventListener("pointerlockchange", this.lockChange),
      this.canvas.removeEventListener("pointerdown", this.down),
      this.canvas.removeEventListener("pointermove", this.move),
      this.canvas.removeEventListener("pointerup", this.up),
      this.canvas.removeEventListener("pointercancel", this.up),
      this.canvas.removeEventListener("wheel", this.wheel));
  }
}

const be = new URLSearchParams(location.search).get("quality"),
  os =
    be === "low" || be === "medium" || be === "high" || be === "ultra"
      ? be
      : "medium",
  X = Bt(() => ({
    collection: Zt(),
    collectionOpen: !1,
    collectionStatus: Ce(),
    roundPrizeNames: [],
    roundPrizeIds: [],
    playing: !1,
    activeMachine: "claw",
    clawStockId: "club",
    gripProfile: "strong",
    machineDetail: "",
    machineLoading: !1,
    machinePhase: "POSITIONING",
    machineRemaining: 20,
    machineWins: 0,
    machineRoundWins: 0,
    machineCamera: "front",
    ready: !1,
    inspecting: !1,
    walking: !1,
    targeted: null,
    fov: 72,
    paused: !1,
    settingsOpen: !1,
    muted: !1,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    quality: os,
    error: null,
    contextLost: !1,
    simulationBehind: !1,
    metrics: {
      fps: 0,
      frameMs: 0,
      updateMs: 0,
      renderMs: 0,
      calls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
      heapMb: null,
      bodies: 0,
      stepMs: 0,
    },
  }));
class as {
  constructor() {
    this.previous = "";
  }
  start(e) {
    ((this.previous = ""),
      (this.context = new AudioContext()),
      (this.motor = this.context.createOscillator()),
      (this.motor.type = "triangle"),
      (this.motor.frequency.value = 85),
      (this.gain = this.context.createGain()),
      (this.gain.gain.value = 0),
      (this.master = this.context.createGain()),
      (this.master.gain.value = e ? 0 : 1),
      this.motor
        .connect(this.gain)
        .connect(this.master)
        .connect(this.context.destination),
      this.motor.start(),
      e || this.context.resume());
  }
  updatePrizeGame(e, t, n) {
    const s = this.context,
      o = this.gain,
      a = this.motor;
    if (!s || !o || !a) return;
    const i = !t && !n;
    ((this.master.gain.value = i ? 1 : 0),
      i && s.state === "suspended" && s.resume());
    const r =
      e.phase === "SPINNING" ||
      ("motorActive" in e
        ? e.motorActive
        : e.kind === "cut" && e.phase === "READY");
    (o.gain.setTargetAtTime(i && r ? 0.012 : 0, s.currentTime, 0.06),
      a.frequency.setTargetAtTime(
        e.phase === "SPINNING"
          ? 80 + 110 * Math.sin(Math.min(1, e.phaseTime / 4.8) * Math.PI)
          : 75,
        s.currentTime,
        0.1,
      ),
      this.previous !== e.phase &&
        (i &&
          ["CLOSING", "FALLING", "RESULT"].includes(e.phase) &&
          this.click(
            e.phase === "RESULT" && e.awarded.size > e.roundStartAwards
              ? 660
              : e.phase === "FALLING"
                ? 380
                : 190,
          ),
        (this.previous = e.phase)));
  }
  update(e, t, n) {
    const s = this.context,
      o = this.gain,
      a = this.motor;
    if (!s || !o || !a) return;
    const i = !t && !n;
    ((this.master.gain.value = i ? 1 : 0),
      i && s.state === "suspended" && s.resume());
    const r = Math.hypot(e.vx, e.vz),
      f = ["DESCEND", "LIFT", "CARRY"].includes(e.phase) || r > 0.005;
    (o.gain.setTargetAtTime(i && f ? 0.018 : 0, s.currentTime, 0.06),
      a.frequency.setTargetAtTime(
        e.phase === "LIFT" ? 120 : 80 + r * 160,
        s.currentTime,
        0.1,
      ),
      this.previous !== e.phase &&
        (i &&
          ["GRIP", "RELEASE", "RESULT"].includes(e.phase) &&
          this.click(
            e.phase === "RESULT" && e.awarded.size > e.roundStartAwards
              ? 660
              : 190,
          ),
        (this.previous = e.phase)));
  }
  click(e) {
    const t = this.context,
      n = t.createOscillator(),
      s = t.createGain();
    ((n.type = "sine"),
      n.frequency.setValueAtTime(e, t.currentTime),
      n.frequency.exponentialRampToValueAtTime(e * 0.65, t.currentTime + 0.15),
      s.gain.setValueAtTime(0.04, t.currentTime),
      s.gain.exponentialRampToValueAtTime(1e-4, t.currentTime + 0.2),
      n.connect(s).connect(this.master),
      n.start(),
      n.stop(t.currentTime + 0.21),
      (n.onended = () => {
        (n.disconnect(), s.disconnect());
      }));
  }
  dispose() {
    (this.motor?.stop(),
      this.motor?.disconnect(),
      this.gain?.disconnect(),
      this.master?.disconnect(),
      this.context?.close(),
      (this.context = void 0),
      (this.motor = void 0),
      (this.gain = void 0),
      (this.master = void 0));
  }
}
const rs = {
    hall: {
      bpm: 92,
      root: 60,
      melodyGain: 0.035,
      bassGain: 0.025,
      percussion: 0.012,
      bell: !0,
    },
    claw: {
      bpm: 76,
      root: 65,
      melodyGain: 0.045,
      bassGain: 0.022,
      percussion: 0.004,
      bell: !0,
    },
    cut: {
      bpm: 132,
      root: 62,
      melodyGain: 0.033,
      bassGain: 0.035,
      percussion: 0.018,
      bell: !1,
    },
    spin: {
      bpm: 148,
      root: 60,
      melodyGain: 0.032,
      bassGain: 0.038,
      percussion: 0.022,
      bell: !1,
    },
    pusher: {
      bpm: 112,
      root: 67,
      melodyGain: 0.036,
      bassGain: 0.03,
      percussion: 0.013,
      bell: !0,
    },
    tower: {
      bpm: 138,
      root: 60,
      melodyGain: 0.035,
      bassGain: 0.036,
      percussion: 0.019,
      bell: !1,
    },
  },
  Ze = [
    0, -1, 4, 7, 9, -1, 7, 4, 2, -1, 4, 7, 12, -1, 9, 7, 4, -1, 7, 9, 12, 9, 7,
    -1, 2, 4, 7, -1, 4, -1, 0, -1, 9, -1, 12, 16, 14, -1, 12, 9, 7, -1, 9, 12,
    16, 12, 9, -1, 4, 7, 9, -1, 7, 4, 2, -1, 4, -1, 2, -1, 0, -1, -1, -1,
  ],
  me = [0, 5, 9, 7, 0, 5, 2, 7];
function hs(d, e) {
  const t = rs[d],
    n = Math.floor(e / 16),
    s = e % 16,
    o = Ze[Math.floor(e / 2) % Ze.length];
  return {
    score: t,
    duration: 60 / t.bpm / 4,
    melody: e % 2 === 0 && o >= 0 ? t.root + 12 + o : null,
    bass: s % 4 === 0 ? t.root - 12 + me[n % me.length] : null,
    chord:
      s === 0
        ? [0, [2, 9].includes(me[n % me.length]) ? 3 : 4, 7].map(
            (a) => t.root + me[n % me.length] + a,
          )
        : [],
    kick: s % 4 === 0,
    hat: s % (t.bell ? 4 : 2) === (t.bell ? 2 : 1),
    sparkle: d === "claw" && s === 14 ? t.root + 36 + (n % 2 ? 7 : 4) : null,
  };
}
const cs = (d) => 440 * 2 ** ((d - 69) / 12);
class ls {
  constructor() {
    ((this.voices = new Set()),
      (this.mode = "hall"),
      (this.muted = !1),
      (this.paused = !1),
      (this.next = 0),
      (this.step = 0));
  }
  start(e, t = "hall") {
    (this.context ||
      ((this.context = new AudioContext()),
      (this.master = this.context.createGain()),
      (this.master.gain.value = 0),
      (this.compressor = this.context.createDynamicsCompressor()),
      (this.compressor.threshold.value = -22),
      (this.compressor.knee.value = 12),
      (this.compressor.ratio.value = 3),
      this.master.connect(this.compressor).connect(this.context.destination),
      (this.timer = setInterval(() => this.schedule(), 50))),
      this.update(t, e, this.paused),
      !e && !this.paused && this.context.resume().catch(() => {}),
      (this.next = this.context.currentTime + 0.06));
  }
  setMuted(e) {
    this.update(this.mode, e, this.paused);
  }
  update(e, t, n) {
    const s = this.mode !== e,
      o = t || n;
    ((this.mode = e),
      (this.muted = t),
      (this.paused = n),
      (s || o) &&
        (this.clearVoices(),
        s && (this.step = 0),
        this.context && (this.next = this.context.currentTime + 0.08)),
      this.context &&
        this.master &&
        (this.master.gain.setTargetAtTime(
          o ? 0 : 0.24,
          this.context.currentTime,
          0.06,
        ),
        !o &&
          this.context.state === "suspended" &&
          this.context.resume().catch(() => {})));
  }
  tone(e, t, n, s, o = "sine") {
    if (!this.context || !this.master || this.voices.size >= 32) return;
    const a = this.context.createOscillator(),
      i = this.context.createGain(),
      r = this.context.createStereoPanner();
    ((r.pan.value = Math.max(-0.45, Math.min(0.45, (e - 72) * 0.025))),
      (a.type = o),
      (a.frequency.value = cs(e)),
      i.gain.setValueAtTime(0, t),
      i.gain.linearRampToValueAtTime(s, t + 0.015),
      i.gain.exponentialRampToValueAtTime(1e-4, t + n),
      a.connect(i).connect(r).connect(this.master),
      this.voices.add(a),
      (a.onended = () => {
        (this.voices.delete(a), a.disconnect(), i.disconnect(), r.disconnect());
      }),
      a.start(t),
      a.stop(t + n + 0.03));
  }
  drum(e, t, n) {
    if (!this.context || !this.master || this.voices.size >= 32) return;
    const s = this.context.createOscillator(),
      o = this.context.createGain();
    ((s.type = n ? "triangle" : "sine"),
      s.frequency.setValueAtTime(n ? 5400 : 130, e),
      s.frequency.exponentialRampToValueAtTime(
        n ? 3200 : 42,
        e + (n ? 0.045 : 0.15),
      ),
      o.gain.setValueAtTime(t, e),
      o.gain.exponentialRampToValueAtTime(1e-4, e + (n ? 0.045 : 0.18)),
      s.connect(o).connect(this.master),
      this.voices.add(s),
      (s.onended = () => {
        (this.voices.delete(s), s.disconnect(), o.disconnect());
      }),
      s.start(e),
      s.stop(e + 0.2));
  }
  schedule() {
    if (
      !this.context ||
      this.context.state !== "running" ||
      this.muted ||
      this.paused
    )
      return;
    const e = this.context.currentTime;
    for (this.next < e && (this.next = e + 0.03); this.next < e + 0.14;) {
      const t = hs(this.mode, this.step++),
        n = this.next;
      (t.melody !== null &&
        (this.tone(
          t.melody,
          n,
          t.score.bell ? 0.65 : 0.2,
          t.score.melodyGain,
          t.score.bell ? "sine" : "triangle",
        ),
        t.score.bell &&
          this.tone(t.melody + 12, n, 0.24, t.score.melodyGain * 0.18)),
        t.bass !== null &&
          this.tone(t.bass, n, 0.3, t.score.bassGain, "triangle"));
      for (const s of t.chord) this.tone(s, n, 0.9, 0.006);
      (t.kick && this.drum(n, t.score.percussion, !1),
        t.hat && this.drum(n, t.score.percussion * 0.5, !0),
        t.sparkle !== null && this.tone(t.sparkle, n, 0.7, 0.008),
        (this.next += t.duration));
    }
  }
  clearVoices() {
    for (const e of this.voices)
      try {
        e.stop();
      } catch {}
  }
  debug() {
    return {
      mode: this.mode,
      muted: this.muted,
      paused: this.paused,
      voices: this.voices.size,
      state: this.context?.state ?? "unstarted",
    };
  }
  dispose() {
    (this.timer && clearInterval(this.timer),
      this.clearVoices(),
      this.master?.disconnect(),
      this.compressor?.disconnect(),
      this.context?.close(),
      (this.context = void 0));
  }
}
class ds {
  constructor(e, t = "Grab-a-Pal") {
    ((this.machine = e),
      (this.group = new _()),
      (this.clawModel = new nt()),
      (this.head = this.clawModel.head),
      (this.hardware = new _()),
      (this.aimingTips = new _()),
      (this.tipMarkers = []),
      (this.overhead = !1),
      (this.toys = []),
      (this.shells = []),
      (this.fingers = []),
      (this.carriage = new _()));
    const n = ge(!0, !1, !0);
    this.group.add(n.group, this.hardware);
    const s = new V(
      new Oe(4, 80),
      new A({ color: 1516339, roughness: 0.62, metalness: 0.18 }),
    );
    ((s.rotation.x = -Math.PI / 2),
      (s.position.y = -0.015),
      (s.receiveShadow = !0),
      this.group.add(s));
    const o = new V(
      new ee(3.1, 0.006, 6, 96),
      new A({
        color: 8051148,
        emissive: 5815732,
        emissiveIntensity: 0.6,
        roughness: 0.5,
      }),
    );
    ((o.rotation.x = Math.PI / 2), (o.position.y = -0.009), this.group.add(o));
    const a = new Ee(16771534, 6, 8, 0.6, 0.65, 1.8);
    ((this.key = a),
      a.position.set(0.5, 3, 1.5),
      a.target.position.set(0, 1.15, 0),
      (a.castShadow = !0),
      a.shadow.mapSize.set(1024, 1024),
      (a.shadow.bias = -1e-4),
      this.group.add(a, a.target));
    const i = new Se(7596008, 0.7, 3, 2);
    (i.position.set(-0.3, 1.85, 0.22), this.group.add(i));
    const r = new Se(16747438, 0.6, 3, 2);
    (r.position.set(0.35, 1.65, -0.25), this.group.add(r));
    const f = new A({ color: 14477041, metalness: 1, roughness: 0.2 }),
      b = new A({ color: 2370370, metalness: 0.45, roughness: 0.4 }),
      u = (m, x, g, P = 0, I = 0, C = 0) => {
        const N = new V(x, g);
        return (
          N.position.set(P, I, C),
          (N.castShadow = !0),
          (N.receiveShadow = !0),
          m.add(N),
          N
        );
      };
    for (const m of [-0.32, 0.32])
      u(this.hardware, new Z(0.75, 0.025, 0.025), f, 0, 1.88, m);
    ((this.depthRail = u(
      this.hardware,
      new Z(0.028, 0.028, 0.66),
      f,
      0,
      1.87,
      0,
    )),
      this.hardware.add(this.carriage),
      u(this.carriage, new Z(0.085, 0.045, 0.09), b));
    const k = u(this.carriage, new H(0.026, 0.026, 0.07, 24), f);
    ((k.rotation.z = Math.PI / 2),
      this.hardware.add(this.clawModel.group),
      (this.fingers = this.clawModel.fingers),
      (this.cable = u(this.hardware, new H(0.002, 0.002, 1, 8), b)),
      (this.toys = oe(e.prizes.map((m) => m.definition))),
      this.group.add(...this.toys),
      (this.shells = this.toys.map((m) => m.getObjectByName("soft-shell"))));
    const w = new A({ color: 1579306, roughness: 0.92 });
    u(this.group, new Z(0.7, 0.78, 0.012), w, 0, 1.35, -0.53);
    const E = document.createElement("canvas");
    ((E.width = 1024), (E.height = 512));
    const l = E.getContext("2d");
    ((l.fillStyle = "#172837"),
      l.fillRect(0, 0, 1024, 512),
      (l.strokeStyle = "#6bada5"),
      (l.lineWidth = 5),
      l.strokeRect(24, 24, 976, 464),
      (l.textAlign = "center"),
      (l.fillStyle = "#f2d7a1"),
      (l.font = "72px Bungee"),
      l.fillText(t.toUpperCase(), 512, 188),
      (l.fillStyle = "#9dcfc5"),
      (l.font = "30px Atkinson Hyperlegible"),
      l.fillText("ORIGINAL PALS & SEALED SURPRISES", 512, 257),
      (l.font = "22px Atkinson Hyperlegible"),
      l.fillText("EST. AFTER DARK   •   SERIES 01", 512, 407));
    for (let m = 0; m < 7; m++) {
      (l.save(),
        l.translate(230 + m * 94, 329),
        l.rotate(m * 0.6),
        (l.strokeStyle = "#ffb9ca"),
        l.beginPath());
      for (let x = 0; x < 10; x++) {
        const g = (x * Math.PI) / 5 - Math.PI / 2,
          P = x % 2 ? 9 : 19,
          I = Math.cos(g) * P,
          C = Math.sin(g) * P;
        x === 0 ? l.moveTo(I, C) : l.lineTo(I, C);
      }
      (l.closePath(), l.stroke(), l.restore());
    }
    const S = new he(E);
    ((S.colorSpace = te),
      u(
        this.group,
        new ae(0.53, 0.15),
        new A({ map: S, roughness: 1 }),
        0,
        1.79,
        -0.5,
      ),
      oe(Array.from({ length: 12 }, (m, x) => e.prizes[x].definition)).forEach(
        (m, x) => {
          (m.position.set(
            -0.27 + (x % 6) * 0.108,
            1.32 + Math.floor(x / 6) * 0.18,
            -0.43,
          ),
            (m.rotation.y = ((x % 3) - 1) * 0.12),
            this.group.add(m));
        },
      ));
    for (const m of [1.28, 1.46])
      (u(this.group, new Z(0.67, 0.012, 0.12), f, 0, m, -0.43),
        u(
          this.group,
          new Z(0.63, 0.004, 0.004),
          new A({
            color: 16770741,
            emissive: 16758901,
            emissiveIntensity: 1.4,
          }),
          0,
          m + 0.007,
          -0.365,
        ));
    const M = document.createElement("canvas");
    ((M.width = 512), (M.height = 64));
    const T = M.getContext("2d");
    ((T.fillStyle = "#122638"),
      T.fillRect(0, 0, 512, 64),
      (T.fillStyle = "#ffe5b9"),
      (T.textAlign = "center"),
      (T.font = "bold 26px Atkinson Hyperlegible"),
      T.fillText("SHOWCASE · DISPLAY STOCK", 256, 43));
    const q = new he(M);
    ((q.colorSpace = te),
      u(this.group, new ae(0.5, 0.04), new A({ map: q }), 0, 1.68, -0.355),
      u(this.group, new Z(0.18, 0.012, 0.2), b, -0.26, 0.815, 0.25));
    const B = new A({ color: 1778487, roughness: 0.86 });
    (u(this.group, new Z(0.7, 0.025, 0.5), B, 0, 0.91, -0.1),
      u(this.group, new Z(0.5, 0.025, 0.2), B, 0.1, 0.91, 0.25),
      u(this.group, new Z(0.18, 0.01, 0.2), b, -0.26, 0.57, 0.25));
    const $ = new A({ color: 16762988, metalness: 0.65, roughness: 0.35 });
    (u(this.group, new K(0.18, 0.12, 0.02, 3, 0.003), $, -0.26, 0.97, 0.15),
      u(this.group, new K(0.02, 0.12, 0.2, 3, 0.003), $, -0.16, 0.97, 0.25),
      u(this.group, new K(0.19, 0.009, 0.028, 2, 0.003), f, -0.26, 1.026, 0.15),
      u(this.group, new K(0.028, 0.009, 0.2, 2, 0.003), f, -0.16, 1.026, 0.25));
    for (const m of [-0.33, -0.19]) {
      const x = u(
        this.group,
        new H(0.004, 0.004, 0.002, 12),
        f,
        m,
        0.937,
        0.162,
      );
      ((x.rotation.x = Math.PI / 2),
        u(this.group, new Z(0.005, 8e-4, 0.001), b, m, 0.937, 0.164));
    }
    const h = document.createElement("canvas");
    ((h.width = 512), (h.height = 128));
    const z = h.getContext("2d");
    ((z.fillStyle = "#172837"),
      z.fillRect(0, 0, 512, 128),
      (z.fillStyle = "#ffe6b2"),
      (z.textAlign = "center"),
      (z.font = "48px Bungee"),
      z.fillText("PRIZE DROP", 256, 84));
    const c = new he(h);
    ((c.colorSpace = te),
      u(
        this.group,
        new ae(0.135, 0.034),
        new A({ map: c, roughness: 0.8 }),
        -0.26,
        0.983,
        0.161,
      ),
      (this.aimingRing = new V(
        new We(0.013, 0.015, 32),
        new xe({
          color: 9306096,
          transparent: !0,
          opacity: 0.9,
          depthTest: !1,
          depthWrite: !1,
          side: Ge,
        }),
      )),
      (this.aimingRing.rotation.x = -Math.PI / 2),
      (this.aimingRing.renderOrder = 20),
      this.group.add(this.aimingRing),
      (this.aimingRing.visible = !1));
    const y = new xe({
        color: 16764022,
        depthTest: !1,
        depthWrite: !1,
        side: Ge,
      }),
      p = new We(0.005, 0.009, 24);
    for (let m = 0; m < 3; m++) {
      const x = new V(p, y);
      ((x.rotation.x = -Math.PI / 2),
        (x.renderOrder = 21),
        this.aimingTips.add(x),
        this.tipMarkers.push(x));
    }
    (this.group.add(this.aimingTips),
      (this.aimingTips.visible = !1),
      this.render(1));
  }
  setCamera(e) {
    const t = this.group.getObjectByName("roof");
    ((this.overhead = e === "overhead"),
      t && (t.visible = !this.overhead),
      (this.hardware.visible = !this.overhead),
      (this.aimingRing.visible = this.overhead),
      (this.aimingTips.visible = this.overhead),
      (this.key.intensity = this.overhead ? 4 : 6));
  }
  render(e, t = !1) {
    const n = this.machine;
    (this.head.position.lerpVectors(
      n.headPrevious,
      new O().copy(n.head.translation()),
      e,
    ),
      this.head.quaternion.slerpQuaternions(
        n.headPreviousRotation,
        new pe().copy(n.head.rotation()),
        e,
      ),
      this.aimingRing.position.set(
        this.head.position.x,
        1.18,
        this.head.position.z,
      ),
      this.carriage.position.set(n.x, 1.855, n.z),
      (this.depthRail.position.x = n.x));
    const s = new O(n.x, 1.855, n.z),
      o = this.head.position
        .clone()
        .add(
          this.clawModel.suspensionEye
            .clone()
            .applyQuaternion(this.head.quaternion),
        );
    (this.cable.position.copy(s).add(o).multiplyScalar(0.5),
      (this.cable.scale.y = s.distanceTo(o)),
      this.cable.quaternion.setFromUnitVectors(
        new O(0, 1, 0),
        s.sub(o).normalize(),
      ));
    for (let a = 0; a < n.fingers.length; a++) {
      const i = n.fingers[a],
        r = this.fingers[a];
      (r.position.lerpVectors(
        i.previous,
        new O().copy(i.body.translation()),
        e,
      ),
        r.quaternion.slerpQuaternions(
          i.previousRotation,
          new pe().copy(i.body.rotation()),
          e,
        ),
        Wt(a, r.position, r.quaternion, 1.18, this.tipMarkers[a].position));
    }
    this.clawModel.updateLinks();
    for (let a = 0; a < n.prizes.length; a++) {
      const i = n.prizes[a],
        r = this.toys[a];
      ((r.visible = !i.collected),
        !i.collected &&
          (i.response.matrix(e, t || !Ie(i.definition), this.shells[a].matrix),
          (this.shells[a].matrixWorldNeedsUpdate = !0),
          r.position.lerpVectors(
            i.previous,
            new O().copy(i.body.translation()),
            e,
          ),
          r.quaternion.slerpQuaternions(
            i.previousRotation,
            new pe().copy(i.body.rotation()),
            e,
          )));
    }
  }
  dispose() {
    const e = new Set(),
      t = new Set(),
      n = new Set();
    (this.group.traverse((s) => {
      if (
        (s instanceof $e && "shadow" in s && s.shadow.dispose(),
        s instanceof V || s instanceof ut)
      ) {
        e.add(s.geometry);
        for (const o of Array.isArray(s.material) ? s.material : [s.material]) {
          t.add(o);
          for (const a of Object.values(o)) a instanceof ze && n.add(a);
        }
      }
    }),
      e.forEach((s) => s.dispose()),
      t.forEach((s) => s.dispose()),
      n.forEach((s) => s.dispose()),
      this.group.removeFromParent(),
      this.machine.dispose());
  }
}
class ps {
  constructor(e) {
    ((this.game = e),
      (this.group = new _()),
      (this.cutter = new _()),
      (this.blades = []),
      (this.wheel = new _()),
      (this.prizeId = -1),
      (this.position = new O()),
      (this.direction = new O()),
      (this.up = new O(0, 1, 0)));
    try {
      const t = ge(!0, !1);
      this.group.add(t.group);
      const n = t.group.getObjectByName("roof");
      n && (n.visible = !1);
      const s = new A({ color: 13161704, metalness: 0.9, roughness: 0.24 }),
        o = new A({ color: 1515061, metalness: 0.35, roughness: 0.5 }),
        a = new A({
          color: 8519664,
          emissive: 3328949,
          emissiveIntensity: 1.5,
        }),
        i = (k, w, E, l, S, G = this.group) => {
          const M = new V(k, w);
          return (
            M.position.set(E, l, S),
            (M.castShadow = M.receiveShadow = !0),
            G.add(M),
            M
          );
        };
      (i(new Z(0.72, 0.96, 0.015), o, 0, 1.43, -0.345),
        i(new K(0.68, 0.06, 0.52, 3, 0.012), o, 0, 0.8, 0),
        i(new Z(0.64, 0.006, 0.012), a, 0, 0.835, 0.26));
      const r = we(
        e.kind === "cut" ? "SNIP & WIN" : "EGG ORBIT",
        0.59,
        0.095,
        e.kind === "cut" ? "#ffb896" : "#d8b5ff",
      );
      (r.position.set(0, 1.89, -0.32), this.group.add(r));
      const f = we(
        e.kind === "cut"
          ? "ONE THREAD. ONE PERFECT MOMENT."
          : "GOLD 1/16 · EVERY SPIN DELIVERS",
        0.57,
        0.041,
        "#b3eadc",
      );
      (f.position.set(0, 0.73, 0.38), this.group.add(f));
      const b = new Ee(16770767, 6, 6, 0.6, 0.6, 1.7);
      (b.position.set(0.45, 2.8, 1.2),
        b.target.position.set(0, 1.35, 0),
        (b.castShadow = !0),
        b.shadow.mapSize.set(1024, 1024),
        this.group.add(b, b.target));
      const u = new Se(9798399, 0.6, 3);
      if (
        (u.position.set(-0.25, 1.7, 0.2),
        this.group.add(u),
        (this.thread = i(
          new H(0.0014, 0.0014, 1, 8),
          new A({ color: 16772792, roughness: 1 }),
          0,
          1.7,
          0,
        )),
        (this.thread.visible = e.kind === "cut"),
        e.kind === "cut")
      ) {
        const k = new A({ color: 5467266, metalness: 0.5, roughness: 0.65 }),
          w = new A({ color: 15984597, metalness: 0.25, roughness: 0.65 }),
          E = new A({
            color: 16763288,
            emissive: 7684649,
            emissiveIntensity: 0.12,
            metalness: 0.25,
            roughness: 0.65,
          });
        (i(new Z(0.63, 0.025, 0.035), k, 0, e.cutterY + 0.05, 0.12),
          i(new Z(0.6, 0.008, 0.006), a, 0, e.cutterY + 0.067, 0.14),
          this.cutter.position.set(0, e.cutterY, 0),
          this.group.add(this.cutter),
          i(
            new K(0.046, 0.054, 0.048, 2, 0.006),
            o,
            0,
            0.039,
            0.1,
            this.cutter,
          ));
        for (const S of [-1, 1]) {
          const G = i(
            new K(0.065, 0.011, 0.019, 2, 0.002),
            w,
            S * 0.027,
            0,
            0,
            this.cutter,
          );
          ((G.rotation.z = S * 0.42),
            this.blades.push(G),
            i(
              new ee(0.012, 0.0035, 8, 24),
              E,
              S * 0.045,
              0.013,
              0.02,
              this.cutter,
            ));
        }
        (oe([j[6], j[2], j[6], j[5]]).forEach((S, G) => {
          (S.position.set(-0.24 + G * 0.16, G % 2 ? 1.02 : 1.06, -0.23),
            (S.rotation.x = G % 2 ? -0.15 : Math.PI / 2),
            this.group.add(S));
        }),
          i(new Z(0.64, 0.014, 0.15), s, 0, 0.985, -0.23));
      } else {
        (this.wheel.position.set(0, 1.48, -0.2), this.group.add(this.wheel));
        const k = document.createElement("canvas");
        k.width = k.height = 1024;
        const w = k.getContext("2d");
        for (let T = 0; T < 16; T++) {
          const q = (T * Math.PI * 2) / 16 - Math.PI / 2,
            B = ((T + 1) * Math.PI * 2) / 16 - Math.PI / 2;
          ((w.fillStyle = T === 0 ? "#ffc752" : T % 2 ? "#a998df" : "#247a85"),
            w.beginPath(),
            w.moveTo(512, 512),
            w.arc(512, 512, 475, q, B),
            w.closePath(),
            w.fill(),
            (w.strokeStyle = "#18223d"),
            (w.lineWidth = 7),
            w.stroke(),
            w.save(),
            w.translate(512, 512),
            w.rotate((q + B) / 2 + Math.PI / 2),
            (w.fillStyle = "#fff0d5"),
            (w.textAlign = "center"),
            (w.font = "bold 35px Atkinson Hyperlegible"),
            w.fillText(T === 0 ? "GOLD" : T % 2 ? "EGG" : "100", 0, -330),
            w.restore());
        }
        const E = new he(k);
        E.colorSpace = te;
        const l = new A({ map: E, roughness: 0.42, metalness: 0.2 });
        i(new Oe(0.269, 96), l, 0, 0, 0.023, this.wheel);
        const S = i(new H(0.283, 0.283, 0.035, 64), s, 0, 0, 0, this.wheel);
        ((S.rotation.x = Math.PI / 2),
          i(new ee(0.282, 0.008, 12, 80), a, 0, 1.48, -0.17),
          (i(
            new H(0.022, 0.022, 0.022, 24),
            s,
            0,
            0,
            0.035,
            this.wheel,
          ).rotation.x = Math.PI / 2));
        const G = i(
          new ke(0.023, 0.055, 3),
          new A({ color: 16764018, metalness: 0.6, roughness: 0.25 }),
          0,
          1.77,
          -0.12,
        );
        ((G.rotation.z = Math.PI),
          oe(Ut.slice(0, 12).map((T) => j.find((q) => q.id === T))).forEach(
            (T, q) => {
              (T.position.set(
                -0.27 + (q % 6) * 0.105,
                0.93 + Math.floor(q / 6) * 0.085,
                -0.23,
              ),
                (T.rotation.z = ((q % 3) - 1) * 0.12),
                this.group.add(T));
            },
          ),
          i(new Z(0.63, 0.012, 0.12), s, 0, 0.875, -0.23));
      }
      this.render(1);
    } catch (t) {
      throw (ce(this.group), t);
    }
  }
  render(e) {
    const t = this.game.currentPrize;
    if (
      (t &&
        t.id !== this.prizeId &&
        (this.prize && ce(this.prize),
        this.contents && ce(this.contents),
        (this.contents = void 0),
        (this.prize = oe([t.definition])[0]),
        (this.prizeId = t.id),
        this.group.add(this.prize),
        t.contents &&
          ((this.contents = oe([t.contents])[0]),
          this.contents.scale.setScalar(0.55),
          (this.contents.visible = !1),
          this.group.add(this.contents))),
      !t &&
        this.prize &&
        (ce(this.prize),
        (this.prize = void 0),
        (this.prizeId = -1),
        this.contents && ce(this.contents),
        (this.contents = void 0)),
      t &&
        this.prize &&
        (this.prize.position.lerpVectors(
          this.position.copy(t.previous),
          this.direction.copy(t.body.translation()),
          e,
        ),
        this.prize.quaternion.copy(t.body.rotation()),
        this.game.kind === "cut" && !this.game.cut))
    ) {
      const s = this.game.tiePoint;
      (this.position.set(s.x, s.y, s.z),
        this.direction.set(0, 1.9, 0).sub(this.position));
      const o = this.direction.length();
      (this.thread.position
        .copy(this.position)
        .addScaledVector(this.direction, 0.5),
        (this.thread.scale.y = o),
        this.thread.quaternion.setFromUnitVectors(
          this.up,
          this.direction.normalize(),
        ));
    }
    (t &&
      this.contents &&
      ((this.contents.visible = t.won),
      this.contents.position
        .copy(t.body.translation())
        .add(this.position.set(0, 0.085, 0))),
      (this.thread.visible = this.game.kind === "cut" && !this.game.cut),
      (this.cutter.position.x = ne.lerp(
        this.game.previousCutterX,
        this.game.cutterX,
        e,
      )));
    const n =
      this.game.phase === "CLOSING"
        ? Math.min(1, this.game.phaseTime / 0.1)
        : this.game.phase === "READY"
          ? 0
          : 1;
    (this.blades.forEach(
      (s, o) => (s.rotation.z = (o === 0 ? -1 : 1) * 0.42 * (1 - n)),
    ),
      (this.wheel.rotation.z = ne.lerp(
        this.game.previousWheelAngle,
        this.game.wheelAngle,
        e,
      )));
  }
  dispose() {
    (ce(this.group), this.game.dispose());
  }
}
class us {
  constructor(e) {
    ((this.game = e),
      (this.group = new _()),
      (this.nozzle = new _()),
      (this.transform = new tt()),
      (this.position = new O()),
      (this.rotation = new pe()));
    try {
      const t = ge(!0, !1);
      this.group.add(t.group);
      const n = t.group.getObjectByName("roof");
      n && (n.visible = !1);
      const s = new A({ color: 1320246, roughness: 0.45, metalness: 0.55 }),
        o = new A({ color: 11584726, roughness: 0.32, metalness: 0.8 }),
        a = new A({ color: 15250520, roughness: 0.32, metalness: 0.8 }),
        i = new A({
          color: 8454111,
          emissive: 2215852,
          emissiveIntensity: 1.4,
        }),
        r = (M, T, q, B, $, h, z) => {
          const c = new V(new K(M, T, q, 2, Math.min(M, T, q) * 0.18), z);
          return (
            c.position.set(B, $, h),
            (c.castShadow = c.receiveShadow = !0),
            this.group.add(c),
            c
          );
        };
      (r(0.64, 0.05, 0.575, 0, 1.005, -0.0525, s),
        r(0.64, 0.004, 0.009, 0, 1.032, 0.23, i),
        r(0.64, 0.035, 0.75, 0, 0.746, 0.015, s),
        r(0.64, 0.025, 0.03, 0, 0.8, 0.37, o),
        r(0.64, 0.67, 0.014, 0, 1.39, -0.345, s),
        (this.shelf = r(0.62, 0.06, 0.15, 0, 1.055, -0.31, o)));
      const f = we(
        e.kind === "tower" ? "TOWER TUMBLE" : "COIN CASCADE",
        0.62,
        0.095,
        "#ffdc91",
      );
      (f.position.set(0, 1.87, -0.32), this.group.add(f));
      const b = we("FRONT TROUGH · 5 TICKETS PER COIN", 0.61, 0.04, "#aaffdd");
      (b.position.set(0, 0.705, 0.39),
        this.group.add(b),
        r(0.61, 0.018, 0.024, 0, 1.54, -0.16, o));
      const u = new V(new H(0.031, 0.026, 0.075, 24, 1, !0), o);
      ((u.position.y = 1.525), this.nozzle.add(u));
      const k = new V(new ee(0.026, 0.003, 8, 24), a);
      ((k.rotation.x = Math.PI / 2),
        (k.position.y = 1.49),
        this.nozzle.add(k),
        this.group.add(this.nozzle));
      const w = new xe({
        color: 11206621,
        transparent: !0,
        opacity: 0.9,
        depthTest: !1,
        depthWrite: !1,
        toneMapped: !1,
      });
      ((this.guide = new V(new ee(0.028, 0.0025, 6, 32), w)),
        (this.guide.renderOrder = 20));
      for (const M of [
        [0.016, 0.0018, 0.001],
        [0.0018, 0.016, 0.001],
      ]) {
        const T = new V(new Z(...M), w);
        ((T.renderOrder = 20), this.guide.add(T));
      }
      ((this.guide.rotation.x = Math.PI / 2),
        this.group.add(this.guide),
        (this.trajectory = new V(
          new H(6e-4, 6e-4, 1, 6),
          new xe({
            color: 8585179,
            transparent: !0,
            opacity: 0.3,
            depthWrite: !1,
          }),
        )),
        this.group.add(this.trajectory));
      const E = [new H(He, He, qt * 2, 32)];
      for (const M of [-1, 1])
        (E.push(
          new ee(0.0205, 6e-4, 6, 32)
            .rotateX(Math.PI / 2)
            .translate(0, M * 0.0031, 0),
        ),
          E.push(new H(0.008, 0.008, 4e-4, 6).translate(0, M * 0.0033, 0)));
      const l = Pe(E);
      (E.forEach((M) => M.dispose()),
        (this.coins = new et(l, a, 256)),
        this.coins.instanceMatrix.setUsage(mt),
        (this.coins.castShadow = this.coins.receiveShadow = !0),
        (this.coins.frustumCulled = !1),
        this.group.add(this.coins));
      const S = new Se(5762761, 0.7, 3);
      (S.position.set(-0.2, 1.5, 0.15), this.group.add(S));
      const G = new Ee(16768423, 5, 6, 0.6, 0.5, 1.7);
      (G.position.set(0.4, 2.7, 1.3),
        G.target.position.set(0, 1.04, 0),
        (G.castShadow = !0),
        G.shadow.mapSize.set(1024, 1024),
        this.group.add(G, G.target),
        this.render(1));
    } catch (t) {
      throw (ce(this.group), t);
    }
  }
  render(e) {
    let t = 0;
    const n = this.game.kind === "tower" ? this.game.aimZ : -0.115,
      s = this.game.landingHeight;
    for (const o of this.game.prizes)
      o.collected ||
        (this.position.lerpVectors(
          o.previous,
          this.transform.position.copy(o.body.translation()),
          e,
        ),
        this.rotation.slerpQuaternions(
          o.previousRotation,
          this.transform.quaternion.copy(o.body.rotation()),
          e,
        ),
        this.transform.position.copy(this.position),
        this.transform.quaternion.copy(this.rotation),
        this.transform.updateMatrix(),
        this.coins.setMatrixAt(t++, this.transform.matrix));
    ((this.coins.count = t),
      (this.coins.instanceMatrix.needsUpdate = !0),
      (this.shelf.position.z = ne.lerp(
        this.game.previousPusherZ,
        this.game.pusherZ,
        e,
      )),
      this.nozzle.position.set(
        this.game.aimX,
        0,
        this.game.kind === "tower" ? this.game.aimZ : -0.115,
      ),
      this.guide.position.set(
        this.nozzle.position.x,
        s,
        this.nozzle.position.z,
      ),
      this.trajectory.position.set(this.game.aimX, (1.49 + s) / 2, n),
      (this.trajectory.scale.y = Math.max(0.001, 1.49 - s)));
  }
  dispose() {
    (this.coins.dispose(), ce(this.group), this.game.dispose());
  }
}
class vs {
  constructor(e) {
    ((this.scene = new ft()),
      (this.camera = new wt(36, 1, 0.1, 70)),
      (this.hall = ts()),
      (this.player = new ss(this.hall.colliders)),
      (this.selected = this.hall.cabinets[0]),
      (this.clock = new ns()),
      (this.audio = new ls()),
      (this.clawAudio = new as()),
      (this.machineGeneration = 0),
      (this.machineKey = (i) => {
        this.state.playing &&
          !this.state.paused &&
          i.code === "Space" &&
          !i.repeat &&
          !i.target.closest("button,input,select,summary") &&
          (i.preventDefault(), this.dropClaw());
      }),
      (this.raf = 0),
      (this.last = 0),
      (this.time = 0),
      (this.previousTime = 0),
      (this.angle = 0.4),
      (this.elevation = 0.04),
      (this.distance = 4.8),
      (this.width = innerWidth),
      (this.height = innerHeight),
      (this.target = new O()),
      (this.frames = 0),
      (this.sampleMs = 0),
      (this.renderTotal = 0),
      (this.updateTotal = 0),
      (this.resetId = 0),
      (this.state = X.getState()),
      (this.blend = 1),
      (this.fromPosition = new O()),
      (this.fromRotation = new pe()),
      (this.desiredPosition = new O()),
      (this.desiredRotation = new pe()),
      (this.desiredEuler = new gt(0, 0, 0, "YXZ")),
      (this.nearest = null),
      (this.lockLook = () => {
        if (!(
          !this.state.walking ||
          this.state.inspecting ||
          this.state.paused
        ))
          try {
            const i = this.renderer.domElement.requestPointerLock();
            i instanceof Promise && i.catch(() => {});
          } catch {}
      }),
      (this.fixedUpdate = (i) => {
        if (
          ((this.previousTime = this.time),
          (this.time += i),
          this.input.sample(
            this.state.walking && !this.state.inspecting && !this.state.playing,
          ),
          this.state.playing && this.prizeGame)
        ) {
          (this.input.interact && this.prizeGame.action(),
            this.prizeGame instanceof ve
              ? this.prizeGame.step(
                  i,
                  this.input.horizontal,
                  this.input.vertical,
                )
              : this.prizeGame.step(i));
          const r = X.getState().collection,
            f = Be(this.prizeGame, r);
          (f !== r && X.setState({ collection: f, collectionStatus: Ce() }),
            (this.input.interact = !1));
          return;
        }
        if (this.state.playing && this.machine) {
          (this.input.interact && this.machine.drop(),
            (this.input.gantryHorizontal || this.input.gantryVertical) &&
              (this.machine.positioningTimerStarted = !0),
            (((this.input.walkHorizontal || this.input.walkVertical) &&
              this.state.machineCamera === "overhead") ||
              this.cabinetWalker.step(
                i,
                this.input.walkHorizontal,
                this.input.walkVertical,
              )) &&
              (X.setState({ machineCamera: "front" }),
              this.resize(),
              this.beginBlend()),
            this.machine.step(
              i,
              this.input.gantryHorizontal,
              this.input.gantryVertical,
            ));
          const r = X.getState().collection,
            f = Be(this.machine, r);
          (f !== r && X.setState({ collection: f, collectionStatus: Ce() }),
            (this.input.interact = !1));
          return;
        }
        if (this.state.walking && !this.state.inspecting) {
          (this.player.look(this.input.lookX, this.input.lookY),
            (this.input.lookX = this.input.lookY = 0),
            this.player.step(
              i,
              this.input.horizontal,
              this.input.vertical,
              this.input.running,
            ),
            (this.nearest = null));
          let r = 2.2;
          for (const f of this.hall.cabinets) {
            const b = f.x - this.player.x,
              u = f.z - this.player.z,
              k = Math.hypot(b, u),
              w =
                (-Math.sin(this.player.yaw) * b -
                  Math.cos(this.player.yaw) * u) /
                Math.max(k, 0.001);
            k < r && w > 0.65 && ((this.nearest = f), (r = k));
          }
          this.input.interact &&
            this.nearest &&
            this.inspectCabinet(this.nearest.id);
        } else
          this.state.inspecting &&
            ((this.angle += this.input.horizontal * i * 1.4),
            (this.elevation = ne.clamp(
              this.elevation + this.input.vertical * i * 0.45,
              -0.15,
              0.65,
            )));
        this.input.interact = !1;
      }),
      (this.clawCamera = new Ye()),
      (this.cabinetWalker = new Te()),
      (this.frame = (i) => {
        this.raf = requestAnimationFrame(this.frame);
        const r = Math.min(Math.max((i - this.last) / 1e3, 0), 0.1);
        if (
          ((this.last = i),
          this.machine
            ? this.clawAudio.update(
                this.machine,
                this.state.muted,
                this.state.paused || document.hidden || this.state.contextLost,
              )
            : this.prizeGame &&
              this.clawAudio.updatePrizeGame(
                this.prizeGame,
                this.state.muted,
                this.state.paused || document.hidden || this.state.contextLost,
              ),
          document.hidden ||
            this.state.paused ||
            this.state.contextLost ||
            this.state.collectionOpen)
        )
          return;
        const f = performance.now(),
          b = this.state.paused ? 0 : this.clock.advance(r, this.fixedUpdate),
          u = performance.now(),
          k = this.clock.backlogSeconds >= 0.1;
        (k !== this.state.simulationBehind &&
          X.setState({ simulationBehind: k }),
          this.state.paused ||
            ((this.blend = Math.min(1, this.blend + Math.min(r, 0.1) / 0.7)),
            this.state.inspecting && !this.state.playing
              ? ((this.angle += this.input.dragX),
                (this.elevation = ne.clamp(
                  this.elevation + this.input.dragY,
                  -0.15,
                  0.65,
                )),
                (this.distance = ne.clamp(
                  this.distance + this.input.zoom,
                  2.3,
                  6.5,
                )))
              : this.state.walking &&
                !this.state.playing &&
                this.player.look(
                  this.input.dragX * 0.3,
                  this.input.dragY * 0.5,
                )),
          (this.input.dragX = this.input.dragY = this.input.zoom = 0),
          this.placeCamera(b, this.state.paused ? 0 : r),
          this.benchmarkCamera?.(this.camera));
        if (!this.state.playing)
          for (const l of this.hall.cabinets)
            l.group.visible =
              this.state.quality !== "low" ||
              Math.hypot(
                l.x - this.camera.position.x,
                l.z - this.camera.position.z,
              ) < 7.5;
        const w = this.previousTime + (this.time - this.previousTime) * b;
        this.dust.uniforms.time.value = this.state.reducedMotion ? 0 : w;
        if (!this.state.playing)
          for (let l = 0; l < this.hall.cabinets.length; l++)
            this.hall.cabinets[l].claw.rotation.z = this.state.reducedMotion
              ? 0
              : Math.sin(w * 0.9 + l) * 0.014;
        (this.machineView?.setCamera(this.state.machineCamera),
          this.machineView?.render(b, this.state.reducedMotion),
          this.prizeGameView?.render(b),
          this.state.playing && (this.renderer.shadowMap.needsUpdate = !0),
          this.renderer.info.reset(),
          this.state.quality === "low"
            ? this.renderer.render(this.scene, this.camera)
            : this.composer.render(Math.min(r, 0.1)));
        const E = performance.now();
        if (
          (this.benchmarkObserver?.({
            frameMs: r * 1e3,
            updateCpuMs: u - f,
            renderCpuMs: E - u,
            calls: this.renderer.info.render.calls,
            triangles: this.renderer.info.render.triangles,
            geometries: this.renderer.info.memory.geometries,
            textures: this.renderer.info.memory.textures,
            programs: this.renderer.info.programs?.length ?? 0,
            simulationSteps: this.state.paused ? 0 : this.clock.stepsLastFrame,
            backlogSeconds: this.clock.backlogSeconds,
            resetDiscardedSeconds: this.clock.resetDiscardedSeconds,
          }),
          this.frames++,
          (this.sampleMs += r * 1e3),
          (this.updateTotal += u - f),
          (this.renderTotal += E - u),
          this.sampleMs >= 500)
        ) {
          const l = this.renderer.info,
            S = performance.memory;
          (X.setState({
            ...(this.prizeGame
              ? {
                  machinePhase: this.prizeGame.phase,
                  machineDetail: this.prizeGame.detail,
                  machineWins: this.prizeGame.awarded.size,
                  machineRoundWins:
                    this.prizeGame.awarded.size -
                    this.prizeGame.roundStartAwards,
                  roundPrizeIds: [
                    ...new Set(
                      [...this.prizeGame.awarded]
                        .slice(this.prizeGame.roundStartAwards)
                        .flatMap((G) => {
                          const M = this.prizeGame.prizes.find(
                            (T) => T.id === G,
                          );
                          return M
                            ? [
                                M.definition.id,
                                ...(M.contents ? [M.contents.id] : []),
                              ]
                            : [];
                        }),
                    ),
                  ],
                  roundPrizeNames: [
                    ...new Set(
                      [...this.prizeGame.awarded]
                        .slice(this.prizeGame.roundStartAwards)
                        .flatMap((G) => {
                          const M = this.prizeGame.prizes.find(
                            (T) => T.id === G,
                          );
                          return M
                            ? [
                                M.definition.name,
                                ...(M.contents ? [M.contents.name] : []),
                              ]
                            : [];
                        }),
                    ),
                  ],
                }
              : {}),
            ...(this.machine
              ? {
                  machinePhase: this.machine.phase,
                  machineRemaining: this.machine.remaining,
                  machineWins: this.machine.awarded.size,
                  roundPrizeIds: [...this.machine.awarded]
                    .slice(this.machine.roundStartAwards)
                    .flatMap((G) => {
                      const M = this.machine.prizes[G];
                      return [
                        M.definition.id,
                        ...(M.contents ? [M.contents.id] : []),
                      ];
                    }),
                  roundPrizeNames: [...this.machine.awarded]
                    .slice(this.machine.roundStartAwards)
                    .flatMap((G) => {
                      const M = this.machine.prizes[G];
                      return [
                        M.definition.name,
                        ...(M.contents ? [M.contents.name] : []),
                      ];
                    }),
                  machineRoundWins:
                    this.machine.awarded.size - this.machine.roundStartAwards,
                }
              : {}),
            targeted:
              this.state.walking && !this.state.inspecting
                ? (this.nearest?.id ?? null)
                : null,
            metrics: {
              fps: Math.round((this.frames * 1e3) / this.sampleMs),
              frameMs: this.sampleMs / this.frames,
              updateMs: this.updateTotal / this.frames,
              renderMs: this.renderTotal / this.frames,
              calls: l.render.calls,
              triangles: l.render.triangles,
              geometries: l.memory.geometries,
              textures: l.memory.textures,
              heapMb: S ? S.usedJSHeapSize / 1048576 : null,
              bodies:
                this.machine?.world.bodies.len() ??
                this.prizeGame?.world.bodies.len() ??
                0,
              stepMs: this.machine?.stepMs ?? this.prizeGame?.stepMs ?? 0,
            },
          }),
            (this.frames = 0),
            (this.sampleMs = this.renderTotal = this.updateTotal = 0));
        }
      }),
      (this.resize = () => {
        ((this.width = innerWidth),
          (this.height = innerHeight),
          this.renderer.setSize(this.width, this.height),
          this.composer.setSize(this.width, this.height),
          (this.camera.aspect = this.width / this.height),
          (this.camera.fov = this.state.playing
            ? this.prizeGame
              ? 36
              : this.cabinetWalker.active &&
                  this.state.machineCamera === "front"
                ? 52
                : Kt[this.state.machineCamera]
            : this.state.walking && !this.state.inspecting
              ? this.state.fov
              : 36),
          this.camera.clearViewOffset(),
          !this.state.playing &&
            !this.state.inspecting &&
            !this.state.walking &&
            this.camera.setViewOffset(
              this.width,
              this.height,
              -Math.round(this.width * 0.16),
              0,
              this.width,
              this.height,
            ),
          this.camera.updateProjectionMatrix());
      }),
      (this.visibility = () => {
        (this.input.reset(),
          this.cabinetWalker.stop(),
          this.audio.update(
            this.state.playing ? this.state.activeMachine : "hall",
            this.state.muted,
            this.state.paused || this.state.contextLost || document.hidden,
          ),
          this.machine
            ? this.clawAudio.update(
                this.machine,
                this.state.muted,
                this.state.paused || document.hidden,
              )
            : this.prizeGame &&
              this.clawAudio.updatePrizeGame(
                this.prizeGame,
                this.state.muted,
                this.state.paused || document.hidden,
              ),
          (this.last = performance.now()),
          this.clock.reset());
      }),
      (this.lost = (i) => {
        (i.preventDefault(), X.setState({ contextLost: !0 }));
      }),
      (this.restored = () => {
        (this.composer.setSize(this.width, this.height),
          (this.renderer.shadowMap.needsUpdate = !0),
          this.renderer.compile(this.scene, this.camera),
          (this.last = performance.now()),
          this.clock.reset(),
          X.setState({ contextLost: !1 }));
      }),
      (this.renderer = new yt({
        antialias: !1,
        powerPreference: "high-performance",
      })),
      (this.renderer.outputColorSpace = te),
      (this.renderer.toneMapping = vt),
      (this.renderer.toneMappingExposure = 1.04),
      (this.renderer.info.autoReset = !1),
      (this.renderer.shadowMap.enabled = !0),
      (this.renderer.shadowMap.type = bt),
      (this.renderer.shadowMap.autoUpdate = !1),
      (this.renderer.shadowMap.needsUpdate = !0),
      this.renderer.domElement.setAttribute(
        "aria-label",
        "Token Hall three-dimensional arcade",
      ),
      (this.renderer.domElement.tabIndex = 0),
      e.append(this.renderer.domElement),
      (this.input = new is(this.renderer.domElement)),
      (this.scene.background = new fe(592663)),
      (this.scene.fog = new xt(1052704, 0.023)),
      this.scene.add(new St(10468351, 2693673, 0.72)),
      this.scene.add(this.hall.group));
    const t = new Mt(),
      n = new kt(this.renderer);
    ((this.environment = n.fromScene(t, 0.04)),
      (this.scene.environment = this.environment.texture),
      (this.scene.environmentIntensity = 0.42),
      t.dispose(),
      n.dispose());
    const s = Me(42),
      o = new Float32Array(540);
    for (let i = 0; i < 180; i++)
      ((o[i * 3] = (s() - 0.5) * 18),
        (o[i * 3 + 1] = s() * 4),
        (o[i * 3 + 2] = (s() - 0.5) * 16));
    const a = new je();
    (a.setAttribute("position", new zt(o, 3)),
      (this.dust = new Pt({
        uniforms: { time: { value: 0 } },
        transparent: !0,
        depthWrite: !1,
        blending: Et,
        vertexShader:
          "uniform float time; varying float fade; void main(){vec3 p=position;p.x+=sin(time*0.10+p.y)*0.05;p.y+=sin(time*0.15+p.z)*0.04;vec4 mv=modelViewMatrix*vec4(p,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(12.0/-mv.z,1.0,3.0);fade=0.12;}",
        fragmentShader:
          "varying float fade;void main(){float r=length(gl_PointCoord-0.5);gl_FragColor=vec4(0.6,0.72,1.0,(1.0-smoothstep(0.1,0.5,r))*fade);}",
      })),
      this.scene.add(new Ue(a, this.dust)),
      (this.composer = new Tt(this.renderer, { frameBufferType: At })),
      this.composer.addPass(new Gt(this.scene, this.camera)),
      (this.normalPass = new It(this.scene, this.camera, {
        resolutionScale: 0.5,
      })),
      this.composer.addPass(this.normalPass),
      (this.aoPass = new qe(
        this.camera,
        new Ct(this.camera, this.normalPass.texture, {
          samples: 16,
          rings: 5,
          radius: 0.12,
          intensity: 1.5,
          luminanceInfluence: 0.4,
          bias: 0.025,
          fade: 0.035,
          resolutionScale: 0.5,
          worldDistanceThreshold: 12,
          worldDistanceFalloff: 2,
          worldProximityThreshold: 0.08,
          worldProximityFalloff: 0.03,
        }),
      )),
      this.composer.addPass(this.aoPass),
      this.composer.addPass(
        new qe(
          this.camera,
          new Lt({
            intensity: 0.58,
            luminanceThreshold: 1.25,
            luminanceSmoothing: 0.4,
            mipmapBlur: !0,
            radius: 0.65,
          }),
          new Rt({ offset: 0.25, darkness: 0.32 }),
          new Ot(),
        ),
      ),
      this.applyQuality(this.state.quality),
      this.resize(),
      this.placeCamera(0),
      this.renderer.compile(this.scene, this.camera),
      (this.unsubscribe = X.subscribe((i) => {
        const r = this.state;
        ((this.state = i),
          r.quality !== i.quality && this.applyQuality(i.quality),
          (r.inspecting !== i.inspecting ||
            r.walking !== i.walking ||
            r.fov !== i.fov ||
            r.machineCamera !== i.machineCamera) &&
            this.resize(),
          (r.collectionOpen !== i.collectionOpen ||
            r.paused !== i.paused ||
            r.playing !== i.playing ||
            r.inspecting !== i.inspecting) &&
            (this.input.reset(), this.cabinetWalker.stop()),
          r.playing !== i.playing && this.syncMachineEffects(),
          (r.muted !== i.muted ||
            r.paused !== i.paused ||
            r.playing !== i.playing ||
            r.contextLost !== i.contextLost) &&
            this.audio.update(
              i.playing ? i.activeMachine : "hall",
              i.muted,
              i.paused || i.contextLost || document.hidden,
            ));
      })),
      window.addEventListener("keydown", this.machineKey),
      window.addEventListener("resize", this.resize),
      document.addEventListener("visibilitychange", this.visibility),
      this.renderer.domElement.addEventListener("webglcontextlost", this.lost),
      this.renderer.domElement.addEventListener(
        "webglcontextrestored",
        this.restored,
      ),
      this.renderer.domElement.addEventListener("click", this.lockLook));
  }
  start() {
    ((this.last = performance.now()),
      (this.raf = requestAnimationFrame(this.frame)),
      X.setState({ ready: !0 }));
  }
  async playClaw(e = this.state.clawStockId) {
    if (this.state.machineLoading || this.state.playing) return;
    const t = ++this.machineGeneration;
    ((this.clawCamera = new Ye()),
      (this.cabinetWalker = new Te()),
      X.setState({ machineLoading: !0 }));
    try {
      this.clawAudio.start(this.state.muted);
    } catch (n) {
      console.warn("Machine audio is unavailable", n);
    }
    try {
      const n = Ht(e),
        s = await Ft.create(1701, 72, !0, 0, n.definitions);
      if (
        ((s.positioningTimerStarted = !1),
        s.setGripProfile(this.state.gripProfile),
        t !== this.machineGeneration)
      ) {
        s.dispose();
        return;
      }
      ((this.machine = s),
        (this.machineView = new ds(s, n.name)),
        this.scene.add(this.machineView.group),
        (this.hall.group.visible = !1),
        document.exitPointerLock?.(),
        this.beginBlend(),
        X.setState({
          playing: !0,
          activeMachine: "claw",
          clawStockId: e,
          inspecting: !1,
          machineLoading: !1,
          machineWins: 0,
          machineRoundWins: 0,
          roundPrizeNames: [],
          roundPrizeIds: [],
          machineCamera: "front",
          machinePhase: s.phase,
        }),
        this.resize(),
        this.renderer.domElement.focus(),
        this.audio.start(this.state.muted, "claw"));
    } catch (n) {
      (this.clawAudio.dispose(),
        this.machineView ? this.machineView.dispose() : this.machine?.dispose(),
        (this.machineView = void 0),
        (this.machine = void 0),
        (this.hall.group.visible = !0),
        console.error(n),
        X.setState({
          machineLoading: !1,
          error: "The claw could not start. Reload to try again.",
        }));
    }
  }
  dropClaw() {
    this.state.paused ||
      this.state.contextLost ||
      (this.machine?.drop(),
      this.prizeGame?.action(),
      this.renderer.domElement.focus());
  }
  retryClaw() {
    this.state.paused ||
      this.state.contextLost ||
      (this.machine?.retry(),
      this.machine && (this.machine.positioningTimerStarted = !1),
      this.prizeGame?.retry(),
      X.setState({
        machinePhase:
          this.machine?.phase ?? this.prizeGame?.phase ?? "POSITIONING",
        machineRemaining: 20,
        machineRoundWins: 0,
        roundPrizeNames: [],
        roundPrizeIds: [],
      }),
      this.renderer.domElement.focus());
  }
  resetClawWalk() {
    ((this.cabinetWalker = new Te()),
      X.setState({ machineCamera: "front" }),
      this.resize(),
      this.beginBlend(),
      this.renderer.domElement.focus());
  }
  toggleClawCamera() {
    (X.setState({
      machineCamera:
        this.state.machineCamera === "front" ? "overhead" : "front",
    }),
      this.beginBlend());
  }
  exitClaw() {
    (this.clawAudio.dispose(),
      this.machineGeneration++,
      this.machineView?.dispose(),
      (this.machineView = void 0),
      (this.machine = void 0),
      this.prizeGameView?.dispose(),
      (this.prizeGameView = void 0),
      (this.prizeGame = void 0),
      (this.hall.group.visible = !0),
      X.setState({ playing: !1, machineLoading: !1 }),
      (this.renderer.shadowMap.needsUpdate = !0),
      this.resize(),
      this.beginBlend());
  }
  setGripProfile(e) {
    this.machine?.setGripProfile(e) && X.setState({ gripProfile: e });
  }
  async playPrizeGame(e) {
    if (this.state.machineLoading || this.state.playing) return;
    const t = ++this.machineGeneration;
    X.setState({ machineLoading: !0 });
    try {
      this.clawAudio.start(this.state.muted);
    } catch (s) {
      console.warn("Machine audio is unavailable", s);
    }
    let n;
    try {
      if (
        ((n =
          e === "pusher" || e === "tower"
            ? await ve.create(e, 7139 + t * 193)
            : await Xt.create(e, 3917 + t * 193)),
        t !== this.machineGeneration)
      ) {
        n.dispose();
        return;
      }
      ((this.prizeGame = n),
        (this.prizeGameView = n instanceof ve ? new us(n) : new ps(n)),
        this.scene.add(this.prizeGameView.group),
        (this.hall.group.visible = !1),
        document.exitPointerLock?.(),
        this.input.reset(),
        this.clock.reset(),
        this.beginBlend(),
        X.setState({
          playing: !0,
          activeMachine: e,
          inspecting: !1,
          machineLoading: !1,
          machinePhase: n.phase,
          machineDetail: n.detail,
          machineWins: 0,
          machineRoundWins: 0,
          roundPrizeNames: [],
          roundPrizeIds: [],
        }),
        this.resize(),
        this.renderer.domElement.focus(),
        this.audio.start(this.state.muted, e));
    } catch (s) {
      (this.clawAudio.dispose(),
        this.prizeGameView ? this.prizeGameView.dispose() : n?.dispose(),
        (this.prizeGame = void 0),
        (this.prizeGameView = void 0),
        (this.hall.group.visible = !0),
        console.error(s),
        X.setState({
          machineLoading: !1,
          error: "The prize cabinet could not start. Reload to try again.",
        }));
    }
  }
  enterHall() {
    (this.beginBlend(),
      this.player.reset(),
      X.setState({ walking: !0, inspecting: !1, targeted: null }),
      this.renderer.domElement.focus(),
      this.audio.start(this.state.muted),
      this.lockLook());
  }
  inspectCabinet(e = "claw-0") {
    ((this.selected =
      this.hall.cabinets.find((t) => t.id === e) ?? this.hall.cabinets[0]),
      this.resetView(),
      this.beginBlend(),
      document.exitPointerLock?.(),
      X.setState({
        inspecting: !0,
        targeted: null,
        activeMachine: this.selected.kind,
        ...(this.selected.stockId
          ? { clawStockId: this.selected.stockId }
          : {}),
      }),
      this.renderer.domElement.focus(),
      this.audio.start(this.state.muted));
  }
  exitInspection() {
    (this.state.machineLoading &&
      (this.machineGeneration++,
      this.clawAudio.dispose(),
      X.setState({ machineLoading: !1 })),
      this.beginBlend(),
      X.setState({ inspecting: !1, targeted: null }),
      this.renderer.domElement.focus());
  }
  returnToTitle() {
    (document.exitPointerLock?.(),
      this.beginBlend(),
      X.setState({ walking: !1, inspecting: !1, targeted: null }));
  }
  resetView() {
    ((this.angle = 0.4),
      (this.elevation = 0.04),
      (this.distance = 4.8),
      this.resetId++);
  }
  beginBlend() {
    (this.fromPosition.copy(this.camera.position),
      this.fromRotation.copy(this.camera.quaternion),
      (this.blend = 0));
  }
  placeCamera(e, t = 0) {
    if (this.state.playing && this.prizeGame)
      (this.prizeGame instanceof ve
        ? (this.target.set(0, 1.11, 0.04),
          this.desiredPosition.set(0.24, 1.78, 1.52))
        : (this.target.set(0, 1.39, 0),
          this.desiredPosition.set(0.5, 1.63, 2.3)),
        this.camera.position.copy(this.desiredPosition),
        this.camera.lookAt(this.target),
        this.desiredRotation.copy(this.camera.quaternion));
    else if (this.state.playing) {
      if (
        (this.target.set(
          0,
          this.state.machineCamera === "overhead" ? 1.05 : 1.37,
          0,
        ),
        this.state.machineCamera === "overhead")
      )
        this.desiredPosition.copy(_t);
      else if (this.cabinetWalker.active)
        (this.target.set(0, 1.25, 0),
          this.desiredPosition.lerpVectors(
            this.cabinetWalker.previous,
            this.cabinetWalker.position,
            e,
          ));
      else {
        const n = this.machine
          ? ne.lerp(
              this.machine.headPrevious.y,
              this.machine.head.translation().y,
              e,
            )
          : 1.63;
        (this.clawCamera.update(
          n,
          this.machine?.phase ?? "POSITIONING",
          this.state.reducedMotion,
          t,
        ),
          this.target.copy(this.clawCamera.target),
          this.desiredPosition.copy(this.clawCamera.position));
      }
      (this.camera.position.copy(this.desiredPosition),
        this.camera.lookAt(this.target),
        this.desiredRotation.copy(this.camera.quaternion));
    } else if (this.state.walking && !this.state.inspecting)
      (this.desiredPosition.set(
        ne.lerp(this.player.previousX, this.player.x, e),
        1.65,
        ne.lerp(this.player.previousZ, this.player.z, e),
      ),
        this.desiredEuler.set(this.player.pitch, this.player.yaw, 0, "YXZ"),
        this.desiredRotation.setFromEuler(this.desiredEuler));
    else {
      const n = this.previousTime + (this.time - this.previousTime) * e,
        s = this.state.inspecting
          ? this.angle
          : 0.4 + (this.state.reducedMotion ? 0 : Math.sin(n * 0.1) * 0.025),
        o = this.state.inspecting ? this.selected : this.hall.cabinets[0];
      (this.target.set(o.x, 1.14, o.z),
        this.desiredPosition.set(
          o.x + Math.sin(s) * this.distance,
          1.45 + this.elevation * this.distance,
          o.z + Math.cos(s) * this.distance,
        ),
        this.camera.position.copy(this.desiredPosition),
        this.camera.lookAt(this.target),
        this.desiredRotation.copy(this.camera.quaternion));
    }
    if (this.blend < 1) {
      const n = this.blend * this.blend * (3 - 2 * this.blend);
      (this.camera.position.lerpVectors(
        this.fromPosition,
        this.desiredPosition,
        n,
      ),
        this.camera.quaternion.slerpQuaternions(
          this.fromRotation,
          this.desiredRotation,
          n,
        ));
    } else
      (this.camera.position.copy(this.desiredPosition),
        this.camera.quaternion.copy(this.desiredRotation));
  }
  syncMachineEffects() {
    const e =
      this.state.playing &&
      (this.state.quality === "high" || this.state.quality === "ultra");
    ((this.normalPass.enabled = e), (this.aoPass.enabled = e));
  }
  applyQuality(e) {
    (this.syncMachineEffects(),
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, Fe[e].pixelRatio)),
      (this.hall.reflector.visible = Fe[e].reflection),
      this.hall.lights.forEach((n, s) => {
        n.visible = e !== "low" || s < 3;
      }),
      (this.renderer.shadowMap.enabled = e !== "low"),
      (this.renderer.shadowMap.needsUpdate = !0));
    const t = e === "ultra" ? 1536 : 1024;
    (this.hall.reflector.getRenderTarget().setSize(t, Math.floor(t * 0.75)),
      this.resize());
  }
  dispose() {
    (cancelAnimationFrame(this.raf),
      this.machineGeneration++,
      this.machineView?.dispose(),
      this.prizeGameView?.dispose(),
      window.removeEventListener("keydown", this.machineKey),
      this.unsubscribe(),
      this.input.dispose(),
      this.audio.dispose(),
      this.clawAudio.dispose(),
      window.removeEventListener("resize", this.resize),
      document.removeEventListener("visibilitychange", this.visibility),
      this.renderer.domElement.removeEventListener(
        "webglcontextlost",
        this.lost,
      ),
      this.renderer.domElement.removeEventListener(
        "webglcontextrestored",
        this.restored,
      ),
      this.renderer.domElement.removeEventListener("click", this.lockLook));
    const e = new Set(),
      t = new Set(),
      n = new Set();
    (this.scene.traverse((s) => {
      if (s instanceof V || s instanceof Re || s instanceof Ue) {
        e.add(s.geometry);
        const o = Array.isArray(s.material) ? s.material : [s.material];
        for (const a of o) {
          t.add(a);
          for (const i of Object.values(a)) i instanceof ze && n.add(i);
        }
      }
    }),
      e.forEach((s) => s.dispose()),
      n.forEach((s) => s.dispose()),
      t.forEach((s) => s.dispose()),
      this.hall.reflector.getRenderTarget().dispose(),
      this.environment.dispose(),
      this.composer.dispose(),
      this.renderer.dispose(),
      this.renderer.domElement.remove());
  }
  getDebugState() {
    return {
      prizeGame: this.prizeGame
        ? {
            time: this.prizeGame.time,
            round: this.prizeGame.round,
            ...(this.prizeGame instanceof ve
              ? this.prizeGame.snapshot()
              : {
                  cutterX: this.prizeGame.cutterX,
                  strandX: this.prizeGame.strandX,
                  selectedSector: this.prizeGame.selectedSector,
                  wheelAngle: this.prizeGame.wheelAngle,
                }),
            kind: this.prizeGame.kind,
            phase: this.prizeGame.phase,
            awarded: [...this.prizeGame.awarded],
            bodies: this.prizeGame.world.bodies.len(),
            joints: this.prizeGame.world.impulseJoints.len(),
            prize: this.prizeGame.currentPrize?.definition.id,
          }
        : void 0,
      machine: this.machine?.snapshot(),
      cabinetWalker: {
        active: this.cabinetWalker.active,
        angle: this.cabinetWalker.angle,
        radius: this.cabinetWalker.radius,
        position: this.cabinetWalker.position.toArray(),
      },
      music: this.audio.debug(),
      angle: this.angle,
      elevation: this.elevation,
      distance: this.distance,
      resetId: this.resetId,
      blend: this.blend,
      player: { x: this.player.x, z: this.player.z, yaw: this.player.yaw },
      cabinetCount: this.hall.cabinets.length,
      reflection: this.hall.reflector.visible,
    };
  }
}
export {
  it as saveCollection,
  vs as C,
  st as S,
  ys as a,
  oe as b,
  gs as c,
  ce as d,
  Ce as g,
  X as s,
};

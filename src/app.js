import { installMidway } from "./midway.js";
import { installController } from "./gamepad.js";
const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/prize-inspector-BQKoaDib.js",
      "assets/renderer-W_eveQ7P.js",
      "src/games.js",
      "assets/physics-DnKIsk7E.js",
      "src/arcade.js",
      "assets/ui-BJl9JnxJ.js",
      "assets/playtest-D4ieCnsH.js",
    ]),
) => i.map((i) => d[i]);
import { i as N, P as L, C as F, c as O } from "./games.js";
import {
  u as e,
  k as m,
  A as M,
  d as T,
  y as I,
  G as q,
} from "../assets/ui-BJl9JnxJ.js";
import { c as z, S as V, s, a as Y, g as _, C as K } from "./arcade.js";
import "../assets/physics-DnKIsk7E.js";
import "../assets/renderer-W_eveQ7P.js";
const j = "modulepreload",
  Q = function (n) {
    return "/" + n;
  },
  $ = {},
  H = function (i, b, C) {
    let r = Promise.resolve();
    if (b && b.length > 0) {
      let v = function (o) {
        return Promise.all(
          o.map((g) =>
            Promise.resolve(g).then(
              (d) => ({ status: "fulfilled", value: d }),
              (d) => ({ status: "rejected", reason: d }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const y = document.querySelector("meta[property=csp-nonce]"),
        w = y?.nonce || y?.getAttribute("nonce");
      r = v(
        b.map((o) => {
          if (((o = Q(o)), o in $)) return;
          $[o] = !0;
          const g = o.endsWith(".css"),
            d = g ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${o}"]${d}`)) return;
          const h = document.createElement("link");
          if (
            ((h.rel = g ? "stylesheet" : j),
            g || (h.as = "script"),
            (h.crossOrigin = ""),
            (h.href = o),
            w && h.setAttribute("nonce", w),
            document.head.appendChild(h),
            g)
          )
            return new Promise((x, l) => {
              (h.addEventListener("load", x),
                h.addEventListener("error", () =>
                  l(new Error(`Unable to preload CSS for ${o}`)),
                ));
            });
        }),
      );
    }
    function E(y) {
      const w = new Event("vite:preloadError", { cancelable: !0 });
      if (((w.payload = y), window.dispatchEvent(w), !w.defaultPrevented))
        throw y;
    }
    return r.then((y) => {
      for (const w of y || []) w.status === "rejected" && E(w.reason);
      return i().catch(E);
    });
  },
  p = (n) => "#" + n.toString(16).padStart(6, "0");
function D({ def: n }) {
  const i = N(n),
    b = n.kind === "cat",
    C = n.kind === "bunny";
  return e("svg", {
    viewBox: "0 0 96 100",
    "aria-hidden": "true",
    class: "prize-badge",
    children: [
      e("defs", {
        children: e("linearGradient", {
          id: `cloth-${n.id}`,
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "1",
          children: [
            e("stop", { "stop-color": p(n.color) }),
            e("stop", { offset: "1", "stop-color": p(n.accent) }),
          ],
        }),
      }),
      e("ellipse", {
        cx: "48",
        cy: "90",
        rx: "30",
        ry: "6",
        fill: "#080716",
        opacity: ".3",
      }),
      n.kind === "plush"
        ? e(m, {
            children: [
              n.form === "pillow"
                ? e("rect", {
                    x: "12",
                    y: "30",
                    width: "72",
                    height: "49",
                    rx: "15",
                    fill: `url(#cloth-${n.id})`,
                    stroke: "#ffedd9",
                    "stroke-width": "2",
                  })
                : e(m, {
                    children: [
                      e("ellipse", {
                        cx: "48",
                        cy: "70",
                        rx: n.form === "figure" ? 16 : 23,
                        ry: "23",
                        fill: p(n.form === "dessert" ? n.accent : n.color),
                      }),
                      e("ellipse", {
                        cx: "48",
                        cy: "42",
                        rx: "27",
                        ry: "25",
                        fill: p(n.color),
                      }),
                    ],
                  }),
              ["fox", "raccoon", "unicorn"].includes(n.family)
                ? e(m, {
                    children: e("path", {
                      d: "M20 30L19 8L36 23M60 23L77 8L76 30",
                      fill: p(n.color),
                    }),
                  })
                : ["frog", "panda", "dog", "koala", "hamster"].includes(
                      n.family,
                    )
                  ? e(m, {
                      children: [27, 69].map((r) =>
                        e("ellipse", {
                          cx: r,
                          cy: n.family === "dog" ? 35 : 22,
                          rx: "10",
                          ry: n.family === "dog" ? 17 : 10,
                          fill: p(n.accent),
                        }),
                      ),
                    })
                  : null,
              n.family === "axolotl" &&
                e("path", {
                  d: "M21 29L7 23M21 39L5 39M21 49L7 55M75 29L89 23M75 39L91 39M75 49L89 55",
                  stroke: p(n.accent),
                  "stroke-width": "7",
                  "stroke-linecap": "round",
                }),
              n.family === "robot" &&
                e("path", {
                  d: "M48 17V6M42 6H54",
                  stroke: p(n.accent),
                  "stroke-width": "5",
                }),
              n.form === "hood" &&
                e("path", {
                  d: "M25 32Q48 14 71 32M38 64V83M58 64V83",
                  stroke: "#fff0df",
                  "stroke-width": "3",
                  fill: "none",
                }),
              [36, 60].map((r) =>
                e("circle", { cx: r, cy: "46", r: "3", fill: "#252c40" }),
              ),
              e("path", {
                d: "M42 57Q48 62 54 57",
                stroke: "#51404b",
                "stroke-width": "2",
                fill: "none",
              }),
              n.form === "figure" &&
                e(m, {
                  children: [35, 61].map((r) =>
                    e("rect", {
                      x: r - 6,
                      y: "81",
                      width: "12",
                      height: "13",
                      rx: "5",
                      fill: p(n.color),
                    }),
                  ),
                }),
              n.form === "dessert" &&
                e("path", {
                  d: "M33 69V85M43 69V86M53 69V86M63 69V85",
                  stroke: "#fff0df",
                  "stroke-width": "2",
                }),
            ],
          })
        : i
          ? e(m, {
              children: [
                e("ellipse", {
                  cx: "48",
                  cy: "70",
                  rx: "23",
                  ry: "22",
                  fill: `url(#cloth-${n.id})`,
                }),
                [28, 68].map((r) =>
                  b
                    ? e("path", {
                        d: `M${r - 9} 31 L${r - 7} 9 L${r + 13} 28 Z`,
                        fill: p(n.color),
                      })
                    : e("ellipse", {
                        cx: r,
                        cy: C ? 19 : 28,
                        rx: "10",
                        ry: C ? 18 : 10,
                        fill: p(n.color),
                      }),
                ),
                e("ellipse", {
                  cx: "48",
                  cy: "44",
                  rx: "31",
                  ry: "27",
                  fill: p(n.color),
                }),
                C &&
                  e("ellipse", {
                    cx: "48",
                    cy: "47",
                    rx: "23",
                    ry: "20",
                    fill: "#fff0df",
                  }),
                e("ellipse", {
                  cx: "48",
                  cy: "77",
                  rx: "13",
                  ry: "12",
                  fill: "#fff0df",
                  opacity: ".7",
                }),
                [34, 62].map((r) =>
                  e("ellipse", {
                    cx: r,
                    cy: "44",
                    rx: "3.2",
                    ry: "4.4",
                    fill: "#262234",
                  }),
                ),
                e("ellipse", {
                  cx: "48",
                  cy: "53",
                  rx: "4",
                  ry: "2.8",
                  fill: b ? "#ffc65f" : "#594051",
                }),
                e("path", {
                  d: "M43 59 Q48 63 53 59",
                  fill: "none",
                  stroke: "#594051",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                }),
                b &&
                  e(m, {
                    children: [
                      e("path", {
                        d: "M16 50H29M17 56H30M66 50H80M66 56H79",
                        stroke: "#7e677e",
                        "stroke-width": "1.8",
                      }),
                      e("path", {
                        d: "M23 20 Q9 7 12 27 Q14 33 25 23 Q39 10 39 26 Q37 33 25 23",
                        fill: p(n.accent),
                      }),
                      e("circle", {
                        cx: "25",
                        cy: "23",
                        r: "5",
                        fill: p(n.accent),
                      }),
                    ],
                  }),
                C &&
                  e(m, {
                    children: [
                      e("ellipse", {
                        cx: "48",
                        cy: "25",
                        rx: "6",
                        ry: "5",
                        fill: p(n.accent),
                      }),
                      e("circle", { cx: "46", cy: "25", r: "1.3" }),
                      e("circle", { cx: "50", cy: "25", r: "1.3" }),
                    ],
                  }),
                [21, 75].map((r) =>
                  e("ellipse", {
                    cx: r,
                    cy: "70",
                    rx: "9",
                    ry: "12",
                    fill: p(n.color),
                  }),
                ),
              ],
            })
          : n.kind === "coin"
            ? e(m, {
                children: [
                  e("circle", {
                    cx: "48",
                    cy: "52",
                    r: "34",
                    fill: p(n.color),
                    stroke: "#b88839",
                    "stroke-width": "4",
                  }),
                  e("circle", {
                    cx: "48",
                    cy: "52",
                    r: "27",
                    fill: "none",
                    stroke: p(n.accent),
                    "stroke-width": "2",
                  }),
                  e("path", {
                    d: "M48 28 L66 40 L66 62 L48 76 L30 62 L30 40 Z",
                    fill: p(n.accent),
                  }),
                  e("text", {
                    x: "48",
                    y: "61",
                    "text-anchor": "middle",
                    "font-size": "26",
                    "font-weight": "bold",
                    fill: "#9b692c",
                    children: "5",
                  }),
                ],
              })
            : n.kind === "phone"
              ? e(m, {
                  children: [
                    e("rect", {
                      x: "21",
                      y: "7",
                      width: "54",
                      height: "83",
                      rx: "8",
                      fill: "#fff1de",
                    }),
                    e("rect", {
                      x: "26",
                      y: "12",
                      width: "44",
                      height: "72",
                      rx: "5",
                      fill: "#7557a5",
                    }),
                    e("path", {
                      d: "M31 67Q58 14 67 53",
                      stroke: "#c6a9ff",
                      "stroke-width": "5",
                      fill: "none",
                    }),
                    e("text", {
                      x: "48",
                      y: "37",
                      "text-anchor": "middle",
                      fill: "white",
                      "font-size": "14",
                      "font-family": "sans-serif",
                      children: "22:08",
                    }),
                    e("rect", {
                      x: "43",
                      y: "16",
                      width: "11",
                      height: "3",
                      rx: "2",
                      fill: "#242a43",
                    }),
                  ],
                })
              : n.kind === "egg"
                ? e(m, {
                    children: [
                      e("path", {
                        d: "M48 10C35 10 18 42 18 61C18 80 30 89 48 89C66 89 78 80 78 61C78 42 61 10 48 10Z",
                        fill: `url(#cloth-${n.id})`,
                      }),
                      e("path", {
                        d: "M20 62Q48 70 76 62",
                        fill: "none",
                        stroke: p(n.accent),
                        "stroke-width": "3",
                      }),
                      e("path", {
                        d: "M48 32L52 42L63 43L55 50L57 61L48 55L39 61L41 50L33 43L44 42Z",
                        fill: p(n.accent),
                      }),
                      e("path", {
                        d: "M33 23Q26 34 25 43",
                        fill: "none",
                        stroke: "#fff5dc",
                        opacity: ".65",
                        "stroke-width": "4",
                        "stroke-linecap": "round",
                      }),
                    ],
                  })
                : e(m, {
                    children: [
                      e("rect", {
                        x: "12",
                        y: "27",
                        width: "72",
                        height: "52",
                        rx: "5",
                        fill: "#ffcb80",
                      }),
                      e("path", {
                        d: "M12 68H84M12 72H84",
                        stroke: "#fff0d7",
                        "stroke-width": "2",
                      }),
                      e("rect", {
                        x: "18",
                        y: "32",
                        width: "60",
                        height: "30",
                        rx: "3",
                        fill: "#fff0d7",
                      }),
                      e("text", {
                        x: "48",
                        y: "55",
                        "text-anchor": "middle",
                        "font-size": "24",
                        "font-weight": "bold",
                        fill: "#753d5d",
                        children: "100",
                      }),
                      e("rect", {
                        x: "42",
                        y: "26",
                        width: "12",
                        height: "53",
                        fill: "#dfa350",
                      }),
                    ],
                  }),
    ],
  });
}
function Z({
  collection: n,
  storageStatus: i,
  selectedId: b,
  onSelect: C,
  onClose: r,
  onStudio: E,
  revealedNames: y = [],
}) {
  const w = M(null),
    v = M(),
    o = M(b);
  o.current = b;
  const [g, d] = T(!1),
    [h, x] = T(!1),
    [l, f] = T(""),
    [S, c] = T(24),
    u = L.filter((t) =>
      `${t.name} ${t.family ?? ""} ${t.form ?? t.kind}`
        .toLowerCase()
        .includes(l.toLowerCase()),
    ),
    a = L.find((t) => t.id === b) ?? L[0],
    R = L.filter((t) => (n.counts[t.id] ?? 0) > 0).length,
    W = Object.values(n.counts).reduce((t, k) => t + k, 0),
    B = [
      { name: "Bear buddies", ids: ["cocoa", "milk"] },
      { name: "Bow club", ids: ["bow-cat", "mint"] },
      { name: "Night crew", ids: ["midnight", "lilac"] },
      { name: "Whole prize club", ids: L.map((t) => t.id) },
    ];
  return (
    I(() => {
      let t = !1;
      return (
        H(
          async () => {
            const { PrizeInspector: k } =
              await import("../assets/prize-inspector-BQKoaDib.js").then(
                (P) => P.p,
              );
            return { PrizeInspector: k };
          },
          __vite__mapDeps([0, 1, 2, 3, 4, 5]),
        )
          .then(({ PrizeInspector: k }) => {
            if (!(t || !w.current))
              try {
                ((v.current = new k(w.current, o.current)), d(!0));
              } catch {
                x(!0);
              }
          })
          .catch(() => {
            t || x(!0);
          }),
        document.getElementById("close-collection")?.focus(),
        () => {
          ((t = !0), v.current?.dispose(), (v.current = void 0));
        }
      );
    }, []),
    I(() => {
      v.current?.select(b);
    }, [b]),
    e("div", {
      class: "modal-backdrop collection-backdrop",
      onClick: (t) => {
        t.target === t.currentTarget && r();
      },
      children: e("section", {
        class: `collection-dialog ${y.length ? "with-reveal" : ""}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "collection-title",
        onKeyDown: (t) => {
          if (t.key !== "Tab") return;
          const k = t.currentTarget.querySelectorAll(
              "button:not(:disabled),canvas[tabindex],input",
            ),
            P = k[0],
            U = k[k.length - 1];
          t.shiftKey && document.activeElement === P
            ? (t.preventDefault(), U.focus())
            : !t.shiftKey &&
              document.activeElement === U &&
              (t.preventDefault(), P.focus());
        },
        children: [
          e("header", {
            class: "collection-header",
            children: [
              e("div", {
                children: [
                  e("span", {
                    class: "serial",
                    children: "THE PRIZE CLUB / SERIES 01",
                  }),
                  e("h2", {
                    id: "collection-title",
                    children: "Your little hall of fame.",
                  }),
                ],
              }),
              e("button", {
                id: "close-collection",
                class: "icon-button",
                "aria-label": "Close prize collection",
                onClick: r,
                children: "×",
              }),
            ],
          }),
          y.length > 0 &&
            e("div", {
              class: "earned-reveal",
              role: "status",
              children: [
                e("span", {
                  class: "serial",
                  children: "LANDED IN THE CHUTE · ADDED TO YOUR COLLECTION",
                }),
                e("h3", { children: "Your play. Your prize." }),
                e("p", { children: y.join(" · ") }),
              ],
            }),
          e("div", {
            class: "collection-stats",
            children: [
              e("span", {
                children: [
                  e("strong", { children: [R, "/", L.length] }),
                  " ",
                  "designs collected",
                ],
              }),
              e("span", {
                children: [
                  e("strong", { children: W }),
                  " ",
                  W === 1 ? "prize earned" : "prizes earned",
                ],
              }),
              e("span", {
                children: [e("strong", { children: n.tickets }), " tickets"],
              }),
              e("span", { class: "collection-save", children: z(i) }),
            ],
          }),
          e("div", {
            class: "collection-main",
            children: [
              e("div", {
                class: "prize-feature",
                children: [
                  e("div", {
                    class: `prize-stage studio-${n.studio ?? "classic"}`,
                    ref: w,
                    children:
                      !g &&
                      e("span", {
                        class: "viewer-status",
                        role: "status",
                        children: h
                          ? "3D inspection unavailable. Your collection is still available here."
                          : "Setting up the prize studio…",
                      }),
                  }),
                  e("div", {
                    class: "studio-controls",
                    children: [
                      e("span", {
                        children: "Drag to rotate · Scroll to zoom",
                      }),
                      e("div", {
                        children: [
                          e("button", {
                            "aria-label": "Rotate prize left",
                            onClick: () => v.current?.rotate(-1),
                            children: "↶",
                          }),
                          e("button", {
                            "aria-label": "Reset prize view",
                            onClick: () => v.current?.reset(),
                            children: "Reset view",
                          }),
                          e("button", {
                            "aria-label": "Rotate prize right",
                            onClick: () => v.current?.rotate(1),
                            children: "↷",
                          }),
                        ],
                      }),
                    ],
                  }),
                  e("span", {
                    class: `prize-ownership ${(n.counts[a.id] ?? 0) > 0 ? "earned" : ""}`,
                    children:
                      (n.counts[a.id] ?? 0) > 0
                        ? `In your collection × ${n.counts[a.id]}`
                        : "Catalog preview · Not collected yet",
                  }),
                  e("h3", { children: a.name }),
                  e("p", {
                    class: "prize-description",
                    children: N(a)
                      ? "Woven fabric, embroidered details and a soft contact response."
                      : a.kind === "phone"
                        ? "A rigid handset in its own presentation tray. Orientation matters when gripping."
                        : a.kind === "coin"
                          ? "An embossed gold coin. Deliver it through the front trough to earn 5 tickets."
                          : a.kind === "egg"
                            ? "A sealed surprise capsule with a collectible inside."
                            : "A banded bundle with printed faces and layered paper edges.",
                  }),
                  e("div", {
                    class: "prize-facts",
                    children: [
                      e("span", { children: [Math.round(a.mass * 1e3), " g"] }),
                      e("span", {
                        children: N(a) ? "Plush body" : "Rigid prize",
                      }),
                      e("span", {
                        children: a.tickets
                          ? `+${a.tickets} tickets per chute win`
                          : "Collectible design",
                      }),
                    ],
                  }),
                ],
              }),
              e("div", {
                class: "prize-catalog",
                children: [
                  e("div", {
                    class: "catalog-heading",
                    children: [
                      e("h3", { children: "Meet the lineup" }),
                      e("span", { children: "Select a prize to inspect" }),
                    ],
                  }),
                  e("label", {
                    class: "catalog-search",
                    children: [
                      "Find a pal or reward",
                      e("input", {
                        "aria-label": "Search prizes",
                        placeholder: "Fox, pillow, robot, phone…",
                        value: l,
                        onInput: (t) => {
                          (f(t.currentTarget.value), c(24));
                        },
                      }),
                    ],
                  }),
                  e("span", {
                    class: "catalog-note",
                    children: [
                      u.length,
                      " designs · 20 character families, five plush forms",
                    ],
                  }),
                  u.length === 0 &&
                    e("p", {
                      children:
                        "No matching prizes. Try a family, form or reward name.",
                    }),
                  e("div", {
                    class: "prize-grid",
                    children: u.slice(0, S).map((t) =>
                      e(
                        "button",
                        {
                          class: `prize-card ${a.id === t.id ? "selected" : ""}`,
                          "aria-pressed": a.id === t.id,
                          onClick: () => C(t.id),
                          children: [
                            e(D, { def: t }),
                            e("span", {
                              children: [
                                e("strong", { children: t.name }),
                                e("small", {
                                  children:
                                    (n.counts[t.id] ?? 0) > 0
                                      ? `Collected × ${n.counts[t.id]}`
                                      : "Preview",
                                }),
                              ],
                            }),
                          ],
                        },
                        t.id,
                      ),
                    ),
                  }),
                  S < u.length &&
                    e("button", {
                      onClick: () => c((t) => t + 24),
                      children: "Show more prizes",
                    }),
                  e("p", {
                    class: "catalog-note",
                    children:
                      "Grab, carry, and land a prize in the chute to add it to your shelf.",
                  }),
                ],
              }),
            ],
          }),
          e("section", {
            class: "ticket-exchange",
            "aria-labelledby": "exchange-title",
            children: [
              e("div", {
                children: [
                  e("span", { class: "serial", children: "TICKET COUNTER" }),
                  e("h3", {
                    id: "exchange-title",
                    children: "Make the studio yours.",
                  }),
                  e("p", {
                    children:
                      "Spend earned tickets on studio backdrops. Preview colours below.",
                  }),
                ],
              }),
              e("div", {
                class: "studio-shop",
                children: V.map((t) => {
                  const k = t.id === "classic" || n.studios?.includes(t.id),
                    P = (n.studio ?? "classic") === t.id;
                  return e("button", {
                    class: `studio-choice studio-${t.id} ${P ? "active" : ""}`,
                    "aria-pressed": P,
                    disabled: P || (!k && n.tickets < t.cost),
                    onClick: () => E(t.id),
                    children: [
                      e("strong", { children: t.name }),
                      e("span", {
                        children: P
                          ? "In use"
                          : k
                            ? "Use backdrop"
                            : `${t.cost} tickets · Unlock`,
                      }),
                    ],
                  });
                }),
              }),
              e("small", {
                children: [
                  "Virtual cosmetics · No grip or physics advantage ·",
                  " ",
                  z(i),
                ],
              }),
            ],
          }),
          e("div", {
            class: "collection-goals",
            children: B.map((t) => {
              const k = t.ids.filter((P) => (n.counts[P] ?? 0) > 0).length;
              return e(
                "div",
                {
                  class: `set-goal ${k === t.ids.length ? "complete" : ""}`,
                  children: [
                    e("span", {
                      children: [k === t.ids.length ? "✦" : "◇", " ", t.name],
                    }),
                    e("strong", { children: [k, "/", t.ids.length] }),
                    e("progress", {
                      max: t.ids.length,
                      value: k,
                      "aria-label": t.name,
                    }),
                  ],
                },
                t.name,
              );
            }),
          }),
        ],
      }),
    })
  );
}
function J({ state: n, getScene: i, onInspect: b }) {
  const [C, r] = T(!1),
    E = M(!1),
    y = M(null);
  function w() {
    ((E.current = s.getState().paused),
      (y.current = document.activeElement),
      document.exitPointerLock?.(),
      s.setState({ paused: !0 }),
      r(!0));
  }
  function v() {
    (r(!1), s.setState({ paused: E.current }), y.current?.focus());
  }
  function o(l, f) {
    (v(), l === "claw" ? i()?.playClaw(f) : i()?.playPrizeGame(l));
  }
  I(() => {
    if (!C) return;
    document.getElementById("close-arcade")?.focus();
    const l = (f) => {
      if (
        (f.code === "Escape" &&
          (f.preventDefault(), f.stopImmediatePropagation(), v()),
        f.code === "Tab")
      ) {
        const S = [
            ...document.querySelectorAll(
              ".arcade-picker button:not(:disabled)",
            ),
          ],
          c = S[0],
          u = S[S.length - 1];
        f.shiftKey && document.activeElement === c
          ? (f.preventDefault(), u?.focus())
          : !f.shiftKey &&
            document.activeElement === u &&
            (f.preventDefault(), c?.focus());
      }
    };
    return (
      window.addEventListener("keydown", l, !0),
      () => window.removeEventListener("keydown", l, !0)
    );
  }, [C]);
  const g = n.activeMachine === "cut",
    d = n.activeMachine === "pusher" || n.activeMachine === "tower",
    h = n.activeMachine === "tower",
    x = d
      ? h
        ? "Tower Tumble"
        : "Coin Cascade"
      : g
        ? "Snip & Win"
        : "Egg Orbit";
  return e(m, {
    children: [
      !n.playing &&
        !n.settingsOpen &&
        !n.collectionOpen &&
        e("button", {
          class: "arcade-launch",
          onClick: w,
          disabled: !n.ready || n.machineLoading,
          children: [
            e("span", { children: "✦" }),
            e("strong", { children: "Choose a prize game" }),
            e("small", {
              children: "Claw · Thread cut · Egg spin · Coin prizes",
            }),
          ],
        }),
      n.playing &&
        n.activeMachine !== "claw" &&
        e(m, {
          children: [
            e("div", {
              class: "machine-heading",
              children: [
                e("span", {
                  class: "serial",
                  children: [
                    "PRIZE ARCADE /",
                    " ",
                    d
                      ? h
                        ? "SERIES 05"
                        : "SERIES 04"
                      : g
                        ? "SERIES 02"
                        : "SERIES 03",
                  ],
                }),
                e("h1", { children: x }),
                e("p", {
                  children: d
                    ? h
                      ? "A skyscraper with trust issues. Find the tipping point."
                      : "Pick a lane. Start a tiny, shiny avalanche."
                    : g
                      ? "Steady hands? Prove it. Catch the thread, cut it loose."
                      : "Capsule roulette. Go on, adopt something weird.",
                }),
              ],
            }),
            e("button", {
              class: "back-button machine-exit",
              onClick: () => i()?.exitClaw(),
              children: "Leave machine · Esc",
            }),
            e("div", {
              class: "machine-panel prize-game-panel",
              children: [
                e("span", {
                  class: "serial",
                  children: d
                    ? "CONTACT & PHYSICAL DELIVERY"
                    : g
                      ? "TIMING & PHYSICAL DELIVERY"
                      : "FREE RANDOM DRAW",
                }),
                e("div", {
                  class: "machine-readout",
                  children: [
                    e("strong", {
                      children:
                        n.machinePhase === "RESULT"
                          ? n.machineRoundWins
                            ? "✦"
                            : "↻"
                          : d
                            ? "◉"
                            : g
                              ? "✂"
                              : "◎",
                    }),
                    e("span", {
                      children:
                        n.machinePhase === "READY"
                          ? "Ready to play"
                          : n.machinePhase === "RESULT"
                            ? n.machineRoundWins
                              ? "Prize collected"
                              : g
                                ? "No prize delivered"
                                : "Delivery stopped"
                            : n.machinePhase === "SETTLING"
                              ? "Coins settling"
                              : n.machinePhase === "SPINNING"
                                ? "Wheel turning"
                                : n.machinePhase === "CLOSING"
                                  ? "Blades closing"
                                  : "Prize falling",
                    }),
                  ],
                }),
                e("p", { "aria-live": "polite", children: n.machineDetail }),
                n.machinePhase === "RESULT" &&
                  n.machineRoundWins > 0 &&
                  e("div", {
                    class: "round-reward",
                    "aria-label": "Delivered rewards",
                    children: [
                      e("span", {
                        class: "serial",
                        children: "DELIVERED TO YOUR COLLECTION",
                      }),
                      e("div", {
                        class: "reward-badges",
                        children: n.roundPrizeIds.map((l) => {
                          const f = L.find((S) => S.id === l);
                          return f ? e(D, { def: f }, l) : null;
                        }),
                      }),
                      e("span", { children: n.roundPrizeNames.join(" · ") }),
                    ],
                  }),
                n.machinePhase === "READY" &&
                  e("button", {
                    class: "primary drop-button",
                    onClick: () => i()?.dropClaw(),
                    children: d
                      ? "Drop a coin"
                      : g
                        ? "Cut thread"
                        : "Spin for a surprise",
                  }),
                n.machinePhase === "RESULT" &&
                  e("button", {
                    class: "primary drop-button",
                    onClick: () => i()?.retryClaw(),
                    children: "Play again",
                  }),
                e("span", {
                  class: "machine-score",
                  children: [
                    d
                      ? h
                        ? "WASD aim · Space drops"
                        : "A/D aim · Space drops"
                      : "Space or click",
                    " ",
                    "· Esc to leave",
                  ],
                }),
                e("div", {
                  class: "prize-rules",
                  children: d
                    ? e(m, {
                        children: [
                          e("strong", {
                            children: h
                              ? "Find the tipping point"
                              : "Read the shelf",
                          }),
                          e("p", {
                            children: h
                              ? "The mint ring marks your drop point. Move the tube over the tower with WASD. Off-centre landings change the load on individual supports; the moving shelf pushes the fallen coins onward."
                              : "The mint ring marks your drop point. Move the tube with A/D. Drop into a lane and watch the steel shelf move the pile through real contact.",
                          }),
                          e("p", {
                            children: [
                              "12 free drops in 30 seconds per round. Each gold coin that falls into the front trough earns 5 tickets. The shelf gets an 8-second delivery window after the last drop or timeout. Side falls and toppling on the shelf earn nothing.",
                              " ",
                              h
                                ? "A fresh supported tower and coin bed are rebuilt between rounds."
                                : "The pile stays for the next round; a depleted or full cabinet is refilled between rounds.",
                            ],
                          }),
                        ],
                      })
                    : g
                      ? e(m, {
                          children: [
                            e("strong", { children: "How it works" }),
                            e("p", {
                              children:
                                "The carriage sweeps across a real swaying thread. Press once to stop it and close the blades. A 9 mm capture window cuts the rope; the prize must fall into the collection zone.",
                            }),
                          ],
                        })
                      : e(m, {
                          children: [
                            e("strong", { children: "What's inside?" }),
                            e("p", {
                              children:
                                "16 equal sectors: 8 Starlight Eggs, 7 bundles of 100 tickets, 1 Golden Egg. The wheel shows a random draw; button timing doesn't change it.",
                            }),
                            e("p", {
                              children:
                                "Starlight Egg: one of six pals, equally likely, plus 20 tickets. Golden Egg: a phone pack plus 250 tickets.",
                            }),
                          ],
                        }),
                }),
                e("button", {
                  class: "collection-button collection-launch",
                  onClick: b,
                  children: "Inspect collection",
                }),
                e("span", {
                  class: "machine-score",
                  children: [
                    n.collection.tickets,
                    " tickets ·",
                    " ",
                    z(n.collectionStatus),
                  ],
                }),
                e("p", {
                  class: "machine-disclosure",
                  children:
                    "Virtual prizes · Free plays · No purchase required",
                }),
              ],
            }),
          ],
        }),
      C &&
        e("div", {
          class: "arcade-picker",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "arcade-title",
          children: e("div", {
            class: "arcade-picker-card",
            children: [
              e("button", {
                id: "close-arcade",
                class: "back-button",
                onClick: v,
                children: "Back · Esc",
              }),
              e("span", {
                class: "serial",
                children: "THE LUCK & PRIZE FLOOR",
              }),
              e("h2", {
                id: "arcade-title",
                children: "Pick your next little obsession.",
              }),
              e("p", {
                children:
                  "Free plays. Contact, timing and chance. Collectibles saved on this PC.",
              }),
              e("div", {
                class: "arcade-cards",
                children: [
                  F.map((l) =>
                    e(
                      "button",
                      {
                        class: "arcade-card arcade-claw",
                        onClick: () => o("claw", l.id),
                        disabled: n.machineLoading,
                        children: [
                          e("span", { class: "arcade-emblem", children: "◇" }),
                          e("span", {
                            class: "serial",
                            children: "01 / CLAW COLLECTION",
                          }),
                          e("strong", { children: l.name }),
                          e("span", { children: l.tagline }),
                          e("b", { children: "Play claw →" }),
                        ],
                      },
                      l.id,
                    ),
                  ),
                  e("button", {
                    class: "arcade-card arcade-cut",
                    onClick: () => o("cut"),
                    disabled: n.machineLoading,
                    children: [
                      e("span", { class: "arcade-emblem", children: "✂" }),
                      e("span", {
                        class: "serial",
                        children: "02 / PERFECT TIMING",
                      }),
                      e("strong", { children: "Snip & Win" }),
                      e("span", {
                        children:
                          "Stop the scissors on the swaying thread. Cut it to release your prize.",
                      }),
                      e("b", { children: "Play thread cutter →" }),
                    ],
                  }),
                  e("button", {
                    class: "arcade-card arcade-egg",
                    onClick: () => o("spin"),
                    disabled: n.machineLoading,
                    children: [
                      e("span", { class: "arcade-emblem", children: "◎" }),
                      e("span", {
                        class: "serial",
                        children: "03 / SURPRISE DRAW",
                      }),
                      e("strong", { children: "Egg Orbit" }),
                      e("span", {
                        children:
                          "Pastel capsules, ticket bundles and one golden sector. Gold: 1 in 16.",
                      }),
                      e("b", { children: "Play egg spin →" }),
                    ],
                  }),
                  ["pusher", "tower"].map((l) =>
                    e("button", {
                      class: `arcade-card ${l === "tower" ? "arcade-tower" : "arcade-pusher"}`,
                      onClick: () => o(l),
                      disabled: n.machineLoading,
                      children: [
                        e("span", {
                          class: "arcade-emblem",
                          children: l === "tower" ? "▥" : "◉",
                        }),
                        e("span", {
                          class: "serial",
                          children:
                            l === "tower"
                              ? "05 / WEIGHT & BALANCE"
                              : "04 / CONTACT & TIMING",
                        }),
                        e("strong", {
                          children:
                            l === "tower" ? "Tower Tumble" : "Coin Cascade",
                        }),
                        e("span", {
                          children:
                            l === "tower"
                              ? "Aim over a stack of individual coins. Change its balance, then topple it toward the trough."
                              : "Choose a lane and time the moving shelf. Real coins, real collisions, ticket rewards.",
                        }),
                        e("b", {
                          children:
                            l === "tower"
                              ? "Play tower collapse →"
                              : "Play coin pusher →",
                        }),
                      ],
                    }),
                  ),
                ],
              }),
              e("small", {
                children:
                  "All rewards are virtual. Showcase shelves display decorative stock.",
              }),
            ],
          }),
        }),
    ],
  });
}
const G = {
  SETTLE: { label: "Steadying cable", icon: "≈" },
  DESCEND: { label: "Lowering claw", icon: "↓" },
  GRIP: { label: "Closing fingers", icon: "◇" },
  LIFT: { label: "Raising claw", icon: "↑" },
  CARRY: { label: "Moving to chute", icon: "→" },
  RELEASE: { label: "Opening fingers", icon: "↓" },
  RESULT: { label: "Round finished", icon: "✦" },
};
function X({ getScene: n }) {
  const [i, b] = T(s.getState()),
    [C, r] = T(!1),
    [E, y] = T("cocoa"),
    [w, v] = T([]),
    o = M(!1),
    g = M(null);
  function d(c = E, u = !1) {
    (v(u ? [...s.getState().roundPrizeNames] : []),
      (o.current = s.getState().paused),
      (g.current = document.activeElement),
      document.exitPointerLock?.(),
      y(c),
      s.setState({ collectionOpen: !0, paused: !0 }));
  }
  function h() {
    (s.setState({ collectionOpen: !1, paused: o.current }), g.current?.focus());
  }
  const x = new URLSearchParams(location.search).has("debug");
  (I(() => s.subscribe(b), []),
    I(() => {
      const c = () => r(!!document.pointerLockElement);
      return (
        document.addEventListener("pointerlockchange", c),
        () => document.removeEventListener("pointerlockchange", c)
      );
    }, []),
    I(() => {
      const c = (u) => {
        if (u.code !== "Escape") return;
        const a = s.getState();
        a.collectionOpen
          ? h()
          : a.settingsOpen
            ? (s.setState({ settingsOpen: !1, paused: !1 }),
              document.querySelector("canvas")?.focus())
            : a.playing
              ? n()?.exitClaw()
              : a.inspecting
                ? n()?.exitInspection()
                : a.walking &&
                  (document.exitPointerLock?.(),
                  s.setState({ settingsOpen: !0, paused: !0 }));
      };
      return (
        window.addEventListener("keydown", c),
        () => window.removeEventListener("keydown", c)
      );
    }, [n]),
    I(() => {
      i.settingsOpen && document.getElementById("close-settings")?.focus();
    }, [i.settingsOpen]));
  function l() {
    (document.exitPointerLock?.(),
      s.setState({ settingsOpen: !0, paused: !0 }));
  }
  function f() {
    (s.setState({ settingsOpen: !1, paused: !1 }),
      document.querySelector("canvas")?.focus());
  }
  const S = !i.walking && !i.inspecting && !i.playing;
  return e(m, {
    children: [
      e("header", {
        class: `topbar ${i.walking ? "in-hall" : ""}`,
        children: [
          e("a", {
            class: "wordmark",
            href: "/",
            "aria-label": "Token Hall home",
            children: [
              e("span", { class: "brand-token", children: "T" }),
              e("span", { children: "Token Hall" }),
            ],
          }),
          e("span", {
            class: "build-label",
            children: [
              i.playing
                ? i.activeMachine === "claw"
                  ? O(i.clawStockId).name
                  : i.activeMachine === "cut"
                    ? "Snip & Win"
                    : i.activeMachine === "pusher"
                      ? "Coin Cascade"
                      : i.activeMachine === "tower"
                        ? "Tower Tumble"
                        : "Egg Orbit"
                : i.walking
                  ? "Claw Alley"
                  : "NO QUARTERS. NO CURFEW.",
              e("span", { class: "build-number", children: "FREE PLAY" }),
            ],
          }),
          e("button", {
            class: "collection-button",
            onClick: () => d(),
            disabled: !i.ready,
            children: "Prize collection",
          }),
          e("button", {
            class: "icon-button",
            onClick: l,
            "aria-label": "Settings",
            children: e("svg", {
              width: "21",
              height: "21",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "aria-hidden": "true",
              children: [
                e("path", { d: "M4 6h16M4 12h16M4 18h16" }),
                e("circle", { cx: "9", cy: "6", r: "2" }),
                e("circle", { cx: "15", cy: "12", r: "2" }),
                e("circle", { cx: "8", cy: "18", r: "2" }),
              ],
            }),
          }),
        ],
      }),
      S &&
        e("main", {
          class: "title-screen",
          children: [
            e("span", {
              class: "eyebrow",
              children: "EST. AFTER HOURS / STILL GOING",
            }),
            e("div", {
              class: "admission",
              children: [
                e("span", { class: "ticket-hole" }),
                e("span", { children: "OPEN LATE / LOSE TRACK OF TIME" }),
                e("span", { class: "ticket-hole" }),
              ],
            }),
            e("h1", {
              children: [
                e("span", { children: "TOKEN" }),
                e("span", {
                  children: [
                    "HALL",
                    e("span", { class: "title-dot", children: "." }),
                  ],
                }),
              ],
            }),
            e("div", { class: "title-rule" }),
            e("span", {
              class: "title-scribble",
              children: "JUST. ONE. MORE.",
            }),
            e("p", {
              class: "location",
              children: "Bad ideas. Good prizes. One more go.",
            }),
            e("button", {
              id: "enter",
              class: "primary",
              disabled: !i.ready || !!i.error,
              onClick: () => n()?.enterHall(),
              children: [
                e("span", { class: "button-token", children: "◎" }),
                i.ready ? "LET ME IN" : "Opening the hall…",
              ],
            }),
            e("button", {
              id: "inspect",
              class: "secondary",
              disabled: !i.ready,
              onClick: () => n()?.inspectCabinet(),
              children: "Meet the claw",
            }),
            e("p", {
              class: "phase-note",
              children:
                "Claws with commitment issues. Coin avalanches. Suspiciously cute loot.",
            }),
          ],
        }),
      i.playing &&
        i.activeMachine === "claw" &&
        e(m, {
          children: [
            e("div", {
              class: "machine-heading",
              children: [
                e("span", {
                  class: "serial",
                  children: "GRAB-A-PAL / SERIES 01",
                }),
                e("h1", { children: O(i.clawStockId).name }),
                e("p", {
                  children:
                    i.machineCamera === "overhead"
                      ? "Mint: head centre · Gold: vertical tip projections. Watch the sway; descent can shift them."
                      : "Aim. Steady the cable. Find your pal.",
                }),
              ],
            }),
            e("button", {
              class: "back-button machine-exit",
              onClick: () => n()?.exitClaw(),
              children: "Leave machine · Esc",
            }),
            e("div", {
              class: "machine-panel",
              children: [
                e("span", { class: "serial", children: "THE PRIZE CLUB" }),
                e("div", {
                  class: "machine-readout",
                  children: [
                    e("strong", {
                      children:
                        i.machinePhase === "POSITIONING"
                          ? Math.ceil(i.machineRemaining)
                              .toString()
                              .padStart(2, "0")
                          : (G[i.machinePhase]?.icon ?? "◇"),
                    }),
                    e("span", {
                      children:
                        i.machinePhase === "POSITIONING"
                          ? "SECONDS TO AIM"
                          : (G[i.machinePhase]?.label ?? "Claw cycle"),
                    }),
                  ],
                }),
                e("p", {
                  children:
                    i.machinePhase === "POSITIONING"
                      ? "Line up the head. Let the cable settle. Commit when you’re ready."
                      : i.machinePhase === "RESULT"
                        ? i.machineRoundWins
                          ? `Collected: ${i.roundPrizeNames.join(", ")}`
                          : "No prize through the chute. Try a different angle."
                        : "Watch the contact, grip and carry.",
                }),
                i.machinePhase === "POSITIONING" &&
                  e("div", {
                    class: "machine-controls",
                    children: [
                      e("kbd", { children: "↑" }),
                      e("kbd", { children: "←" }),
                      e("kbd", { children: "↓" }),
                      e("kbd", { children: "→" }),
                      e("span", { children: "Aim X / Z" }),
                    ],
                  }),
                i.machinePhase === "POSITIONING" &&
                  e("button", {
                    class: "primary",
                    onClick: () => n()?.dropClaw(),
                    children: ["Drop claw ", e("small", { children: "SPACE" })],
                  }),
                i.machinePhase === "RESULT" &&
                  i.machineRoundWins > 0 &&
                  e("div", {
                    class: "round-reward",
                    role: "status",
                    children: [
                      e("span", {
                        class: "serial",
                        children: "CHUTE DELIVERY CONFIRMED",
                      }),
                      e("div", {
                        class: "reward-badges",
                        children: i.roundPrizeIds.map((c, u) => {
                          const a = L.find((R) => R.id === c);
                          return a ? e(D, { def: a }, `${c}-${u}`) : null;
                        }),
                      }),
                      e("strong", {
                        children:
                          i.machineRoundWins === 1
                            ? "A new home for your prize."
                            : "A little haul to take home.",
                      }),
                      e("span", { children: i.roundPrizeNames.join(" · ") }),
                    ],
                  }),
                i.machinePhase === "RESULT" &&
                  e("button", {
                    class: "primary",
                    onClick: () => n()?.retryClaw(),
                    children: "Try another grab",
                  }),
                e("button", {
                  class: "camera-button",
                  onClick: () => n()?.toggleClawCamera(),
                  children:
                    i.machineCamera === "front"
                      ? "Overhead cutaway view"
                      : "Front cabinet view",
                }),
                e("button", {
                  class: "camera-button",
                  onClick: () => n()?.resetClawWalk(),
                  children: "Reset front view",
                }),
                e("span", {
                  class: "machine-score",
                  children:
                    "Arrows / left stick aim · Space / A drops · Y changes view",
                }),
                e("span", {
                  class: "machine-score",
                  children: [i.machineWins, " prizes collected this session"],
                }),
                e("span", {
                  class: "machine-score",
                  children: [
                    "Collection ",
                    Object.keys(i.collection.counts).length,
                    "/",
                    L.length,
                    " · ",
                    i.collection.tickets,
                    " tickets",
                  ],
                }),
                e("details", {
                  class: "machine-disclosure",
                  children: [
                    e("summary", { children: "My prize shelf" }),
                    Object.entries(i.collection.counts).map(([c, u]) =>
                      e(
                        "div",
                        {
                          children: [
                            L.find((a) => a.id === c)?.name ?? c,
                            " ×",
                            " ",
                            u,
                          ],
                        },
                        c,
                      ),
                    ),
                    e("span", {
                      children: [
                        "Virtual arcade collectibles ·",
                        " ",
                        z(i.collectionStatus),
                      ],
                    }),
                  ],
                }),
                e("button", {
                  class: "collection-button collection-launch",
                  onClick: () => d(),
                  children: "Inspect collection",
                }),
                i.machinePhase === "RESULT" &&
                  i.machineRoundWins > 0 &&
                  e("button", {
                    class: "collection-button collection-launch",
                    onClick: () => d(i.roundPrizeIds[0], !0),
                    children: "Inspect latest prize",
                  }),
                e("p", {
                  class: "machine-disclosure",
                  children: [
                    i.gripProfile === "strong"
                      ? "Strong grip"
                      : "Arcade grip",
                    " ",
                    "· Free play · Physical outcomes",
                  ],
                }),
                e("label", {
                  class: "grip-selector",
                  children: [
                    "Grip style",
                    e("select", {
                      value: i.gripProfile,
                      disabled: i.machinePhase !== "POSITIONING",
                      onChange: (c) =>
                        n()?.setGripProfile(c.currentTarget.value),
                      children: [
                        e("option", {
                          value: "strong",
                          children: "Practice grip · forgiving",
                        }),
                        e("option", {
                          value: "loose",
                          children: "Arcade grip · challenging",
                        }),
                      ],
                    }),
                  ],
                }),
                i.gripProfile === "loose" &&
                  e("p", {
                    class: "machine-disclosure",
                    children:
                      "The grip eases after pickup. Aim for the centre of your prize and expect some heartbreak.",
                  }),
              ],
            }),
          ],
        }),
      i.inspecting &&
        e(m, {
          children: [
            e("div", {
              class: "inspect-bar",
              children: [
                e("button", {
                  class: "back-button",
                  onClick: () => n()?.exitInspection(),
                  children: i.walking ? "Back to arcade" : "Back to title",
                }),
                e("button", {
                  class: "back-button",
                  onClick: () => n()?.resetView(),
                  children: "Reset view",
                }),
              ],
            }),
            e("div", {
              class: "inspect-caption",
              children: [
                e("span", {
                  class: "serial",
                  children:
                    i.activeMachine === "claw"
                      ? "CABINET 01 / CLAW"
                      : i.activeMachine === "cut"
                        ? "CABINET 02 / TIMING"
                        : i.activeMachine === "pusher"
                          ? "CABINET 04 / COIN PUSHER"
                          : i.activeMachine === "tower"
                            ? "CABINET 05 / COIN TOWER"
                            : "CABINET 03 / SURPRISE",
                }),
                e("h1", {
                  children:
                    i.activeMachine === "claw"
                      ? O(i.clawStockId).name
                      : i.activeMachine === "cut"
                        ? "Snip & Win"
                        : i.activeMachine === "pusher"
                          ? "Coin Cascade"
                          : i.activeMachine === "tower"
                            ? "Tower Tumble"
                            : "Egg Orbit",
                }),
                e("button", {
                  class: "primary",
                  disabled: i.machineLoading,
                  onClick: () =>
                    i.activeMachine === "claw"
                      ? void n()?.playClaw()
                      : void n()?.playPrizeGame(i.activeMachine),
                  children: i.machineLoading
                    ? "Preparing the stock…"
                    : `Play ${i.activeMachine === "claw" ? O(i.clawStockId).name : i.activeMachine === "cut" ? "Snip & Win" : i.activeMachine === "pusher" ? "Coin Cascade" : i.activeMachine === "tower" ? "Tower Tumble" : "Egg Orbit"}`,
                }),
                e("p", {
                  children: [
                    "Drag to rotate · Scroll to zoom",
                    e("br", {}),
                    "Arrow keys to rotate · Esc to return",
                  ],
                }),
              ],
            }),
          ],
        }),
      e(J, {
        state: i,
        getScene: n,
        onInspect: () => d(i.roundPrizeIds[0] ?? E, i.machineRoundWins > 0),
      }),
      S &&
        e("div", {
          class: "arcade-debris",
          "aria-hidden": "true",
          children: [
            e("span", {
              class: "sticker sticker-luck",
              children: "SKILL?\nLUCK?\nYES.",
            }),
            e("span", {
              class: "sticker sticker-night",
              children: "100%\nUNREASONABLE\nHOURS",
            }),
            e("span", {
              class: "tape-label",
              children: "DON’T FEED THE CLAW (IT BITES)",
            }),
            e("span", {
              class: "ticket-strip",
              children: "★ 0427 ★ 0428 ★ 0429 ★",
            }),
            e("span", {
              class: "doodle-arrow",
              children: "↙ YOUR NEW OBSESSION",
            }),
          ],
        }),
      S &&
        e("aside", {
          class: "cabinet-tag",
          children: [
            e("span", { class: "serial", children: "01 / CLAW ALLEY" }),
            e("strong", { children: "Grab-a-Pal" }),
            e("span", {
              class: "tag-line",
              children: "The Plush Club collection",
            }),
          ],
        }),
      i.walking &&
        !i.inspecting &&
        !i.playing &&
        e(m, {
          children: [
            e("div", { class: "crosshair", "aria-hidden": "true" }),
            i.targeted &&
              e("button", {
                class: "interaction-prompt",
                onClick: () => n()?.inspectCabinet(i.targeted),
                children: [
                  e("kbd", { children: "E" }),
                  e("span", {
                    children: [
                      "Meet the claw",
                      e("small", { children: "Free play · Prize arcade" }),
                    ],
                  }),
                ],
              }),
            e("div", {
              class: "walk-hints",
              children: [
                e("span", {
                  children: [
                    e("kbd", { children: "W" }),
                    e("kbd", { children: "A" }),
                    e("kbd", { children: "S" }),
                    e("kbd", { children: "D" }),
                    " Move",
                  ],
                }),
                e("span", {
                  children: [e("kbd", { children: "Shift" }), " Run"],
                }),
                e("span", {
                  children: [e("kbd", { children: "Esc" }), " Menu"],
                }),
                !C &&
                  e("span", {
                    class: "look-hint",
                    children: "Click the arcade to look around",
                  }),
              ],
            }),
          ],
        }),
      !i.walking &&
        !i.playing &&
        e("footer", {
          children: [
            e("span", { children: "OPEN LATE. BLAME THE CLAW." }),
            e("span", {
              class: "quality-label",
              children: [i.quality, " graphics · PC edition"],
            }),
          ],
        }),
      i.collectionOpen &&
        e(Z, {
          collection: i.collection,
          storageStatus: i.collectionStatus,
          selectedId: E,
          onSelect: y,
          onClose: h,
          revealedNames: w,
          onStudio: (c) => {
            const u = Y(s.getState().collection, c);
            s.setState({ collection: u, collectionStatus: _() });
          },
        }),
      i.settingsOpen &&
        e("div", {
          class: "modal-backdrop",
          onClick: (c) => {
            c.target === c.currentTarget && f();
          },
          children: e("section", {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "settings-title",
            class: "settings-panel",
            onKeyDown: (c) => {
              if (c.key !== "Tab") return;
              const u = c.currentTarget.querySelectorAll("button,select,input"),
                a = u[0],
                R = u[u.length - 1];
              c.shiftKey && document.activeElement === a
                ? (c.preventDefault(), R.focus())
                : !c.shiftKey &&
                  document.activeElement === R &&
                  (c.preventDefault(), a.focus());
            },
            children: [
              e("div", {
                class: "panel-heading",
                children: [
                  e("h2", { id: "settings-title", children: "Settings" }),
                  e("button", {
                    id: "close-settings",
                    class: "icon-button",
                    "aria-label": "Close settings",
                    onClick: f,
                    children: "×",
                  }),
                ],
              }),
              e("label", {
                class: "setting-row",
                children: [
                  e("span", { children: "Graphics quality" }),
                  e("select", {
                    value: i.quality,
                    onChange: (c) =>
                      s.setState({ quality: c.currentTarget.value }),
                    children: [
                      e("option", { value: "low", children: "Performance" }),
                      e("option", { value: "medium", children: "Balanced" }),
                      e("option", { value: "high", children: "High" }),
                      e("option", { value: "ultra", children: "Ultra" }),
                    ],
                  }),
                ],
              }),
              e("label", {
                class: "setting-row",
                children: [
                  e("span", { children: "Arcade sound" }),
                  e("input", {
                    type: "checkbox",
                    checked: !i.muted,
                    onChange: (c) =>
                      s.setState({ muted: !c.currentTarget.checked }),
                  }),
                ],
              }),
              e("label", {
                class: "setting-row",
                children: [
                  e("span", { children: "Reduce motion" }),
                  e("input", {
                    type: "checkbox",
                    checked: i.reducedMotion,
                    onChange: (c) =>
                      s.setState({ reducedMotion: c.currentTarget.checked }),
                  }),
                ],
              }),
              e("label", {
                class: "setting-row",
                children: [
                  e("span", {
                    children: [
                      "Field of view ",
                      e("small", { children: [i.fov, "°"] }),
                    ],
                  }),
                  e("input", {
                    type: "range",
                    min: "60",
                    max: "100",
                    value: i.fov,
                    onInput: (c) =>
                      s.setState({ fov: Number(c.currentTarget.value) }),
                  }),
                ],
              }),
              e("p", {
                class: "settings-note",
                children:
                  "High and Ultra add live floor reflections. Reduce motion stops ambient sway. Walking has no head bob.",
              }),
              i.walking &&
                e("button", {
                  class: "secondary return-title",
                  onClick: () => {
                    (f(), n()?.returnToTitle());
                  },
                  children: "Return to title",
                }),
            ],
          }),
        }),
      i.contextLost &&
        e("div", {
          class: "status-overlay",
          role: "status",
          children: [
            e("h2", { children: "Restoring the arcade" }),
            e("p", {
              children:
                "The graphics connection was interrupted. Your view will return when it recovers.",
            }),
          ],
        }),
      i.simulationBehind &&
        !i.contextLost &&
        e("div", {
          class: "catchup-notice",
          role: "status",
          children: [
            e("strong", { children: "The arcade is catching up" }),
            e("span", {
              children: "Lower graphics quality in Settings for smoother play.",
            }),
          ],
        }),
      i.error &&
        e("div", {
          class: "status-overlay",
          role: "alert",
          children: [
            e("h2", { children: "We couldn’t open the arcade" }),
            e("p", { children: i.error }),
            e("button", {
              class: "primary",
              onClick: () => location.reload(),
              children: "Try again",
            }),
          ],
        }),
      x &&
        e("output", {
          class: "debug",
          "aria-label": "Performance overlay",
          children: [
            i.metrics.fps,
            " fps · ",
            i.metrics.frameMs.toFixed(1),
            " ms/frame",
            e("br", {}),
            "Update ",
            i.metrics.updateMs.toFixed(2),
            " ms · Render",
            " ",
            i.metrics.renderMs.toFixed(2),
            " ms",
            e("br", {}),
            i.metrics.calls,
            " calls ·",
            " ",
            i.metrics.triangles.toLocaleString(),
            " triangles",
            e("br", {}),
            i.metrics.geometries,
            " geometries · ",
            i.metrics.textures,
            " ",
            "textures",
            e("br", {}),
            "Physics ",
            i.metrics.bodies,
            " bodies ·",
            " ",
            i.metrics.stepMs.toFixed(2),
            " ms",
            e("br", {}),
            "Heap ",
            i.metrics.heapMb?.toFixed(1) ?? "unavailable",
            " MB",
          ],
        }),
      e("div", {
        class: "pc-notice",
        children: [
          e("h2", { children: "See you at the arcade." }),
          e("p", {
            children:
              "Token Hall is built for PC. Open it with a keyboard and mouse.",
          }),
        ],
      }),
      e("div", {
        class: "sr-only",
        "aria-live": "polite",
        children: i.ready ? "Arcade ready." : "",
      }),
    ],
  });
}
let A;
let disposeController;
q(e(X, { getScene: () => A }), document.getElementById("ui"));
async function ee() {
  try {
    (await document.fonts.ready,
      (A = new K(document.getElementById("scene"))),
      A.start(),
      (disposeController = installController(() => A, s)),
      installMidway(s),
      new URLSearchParams(location.search).has("debug") &&
        Object.assign(window, {
          tokenHall: {
            getState: s.getState,
            getScene: () => A?.getDebugState(),
          },
        }));
  } catch (n) {
    (console.error(n),
      s.setState({
        error:
          "The arcade could not finish loading. Reload to try again. If the problem continues, check that hardware acceleration is enabled.",
      }));
  }
}
ee();
window.addEventListener(
  "pagehide",
  () => {
    disposeController?.();
    A?.dispose();
  },
  { once: !0 },
);
new URLSearchParams(location.search).has("playtest") &&
  H(
    () => import("../assets/playtest-D4ieCnsH.js"),
    __vite__mapDeps([6, 4, 1, 2, 3, 5]),
  ).then((n) => n.installLocalPlaytestRecorder());

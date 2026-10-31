import { LaptopGame } from "./laptop-games.js";
import { saveCollection, g as collectionStatus } from "./arcade.js";
import { CABINETS, MidwayGame, TAU } from "./midway-physics.js";
import { padState } from "./gamepad.js";
function cabinetArt(id, color) {
  const bricks = Array.from(
    { length: 18 },
    (_, i) =>
      `<rect x="${42 + (i % 6) * 32}" y="${35 + Math.floor(i / 6) * 18}" width="27" height="12" rx="3" fill="${["#ff5c7e", "#ffe05b", "#50deed"][Math.floor(i / 6)]}"/>`,
  ).join("");
  const pegs = Array.from(
    { length: 28 },
    (_, i) =>
      `<circle cx="${48 + (i % 7) * 28 + (Math.floor(i / 7) % 2) * 12}" cy="${35 + Math.floor(i / 7) * 24}" r="4" fill="${color}"/>`,
  ).join("");
  const shape =
    id === "bricks"
      ? bricks +
        '<path d="M110 135h65" stroke="white" stroke-width="8"/><circle cx="130" cy="108" r="6" fill="white"/>'
      : id === "rally"
        ? '<path d="M95 35h70M120 140h70" stroke="white" stroke-width="9"/><path d="M35 87h210" stroke="#fff3" stroke-dasharray="5 6"/><circle cx="145" cy="90" r="8" fill="white"/>'
        : id === "stack"
          ? Array.from(
              { length: 5 },
              (_, i) =>
                `<rect x="${60 + i * 9}" y="${135 - i * 23}" width="${150 - i * 15}" height="19" rx="3" fill="${color}" opacity="${0.45 + i * 0.12}"/>`,
            ).join("")
          : id.includes("wheel") || id === "lucky"
            ? `<circle cx="140" cy="85" r="65" stroke="${color}" stroke-width="22" stroke-dasharray="22 5" fill="#172b63"/><circle cx="140" cy="85" r="25" fill="${color}"/><path d="M130 7h20l-10 22z" fill="white"/>`
            : id === "plinko"
              ? pegs + '<path d="M40 145h200" stroke="white" stroke-width="5"/>'
              : id === "cut"
                ? `<path d="M140 15v70" stroke="white" stroke-width="3"/><circle cx="140" cy="115" r="34" fill="${color}"/><circle cx="111" cy="85" r="16" fill="${color}"/><circle cx="169" cy="85" r="16" fill="${color}"/><path d="M90 50l55 20M90 72l55-20" stroke="#ffe05b" stroke-width="5"/>`
                : `<ellipse cx="140" cy="100" rx="65" ry="22" stroke="${color}" stroke-width="9" fill="none"/><circle cx="150" cy="45" r="13" fill="#ffe05b"/><path d="M45 145h190" stroke="#fff4" stroke-width="5"/>`;
  const title=CABINETS.find(c=>c.id===id).name.toUpperCase();
  return `<svg class="cabinet-art" viewBox="0 0 280 355" aria-hidden="true"><defs><linearGradient id="body-${id}" x2="1" y2="1"><stop stop-color="#433457"/><stop offset="1" stop-color="#141123"/></linearGradient><radialGradient id="glow-${id}"><stop stop-color="${color}" stop-opacity=".4"/><stop offset="1" stop-color="#0b101e"/></radialGradient></defs><ellipse cx="142" cy="335" rx="112" ry="12" fill="${color}" opacity=".15"/><path d="M35 24L226 12L249 35V300L220 330H42L25 306V60Z" fill="#090b15" stroke="#6c5b85" stroke-width="2"/><path d="M226 12L249 35V300L220 330V42Z" fill="${color}" opacity=".3"/><path d="M35 24H225V252H38Z" fill="url(#body-${id})" stroke="${color}" stroke-width="3"/><rect x="40" y="30" width="180" height="42" rx="3" fill="${color}"/><text x="130" y="56" fill="#171222" text-anchor="middle" font-family="Bungee" font-size="${title.length>13?12:15}">${title}</text><rect x="43" y="80" width="174" height="148" rx="12" fill="url(#glow-${id})" stroke="#86739b" stroke-width="3"/><g transform="translate(46 95) scale(.6)">${shape}</g><path d="M38 235H220L235 268H27Z" fill="#342b46" stroke="${color}" stroke-width="2"/><ellipse cx="77" cy="254" rx="17" ry="6" fill="#11101b"/><path d="M77 252V237" stroke="#c2bed1" stroke-width="5"/><circle cx="77" cy="235" r="10" fill="${color}"/><ellipse cx="167" cy="253" rx="10" ry="6" fill="#ff5c92"/><ellipse cx="195" cy="249" rx="10" ry="6" fill="#ffe96a"/><path d="M40 272H220V326H40Z" fill="url(#body-${id})"/><rect x="119" y="281" width="41" height="24" rx="3" fill="#090d1a" stroke="#796b88"/><path d="M131 289h17" stroke="${color}" stroke-width="3"/><text x="130" y="319" text-anchor="middle" fill="#b5a5ca" font-family="monospace" font-size="8">TOKEN HALL • FREE PLAY</text><path d="M47 329v8h21v-8M194 329v8h21v-8" stroke="#06070e" stroke-width="8"/></svg>`;
}
export function installMidway(store) {
  const launch = document.createElement("button");
  launch.className = "midway-launch";
  launch.textContent = "✦ THE GOOD STUFF → 11 GAMES";
  document.body.append(launch);
  let overlay,
    raf,
    game,
    canvas,
    ctx,
    last = 0,
    debt = 0,
    held = false,
    keys = new Set(),
    previous = [],
    awarded = false,
    oldPaused = false,
    focus;
  const keydown = (e) => {
    if (!overlay) return;
    if (e.code === "Tab") {
      const items = [...overlay.querySelectorAll("button")];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      return;
    }
    if (e.code === "Escape") {
      e.preventDefault();
      e.stopImmediatePropagation();
      close();
      return;
    }
    if (["Space", "ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.code === "Space" && !e.repeat) game?.action();
      keys.add(e.code);
    }
  };
  const keyup = (e) => {
    if (!overlay) return;
    keys.delete(e.code);
    if (e.code === "Space") game?.release();
  };
  const blur = () => {
    keys.clear();
    held = false;
    game?.release();
  };
  window.addEventListener("blur", blur);
  window.addEventListener("keydown", keydown, true);
  window.addEventListener("keyup", keyup, true);
  function close() {
    if (!overlay) return;
    cancelAnimationFrame(raf);
    overlay.remove();
    overlay = null;
    game = null;
    launch.hidden = false;
    keys.clear();
    held = false;
    previous = [];
    store.setState({ paused: oldPaused });
    focus?.focus();
  }
  function open() {
    if (overlay) return;
    focus = document.activeElement;
    oldPaused = store.getState().paused;
    document.exitPointerLock?.();
    store.setState({ paused: true });
    launch.hidden = true;
    overlay = document.createElement("section");
    overlay.className = "reference-arcade";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "The Midway arcade");
    document.body.append(overlay);
    menu();
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function menu() {
    game = null;
    overlay.innerHTML =
      '<div class="midway-top"><span>TOKEN HALL / GAME ZONE</span><button data-close>Back to the hall · B / Esc</button></div><h1>YOU SAID<br>“LAST GAME.”</h1><p>That was three games ago. Pick a machine. We’re not judging.</p><div class="midway-grid"></div>';
    overlay.querySelector("[data-close]").onclick = close;
    const grid = overlay.querySelector(".midway-grid");
    for (const [i, c] of CABINETS.entries()) {
      const button = document.createElement("button");
      button.style.setProperty("--cabinet", c.color);
      button.innerHTML = `${cabinetArt(c.id, c.color)}<span>${String(i + 1).padStart(2, "0")} / ${c.ref}</span><strong>${c.name}</strong><small>${c.hint}</small><b>PLAY →</b>`;
      button.onclick = () => play(c);
      grid.append(button);
    }
    grid.querySelector("button").focus();
  }
  function play(c) {
    game = c.original
      ? new LaptopGame(c.id)
      : new MidwayGame(c.id, Math.floor(Math.random() * 0xffffffff));
    awarded = false;
    debt = 0;
    keys.clear();
    overlay.innerHTML = `<div class="midway-top"><button data-menu>← Machine floor · B</button><span>${c.ref}</span><button data-close>Leave · Esc</button></div><div class="midway-game"><div class="midway-canvas"><canvas width="600" height="800" aria-label="${c.name} playfield"></canvas></div><aside><span class="midway-kicker">${c.original ? "LAPTOP CLASSIC / ORIGINAL" : "FREE PLAY / PHOTO-INSPIRED CABINET"}</span><h1>${c.name}</h1><p>${c.hint}</p><output aria-live="polite"></output><div class="midway-score"></div><button class="primary" data-action>${c.id === "bowl" ? "HOLD TO CHARGE" : c.id === "stack" ? "LOCK BLOCK" : c.original ? "SERVE BALL" : "PLAY / DROP"} · A / Space</button><button data-retry>Fresh round · X</button><div class="midway-aim"><button aria-label="Aim left">←</button><span>L stick / arrows aim</span><button aria-label="Aim right">→</button></div><p class="midway-note">Tickets go to your existing prize collection. No money. No mystery rigging.</p></aside></div>`;
    canvas = overlay.querySelector("canvas");
    ctx = canvas.getContext("2d");
    overlay.querySelector("[data-menu]").onclick = menu;
    overlay.querySelector("[data-close]").onclick = close;
    const action = overlay.querySelector("[data-action]");
    action.onpointerdown = (e) => {
      e.preventDefault();
      action.setPointerCapture(e.pointerId);
      held = true;
      game.action();
    };
    action.onpointerup = action.onpointercancel = () => {
      held = false;
      game?.release();
    };
    action.onclick = (e) => {
      if (e.detail === 0) {
        game.action();
        if (game.kind === "bowl") game.release();
      }
    };
    overlay.querySelector("[data-retry]").onclick = () => play(c);
    overlay.querySelectorAll(".midway-aim button").forEach((b, i) => {
      const code = i ? "ArrowRight" : "ArrowLeft";
      b.onpointerdown = (e) => {
        b.setPointerCapture(e.pointerId);
        keys.add(code);
      };
      b.onpointerup = b.onpointercancel = () => keys.delete(code);
    });
    canvas.focus();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!overlay || document.hidden) return;
    const p = padState,
      buttons = p.buttons || [],
      edge = (i) => buttons[i] && !previous[i];
    if (game) {
      if (edge(1)) {
        menu();
        previous = [...buttons];
        return;
      }
      if (edge(0)) game.action();
      if (!buttons[0] && previous[0]) game.release();
      if (edge(2)) {
        const c = CABINETS.find((c) => c.id === game.kind);
        play(c);
      }
      const axis =
        (p.left?.[0] || 0) +
        Number(keys.has("ArrowRight") || keys.has("KeyD") || !!buttons[15]) -
        Number(keys.has("ArrowLeft") || keys.has("KeyA") || !!buttons[14]);
      debt = Math.min(debt + dt, 0.1);
      while (debt >= 1 / 240) {
        game.step(1 / 240, axis);
        debt -= 1 / 240;
      }
      draw();
      overlay.querySelector("output").textContent = game.message;
      overlay.querySelector(".midway-score").textContent =
        `${game.score} TICKETS · ${Math.min(game.attempts + 1, game.shots)} / ${game.shots} PLAYS`;
      if (game.phase === "result" && !awarded) {
        awarded = true;
        const c = store.getState().collection;
        const collection = { ...c, tickets: c.tickets + game.score };
        saveCollection(collection);
        store.setState({ collection, collectionStatus: collectionStatus() });
      }
    } else {
      if (edge(1)) {
        close();
        return;
      }
      const items = [...overlay.querySelectorAll("button")],
        i = items.indexOf(document.activeElement);
      if (edge(13) || edge(15)) items[(i + 1) % items.length]?.focus();
      if (edge(12) || edge(14))
        items[(i - 1 + items.length) % items.length]?.focus();
      if (edge(0)) document.activeElement?.click();
    }
    previous = [...buttons];
  }
  function draw() {
    const g = game,
      c = ctx;
    c.clearRect(0, 0, 600, 800);
    c.fillStyle = "#081c3b";
    c.fillRect(0, 0, 600, 800);
    const accent = CABINETS.find((x) => x.id === g.kind).color;
    c.strokeStyle = accent;
    c.lineWidth = 3;
    c.strokeRect(22, 22, 556, 756);
    c.font = "bold 16px Atkinson Hyperlegible";
    c.textAlign = "center";
    c.fillStyle = accent;
    c.fillText("TOKEN HALL / " + g.kind.toUpperCase(), 300, 52);
    const circle = (x, y, r, fill) => {
      c.beginPath();
      c.arc(x, y, r, 0, TAU);
      c.fillStyle = fill;
      c.fill();
    };
    const text = (s, x, y, size = 20, color = "#fff1df") => {
      c.fillStyle = color;
      c.font = `${size >= 26 ? "" : "bold "}${size}px ${size >= 26 ? "Bungee" : "Atkinson Hyperlegible"}`;
      c.fillText(s, x, y);
    };
    if (["rally", "bricks", "stack"].includes(g.kind)) {
      c.strokeStyle = "#ffffff12";
      c.lineWidth = 1;
      for (let y = 100; y < 750; y += 40) {
        c.beginPath();
        c.moveTo(25, y);
        c.lineTo(575, y);
        c.stroke();
      }
      if (g.kind === "stack") {
        for (const b of g.stack) {
          c.fillStyle = accent;
          c.shadowColor = accent;
          c.shadowBlur = 10;
          c.fillRect(b.x, b.y, b.w, 30);
        }
        c.shadowBlur = 0;
        if (g.phase === "ready") {
          const top = g.stack.at(-1);
          c.fillStyle = "#fff";
          c.fillRect(g.slide, top.y - 40, top.w, 30);
        }
        text(g.stack.length - 1 + " / 12 FLOORS", 300, 100, 22);
      } else {
        c.fillStyle = accent;
        c.shadowColor = accent;
        c.shadowBlur = 15;
        c.fillRect(g.aim - 60, 704, 120, 12);
        c.shadowBlur = 0;
        if (g.kind === "rally") {
          c.fillStyle = "#ff5b83";
          c.fillRect(g.enemy - 60, 104, 120, 12);
          text(g.goals + " : " + g.rival, 300, 385, 70, "#ffffff35");
        } else {
          for (const b of g.blocks)
            if (b.alive) {
              c.fillStyle = [
                "#ff5d82",
                "#ff9250",
                "#ffe05b",
                "#53e1dd",
                "#8294ff",
              ][b.row];
              c.fillRect(b.x, b.y, b.w, b.h);
            }
          text(g.lives + " LIVES", 300, 110, 18);
        }
        if (g.ball) {
          for (const [i, t] of g.trail.entries()) {
            c.globalAlpha = (i / g.trail.length) * 0.35;
            circle(t.x, t.y, 6, accent);
          }
          c.globalAlpha = 1;
          circle(g.ball.x, g.ball.y, 9, "#fff");
        } else if (g.phase === "ready") {
          circle(g.aim, 675, 9, "#fff");
          text("A / SPACE TO SERVE", 300, 620, 18);
        }
      }
    } else if (
      g.kind === "wheel" ||
      g.kind === "bigwheel" ||
      g.kind === "lucky"
    ) {
      const lucky = g.kind === "lucky",
        r = lucky ? 190 : 235;
      for (let i = 0; i < 16; i++) {
        const a = g.angle + (i * TAU) / 16;
        c.beginPath();
        c.moveTo(300, 390);
        c.arc(300, 390, r, a, a + TAU / 16);
        c.closePath();
        c.fillStyle = ["#fe79ad", "#a497ff", "#72e8df", "#e8f376"][i % 4];
        c.fill();
        if (!lucky) {
          c.save();
          c.translate(300, 390);
          c.rotate(a + TAU / 32);
          text(
            [
              20, 40, 60, 100, 20, 80, 40, 200, 20, 60, 40, 100, 20, 80, 40,
              500,
            ][i],
            r - 35,
            5,
            17,
            "#19152b",
          );
          c.restore();
        }
      }
      circle(300, 390, lucky ? 160 : 70, "#171427");
      text(lucky ? "KEY RELEASE" : "JUST ONE", 300, 385);
      text(lucky ? "STOP IN GREEN" : "MORE SPIN", 300, 415);
      if (lucky) {
        c.strokeStyle = "#6bffc2";
        c.lineWidth = 16;
        c.beginPath();
        c.arc(300, 390, r, -Math.PI / 2 - 0.16, -Math.PI / 2 + 0.16);
        c.stroke();
        circle(
          300 + Math.cos(g.angle) * r,
          390 + Math.sin(g.angle) * r,
          14,
          "#fff",
        );
      } else {
        c.fillStyle = "#fff";
        c.beginPath();
        c.moveTo(285, 125);
        c.lineTo(315, 125);
        c.lineTo(300, 160);
        c.fill();
      }
    } else if (g.kind === "flight") {
      const target =
        g.phase === "feedback"
          ? g.stopTarget
          : 390 + Math.sin(g.time * 0.7) * 180;
      c.fillStyle = "#244b44";
      c.fillRect(140, target - 28, 320, 56);
      text("LAND HERE", 300, target + 6, 18, "#77ffc9");
      for (let i = 0; i < 15; i++) {
        c.fillStyle = "#66527b";
        c.fillRect(70, 120 + i * 39, 20, 25);
        c.fillRect(510, 120 + i * 39, 20, 25);
      }
      const y =
        g.phase === "feedback" ? g.stopY : 390 + Math.sin(g.time * 2.2) * 220;
      c.fillStyle = "#edff69";
      c.fillRect(170, y - 8, 260, 16);
      text("A / SPACE TO STOP", 300, 725);
    } else {
      if (g.kind === "plinko") {
        for (const p of g.pegs) {
          circle(p.x, p.y, p.r + 3, "#45356a");
          circle(p.x, p.y, p.r, "#b4a6ee");
        }
        for (let i = 0; i < 7; i++) {
          c.fillStyle = i % 2 ? "#513269" : "#254d50";
          c.fillRect(24 + i * 79, 710, 76, 60);
          text([100, 40, 20, 200, 20, 40, 100][i], 62 + i * 79, 750, 18);
        }
      }
      if (g.kind === "tower" || g.kind === "magic")
        for (let i = 0; i < (g.kind === "tower" ? 5 : 3); i++) {
          const y = g.kind === "tower" ? 220 + i * 95 : 240 + i * 145,
            x = g.gap(i);
          c.fillStyle = accent;
          if (g.kind === "tower") {
            c.fillRect(24, y, x - 47 - 24, 12);
            c.fillRect(x + 47, y, 576 - x - 47, 12);
          } else {
            c.strokeStyle = accent;
            c.lineWidth = 7;
            c.beginPath();
            c.ellipse(x, y, 45, 13, 0, 0, TAU);
            c.stroke();
          }
          text("+" + (g.kind === "tower" ? 25 : 40), 65, y - 15, 13);
        }
      if (g.kind === "bowl" || g.kind === "magic") {
        const y = g.kind === "bowl" ? 300 : 730,
          x = g.target();
        c.strokeStyle = "#6bffc2";
        c.lineWidth = 8;
        c.beginPath();
        c.ellipse(x, y, 48, 18, 0, 0, TAU);
        c.stroke();
        if (g.kind === "bowl") {
          c.fillStyle = "#edff69";
          c.fillRect(100, 770, 400 * g.charge, 10);
          text("POWER · " + Math.round(g.charge * 100) + "%", 300, 745, 16);
        }
      }
      if (g.kind === "cut") {
        const cord = 300 + Math.sin(g.time * 0.8) * 70,
          x = 300 + Math.sin(g.time * 1.6) * 125;
        c.strokeStyle = "#fff";
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(cord, 100);
        c.lineTo(cord, g.cleanCut ? 180 : 400);
        c.stroke();
        text("✂", x, 280, 50, accent);
        const y = g.ball ? g.ball.y : 440;
        circle(cord - 30, y - 35, 21, accent);
        circle(cord + 30, y - 35, 21, accent);
        circle(cord, y, 55, accent);
        circle(cord - 18, y - 8, 6, "#222");
        circle(cord + 18, y - 8, 6, "#222");
      }
      if (g.phase === "ready" && !["cut"].includes(g.kind)) {
        c.strokeStyle = "#fff8";
        c.setLineDash([4, 9]);
        c.beginPath();
        c.moveTo(g.aim, 80);
        c.lineTo(g.aim, g.kind === "bowl" ? 690 : 160);
        c.stroke();
        c.setLineDash([]);
        circle(g.aim, g.kind === "bowl" ? 700 : 100, 13, accent);
      }
      if (g.ball && g.kind !== "cut") {
        for (let i = 0; i < g.trail.length; i++) {
          c.globalAlpha = (i / g.trail.length) * 0.3;
          circle(g.trail[i].x, g.trail[i].y, g.ball.r * 0.6, accent);
        }
        c.globalAlpha = 1;
        circle(g.ball.x, g.ball.y, g.ball.r, accent);
        circle(g.ball.x - 3, g.ball.y - 4, 3, "#fff");
      }
    }
    if (g.phase === "result") {
      c.fillStyle = "#0c0b16df";
      c.fillRect(55, 310, 490, 180);
      text("ROUND OVER", 300, 365, 30, accent);
      text(g.score + " TICKETS", 300, 415, 32);
      text("X / FRESH ROUND TO GO AGAIN", 300, 460, 16);
    }
  }
  const directPlay = event => {
    const cabinet=CABINETS.find(c=>c.id===event.detail);
    if(!cabinet)return;
    open();play(cabinet);
  };
  window.addEventListener("tokenhall:play",directPlay);
  launch.onclick = open;
  return () => {
    close();
    launch.remove();
    window.removeEventListener("tokenhall:play",directPlay);
    window.removeEventListener("keydown", keydown, true);
    window.removeEventListener("keyup", keyup, true);
    window.removeEventListener("blur", blur);
  };
}

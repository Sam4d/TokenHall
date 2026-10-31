import { CABINETS } from "./midway-physics.js";
export function cabinetArt(id, color) {
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
  const title = CABINETS.find((c) => c.id === id).name.toUpperCase();
  return `<svg class="cabinet-art" viewBox="0 0 280 355" aria-hidden="true"><defs><linearGradient id="body-${id}" x2="1" y2="1"><stop stop-color="#433457"/><stop offset="1" stop-color="#141123"/></linearGradient><radialGradient id="glow-${id}"><stop stop-color="${color}" stop-opacity=".4"/><stop offset="1" stop-color="#0b101e"/></radialGradient></defs><ellipse cx="142" cy="335" rx="112" ry="12" fill="${color}" opacity=".15"/><path d="M35 24L226 12L249 35V300L220 330H42L25 306V60Z" fill="#090b15" stroke="#6c5b85" stroke-width="2"/><path d="M226 12L249 35V300L220 330V42Z" fill="${color}" opacity=".3"/><path d="M35 24H225V252H38Z" fill="url(#body-${id})" stroke="${color}" stroke-width="3"/><rect x="40" y="30" width="180" height="42" rx="3" fill="${color}"/><text x="130" y="56" fill="#171222" text-anchor="middle" font-family="Bungee" font-size="${title.length > 13 ? 12 : 15}">${title}</text><rect x="43" y="80" width="174" height="148" rx="12" fill="url(#glow-${id})" stroke="#86739b" stroke-width="3"/><g transform="translate(46 95) scale(.6)">${shape}</g><path d="M38 235H220L235 268H27Z" fill="#342b46" stroke="${color}" stroke-width="2"/><ellipse cx="77" cy="254" rx="17" ry="6" fill="#11101b"/><path d="M77 252V237" stroke="#c2bed1" stroke-width="5"/><circle cx="77" cy="235" r="10" fill="${color}"/><ellipse cx="167" cy="253" rx="10" ry="6" fill="#ff5c92"/><ellipse cx="195" cy="249" rx="10" ry="6" fill="#ffe96a"/><path d="M40 272H220V326H40Z" fill="url(#body-${id})"/><rect x="119" y="281" width="41" height="24" rx="3" fill="#090d1a" stroke="#796b88"/><path d="M131 289h17" stroke="${color}" stroke-width="3"/><text x="130" y="319" text-anchor="middle" fill="#b5a5ca" font-family="monospace" font-size="8">TOKEN HALL • FREE PLAY</text><path d="M47 329v8h21v-8M194 329v8h21v-8" stroke="#06070e" stroke-width="8"/></svg>`;
}

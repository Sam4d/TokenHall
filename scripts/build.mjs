import { cp, mkdir, rm, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
const hash = createHash("sha256");
async function check(dir) {
  for (const e of (await readdir(dir, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await check(p);
    else {
      if (p.endsWith(".js")) execFileSync(process.execPath, ["--check", p]);
      hash.update(p);
      hash.update(await readFile(p));
    }
  }
}
await check("src");
await check("assets");
hash.update(await readFile("index.html"));
const version = hash.digest("hex").slice(0, 16),
  prefix = `/releases/${version}`;
await rm("dist", { recursive: true, force: true });
await mkdir(`dist${prefix}`, { recursive: true });
for (const folder of ["src", "assets"])
  await cp(folder, `dist${prefix}/${folder}`, { recursive: true });
const html = (await readFile("index.html", "utf8"))
  .replaceAll("/src/", `${prefix}/src/`)
  .replaceAll("/assets/", `${prefix}/assets/`);
await writeFile("dist/index.html", html);
await writeFile(
  "dist/version.json",
  JSON.stringify({ version, gameSelections: 19, physicalCabinets: 19 }),
);
console.log(
  `Built version ${version}: immutable release assets, revalidated HTML.`,
);

import { cp, mkdir, rm, readdir } from "node:fs/promises";
import { join } from "node:path";
const files = ["index.html", "assets", "src"];
// Fail on accidental syntax errors before copying the deployable static app.
import { execFileSync } from "node:child_process";
async function check(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await check(path);
    else if (path.endsWith(".js"))
      execFileSync(process.execPath, ["--check", path]);
  }
}
await check("src");
await check("assets");
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of files)
  await cp(file, join("dist", file), { recursive: true });
console.log("Built static arcade in dist/ (no external runtime dependencies).");

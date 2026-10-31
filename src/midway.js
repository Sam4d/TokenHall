import { CABINETS } from "./midway-physics.js";
// All entry points use the same nineteen-machine picker and the shared 3D scene.
export function installMidway(store, getScene) {
  const launch = document.createElement("button");
  launch.className = "midway-launch";
  launch.textContent = "ALL 19 MACHINES / PICK & PLAY";
  launch.onclick = () => document.querySelector(".arcade-launch")?.click();
  document.body.append(launch);
  const direct = (event) => {
    if (CABINETS.some((c) => c.id === event.detail))
      getScene()?.playFloorGame(event.detail);
  };
  window.addEventListener("tokenhall:play", direct);
  return () => {
    launch.remove();
    window.removeEventListener("tokenhall:play", direct);
  };
}

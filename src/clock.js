// Fixed physics steps with bounded catch-up after frame stalls.
export class SimulationClock {
  constructor(simDt = 1 / 120, maxSteps = 6) {
    this.simDt = simDt;
    this.maxSteps = maxSteps;
    ((this.accumulator = 0),
      (this.pendingSteps = 0),
      (this.stepsLastFrame = 0),
      (this.resetDiscardedSeconds = 0));
  }
  get backlogSeconds() {
    return this.pendingSteps * this.simDt;
  }
  advance(e, t) {
    if (!Number.isFinite(e)) throw new RangeError("Frame time must be finite");
    this.accumulator += Math.min(Math.max(e, 0), 0.1);
    const n = Math.floor(this.accumulator / this.simDt);
    ((this.pendingSteps = Math.min(this.pendingSteps + n, this.maxSteps * 2)),
      (this.accumulator -= n * this.simDt));
    let s = 0;
    for (; this.pendingSteps > 0 && s < this.maxSteps;)
      (t(this.simDt), this.pendingSteps--, s++);
    return (
      (this.stepsLastFrame = s),
      this.pendingSteps ? 1 : this.accumulator / this.simDt
    );
  }
  reset() {
    ((this.resetDiscardedSeconds += this.backlogSeconds + this.accumulator),
      (this.accumulator = 0),
      (this.pendingSteps = 0),
      (this.stepsLastFrame = 0));
  }
}

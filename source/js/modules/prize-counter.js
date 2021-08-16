class PrizeCounter {
  constructor(el, {start, end, step}) {
    this.endNum = end;
    this.currentNum = start;
    this.step = step;
    this.el = el;
    this.fpsInterval = 1000 / 12; // 12 кадров в сек.
    this.lastUpdateTime = Date.now();
    this.elapsed = 0;

    this.tick = this.tick.bind(this);
  }

  start() {
    this.tick();
  }

  stop() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  tick() {
    this.animationFrame = requestAnimationFrame(this.tick);
    const currentTime = Date.now();
    this.elapsed = currentTime - this.lastUpdateTime;

    if (this.elapsed > this.fpsInterval) {
      this.lastUpdateTime = currentTime - (this.elapsed % this.fpsInterval);

      if (this.currentNum < this.endNum) {
        this.currentNum += this.step;
        this.tick();
      } else {
        this.currentNum = this.endNum;
        this.stop();
      }
      this.draw(this.currentNum);
    }
  }

  draw(value) {
    this.el.innerText = value;
  }
}

export default PrizeCounter;

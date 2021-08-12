class Timer {
  constructor(counterFields, duration) {
    this.minutes = counterFields[0];
    this.seconds = counterFields[1];
    this.duration = duration;
    this.fpsInterval = 1000;
    this.lastUpdateTime = Date.now();
    this.startTime = null;
    this.elapsed = 0;

    this.tick = this.tick.bind(this);
  }

  start() {
    this.startTime = Date.now();
    this.draw(this.duration);
    this.tick();
  }

  stop() {
    this.draw(0);
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  tick() {
    this.animationFrame = requestAnimationFrame(this.tick);
    const currentTime = Date.now();
    this.elapsed = currentTime - this.lastUpdateTime;

    if (this.elapsed > this.fpsInterval) {
      this.lastUpdateTime = currentTime - (this.elapsed % this.fpsInterval);

      const leftTime = this.duration - (currentTime - this.startTime);

      if (leftTime > 0) {
        this.draw(leftTime);
      } else {
        this.stop();
      }
    }
  }

  draw(time) {
    const minValue = Math.floor(time / (1000 * 60));
    const secValue = Math.floor((time / 1000) % 60);

    this.minutes.innerText = this.prepareValue(minValue);
    this.seconds.innerText = this.prepareValue(secValue);
  }

  prepareValue(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

export default Timer;

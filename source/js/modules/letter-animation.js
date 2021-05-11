class LetterAnimation {
  constructor(elementSelector, options = {}) {
    this._step = 4;
    this._timeOffsetInterval = 70;

    this._elementSelector = elementSelector;
    this._element = document.querySelector(this._elementSelector);
    this._options = {...options};

    this._minOffset = 0;
    this._maxOffset = 0;

    this.prepareText();
  }

  _getOffset() {
    return (Math.floor(
        Math.random() * (this._maxOffset - this._minOffset + 1))
        + this._minOffset) * this._timeOffsetInterval;
  }

  wrapLetter(letter) {
    const {property = `transform`, duration = 500, timingFunction = `ease`} = this._options;
    const span = document.createElement(`span`);
    span.style.transition = `${property} ${duration}ms ${timingFunction} ${this._getOffset()}ms`;
    span.textContent = letter;

    ++this._currentIndex;
    return span;
  }

  prepareText() {
    if (!this._element) {
      return;
    }
    const words = this._element.textContent.trim().split(` `)
      .filter((word) => word !== ``);

    const content = words.reduce((fragmentParent, word, i) => {
      this._maxOffset = this._step * (i + 1);
      this._minOffset = this._maxOffset - this._step + 1;

      const wordElement = Array.from(word).reduce((fragment, letter) => {
        const wrappedLetter = this.wrapLetter(letter, word.length, i);
        fragment.appendChild(wrappedLetter);
        return fragment;
      }, document.createDocumentFragment());

      const wordWrap = document.createElement(`span`);
      wordWrap.classList.add(`text-word`);

      wordWrap.appendChild(wordElement);
      fragmentParent.appendChild(wordWrap);

      this._letterIndex = 0;

      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    setTimeout(() => this._element.classList.add(`animate`), this._options.delay || 200);
  }

  destroyAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.remove(`animate`);
  }
}

export default LetterAnimation;

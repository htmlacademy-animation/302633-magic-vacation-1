import throttle from 'lodash/throttle';
import Timer from './timer';
import PrizeCounter from './prize-counter';

const STORY_SCREEN_INDEX = 1;
const PRIZE_SCREEN_INDEX = 2;
const GAME_SCREEN_INDEX = 4;

const GAME_DURATION = 5 * 60 * 1000;

const prizeAnimationOptions = {
  primary: {
    counter: {
      start: 0,
      end: 3,
      step: 1
    },
    svgFile: `primary-award.svg`
  },
  secondary: {
    counter: {
      start: 1,
      end: 7,
      step: 1,
    },
    timeout: 1000,
    svgFile: `secondary-award.svg`
  },
  additional: {
    counter: {
      start: 11,
      end: 900,
      step: 90,
    },
    timeout: 2000,
    svgFile: `additional-award.svg`
  }
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.overlapBg = document.querySelector(`.overlap-bg`);
    this.counterFields = document.querySelectorAll(`.game__counter span`);

    // prizes
    this.prizes = document.querySelectorAll(`.prizes__item`);

    this.activeScreen = 0;
    this.prevActiveScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.gameTimer = new Timer(this.counterFields, GAME_DURATION);
    this.prizeAnimationsStarted = false;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const changeActiveScreen = () => {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.overlapBg.classList.remove(`active`);
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);

        if (this.activeScreen === GAME_SCREEN_INDEX) {
          this.gameTimer.start();
        } else {
          this.gameTimer.stop();
        }

        if (this.activeScreen === PRIZE_SCREEN_INDEX && !this.prizeAnimationsStarted) {
          this.prizeAnimationsStarted = true;
          this.startPrizeAnimation(this.prizes[0], prizeAnimationOptions.primary);
          this.startPrizeAnimation(this.prizes[1], prizeAnimationOptions.secondary);
          this.startPrizeAnimation(this.prizes[2], prizeAnimationOptions.additional);
        }
      }, 100);
    };

    if (this.prevActiveScreen === STORY_SCREEN_INDEX && this.activeScreen === PRIZE_SCREEN_INDEX) {
      this.overlapBg.classList.add(`active`);
      setTimeout(changeActiveScreen, 500);
    } else {
      changeActiveScreen();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    this.prevActiveScreen = this.activeScreen;
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  startPrizeAnimation(prizeEl, animationOptions) {
    const {timeout, counter, svgFile} = animationOptions;
    const img = prizeEl.querySelector(`img`);
    const prizeAmount = prizeEl.querySelector(`.prizes__desc b`);
    img.src = ``;

    setTimeout(() => {
      prizeEl.classList.add(`active`);
      const prizeCounter = new PrizeCounter(prizeAmount, counter);
      prizeCounter.start();
      img.src = `img/${svgFile}`;
    }, timeout);
  }
}

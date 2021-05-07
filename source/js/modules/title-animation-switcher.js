import LetterAnimation from './letter-animation';

const animatedTitles = [
  {selector: `.intro__title`, name: `introTitle`, screen: 0},
  {selector: `.intro__date`, options: {delay: 1000}, name: `introDate`, screen: 0},
  {selector: `.slider__item-title`, name: `sliderTitle`, screen: 1},
  {selector: `.prizes__title`, options: {delay: 1000}, name: `prizesTitle`, screen: 2},
  {selector: `.rules__title`, name: `rulesTitle`, screen: 3},
  {selector: `.game__title`, name: `gameTitle`, screen: 4}
];

class TitleAnimationSwitcher {
  constructor() {
    this.currentScreen = null;
    this.prevScreen = null;
    this.handleChangeScreen = this.handleChangeScreen.bind(this);
  }

  init() {
    document.body.addEventListener(`screenChanged`, this.handleChangeScreen);
    animatedTitles.forEach((item) => {
      this[item.name] = new LetterAnimation(item.selector, item.options);
    });
  }

  handleChangeScreen(e) {
    this.prevScreen = this.currentScreen;
    this.currentScreen = e.detail.screenId;

    animatedTitles.forEach((item) => {
      if (this.prevScreen === item.screen) {
        this[item.name].destroyAnimation();
      }

      if (this.currentScreen === item.screen) {
        if (!this[item.name]) {
          this[item.name] = new LetterAnimation(item.selector, item.options);
        }
        this[item.name].runAnimation();
      }
    });
  }
}

export default TitleAnimationSwitcher;

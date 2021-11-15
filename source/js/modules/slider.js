import Swiper from "swiper";
import Story from '../modules/3d/story';

export default () => {
  const story = new Story(`story-canvas`,
      [`./img/scene-1.png`, `./img/scene-2.png`, `./img/scene-3.png`, `./img/scene-4.png`]
  );
  let storySlider;

  const ColorThemes = [
    `dark-purple`,
    `light-blue`,
    `dark-blue`,
    `default`
  ];

  const changeTheme = () => {
    document.body.dataset.colorTheme = ColorThemes[Math.floor(storySlider.activeIndex / 2)];
  };

  const removeTheme = () => {
    document.body.removeAttribute(`data-color-theme`);
  };

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              story.changeScene(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              story.changeScene(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              story.changeScene(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              story.changeScene(3);
            }
            changeTheme();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              story.changeScene(0);
            } else if (storySlider.activeIndex === 2) {
              story.changeScene(1);
            } else if (storySlider.activeIndex === 4) {
              story.changeScene(2);
            } else if (storySlider.activeIndex === 6) {
              story.changeScene(3);
            }
            changeTheme();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  document.body.addEventListener(`screenChanged`, (e) => {
    if (storySlider && e.detail.screenName === `story`) {
      story.init();
      story.changeScene(0);
      changeTheme();
    } else {
      removeTheme();
    }
  });

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};

import PrimaryAwardScene from './canvas-animation/primary-award-scene';
import LooseScene from './canvas-animation/loose-scene';

const ANIMATION_OFFSET = 0.05;

const STROKE_PARAMS = [
  {name: `attributeName`, value: `stroke-dasharray`},
  {name: `dur`, value: `0.5s`},
  {name: `fill`, value: `freeze`},
];

const TRANSLATE_PARAMS = [
  {name: `attributeName`, value: `transform`},
  {name: `type`, value: `translate`},
  {name: `values`, value: `0 -99; 0 0; 0 -5; 0 0`},
  {name: `keyTimes`, value: `0; 0.66; 0.83; 1`},
  {name: `dur`, value: `0.7s`},
  {name: `fill`, value: `freeze`},
  {name: `calcMode`, value: `spline`},
  {name: `keySplines`, value: `0.88, 0, 1, 1; 0.33, 0, 0.67, 1; 0.33, 0, 0.67, 1`}
];

const SCALE_PARAMS = [
  {name: `attributeName`, value: `transform`},
  {name: `type`, value: `scale`},
  {name: `values`, value: `1.15 1.15; 1 1`},
  {name: `keyTimes`, value: `0; 1`},
  {name: `dur`, value: `0.5s`},
  {name: `fill`, value: `freeze`},
  {name: `additive`, value: `sum`}
];

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        setTimeout(() => {
          targetEl[0].classList.add(`screen--show`);
          initAnimation(targetEl[0]);
        }, 0);
        targetEl[0].classList.remove(`screen--hidden`);
      });
    }
    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};

const createSvgAnimationEl = (tag, attrs) => {
  const el = document.createElementNS(`http://www.w3.org/2000/svg`, tag);

  attrs.forEach((attr) => {
    el.setAttribute(attr.name, attr.value);
  });

  return el;
};

const playVictoryAnimation = (animatedEl) => {
  const pathEls = animatedEl.querySelectorAll(`path`);
  animatedEl.setAttribute(`transform`, `scale(1.15 1.15)`);

  const id = animatedEl.id.replace(/-/g, `_`);
  const initialAnimationId = `${id}_scale`;
  const animateTransform = createSvgAnimationEl(`animateTransform`, [
    ...SCALE_PARAMS,
    {name: `id`, value: `${initialAnimationId}`},
    {name: `begin`, value: `indefinite`},
  ]);

  animatedEl.appendChild(animateTransform);

  pathEls.forEach((path) => {
    const totalLength = path.getTotalLength();
    const length = totalLength / 3;
    path.setAttribute(`stroke-dasharray`, `0, ${length}`);

    const animate = createSvgAnimationEl(`animate`, [
      ...STROKE_PARAMS,
      {name: `from`, value: `0, ${length}`},
      {name: `to`, value: `${length}, 0`},
      {name: `begin`, value: `${initialAnimationId}.begin`}
    ]);
    path.appendChild(animate);
  });

  document.querySelector(`#${initialAnimationId}`).beginElement();
};

const playFailAnimation = (animatedEl) => {
  const pathEls = animatedEl.querySelectorAll(`path`);
  const id = animatedEl.id.replace(/-/g, `_`);
  const initialAnimationId = `${id}_translate_0`;

  pathEls.forEach((path, i) => {
    const totalLength = path.getTotalLength();
    const length = totalLength / 3;
    path.setAttribute(`stroke-dasharray`, `0, ${length}`);
    path.setAttribute(`transform`, `translate(0, -99)`);

    const offset = ANIMATION_OFFSET * i;

    const animate = createSvgAnimationEl(`animate`, [
      ...STROKE_PARAMS,
      {name: `from`, value: `0, ${length}`},
      {name: `to`, value: `${length}, 0`},
      {name: `begin`, value: `${initialAnimationId}.begin + ${offset}s`}
    ]);

    const animateTransform = createSvgAnimationEl(`animateTransform`, [
      ...TRANSLATE_PARAMS,
      {name: `id`, value: `${id}_translate_${i}`},
      {name: `begin`, value: i === 0 ? `indefinite` : `${initialAnimationId}.begin + ${offset}s`},
    ]);

    path.appendChild(animate);
    path.appendChild(animateTransform);
  });
  document.querySelector(`#${initialAnimationId}`).beginElement();
};

const initAnimation = (targetEl) => {
  const targetElementId = targetEl.getAttribute(`id`);
  const animatedEl = targetEl.querySelector(`.result__slogan`);
  let resultScene;

  switch (targetElementId) {
    case `result`:
      playVictoryAnimation(animatedEl);
      resultScene = new PrimaryAwardScene();
      resultScene.start();
      break;
    case `result3`:
      playFailAnimation(animatedEl);
      resultScene = new LooseScene();
      resultScene.start();
      break;
    default:
      playVictoryAnimation(animatedEl);
  }
};

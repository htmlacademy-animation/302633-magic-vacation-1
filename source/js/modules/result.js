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
    el.setAttribute(attr.name, attr.value)
  });

  return el;
};

const playVictoryAnimation = (animatedEl) => {
  const pathEls = animatedEl.querySelectorAll(`path`);
  animatedEl.setAttribute(`transform`, `scale(1.15 1.15)`);
  const animateTransform =  createSvgAnimationEl(`animateTransform`, [
    {name: `attributeName`, value: `transform`},
    {name: `type`, value: `scale`},
    {name: `values`, value: `1.15 1.15; 1 1`},
    {name: `keyTimes`, value: `0; 1`},
    {name: `dur`, value: `1s`},
    {name: `fill`, value: `freeze`},
    {name:  `begin`, value: `1s`},
    {name:  `additive`, value: `sum`}
  ]);

  pathEls.forEach((path) => {
    const totalLength = path.getTotalLength();
    const length = totalLength / 3;
    path.setAttribute(`stroke-dasharray`, `0, ${length}`);

    const animate = createSvgAnimationEl(`animate`, [
      {name: `attributeName`, value: `stroke-dasharray`},
      {name: `from`, value: `0, ${length}`},
      {name: `to`, value: `${length}, 0`},
      {name: `dur`, value: `0.5s`},
      {name: `fill`, value: `freeze`},
      {name:  `begin`, value: `1.5s`}
    ]);
    path.appendChild(animate);
  });

  animatedEl.appendChild(animateTransform)
};

const initAnimation = (targetEl) => {
  const targetElementId = targetEl.getAttribute(`id`);
  const animatedEl = targetEl.querySelector(`.result__slogan`);

  if (targetElementId !== `result3`) {
    playVictoryAnimation(animatedEl)
  }
}


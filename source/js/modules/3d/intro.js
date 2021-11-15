import * as THREE from 'three';
import AbstractView from './abstract-view';

class Intro extends AbstractView {
  constructor(canvasId, texture) {
    super(canvasId);
    this.texture = texture;
  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.setup3D();

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const texture = textureLoader.load(this.texture);
    const geometry = new THREE.PlaneGeometry(1, 1);

    loadManager.onLoad = () => {
      const material = new THREE.MeshBasicMaterial({map: texture});
      const image = new THREE.Mesh(geometry, material);
      image.scale.x = this.textureWidth;
      image.scale.y = this.textureHeight;
      this.scene.add(image);
      this.render();
    };
  }
}

const initIntro = () => {
  const intro = new Intro(`intro-canvas`, `/img/scene-0.png`);
  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `top`) {
      intro.init();
    }
  });
};

export default initIntro;

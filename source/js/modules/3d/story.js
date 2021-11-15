import * as THREE from 'three';
import AbstractView from './abstract-view';

class Story extends AbstractView {
  constructor(canvasId, textures) {
    super(canvasId);
    this.textures = textures;
  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.setup3D();

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) => textureLoader.load(texture));
    const geometry = new THREE.PlaneGeometry(1, 1);

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, i) => {
        const material = new THREE.MeshBasicMaterial({map: texture});
        const image = new THREE.Mesh(geometry, material);
        image.scale.x = this.textureWidth;
        image.scale.y = this.textureHeight;
        image.position.x = this.textureWidth * i;
        this.scene.add(image);
      });
      this.render();
    };
  }

  changeScene(sceneId) {
    this.camera.position.x = this.textureWidth * sceneId;
    this.render();
  }
}

export default Story;

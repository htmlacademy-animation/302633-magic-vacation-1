import * as THREE from 'three';

class AbstractView {
  constructor(canvasId) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.backgroundColor = 0x5f458c;

    this.fov = 45;
    this.aspect = this.width / this.height;
    this.near = 0.1;
    this.far = 1100;
    this.position = {
      z: 1100
    };
    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  setup3D() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setClearColor(this.backgroundColor, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.camera.position.z = this.position.z;
  }

  updateSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.aspect = this.width / this.height;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default AbstractView;

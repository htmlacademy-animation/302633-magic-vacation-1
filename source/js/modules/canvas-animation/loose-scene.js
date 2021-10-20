import Scene from './scene';
import easing from './easing';
import Animation from './animation';

const IMAGE_URLS = Object.freeze({
  key: `img/module-4/lose-images/key.png`,
  crocodile: `img/module-4/lose-images/crocodile.png`,
  flamingo: `img/module-4/lose-images/flamingo.png`,
  leaf: `img/module-4/lose-images/leaf.png`,
  saturn: `img/module-4/lose-images/saturn.png`,
  snowflake: `img/module-4/lose-images/snowflake.png`,
  watermelon: `img/module-4/lose-images/watermelon.png`,
  drop: `img/module-4/lose-images/drop.png`
});

const LOCALS = Object.freeze({
  mask: {
    centerX: 50,
    centerY: 43.5,
    radius: 9.1,
    endX: 87,
    endY: 53,
    startAngle: 270,
    endAngle: 48,
    opacity: 1,
    color: `#5f458c`,
    path: {
      x1: 56.1,
      y1: 50.3,
      x2: 59.1,
      y2: 65.5,
      x3: 59.1,
      y3: 80,
      x4: 100,
      y4: 80,
      x5: 100,
      y5: 34.45,
      x6: 50,
      y6: 34.45
    }
  }
});

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 18,
    opacity: 0,
    transforms: {
      scaleX: 0.8,
      scaleY: 0.8
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 52,
    y: 57,
    size: 57,
    opacity: 0,
    transforms: {
      translateX: 23,
      translateY: -12,
      rotate: 15
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 50,
    size: 10,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateX: 0,
      translateY: 0,
      rotate: 60
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 49,
    y: 50,
    size: 9,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateX: 0,
      translateY: 0,
      rotate: 60
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 49,
    size: 9,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateX: 0,
      translateY: 0,
      rotate: -40
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 50,
    size: 7,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateX: 0,
      translateY: 0,
      rotate: -60
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 50,
    size: 13,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateX: 0,
      translateY: 0,
      rotate: 50
    }
  },
  drop: {
    imageId: `drop`,
    x: 50,
    y: 60,
    size: 2.5,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0
    }
  }
});

class LooseScene extends Scene {
  constructor() {
    const canvas = document.getElementById(`loose-scene`);
    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGE_URLS
    });

    this.afterInit = () => {
      this.objects.flamingo.before = this.drawMask.bind(this);
    };
    this.animations = [];
    this.dropAnimations = [];
    this.initObjects();
    this.initAnimations();
    this.initLocals();

    this.animationDelay = 0;
  }

  initLocals() {
    this.locals = {
      ...LOCALS
    };
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));
    this.initKeyAnimations();
    this.initCrocodileAnimation();
    this.initFlamingoAnimations();
    this.initWatermelonAnimation();
    this.initLeafAnimation();
    this.initSnowflakeAnimation();
    this.initSaturnAnimation();

    setTimeout(() => {
      this.initDropAnimation();
    }, 800);

    this.animations.forEach((animation) => {
      animation.start();
    });
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.key;
        this.objects.key.opacity = progress;
        transforms.scaleX = progress > transforms.scaleX ? progress : transforms.scaleX;
        transforms.scaleY = progress > transforms.scaleY ? progress : transforms.scaleY;
      },
      duration: 200,
      delay: 0,
      easing: easing.easeOutExpo
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.flamingo;

        transforms.scaleX = progress;
        transforms.scaleY = progress;
        transforms.translateX = -15 * progress;
        transforms.translateY = -5.2 * progress;
        transforms.rotate = 60 * Math.sin(progressReversed * 2);
      },
      duration: 617,
      delay: 0,
      easing: easing.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.flamingo;

        transforms.translateY = 70 * progress;
      },
      duration: 583,
      delay: 617,
      easing: easing.easeOutCubic
    }));
  }

  initWatermelonAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.watermelon;

        transforms.scaleX = progress;
        transforms.scaleY = progress;
        transforms.translateX = -22 * progress;
        transforms.translateY = 16 * progress;
        transforms.rotate = 60 * Math.sin(progressReversed * 2);
      },
      duration: 533,
      delay: 0,
      easing: easing.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.watermelon;

        transforms.translateY = 55 * progress;
      },
      duration: 200,
      delay: 533,
      easing: easing.easeOutCubic
    }));
  }

  initLeafAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.leaf;

        transforms.scaleX = progress;
        transforms.scaleY = progress;
        transforms.translateX = 25 * progress;
        transforms.translateY = -15 * progress;
        transforms.rotate = -40 * Math.sin(progressReversed * 2);
      },
      duration: 533,
      delay: 0,
      easing: easing.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.leaf;

        transforms.translateY = 78 * progress;
      },
      duration: 583,
      delay: 533,
      easing: easing.easeOutCubic
    }));
  }

  initSnowflakeAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.snowflake;

        transforms.scaleX = progress;
        transforms.scaleY = progress;
        transforms.translateX = 12 * progress;
        transforms.translateY = 3 * progress;
        transforms.rotate = -60 * Math.sin(progressReversed * 2);
      },
      duration: 683,
      delay: 0,
      easing: easing.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.snowflake;

        transforms.translateY = 62 * progress;
      },
      duration: 583,
      delay: 683,
      easing: easing.easeOutCubic
    }));
  }

  initSaturnAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.saturn;

        transforms.scaleX = progress;
        transforms.scaleY = progress;
        transforms.translateX = 23 * progress;
        transforms.translateY = 22 * progress;
        transforms.rotate = 50 * Math.sin(progressReversed * 2);
      },
      duration: 617,
      delay: 0,
      easing: easing.easeOutExpo
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.saturn;

        transforms.translateY = 55 * progress;
      },
      duration: 300,
      delay: 617,
      easing: easing.easeOutCubic
    }));
  }

  initCrocodileAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const {transforms} = this.objects.crocodile;

        this.objects.crocodile.opacity = 1;
        transforms.translateX = 20 * progressReversed;
        transforms.translateY = -12 * progressReversed;
        transforms.rotate = 15 * Math.sin(progressReversed * 2);
      },
      duration: 600,
      delay: 300,
      easing: easing.easeLinear
    }));
  }

  initDropAnimation() {
    this.dropAnimations = [];
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        this.objects.drop.opacity = 1;
        transforms.scaleX = 1 * progress;
        transforms.scaleY = 1 * progress;
        transforms.translateX = -0.5 * progress;
      },
      duration: 600,
      delay: 0
    }));
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 7 * progress;
      },
      duration: 500,
      delay: 600,
    }));
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        const progressReversed = 1 - progress;
        transforms.scaleX = (0.5 * progressReversed) + 0.5;
        transforms.scaleY = (0.5 * progressReversed) + 0.5;
        transforms.translateX = -0.5 * progressReversed;
        this.objects.drop.opacity = 1 * progressReversed;
      },
      duration: 200,
      delay: 1100,
    }));

    this.dropAnimations.push(new Animation({
      func: () => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 0;
      },
      duration: 100,
      delay: 1300,
    }));

    this.dropAnimations.forEach((animation) => {
      animation.start();
    });

    setTimeout(() => {
      this.initDropAnimation();
    }, 2500);
  }

  drawMask() {
    const b = this.locals.mask;
    const path = b.path;
    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = b.color;

    this.ctx.beginPath();

    this.ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        (Math.PI / 180) * b.startAngle,
        (Math.PI / 180) * b.endAngle,
    );

    this.ctx.moveTo(
        path.x1 * s,
        path.y1 * s
    );

    this.ctx.lineTo(
        path.x2 * s,
        path.y2 * s
    );
    this.ctx.lineTo(
        path.x3 * s,
        path.y3 * s
    );
    this.ctx.lineTo(
        path.x4 * s,
        path.y4 * s
    );
    this.ctx.lineTo(
        path.x5 * s,
        path.y5 * s
    );
    this.ctx.lineTo(
        path.x6 * s,
        path.y6 * s
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}

export default LooseScene;

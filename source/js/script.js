// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import pageLoading from './modules/page-loading';
import TitleAnimationSwitcher from './modules/title-animation-switcher';
import initIntro from './modules/3d/intro';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
pageLoading();

const titleAnimationSwitcher = new TitleAnimationSwitcher();
titleAnimationSwitcher.init();
initIntro();
const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

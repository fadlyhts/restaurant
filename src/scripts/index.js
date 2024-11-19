import 'regenerator-runtime';
import '../styles/main.css';
import './components/app-bar';
import './components/app-footer';
import './components/app-hero';
import './components/list-resto';
import './components/customer-reviews';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});

const initDrawer = () => {
  const hamburgerButton = document.querySelector('#hamburgerButton');
  const navList = document.querySelector('.nav__list');
  const content = document.querySelector('#mainContent');

  const closeDrawer = (event) => {
    event.stopPropagation();
    navList.classList.remove('open');
  };

  hamburgerButton.addEventListener('click', (event) => {
    event.stopPropagation();
    navList.classList.toggle('open');
  });

  content.addEventListener('click', closeDrawer);
  document.body.addEventListener('click', (event) => {
    if (!navList.contains(event.target) && !hamburgerButton.contains(event.target)) {
      navList.classList.remove('open');
    }
  });
};

// Panggil fungsi setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  initDrawer();
});

document.querySelector('.skip-link').addEventListener('click', (e) => {
  e.preventDefault();
  const mainContent = document.querySelector('#mainContent');
  mainContent.focus();
  mainContent.scrollIntoView({ behavior: 'smooth' });
});
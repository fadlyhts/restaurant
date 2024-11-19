// app-bar.js
class AppBar extends HTMLElement {
  constructor() {
    super();
    this._drawer = null;
    this._hamburgerButton = null;
  }

  connectedCallback() {
    this.render();
    this._initElements();
    this._initEventListeners();
  }

  render() {
    this.innerHTML = `
        <nav class="nav">
          <h1 class="nav__title"><a href="/">Restaurant App</a></h1>
          <button id="hamburgerButton" class="hamburger" aria-label="Open Menu">☰</button>
          <ul id="navigationDrawer" class="nav__list">
            <li class="nav__item"><a href="/">Home</a></li>
            <li class="nav__item"><a href="#/favorite">Favorite</a></li>
            <li class="nav__item"><a href="https://github.com/fadlyhts" target="_blank" rel="noopener">About Us</a></li>
          </ul>
        </nav>
      `;
  }

  _initElements() {
    this._drawer = this.querySelector('#navigationDrawer');
    this._hamburgerButton = this.querySelector('#hamburgerButton');
  }

  _initEventListeners() {
    if (this._hamburgerButton && this._drawer) {
      this._hamburgerButton.addEventListener('click', (event) => {
        this._toggleDrawer(event);
      });

      document.addEventListener('click', (event) => {
        this._closeDrawerOnOutsideClick(event);
      });

      document.addEventListener('keydown', (event) => {
        this._closeDrawerOnEscape(event);
      });

      this._drawer.addEventListener('keydown', (event) => {
        this._trapFocusInDrawer(event);
      });
    } else {
      console.error('Hamburger button or navigation drawer not found');
    }
  }

  _toggleDrawer(event) {
    event.stopPropagation();
    this._drawer.classList.toggle('open');
  }

  _closeDrawerOnOutsideClick(event) {
    if (!this._drawer.contains(event.target) && !this._hamburgerButton.contains(event.target)) {
      this._drawer.classList.remove('open');
    }
  }

  _closeDrawerOnEscape(event) {
    if (event.key === 'Escape' && this._drawer.classList.contains('open')) {
      this._drawer.classList.remove('open');
    }
  }

  _trapFocusInDrawer(event) {
    if (event.key === 'Tab') {
      const focusableElements = this._drawer.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }
}

customElements.define('app-bar', AppBar);
class AppShell {
  constructor() {
    this._header = null;
    this._main = null;
    this._footer = null;
  }

  initializeApp() {
    this._header = document.querySelector('header');
    this._main = document.querySelector('main');
    this._footer = document.querySelector('footer');
  }

  renderPage(page) {
    this._main.innerHTML = '';
    this._main.appendChild(page);
  }
}

export default AppShell;

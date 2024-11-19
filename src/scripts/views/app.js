import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const pagePromise = routes[url];
    
    if (pagePromise) {
      try {
        const { default: page } = await pagePromise();
        this._content.innerHTML = await page.render();
        await page.afterRender();
      } catch (error) {
        console.error('Error loading page:', error);
        this._content.innerHTML = `<div class="error">Error loading page</div>`;
      }
    } else {
      this._content.innerHTML = `<div class="error">Page not found</div>`;
    }
  }
}

export default App;

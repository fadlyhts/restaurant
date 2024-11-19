class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <footer>
                <p>Copyright © ${new Date().getFullYear()} - RM Fadly</p>
            </footer>
        `;
  }
}

customElements.define('app-footer', AppFooter);

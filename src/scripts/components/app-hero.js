class AppHero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="hero">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcset="./images/heros/optimized/hero-desktop.webp"
            type="image/webp"
          >
          <source 
            media="(min-width: 768px)" 
            srcset="./images/heros/optimized/hero-desktop.jpg"
          >
          <source 
            srcset="./images/heros/optimized/hero-mobile.webp"
            type="image/webp"
          >
          <img 
            src="./images/heros/optimized/hero-mobile.jpg"
            alt="Restaurant hero image"
            class="hero__image"
          >
        </picture>
        <div class="hero__inner">
          <h2 class="hero__title">Discover Great Restaurants</h2>
          <p class="hero__tagline">Find the best dining experiences in your area</p>
        </div>
      </div>
    `;
  }
}

customElements.define('app-hero', AppHero);

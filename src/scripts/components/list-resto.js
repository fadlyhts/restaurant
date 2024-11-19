import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import restaurantsData from '../../public/data/DATA.json';

class ListResto extends HTMLElement {
  connectedCallback() {
    this.render();
    this.fetchRestaurants();
  }

  render() {
    this.innerHTML = `
            <section class="content">
                <h2 class="content__heading"> <a href="#content">Explore Restaurants</a></h2>
                <div id="restaurants" class="restaurants">
                    <!-- Restaurant list will be inserted here -->
                </div>
            </section>
        `;
  }

  async fetchRestaurants() {
    try {
      const restaurants = restaurantsData.restaurants;
      const restaurantsContainer = this.querySelector('#restaurants');
      
      // Clear existing content
      restaurantsContainer.innerHTML = '';
      
      // Create and append elements one by one
      restaurants.forEach((restaurant) => {
        const article = document.createElement('article');
        article.className = 'restaurant-item';
        
        const content = `
          <div class="restaurant-item__header">
              <img class="restaurant-item__thumbnail lazyload"
                   width="100%"
                   height="200"
                   data-src="${restaurant.pictureId}"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                   alt="${restaurant.name}">
          </div>
          <div class="restaurant-item__content">
              <h3 class="restaurant-item__title"><a href="#content">${restaurant.name}</a></h3>
              <p class="restaurant-item__description">${restaurant.description}</p>
              <p class="restaurant-item__city">City: ${restaurant.city}</p>
              <div class="restaurant-item__rating" aria-label="Rating ${restaurant.rating} out of 5">
                  ${this.getStars(restaurant.rating)}
              </div>
          </div>
        `;
        
        article.innerHTML = content;
        restaurantsContainer.appendChild(article);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getStars(rating) {
    const starTotal = 5;
    const starPercentage = (rating / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return `
            <div class="stars-outer">
                <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
            </div>
            <span class="number-rating">${rating}</span>
        `;
  }
}

customElements.define('list-resto', ListResto);

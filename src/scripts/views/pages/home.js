import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Welcome to RM Fadly</h1>
          <p class="hero__tagline">Discover the best restaurants in your area</p>
        </div>
      </div>

      <div class="content">
        <h2 class="content__heading">Explore Restaurants</h2>
        <div id="restaurants" class="restaurants">
          <div class="loader">Loading...</div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    try {
      const restaurants = await RestaurantSource.listRestaurants();

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = `
          <div class="restaurant-item__not__found">No restaurants found</div>
        `;
        return;
      }

      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error:', error);
      restaurantsContainer.innerHTML = `
        <div class="error">Error loading restaurants. Please try again later.</div>
      `;
    }
  },
};

export default Home;

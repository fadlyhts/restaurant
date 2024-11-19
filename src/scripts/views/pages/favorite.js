import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content-wrapper">
        <div class="content">
          <h2 class="content__heading">Your Favorite Restaurants</h2>
          <div id="restaurants" class="restaurants">
            <div class="loader">Loading...</div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = `
          <div class="restaurant-item__not__found">
            You don't have any favorite restaurant yet
          </div>
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
        <div class="error">Error loading favorite restaurants</div>
      `;
    }
  },
};

export default Favorite;

import API_ENDPOINT from '../../globals/api-endpoint';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster lazyload"
           data-src="${API_ENDPOINT.IMAGE.MEDIUM(restaurant.pictureId)}"
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
           alt="${restaurant.name || 'Restaurant Image'}"
           onerror="this.onerror=null;this.src='./images/placeholder.jpg';">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title">
        <a href="#/detail/${restaurant.id}">${restaurant.name || 'Restaurant Name'}</a>
      </h3>
      <p class="restaurant__city">📍 ${restaurant.city || 'Location not available'}</p>
      <p class="restaurant__description">${(restaurant.description || 'No description available').slice(0, 150)}...</p>
    </div>
  </div>
`;

export { createRestaurantItemTemplate };

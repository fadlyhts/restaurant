import API_ENDPOINT from '../../globals/api-endpoint';
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant">
        <div class="loader">Loading...</div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantSource.detailRestaurant(url.id);

      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = `
        <div class="restaurant-detail">
          <div class="restaurant-detail__header">
            <div class="restaurant-detail__hero">
              <img src="${API_ENDPOINT.IMAGE.LARGE(restaurant.pictureId)}" alt="${restaurant.name}">
              <div class="restaurant-detail__title">
                <h1>${restaurant.name}</h1>
                <button class="btn-detail">⭐ ${restaurant.rating}</button>
              </div>
            </div>
          </div>

          <div class="restaurant-detail__info">
            <div class="info-main">
              <div class="restaurant-location">
                <h2>Location</h2>
                <p>${restaurant.address}, ${restaurant.city}</p>
              </div>
              
              <div class="restaurant-categories">
                <h2>Categories</h2>
                <div class="categories-list">
                  ${restaurant.categories.map((category) => `
                    <span class="category-tag">${category.name}</span>
                  `).join('')}
                </div>
              </div>

              <div class="restaurant-description">
                <h2>Description</h2>
                <p>${restaurant.description}</p>
              </div>

              <div class="restaurant-menus">
                <h2>Menus</h2>
                <div class="menu-wrapper">
                  <div class="menu-section">
                    <h3>Foods</h3>
                    <ul class="menu-list">
                      ${restaurant.menus.foods.map((food) => `
                        <li>${food.name}</li>
                      `).join('')}
                    </ul>
                  </div>
                  <div class="menu-section">
                    <h3>Drinks</h3>
                    <ul class="menu-list">
                      ${restaurant.menus.drinks.map((drink) => `
                        <li>${drink.name}</li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
              </div>

              <div class="restaurant-reviews">
                <h2>Reviews</h2>
                <div class="review-form">
                  <h3>Add Your Review</h3>
                  <form id="reviewForm">
                    <div class="form-group">
                      <label for="reviewName">Name</label>
                      <input type="text" id="reviewName" required>
                    </div>
                    <div class="form-group">
                      <label for="reviewText">Review</label>
                      <textarea id="reviewText" required></textarea>
                    </div>
                    <button type="submit" class="submit-review">Submit Review</button>
                  </form>
                </div>
                <div class="review-list">
                  ${restaurant.customerReviews.map((review) => `
                    <div class="review-item">
                      <div class="review-header">
                        <strong>${review.name}</strong>
                        <span>${review.date}</span>
                      </div>
                      <p>${review.review}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            <div id="likeButtonContainer"></div>
          </div>
        </div>
      `;

      const reviewForm = document.getElementById('reviewForm');
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reviewData = {
          id: url.id,
          name: document.getElementById('reviewName').value,
          review: document.getElementById('reviewText').value,
        };

        try {
          const response = await RestaurantSource.addReview(reviewData);

          if (!response.error) {
            const reviewListContainer = document.querySelector('.review-list');
            reviewListContainer.innerHTML = response.customerReviews.map((review) => `
              <div class="review-item">
                <div class="review-header">
                  <strong>${review.name}</strong>
                  <span>${review.date}</span>
                </div>
                <p>${review.review}</p>
              </div>
            `).join('');

            reviewForm.reset();
            alert('Review added successfully!');
          }
        } catch (error) {
          console.error('Error adding review:', error);
          alert('Failed to add review. Please try again.');
        }
      });

      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });
    } catch (error) {
      console.error(error);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = '<div class="error">Error loading restaurant details</div>';
    }
  },
};

export default Detail;

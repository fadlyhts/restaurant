import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';

const createLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Liking A Restaurant', () => {
  beforeEach(async () => {
    createLikeButtonContainer();
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should show the like button when the restaurant has not been liked before', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      expect(document.querySelector('[aria-label="add to favorite"]'))
        .toBeTruthy();
    });

    it('should be able to like the restaurant', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { 
          id: 1,
          name: 'Test Restaurant',
          description: 'Test Description',
          pictureId: 'test-picture',
          city: 'Test City',
          rating: 4.5
        },
      });

      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
      expect(restaurant).toEqual({
        id: 1,
        name: 'Test Restaurant',
        description: 'Test Description',
        pictureId: 'test-picture',
        city: 'Test City',
        rating: 4.5
      });
    });

    it('should not duplicate restaurant in favorites when liked multiple times', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants.length).toBe(1);
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should not show the unlike button when the restaurant has not been liked before', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      expect(document.querySelector('[aria-label="remove from favorite"]'))
        .toBeFalsy();
    });

    it('should handle missing restaurant data gracefully', async () => {
      await expect(LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: null,
      })).rejects.toThrow();
    });

    it('should handle missing like button container gracefully', async () => {
      await expect(LikeButtonInitiator.init({
        likeButtonContainer: null,
        restaurant: { id: 1 },
      })).rejects.toThrow();
    });
  });
});

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    createLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should display unlike button when the restaurant has been liked', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      expect(document.querySelector('[aria-label="remove from favorite"]'))
        .toBeTruthy();
    });

    it('should be able to remove liked restaurant from the list', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants).toEqual([]);
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should not show the like button when the restaurant has been liked', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      expect(document.querySelector('[aria-label="add to favorite"]'))
        .toBeFalsy();
    });

    it('should handle multiple unlike attempts gracefully', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: { id: 1 },
      });

      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants).toEqual([]);
    });
  });
});

import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Integration Test', () => {
  // Clean up before each test
  beforeEach(async () => {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should be able to add restaurant to favorites', async () => {
      const testRestaurant = { 
        id: 'test-1',
        name: 'Test Restaurant',
        description: 'Test Description',
        pictureId: 'test-picture',
        city: 'Test City',
        rating: 4.5
      };
      
      await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(testRestaurant.id);
      expect(restaurant).toEqual(testRestaurant);
    });

    it('should be able to get all restaurants from favorites', async () => {
      const testRestaurants = [
        { id: 'test-1', name: 'Test Restaurant 1' },
        { id: 'test-2', name: 'Test Restaurant 2' }
      ];

      await FavoriteRestaurantIdb.putRestaurant(testRestaurants[0]);
      await FavoriteRestaurantIdb.putRestaurant(testRestaurants[1]);

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants).toEqual(testRestaurants);
    });

    it('should be able to remove restaurant from favorites', async () => {
      const testRestaurant = { id: 'test-1', name: 'Test Restaurant' };
      
      await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
      await FavoriteRestaurantIdb.deleteRestaurant(testRestaurant.id);
      
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(testRestaurant.id);
      expect(restaurant).toBeNull();
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should return null when getting non-existent restaurant', async () => {
      const restaurant = await FavoriteRestaurantIdb.getRestaurant('non-existent-id');
      expect(restaurant).toBeNull();
    });

    it('should handle adding restaurant without required id', async () => {
      const testRestaurant = { name: 'Test Restaurant' };
      
      await expect(async () => {
        await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
      }).rejects.toThrow('Data provided to an operation does not meet requirements');
    });

    it('should handle deleting non-existent restaurant', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant('non-existent-id');
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants).toEqual([]);
    });

    it('should not add duplicate restaurant', async () => {
      const testRestaurant = { id: 'test-1', name: 'Test Restaurant' };
      
      await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
      await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
      
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      expect(restaurants.length).toBe(1);
    });
  });
});

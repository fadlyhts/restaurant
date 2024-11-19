Feature('Liking Restaurant');

Before(async ({ I }) => {
  I.amOnPage('/');
});

// Positive Test Cases
Scenario('liking a restaurant', async ({ I }) => {
  // Verify home page and wait for content
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  
  // Get restaurant title for verification
  const firstRestaurant = locate('.restaurant__title').first();
  const restaurantTitle = await I.grabTextFrom(firstRestaurant);
  
  // Like the restaurant
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');
  
  // Verify restaurant is in favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.see(restaurantTitle);
});

Scenario('unliking a restaurant', async ({ I }) => {
  // Like a restaurant first
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  
  const firstRestaurant = locate('.restaurant__title').first();
  const restaurantTitle = await I.grabTextFrom(firstRestaurant);
  
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');
  
  // Go to favorites and verify
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.see(restaurantTitle);
  
  // Unlike the restaurant
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="remove from favorite"]');
  I.click('[aria-label="remove from favorite"]');
  
  // Verify restaurant is removed from favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurants', 10);
  I.dontSee(restaurantTitle);
});

// Edge Cases
Scenario('showing empty favorites', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurants', 10);
  I.see("You don't have any favorite restaurant yet", '.restaurant-item__not__found');
});

Scenario('liking and unliking multiple restaurants', async ({ I }) => {
  // Like first restaurant
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  
  const firstRestaurant = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');
  
  // Go back and like second restaurant
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);
  
  const secondRestaurant = locate('.restaurant__title').at(2);
  const secondRestaurantTitle = await I.grabTextFrom(secondRestaurant);
  
  I.click(locate('.restaurant__title a').at(2));
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');
  
  // Verify both restaurants are in favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.see(firstRestaurantTitle);
  I.see(secondRestaurantTitle);
  
  // Unlike both restaurants
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="remove from favorite"]');
  I.click('[aria-label="remove from favorite"]');
  
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  I.waitForElement('#likeButtonContainer', 10);
  I.seeElement('[aria-label="remove from favorite"]');
  I.click('[aria-label="remove from favorite"]');
  
  // Verify all restaurants are removed from favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurants', 10);
  I.dontSee(firstRestaurantTitle);
  I.dontSee(secondRestaurantTitle);
});

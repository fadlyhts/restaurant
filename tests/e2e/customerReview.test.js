Feature('Customer Review');

Before(async ({ I }) => {
  I.amOnPage('/');
});

Scenario('adding a review to a restaurant', async ({ I }) => {
  // Go to restaurant detail
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  
  // Wait for detail page to load
  I.waitForElement('.restaurant-detail', 10);
  I.see('Reviews');
  
  // Get current review count
  const beforeReviewCount = await I.grabNumberOfVisibleElements('.review-item');
  
  // Fill in review form
  I.fillField('#reviewName', 'E2E Test User');
  I.fillField('#reviewText', 'This is an automated test review from E2E testing');
  
  // Submit review
  I.click('.submit-review');
  I.wait(2); // Wait for API response
  
  // Verify new review appears in the list
  I.waitForElement('.review-list', 10);
  I.see('E2E Test User');
  I.see('This is an automated test review from E2E testing');
  
  // Verify review count increased
  const afterReviewCount = await I.grabNumberOfVisibleElements('.review-item');
  I.say(`Reviews before: ${beforeReviewCount}, after: ${afterReviewCount}`);
  if (afterReviewCount <= beforeReviewCount) {
    throw new Error('Review count should have increased');
  }
});

Scenario('trying to submit empty review', async ({ I }) => {
  // Go to restaurant detail
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  
  // Wait for detail page to load
  I.waitForElement('.restaurant-detail', 10);
  I.see('Reviews');
  
  // Try to submit empty form
  I.click('.submit-review');
  
  // Should see HTML5 validation message
  I.seeElement('#reviewName:invalid');
  I.seeElement('#reviewText:invalid');
});

Scenario('viewing existing reviews', async ({ I }) => {
  // Go to restaurant detail
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  
  // Wait for detail page and reviews to load
  I.waitForElement('.restaurant-detail', 10);
  I.see('Reviews');
  
  // Verify review section exists
  I.seeElement('.review-list');
  I.seeElement('.review-item');
  
  // Verify review components
  I.seeElement('.review-header');
  I.seeElement('.review-header strong'); // reviewer name
  I.seeElement('.review-header span');   // review date
  I.seeElement('.review-item p');        // review text
});

Scenario('adding multiple reviews to the same restaurant', async ({ I }) => {
  // Go to restaurant detail
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  
  // Wait for detail page to load
  I.waitForElement('.restaurant-detail', 10);
  I.see('Reviews');
  
  // Get initial review count
  const initialCount = await I.grabNumberOfVisibleElements('.review-item');
  
  // Add first review
  I.fillField('#reviewName', 'First Reviewer');
  I.fillField('#reviewText', 'First review comment');
  I.click('.submit-review');
  I.wait(2); // Wait for API response
  
  // Add second review
  I.fillField('#reviewName', 'Second Reviewer');
  I.fillField('#reviewText', 'Second review comment');
  I.click('.submit-review');
  I.wait(2); // Wait for API response
  
  // Verify both reviews exist
  const finalCount = await I.grabNumberOfVisibleElements('.review-item');
  I.say(`Reviews before: ${initialCount}, after: ${finalCount}`);
  if (finalCount <= initialCount + 1) {
    throw new Error('Should have at least two more reviews');
  }
  
  // Verify review content
  I.see('First Reviewer');
  I.see('First review comment');
  I.see('Second Reviewer');
  I.see('Second review comment');
});

Scenario('review form resets after submission', async ({ I }) => {
  // Go to restaurant detail
  I.see('Explore Restaurants');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__title a').first());
  
  // Wait for detail page to load
  I.waitForElement('.restaurant-detail', 10);
  I.see('Reviews');
  
  // Fill and submit review
  I.fillField('#reviewName', 'Test User');
  I.fillField('#reviewText', 'Test review content');
  I.click('.submit-review');
  I.wait(2); // Wait for API response
  
  // Verify form is reset
  I.seeInField('#reviewName', '');
  I.seeInField('#reviewText', '');
  
  // Verify review was added
  I.see('Test User');
  I.see('Test review content');
});

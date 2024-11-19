class CustomerReviews extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="customer-reviews">
            <h2 class="customer-reviews__title">What Our Customers Say</h2>
            <div class="customer-reviews__list">
                <div class="customer-review__item">
                    <img src="images/user/user1.jpg" alt="User 1" class="customer-review__avatar">
                    <p class="customer-review__text">"jos"</p>
                    <p class="customer-review__name">- alu</p>
                </div>
                <div class="customer-review__item">
                    <img src="images/user/user2.jpg" alt="User 2" class="customer-review__avatar">
                    <p class="customer-review__text">"mantap"</p>
                    <p class="customer-review__name">- ahmad</p>
                </div>
                <div class="customer-review__item">
                    <img src="images/user/user3.jpg" alt="User 3" class="customer-review__avatar">
                    <p class="customer-review__text">"slebew"</p>
                    <p class="customer-review__name">- fadli</p>
                </div>
            </div>
        </section>
        `;
  }
}

customElements.define('customer-reviews', CustomerReviews);

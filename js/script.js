// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all product cards
  const productCards = document.querySelectorAll('.list-products .card-body');
  
  // Initialize each product card with event listeners
  productCards.forEach(function(card) {
    // Get elements for this specific card
    const plusBtn = card.querySelector('.fa-plus-circle');
    const minusBtn = card.querySelector('.fa-minus-circle');
    const quantitySpan = card.querySelector('.quantity');
    const deleteBtn = card.querySelector('.fa-trash-alt');
    const heartBtn = card.querySelector('.fa-heart');
    const unitPriceElement = card.querySelector('.unit-price');
    
    // Parse unit price (remove $ and spaces, convert to number)
    const unitPrice = parseFloat(unitPriceElement.textContent.replace('$', '').trim());
    
    // Initialize quantity
    let quantity = parseInt(quantitySpan.textContent) || 0;
    
    // Plus button event listener
    plusBtn.addEventListener('click', function() {
      quantity++;
      quantitySpan.textContent = quantity;
      updateTotalPrice();
    });
    
    // Minus button event listener
    minusBtn.addEventListener('click', function() {
      if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;
        updateTotalPrice();
      }
    });
    
    // Delete button event listener
    deleteBtn.addEventListener('click', function() {
      // Get the parent card-body div (the one containing the entire card)
      const cardContainer = card.closest('.card-body');
      if (cardContainer) {
        // Set quantity to 0 before removing
        quantity = 0;
        quantitySpan.textContent = 0;
        // Remove the entire card
        cardContainer.remove();
        updateTotalPrice();
      }
    });
    
    // Heart button event listener (like functionality)
    heartBtn.addEventListener('click', function() {
      // Toggle liked state
      if (heartBtn.style.color === 'red' || heartBtn.classList.contains('liked')) {
        heartBtn.style.color = 'black';
        heartBtn.classList.remove('liked');
      } else {
        heartBtn.style.color = 'red';
        heartBtn.classList.add('liked');
      }
    });
  });
  
  // Function to calculate and update total price
  function updateTotalPrice() {
    let total = 0;
    
    // Loop through all remaining product cards
    const remainingCards = document.querySelectorAll('.list-products .card-body');
    
    remainingCards.forEach(function(card) {
      const quantitySpan = card.querySelector('.quantity');
      const unitPriceElement = card.querySelector('.unit-price');
      
      const quantity = parseInt(quantitySpan.textContent) || 0;
      const unitPrice = parseFloat(unitPriceElement.textContent.replace('$', '').trim());
      
      total += quantity * unitPrice;
    });
    
    // Update total price display
    const totalElement = document.querySelector('.total');
    if (totalElement) {
      totalElement.textContent = total + ' $';
    }
  }
  
  // Initialize total price on page load
  updateTotalPrice();
});


// Select all product cards
const productCards = document.querySelectorAll('.product-card');

// Loop through each card and attach event listeners
productCards.forEach(card => {
    // Redirect when the card itself is clicked
    card.addEventListener('click', function() {
        window.location.href = 'product-specialisation.html';
    });

    // Find the favorite button inside this specific card
    const favoriteButton = card.querySelector('.favorite-btn');

    // Prevent click from propagating if favorite button is clicked
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the card's click event
        });
    }
});


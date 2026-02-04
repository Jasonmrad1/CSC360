$(document).ready(function(){
    $('.upper-header-mobile-slick').slick({
        slidesToShow: 1, // Show only one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Enable automatic scrolling
        autoplaySpeed: 2000, // Time in milliseconds between auto scroll
        arrows: false, // Disable navigation arrows
        infinite: true, // Loop infinitely
        speed: 500, // Speed of the animation
        cssEase: 'linear' // Smooth scrolling
    });
});
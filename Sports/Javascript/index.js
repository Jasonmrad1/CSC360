document.addEventListener('DOMContentLoaded', function () {
    const menuItems1 = document.querySelectorAll('.menu > li');
    const menuItems=[menuItems1[0],menuItems1[1],menuItems1[2]];
    const darkOverlay = document.getElementById('darkOverlay-dropdown');
const body=document.body;
    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
          darkOverlay.classList.add('active'); // Show the overlay
          
        });

        item.addEventListener('mouseout', () => {
          darkOverlay.classList.remove('active');
            
        });
    });
});
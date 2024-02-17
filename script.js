



const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';

    window.addEventListener('resize', () => {
        // Check if the window width is greater than 768px
        if (window.innerWidth < 800) {
            sideMenu.style.display = 'block';
         } // Show the side menu
    });
    
})



const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
})


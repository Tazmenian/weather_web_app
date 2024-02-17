

// =====================   MENU & Close BTN =========================//
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


// =====================   DARK Theme ========================= //
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})



// =====================   Table Content  ====================== //
// Assuming Orders is an array containing your order data

const Orders = [
    {
        productName : 'Foldable Mini Drone',
        productNumber : '856631',
        paymentStatus: 'Due',
        shipping: 'Pending'
    },
    {
        productName : 'Furukuda Vision Pro',
        productNumber : '859761',
        paymentStatus: 'Refunded',
        shipping: 'Declined'
    },
    {
        productName : 'Hanameshi Electric Pad',
        productNumber : '898599',
        paymentStatus: 'Paid',
        shipping: 'Delivered'
    },
    {
        productName : 'Standy Drone k12',
        productNumber : '845321',
        paymentStatus: 'Paid',
        shipping: 'Delivered'
    },
    {
        productName : 'KIAK Camera foldable',
        productNumber : '856655',
        paymentStatus: 'Refunded',
        shipping: 'Declined'
    }
]

Orders.forEach(order =>{
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.shipping === 'Declined' ? 'danger' : order.shipping === 'Pending' ? 'warning' : 'primary'}">${order.shipping}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent; // Set the content of the <tr> element
    document.querySelector('table tbody').appendChild(tr); // Append the <tr> to the <tbody> of the table
});


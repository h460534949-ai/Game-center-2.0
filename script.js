// Fade-in effect on page load
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(function () {
        document.body.style.opacity = '1';
    }, 50);
});

// Shopping cart functionality
const cart = [];
const menuItems = document.querySelectorAll('.menu-item');
const cartBar = document.getElementById('cartBar');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const modalOverlay = document.getElementById('modalOverlay');
const orderSummary = document.getElementById('orderSummary');
const modalTotal = document.getElementById('modalTotal');
const closeModal = document.getElementById('closeModal');

// Add click handlers to menu items
menuItems.forEach(item => {
    const addBtn = item.querySelector('.add-btn');
    
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleItem(item);
    });
    
    item.addEventListener('click', () => {
        toggleItem(item);
    });
});

function toggleItem(item) {
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);
    
    const existingIndex = cart.findIndex(c => c.name === name);
    
    if (existingIndex > -1) {
        // Remove from cart
        cart.splice(existingIndex, 1);
        item.classList.remove('selected');
    } else {
        // Add to cart
        cart.push({ name, price });
        item.classList.add('selected');
    }
    
    updateCart();
}

function updateCart() {
    const count = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some snacks first.');
        return;
    }
    
    // Build order summary
    orderSummary.innerHTML = '';
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span class="order-item-name">${item.name}</span>
            <span class="order-item-price">$${item.price.toFixed(2)}</span>
        `;
        orderSummary.appendChild(div);
    });
    
    modalTotal.textContent = `$${total.toFixed(2)}`;
    modalOverlay.classList.add('active');
});

// Close modal
closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

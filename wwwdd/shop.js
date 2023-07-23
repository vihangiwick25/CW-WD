const drawer = document.getElementById('drawer');
const viewCart = document.getElementsByClassName('view')
const buyButtons = document.querySelectorAll('.buy');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutButton = document.querySelector('.checkout');
const payNowButton = document.getElementById('paynowButton');
const nameInput = document.getElementById('name');
const contactInput = document.getElementById('contact');
const deliveryCheckbox = document.getElementById('delivery');
const closeCheckoutButton = document.querySelector('.close-modal');
const closeSuccessButton = document.querySelector('.close-success');


buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        const container = button.closest('.pro');
        const productName = container.querySelector('h5').textContent;
        const productPrice = parseFloat(container.querySelector('h4').textContent.replace('$', ''));
        const quantity = parseInt(container.querySelector('input[name="quantity"]').value);

        const itemTotalPrice = productPrice * quantity;

        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${productName}</td>
            <td>$${productPrice.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>$${itemTotalPrice.toFixed(2)}</td>
        `;

        const selectedItemsDiv = document.getElementById('selectedItems');
        selectedItemsDiv.appendChild(listItem);

        updateTotalPrice(itemTotalPrice);
        showDrawer();
    });
});
// view the cart
function showDrawer() {
    drawer.classList.add('open');
    document.addEventListener('click', handleOutsideClick);
}
// Clear the cart section details without closing the drawer
function closeDrawer() {
    clearCartDetails();
    minimizeDrawer();
}
//clear cart details
function clearCartDetails() {
    const selectedItemsDiv = document.getElementById('selectedItems');
    selectedItemsDiv.innerHTML = '';
    document.getElementById('totalPrice').textContent = 'Total: $0.00';
}
//update total price
function updateTotalPrice(amount) {
    const totalPriceElement = document.getElementById('totalPrice');
    const currentTotalPrice = parseFloat(totalPriceElement.textContent.replace('Total: $', ''));
    const newTotalPrice = (currentTotalPrice + amount).toFixed(2);
    totalPriceElement.textContent = `Total: $${newTotalPrice}`;
}

function handleOutsideClick(event) {
    if (!drawer.contains(event.target) && !event.target.classList.contains('buy')) {
        minimizeDrawer();
    }
}

function minimizeDrawer() {
    drawer.classList.remove('open');
    document.removeEventListener('click', handleOutsideClick);
}

// view the checkout modal
function showCheckoutModal() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = totalPriceElement.textContent;

    // Update the total price in the checkout modal
    const modalTotalPriceElement = document.getElementById('modalTotalPrice');
    modalTotalPriceElement.textContent = totalPrice;

    // Check if the required fields are filled
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const delivery = deliveryCheckbox.checked;

    if (name !== '' && contact !== '' && delivery) {
        checkoutModal.style.display = 'block';
        const blurContainer = document.getElementById('blurContainer');
        blurContainer.classList.add('modal-open');
    } else {
        alert("Please fill in all required fields before proceeding to checkout.");
    }
}

function exitCheckoutModal() {
    checkoutModal.style.display = 'none';
    const blurContainer = document.getElementById('blurContainer');
    blurContainer.classList.remove('modal-open');
}

function showSplashScreen() {
    console.log("Payment Successful");
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.style.display = 'block';

    // blur effect
    document.body.classList.add('show-splash');

    setTimeout(() => {
        hideSplashScreen();
        showSuccessModal();
    }, 2000); // 
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.style.display = 'none';

    document.body.classList.remove('show-splash');
}


checkoutButton.addEventListener('click', showCheckoutModal);
closeCheckoutButton.addEventListener('click', exitCheckoutModal);

nameInput.addEventListener('input', checkCheckoutButton);
contactInput.addEventListener('input', checkCheckoutButton);
deliveryCheckbox.addEventListener('change', checkCheckoutButton);

function checkCheckoutButton() {
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const delivery = deliveryCheckbox.checked;

    if (name !== '' && contact !== '' && delivery) {
        payNowButton.disabled = false;
    } else {
        payNowButton.disabled = true;
    }
}

payNowButton.addEventListener('click', () => {
    showSplashScreen();
});

function exitSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';

    document.body.classList.remove('show-splash');
}
closeSuccessButton.addEventListener('click', exitSuccessModal);

const drawer = document.getElementById('drawer');
const buyButtons = document.querySelectorAll('.buy');


buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // Get the product details from the clicked button's container
        const container = button.closest('.pro');
        const productName = container.querySelector('h5').textContent;
        const productPrice = parseFloat(container.querySelector('h4').textContent.replace('$', ''));
        const quantity = parseInt(container.querySelector('input[name="quantity"]').value);

        const itemTotalPrice = productPrice * quantity;

        // Create a new list item for the chosen product
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${productName}</td>
            <td>$${productPrice.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>$${itemTotalPrice.toFixed(2)}</td>
        `;

        // Append the list item to the selectedItems div in the drawer
        const selectedItemsDiv = document.getElementById('selectedItems');
        selectedItemsDiv.appendChild(listItem);

        // Calculate and update the total price in the drawer
        updateTotalPrice(itemTotalPrice);
        showDrawer();
    });
});

function showDrawer() {
    drawer.classList.add('open');
    document.addEventListener('click', handleOutsideClick);
}

function closeDrawer() {
    // Clear the cart section details without closing the drawer
    clearCartDetails();
}
function clearCartDetails() {
    const selectedItemsDiv = document.getElementById('selectedItems');
    selectedItemsDiv.innerHTML = '';
    document.getElementById('totalPrice').textContent = 'Total: $0.00';
}

function updateTotalPrice(amount) {
    const totalPriceElement = document.getElementById('totalPrice');
    const currentTotalPrice = parseFloat(totalPriceElement.textContent.replace('Total: $', ''));
    const newTotalPrice = (currentTotalPrice + amount).toFixed(2);
    totalPriceElement.textContent = `Total: $${newTotalPrice}`;
}
function handleOutsideClick(event) {
    // Check if the clicked element is inside the drawer or a buy button
    if (!drawer.contains(event.target) && !event.target.classList.contains('buy')) {
        minimizeDrawer();
    }
}

function minimizeDrawer() {
    drawer.classList.remove('open');
    // Remove the click event listener when minimizing the drawer
    document.removeEventListener('click', handleOutsideClick);
}


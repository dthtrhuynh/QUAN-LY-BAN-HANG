let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addtocart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} đã được thêm vào giỏ hàng!`);
}

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            addtocart(name, price);
        });
    });
    if (document.getElementById("cart-items")) {
        loadCart();
    }
    if (window.location.pathname.includes("cart.html")) {
        loadCart();
    }
    updateCheckoutTotal();
});

function loadCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    if (!cartItems || !totalPriceElement) return;
    let totalPrice = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
        return;
    }

    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name} - ${item.price.toLocaleString()} VNĐ 
            <button onclick="removeFromCart(${index})">Xóa</button></p>`;
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function submitOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    if (!name || !address || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return false;
    }

    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi đặt hàng
    window.location.href = "index.html"; // Quay lại trang chủ
    return false; // Ngăn form gửi dữ liệu đi
}

function updateCheckoutTotal() {
    let totalPriceElement = document.getElementById("checkout-total");
    if (totalPriceElement) {
        let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = totalPrice.toLocaleString();
    }
}
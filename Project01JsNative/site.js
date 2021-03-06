const data = [
    {
        id: 0,
        img: '/images/redmiK20.jpg',
        name: 'Redmi K20',
        price: 210,
        save: 25,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 1,
        img: '/images/samGalaxynote20.jpg',
        name: 'Samsung Galaxy Note 20',
        price: 285,
        save: 50,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 2,
        img: '/images/oppofindX2.jpg',
        name: 'OPPO Find X2',
        price: 140,
        save: 30,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 3,
        img: '/images/realmeX20pro.jpg',
        name: 'Realme X50 Pro',
        price: 385,
        save: 35,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 4,
        img: '/images/redminote8.jpg',
        name: 'Redmi Note 8',
        price: 300,
        save: 15,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 5,
        img: '/images/redminote9.jpg',
        name: 'Redmi Note 9',
        price: 420,
        save: 25,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 6,
        img: '/images/redmi8.jpg',
        name: 'Redmi 8A Dual',
        price: 360,
        save: 20,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 7,
        img: '/images/redmi9.jpg',
        name: 'Redmi 9',
        price: 145,
        save: 10,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList = []; // array for list of product

let i;
let detail = document.getElementsByClassName('card-item');
let detailsImg = document.getElementById('details-img')
let detailTitle = document.getElementById('detail-title')
let detailPrice = document.getElementById('detail-price')
let youSave = document.getElementById('you-save');
let detailsPage = document.getElementById('details-page');
let back = document.getElementById('buy')
back.addEventListener('click', refreshPage)
let addToCarts = document.querySelectorAll('#add-to-cart')
let cart = document.getElementById('cart');

// click event to display cart page
cart.addEventListener('click', displayCart)

let carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click', () => addToCart(getId))

let home = document.getElementById('site');


//click event to hide cart page and return to home page
home.addEventListener('click', hideCart);

//events on to remove items from list
document.addEventListener('click', function (e) {
    if (e.target.id == 'remove') {
        let itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for (i = 0; i < data.length; i++) {
    detail[i].addEventListener('click', handleDetail)
}

let getId;

//click events to add items to cart from home page cart icon
addToCarts.forEach(val => val.addEventListener('click', () => addToCart(val.parentNode.id)));

// details function
function handleDetail(e) {
    detailsPage.style.display = 'block'
    getId = this.parentNode.id;
    detailsImg.src = data[getId].img;
    detailTitle.innerHTML = data[getId].name;
    detailPrice.innerHTML = 'Price : $ ' + data[getId].price;
    youSave.innerHTML = 'You save : ($ ' + data[getId].save + ')';
}

// add item to the cart
function addToCart(id) {
    if (!data[id].itemInCart) {
        cartList = [...cartList, data[id]];
        addItem()

        alert('item added to your cart')

    }
    else {
        alert('your item is already there')
    }
    data[id].itemInCart = true
}

//back to main page
function refreshPage() {
    detailsPage.style.display = 'none'
}

// hide your cart page
function hideCart() {
    document.getElementById('main').style.display = "block";
    document.getElementById('cart-container').style.display = "none";
}

// Page of cart
function displayCart() {
    document.getElementById('main').style.display = "none";
    document.getElementById('details-page').style.display = "none";
    document.getElementById('cart-container').style.display = "block";
    if (cartList.length == 0) {
        document.getElementById('cart-with-items').style.display = "none";
        document.getElementById('empty-cart').style.display = "block";
    }
    else {
        document.getElementById('empty-cart').style.display = "none";
        document.getElementById('cart-with-items').style.display = "block";

    }
}

validationHandler();
let totalAmount;
let totalItems;
let totalSaving;

//add item to the cart
function addItem() {
    totalAmount = 0;
    totalItems = 0;
    totalSaving = 0
    let clrNode = document.getElementById('item-body');
    clrNode.innerHTML = '';
    console.log(clrNode.childNodes)
    cartList.map((cart) => {
        let cartCont = document.getElementById('item-body');
        totalAmount = totalAmount + cart.price;
        totalSaving = totalSaving + cart.save;
        totalItems = totalItems + 1;

        let tempCart = document.createElement('div')
        tempCart.setAttribute('class', 'cart-list');
        tempCart.setAttribute('id', cart.id);

        let listImg = document.createElement('img');
        listImg.setAttribute('id', 'list-img');
        listImg.src = cart.img
        tempCart.appendChild(listImg)

        let listName = document.createElement('h3');
        listName.setAttribute('class', 'list-name');
        listName.innerHTML = cart.name;
        tempCart.appendChild(listName)

        let listPay = document.createElement('h3');
        listPay.setAttribute('class', 'pay');
        listPay.innerHTML = cart.price;
        tempCart.appendChild(listPay);

        let listQuantity = document.createElement('h3');
        listQuantity.setAttribute('class', 'quantity');
        listQuantity.innerHTML = '1';
        tempCart.appendChild(listQuantity);

        let listTrash = document.createElement('i');
        listTrash.setAttribute('class', 'fa fa-trash ');
        listTrash.setAttribute('id', 'remove');
        tempCart.appendChild(listTrash);

        cartCont.appendChild(tempCart)

    })
    document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
    document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
    document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
    document.getElementById('total').style.display = "block";
}

//remove item from the cart
function removeFromCart(itemId) {
    data[itemId].itemInCart = false
    cartList = cartList.filter((list) => list.id != itemId);
    addItem()
    if (cartList.length == 0) {
        document.getElementById('cart-with-items').style.display = "none";
        document.getElementById('empty-cart').style.display = "block";
    }
}

// Validation
function validationHandler() {
    const validateButton = document.getElementById('deliverybtn');

    validateButton.addEventListener('click', () => {
        this.validateData();
    })
}

function validateData() {
    const name = document.getElementById("name");
    const phone = document.getElementById('phone');
    const email = document.getElementById("email");
    const phoneRegexp = /^[\+373|373]*[0]*[0-9]{7,8}$/;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!(new RegExp(/^[a-zA-Z ]{2,30}$/).test(name.value))) {
        console.log("Error. Repeat input name");
        return;
    }

    if (!(new RegExp(phoneRegexp).test(phone.value))) {
        console.log("Error. Repeat input phone");
        return;
    }

    if (!(new RegExp(emailRegexp).test(email.value))) {
        console.log("Error. Repeat input email");
        return;
    }

    localStorage.setItem('phone', phone.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('name', name.value);

    alert("Your order has been accepted. Expect delivery!");
}
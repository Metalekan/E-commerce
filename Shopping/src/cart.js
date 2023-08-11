let shoppingCart = document.getElementById('productSelect');
let emptyCart = document.getElementById('emptyCart');
let checkout = document.getElementById('totalDiv');
let projectBasket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
    let cartAmount = document.querySelector('.badge');
    cartAmount.innerHTML = projectBasket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
    if (projectBasket.length !== 0 || projectBasket === [] ) {
        return shoppingCart.innerHTML = projectBasket.map((x)=> {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `<div id="${id}" class="bg-light rounded-2 cartProduct">
            <div><img src="${search.thumbnail}" class="cartImg" alt="productImg"></div>
            <div class="d-flex flex-column justify-content-center ">
                <span class="fw-bold">${search.title}</span>
                <span class="fw-bold">$${search.price * item}</span>
            </div>
            <div class="productPrice d-flex align-items-center">
                <span class="fw-bold p-2 rounded-2">$${search.price}</span>
                <h5 class="d-flex align-items-center gap-1 border">
                <i onclick="decrement(${id})" class="fa fa-minus btn text-danger" aria-hidden="true"></i>
                <span id="quantity" class="">${item}</span>
                <i onclick="increment(${id})" class="fa fa-plus btn text-success" aria-hidden="true"></i></h5>
            </div>
            <i onclick="removeItem(${id})" class="fa fa-trash btn" aria-hidden="true"></i>
          </div>`;
        }).join('')
    } else {
        emptyCart.innerHTML = `<h2 class="">Cart is Empty</h2>
        <a href="index.html"><button class="btn btn-dark my-3">Back to store</button>
        </a>`;
    }
};
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = projectBasket.find((x) => x.id === id);
    if (search === undefined) {
        console.log(search);
        projectBasket.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem);
    totalAmount();
    localStorage.setItem('data', JSON.stringify(projectBasket));

};

let decrement = (id) => {
    let selectedItem = id;
    let search = projectBasket.find((x)=> x.id === id);
    if (search === undefined) return;
    if (search.item === 0) return; 
    else {
        search.item -= 1;
    }
    update(selectedItem);
    totalAmount();
    projectBasket = projectBasket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem('data', JSON.stringify(projectBasket));
};

let update = (id) => {
    let search = projectBasket.find((x)=> x.id === id);
    console.log(search.item);

    document.getElementById('quantity').innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    projectBasket = projectBasket.filter((x) => x.id != selectedItem);
    if (projectBasket.length >= 1) {
        generateCartItems();
        totalAmount();
        calculation();
        console.log(projectBasket.length);
    } else if (projectBasket.length === 0) {
        location.reload();
    }
    localStorage.setItem('data', JSON.stringify(projectBasket));
}

let totalAmount = () => {
    if (projectBasket.length != 0) {
        let amount = projectBasket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price
            
        }).reduce((x, y) => x + y, 0);
        checkout.innerHTML = `<div class="mb-3">
        <h4 class="">Total Bill : <span class="fw-bold font">$${amount}</span></h4>
        <button onclick="checkOut()" class="btn btn-success">Checkout</button>
        <button onclick="clearAll()" class="btn btn-danger">Clear all</button>
        </div>
        `;
    } else return;
}
totalAmount();

let clearAll = () => {
    projectBasket = [];
    totalAmount();
    calculation();
    generateCartItems();
    location.reload();
    localStorage.setItem('data', JSON.stringify(projectBasket));
    // totalAmount();
}
let checkedOut = false;

function init() {
  renderMenu();
  renderBasket();
}

// #region render function

// entire menu
function renderMenu() {
  const menuRef = document.getElementById("menu");
  menuRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    menuRef.innerHTML += getMenuTemplate(indexMenu);

    renderDishes(indexMenu);
  }
}

// menu cards
function renderDishes(indexMenu) {
  const menuCardWrapperRef = document.getElementById(
    `menu-card-wrapper${indexMenu}`,
  );
  menuCardWrapperRef.innerHTML = "";

  for (
    let indexDishes = 0;
    indexDishes < menu[indexMenu].dishes.length;
    indexDishes++
  ) {
    menuCardWrapperRef.innerHTML += getDishesTemplate(indexMenu, indexDishes);
  }
}



// new basket

function renderBasket(){
  const basketRef = document.getElementById('basket');
  const totals = calculateTotal();

  // basket with elements that only need rendering once
  basketRef.innerHTML = getBasketTemplate(totals);
  console.log(basketRef)

// render dish cards into basket
  const basketWrapperRef = document.getElementById(`basket-wrapper`);
  basketWrapperRef.innerHTML = "";

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    basketWrapperRef.innerHTML += getBasketCardTemplate(indexBasket);
  }
}




// add to basket
// make sure dishes are not added as two seperate cards but use counter instead
// store access to full menu array in variable const dish
// 
function addToBasket(indexMenu, indexDishes) {
  const dish = menu[indexMenu].dishes[indexDishes];

  let foundItem = false;
  let repeatingDish = "";

  for (let basketItem = 0; basketItem < basket.length; basketItem++) {
    if (basket[basketItem].name === dish.name) {
      foundItem = true;
      repeatingDish = basket[basketItem];
      break;
    }
  }

  if (foundItem === true) {
    repeatingDish.count++;
  } else {
    basket.push({
      name: dish.name,
      price: dish.price,
      count: 1,
    });
  }

  renderBasket();
}










function decreaseCount(indexBasket) {
  basket[indexBasket].count--;

  if (basket[indexBasket].count <= 0) {
    basket.splice(indexBasket, 1);
  }

  renderBasket();
}

function increaseCount(indexBasket) {
  basket[indexBasket].count++;
  renderBasket();
}

function deleteFromBasket(indexBasket) {
  basket.splice(indexBasket, 1);
  renderBasket();
}

function checkOut() {
  checkedOut = true;
  basket = [];
  renderBasket();
}

function calculateTotal() {
  let subtotal = 0;

  for (let itemInBasket = 0; itemInBasket < basket.length; itemInBasket++) {
    subtotal += basket[itemInBasket].price * basket[itemInBasket].count;
  }

  const deliveryFee = basket.length === 0 ? 0.0 : 4.99;
  let total = subtotal + deliveryFee;

  return {
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: total,
  };
}


function calculateBasketCount(){
  let itemCount = 0;

  for(let itemInBasket = 0; itemInBasket < basket.length; itemInBasket++){
    itemCount += basket[itemInBasket].count;
  }

  return itemCount;
  
}

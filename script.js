function init() {
  getFromLocalStorage();
  renderMenu();
  renderBasket();
  
}

// #region render function

// renders the entire menu section
// Loops through all menu categories:
// 1. inserts the category template (getMenuTemplate)
// 2. calls renderDishes(indexMenu) to fill category with its dishes
// indexMenu indicates which category is rendered
function renderMenu() {
  const menuRef = document.getElementById("menu");
  menuRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    menuRef.innerHTML += getMenuTemplate(indexMenu);

    renderDishes(indexMenu);
  }
}

// renders the dishes (getDishesTeemplate) into each category in (getMenuTemplate)
// gets the right menu-card wrapper by indexMenu in getMenuTemplate
// loops through all dishes in that category using indexDishes
// we pass value so each dish can be inserted using getDishesTemplate(indexMenu, indexDishes)
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

// render layout(render once) and dishes(update UI everytime) into basket
// call calculateTotal() function for total, subtotal and delivery fee and store in variable totals
// pass totals into getBasketTemplate

function renderBasket() {
  const basketRef = document.getElementById(`basket`);

  // basket with elements that only need rendering once
  basketRef.innerHTML = getBasketTemplate();

  // render dish cards into getBasketTemplate
  // loop through items in basket with indexBasket
  // render all elements per dish --> basket itself, count, price
  // and totals outside loop because it is always there for the entire basket not just for the cards
  const basketWrapperRef = document.getElementById(`basket-wrapper`);
  basketWrapperRef.innerHTML = "";

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    basketWrapperRef.innerHTML += getBasketCardTemplate(indexBasket);
    renderCount(indexBasket);
    renderPrice(indexBasket);
  }

  renderTotals();
  renderCartCount();
  saveToLocalStorage();
}

// dynamic content (count, price) in cards needs to be rendered individually
function renderCount(indexBasket) {
  const countRef = document.getElementById(`count${indexBasket}`);
  countRef.innerHTML = basket[indexBasket].count;
}

// renders price for a single menu card
function renderPrice(indexBasket) {
  const priceRef = document.getElementById(`price${indexBasket}`);
  const total = basket[indexBasket].price * basket[indexBasket].count;

  priceRef.innerHTML = total.toFixed(2).replace(".", ",");
}

// Render totals because they depend on the entire basket
// --> not on a single item, so they must be recalculated after any change
function renderTotals() {
  const totals = calculateTotal();

  const subtotalPriceRef = document.getElementById(`subtotal-price`);
  subtotalPriceRef.innerHTML = `${totals.subtotal.toFixed(2).replace(".", ",")}€`;

  const deliveryFeePriceRef = document.getElementById(`delivery-fee-price`);
  deliveryFeePriceRef.innerHTML = `${totals.deliveryFee.toFixed(2).replace(".", ",")}€`;

  const totalPriceRef = document.getElementById(`total-price`);
  totalPriceRef.innerHTML = `${totals.total.toFixed(2).replace(".", ",")}€`;

  const buyTotalref = document.getElementById(`buy-total`);
  buyTotalref.innerHTML = `Buy now (${totals.total.toFixed(2).replace(".", ",")}€)`;
}

// renders the counter on shopping cart icon in mobile version
// call calculateBasketCount() function, in which the dishes in basket get counted
// --> and their value returned to renderCartCount()
// the value (number of items) gets stored in itemCount
// if-statement to remove styling class if there is no items in the cart (cartCount === 0)
function renderCartCount() {
  const cartCountRef = document.getElementById(`cart-count`);
  const itemCount = calculateBasketCount();

  if (itemCount === 0) {
    cartCountRef.innerHTML = "";
    cartCountRef.classList.remove("circle-flag");
  } else {
    cartCountRef.classList.add("circle-flag");
    cartCountRef.innerHTML = getCartCountTemplate(itemCount);
  }
}

// #endregion

// #region helper functions inside basket

// add to basket
// function is called in the DishesTemplate at add to basket button
// --> there the values of indexMenu and indexDishes get passed
// dish variable to make reading of specific dish easier --> stores access to full menu array
// make sure dishes are not added as two seperate cards but card uses counter instead
// check with state of true and false if dish doubles
// --> false by default but turns true if names of menu card and baskezt card match
// if true then assign the menu card dish to the variable repeating dish and exit function
// if the item is found = true the count of repeatingDish/basket[basketItem].count
// --> in basketCartTemplate increases
// else if item is not found we add it to the array by pushing it as an object
// we create variable indexBasket so that the value of index from loop can be
// --> passed into renderCount and renderPrice funtion
// if dish already exist we only update count and price
// --> else we add dish to array and render basket
function addToBasket(indexMenu, indexDishes) {
  const dish = menu[indexMenu].dishes[indexDishes];

  let foundItem = false;
  let repeatingDish = "";
  let indexBasket = null;

  for (let basketItem = 0; basketItem < basket.length; basketItem++) {
    if (basket[basketItem].name === dish.name) {
      foundItem = true;
      repeatingDish = basket[basketItem];
      indexBasket = basketItem;
      break;
    }
  }

  if (foundItem === true) {
    repeatingDish.count++;
    renderCount(indexBasket);
    renderPrice(indexBasket);
    renderTotals();
    saveToLocalStorage();
  } else {
    basket.push({
      name: dish.name,
      price: dish.price,
      count: 1,
    });

    renderBasket();
    saveToLocalStorage();
  }

  renderCartCount();
}

// Decreases the quantity of basket item by 1
// Called from getBasketCardTemplate via onclick
// If the count reaches 0 or less, the item is removed from the basket array
// After updating state, UI is re-rendered
// if basket is empty render the entire basket
// else just update count, price and totals
function decreaseCount(indexBasket) {
  basket[indexBasket].count--;

  if (basket[indexBasket].count <= 0) {
    basket.splice(indexBasket, 1);
    renderBasket();
    renderCartCount();
    saveToLocalStorage();
    return;
  }

  renderCount(indexBasket);
  renderPrice(indexBasket);
  renderTotals();
  renderCartCount();
  saveToLocalStorage();
}

// Increases the quantity of basket item by 1
// just update count, price and totals
function increaseCount(indexBasket) {
  basket[indexBasket].count++;

  renderCount(indexBasket);
  renderPrice(indexBasket);
  renderTotals();
  renderCartCount();
  saveToLocalStorage();
}

// deletes item from basket array
// called from getBasketCardTemplate via onclick
// when deleting (splicing) whole basket needs to be rendered
// --> cause no cards in there anymore
function deleteFromBasket(indexBasket) {
  basket.splice(indexBasket, 1);
  renderBasket();
  renderCartCount();
  saveToLocalStorage();
}

// calculates the prices of dishes
// loops through basket to calculate subtotal by multiplying
// --> the item price times the item count and stores it in subtotal
// delivery fee is 0 if basket ampty else 4.99
// return all values as object
// --> function gets called in renderBasket and values get stored in total
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

// #endregion

// gets called in renderCartCount to update the shopping cart flag number
// adds the amounts of items in basket together and returns the value
function calculateBasketCount() {
  let itemCount = 0;

  for (let itemInBasket = 0; itemInBasket < basket.length; itemInBasket++) {
    itemCount += basket[itemInBasket].count;
  }

  return itemCount;
}

// #region opening and closing windows

// function gets called in nav-bar on click of shopping cart button
// targets ID of aside element and adds class open to it when button clicked
// open displays aside element in mobile version
function openBasket() {
  const openBasketRef = document.getElementById(`open-basket`);
  openBasketRef.classList.add(`open`);

  document.body.classList.add("no-scroll");
}

// gets called when close button of basket is clicked and removes the class
function closeBasket() {
  const openBasketRef = document.getElementById(`open-basket`);
  openBasketRef.classList.remove(`open`);

  document.body.classList.remove("no-scroll");
}

// if pay now button clicked and items in basket than order confirmation dialog opens
// --> and basket empties and closes in mobile version
// if basket empty then emptyCheckOutTemplate
// else getCheckOutTemplate and empty basket
// if the screen size is under 900px and the dialog opens
// --> remove the class open of basket so it is no longer visible
// --> and only gets visible again once shopping cart icon in navbar is clicked
function openDialog() {
  const checkOutDialogRef = document.getElementById(`check-out-dialog`);
  if (basket.length === 0) {
    checkOutDialogRef.innerHTML = getEmptyCheckOutTemplate();
  } else {
    checkOutDialogRef.innerHTML = getCheckOutTemplate();

    basket = [];
  }

  if (window.innerWidth < 900) {
    document.getElementById("open-basket").classList.remove("open");
  }

  document.body.classList.add("no-scroll");

  renderBasket();
  renderCartCount();

  checkOutDialogRef.showModal();
}

function closeDialog() {
  const checkOutDialogRef = document.getElementById(`check-out-dialog`);

  checkOutDialogRef.close();
  checkOutDialogRef.innerHTML = "";

  document.body.classList.remove("no-scroll");

  renderBasket();
  renderCartCount();
}

// #endregion

// #region LOCAL STORAGE
// check if basket is empty and only when its not empty 
// --> shall the new array be assigned to the old array 
// save everything to local storage 
// call getFromLocalStorage in init function before everything else
function saveToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getFromLocalStorage() {
  const storedBasket = localStorage.getItem("basket");
  let myArrBasket = JSON.parse(storedBasket);

  if (myArrBasket !== null) {
    basket = myArrBasket;
  }
}

// #endregion

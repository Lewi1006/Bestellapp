// #region menu templates

function getMenuTemplate(indexMenu) {
  return /*html*/ `
         <div class="menu-headline">
          <div class="menu-headline-content">
            <div class="menu-headline-icon">
            <img
              src=${menu[indexMenu].category.src}
              alt=${menu[indexMenu].category.alt}
            />
          </div>
          <h2>${menu[indexMenu].category.name}</h2>
          </div>
        </div>
        
         <div class="content">
            <div id="menu-card-wrapper${indexMenu}" class="menu-card-wrapper">
     
          </div>
        </div>
        `;
}

// Gets a single dish object from the menu db
// menu[indexMenu].dishes[indexDishes] indicates the specific dish
// Stored in a variable "dish" to make reading easier
// dish object properties can now be accessed so that price, img, etc can be dynamic
function getDishesTemplate(indexMenu, indexDishes) {
  let dish = menu[indexMenu].dishes[indexDishes];

  return /*html*/ `     
            <article class="menu-card">
              <div class="menu-card-left">
                <div class="menu-img">
                  <img src=${dish.src} alt=${dish.alt} />
                </div>
    
                <div class="dish-name">
                  <h3>${dish.name}</h3>
                  <p>${dish.description}</p>
                </div>
              </div>
  
              <div class="price">
                <p>${dish.price.toFixed(2).replace(".", ",")} €</p>
  
                <button class="basket-button" aria-label="add to basket" onclick="addToBasket(${indexMenu}, ${indexDishes})">
                  <p>Add to basket</p>
                </button>
              </div>
            </article>

         
        `;
}

// #endregion

// #region basket templates

// template for basket elements that are always visible
// access values of totals
// toFixed --> two decimals visible
// replace --> changes . to ,
function getBasketTemplate(totals) {
  return /*html*/ `
    <div class="dialog-wrapper">
      <header class="dialog-header">
        <button onclick="closeBasket()" aria-label="close"><img src="./assets/icons/close-icon.svg" alt="close button"></button>
      </header>
        
      <h1>Your Basket</h1>

      <div id="basket-wrapper">
        
     </div>

          <table class="basket-table-total">
          <tr>
            <td>Subtotal</td>
            <td id="subtotal-price">${totals.subtotal.toFixed(2).replace(".", ",")}€</td>
          </tr>

          <tr class="delivery-row">
            <td>Delivery Fee</td>
            <td id="delivery-fee-price">${totals.deliveryFee.toFixed(2).replace(".", ",")}€</td>
          </tr>

          <tr id="total-row">
            <td>Total</td>
            <td id="total-price">${totals.total.toFixed(2).replace(".", ",")}€</td>
          </tr>
        </table>

        <button class="buy-now-button" onclick="openDialog()" aria-label="checkout">
          <p id="buy-total">Buy now (${totals.total.toFixed(2).replace(".", ",")}€)</p>
        </button>
  
        
    </div>
  `;
}

// the Template for each dish card in the basket
// that gets rendered into basket-wrapper in getBasketTemplate
function getBasketCardTemplate(indexBasket) {
  return /*html*/ `
    <article class="basket-card">
      <div class="basket-card-top">
          <p class="basket-dish">${basket[indexBasket].name}</p>
          <button class="trash-button" onclick="deleteFromBasket(${indexBasket})" aria-label="delete"><img src="./assets/icons/trash-icon.svg" alt="trash"/></button>
      </div>

      <div class="basket-card-bottom">
        <div class="basket-count">
          <button onclick="decreaseCount(${indexBasket})" aria-label="decrease quantity">-</button>
          <p id="count${indexBasket}" class="count"></p>
          <button onclick="increaseCount(${indexBasket})" aria-label="increase quantity">+</button>
        </div>
          <p id="price${indexBasket}" class="basket-price">€</p>
      </div>
    </article>
`;
}

// #endregion

// #region checkout dialog templates

function getCheckOutTemplate() {
  return /*html*/ `

    <div class="dialog-wrapper-ordered">
      <header class="dialog-header">
        <button onclick="closeDialog()"><img src="./assets/icons/close-icon.svg" alt="close button" aria-label="close"></button>
      </header>

    <img src="./assets/icons/delivery-truck-icon.svg" alt="delivery truck icon"/>

    <div>
      <h1>Order confirmed!</h1>
      <p>Your food is on the way!</p> 
    </div>
  </div>
  `;
}

function getEmptyCheckOutTemplate() {
  return /*html*/ `
  <div class="dialog-wrapper-ordered">
      <header class="dialog-header">
        <button onclick="closeDialog()"><img src="./assets/icons/close-icon.svg" alt="close button" aria-label="close"></button>
      </header>
    
    <div class="dialog-empty-basket">
      <h1>Your basket is empty!</h1>
      <p>Please add items!</p> 
    </div>
  </div>
  `;
}

// #endregion

function getCartCountTemplate(itemCount) {
  return /*html*/ `
    <p class="item-count">${itemCount}</p>
  `;
}

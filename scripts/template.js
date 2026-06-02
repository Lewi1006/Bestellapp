function getMenuTemplate(indexMenu) {
  return /*html*/ `
         <div class="menu-headline">
            <div class="menu-headline-icon">
            <img
              src=${menu[indexMenu].category.src}
              alt=${menu[indexMenu].category.alt}
            />
          </div>
          <h2>${menu[indexMenu].category.name}</h2>
        </div>
        
         <div class="content">
            <div id="menu-card-wrapper${indexMenu}" class="menu-card-wrapper">
     
          </div>
        </div>
        `;
}

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

function getBasketTemplate(totals) {
  return /*html*/ `
    <div class="dialog-wrapper">
      <header class="dialog-header">
        <button onclick="closeBasket()"><img src="./assets/icons/close-icon.svg" alt="close button"></button>
      </header>
        
      <h1>Your Basket</h1>

      <div id="basket-wrapper">
        
     </div>

          <table class="basket-table-total">
          <tr>
            <td>Subtotal</td>
            <td>${totals.subtotal.toFixed(2).replace(".",",")} €</td>
          </tr>

          <tr class="delivery-row">
            <td>Delivery Fee</td>
            <td>${totals.deliveryFee.toFixed(2).replace(".", ",")} €</td>
          </tr>

          <tr id="total-row">
            <td>Total</td>
            <td>${totals.total.toFixed(2).replace(".", ",")} €</td>
          </tr>
        </table>

        <button class="buy-now-button" onclick="openDialog()">
          <p>Buy now (${totals.total.toFixed(2).replace(".", ",")}€)</p>
        </button>
  
        
    </div>
  `;
}

function getBasketCardTemplate(indexBasket) {
  return /*html*/ `
    <article class="basket-card">
      <div class="basket-card-top">
          <p class="basket-dish">${basket[indexBasket].name}</p>
          <button class="trash-button" onclick="deleteFromBasket(${indexBasket})"><img src="./assets/icons/trash-icon.svg" alt="trash"/></button>
      </div>

      <div class="basket-card-bottom">
        <div class="basket-count">
          <button onclick="decreaseCount(${indexBasket})">-</button>
          <p class="count">${basket[indexBasket].count}</p>
          <button onclick="increaseCount(${indexBasket})">+</button>
        </div>
          <p class="basket-price">${basket[indexBasket].price.toFixed(2).replace(".", ",")}€</p>
      </div>
    </article>
`;
}


function getCheckOutTemplate() {
  return /*html*/ `

    <div class="dialog-wrapper-ordered">
      <header class="dialog-header">
        <button onclick="closeDialog()"><img src="./assets/icons/close-icon.svg" alt="close button"></button>
      </header>

    <img src="./assets/icons/delivery-truck-icon.svg" alt="delivery truck icon"/>

    <div>
      <h1>Order confirmed!</h1>
      <p>Your food is on the way!</p> 
    </div>
  </div>
  `;
}

function getCartCountTemplate(itemCount){
  return /*html*/`
    <p class="item-count">${itemCount}</p>
  `
}
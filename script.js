function init() {
  renderMenu();
}

function renderMenu() {
  let menuRef = document.getElementById("menu");
  menuRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    menuRef.innerHTML += getMenuTemplate(indexMenu);

    renderDishes(indexMenu);
  }
}

function renderDishes(indexMenu) {
  let menuCardWrapperRef = document.getElementById(
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

function renderBasket() {
  let basketRef = document.getElementById(`basket`);
  // basketRef.innerHTML = "";

  // for (let indexBasket = 0; indexBasket < basket.length; indexBasket++){
  basketRef.innerHTML += /*html*/ `
<div class="dialog-wrapper">
  <header class="dialog-header">
    <button>x</button>
  </header>
  <h1></h1>

  <div class="basket-wrapper">

    <article class="basket-card">
      <div class="basket-card-top">
          <p class="basket-dish"></p>
          <button class="trash-button"><img src="" alt="" /></button>
      </div>

      <div class="basket-card-bottom">
        <div class="basket-count">
          <button>-</button>
          <p>n</p>
          <button>+</button>
        </div>
          <p class="basket-price"></p>
      </div>

    </article>

    <table class="basket-total">
          <tr>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>

        <button>
          <p></p>
        </button>
  </div>
</div>
    `;
  // }
}

function openDialog() {
  renderBasket();
  let basketRef = document.getElementById(`basket`);
  basketRef.showModal();
}

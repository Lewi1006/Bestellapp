

function init() {
  renderMenu();
}

// #region render function

function renderMenu() {
  const menuRef = document.getElementById("menu");
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
  basketRef.innerHTML = getBasketTemplate();

  let basketWrapperRef = document.getElementById(`basket-wrapper`)

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++){
  basketWrapperRef.innerHTML += getBasketCardTemplate(indexBasket);
  };
}


// #endregion










function openDialog() {
  let basketRef = document.getElementById(`basket`);
  basketRef.showModal();
  renderBasket();
}

function closeDialog(){
  let basketRef = document.getElementById(`basket`);
  basketRef.close();
}

function addToBasket(indexMenu, indexDishes){
  
  let dish = menu[indexMenu].dishes[indexDishes];

  basket.push(
    {
    name: dish.name,
    price: dish.price,
    count: 1,
  }
);

renderBasket();

}

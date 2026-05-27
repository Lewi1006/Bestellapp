function init() {
  renderMenu();
  
}

function renderMenu() {
  let menuRef = document.getElementById("menu");
  menuRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    menuRef.innerHTML += getMenuTemplate(indexMenu);
  }
}










// function renderMenuCard(indexMenu) {
//   let menuCardWrapperRef = document.getElementById(
//     `menu-card-wrapper${indexMenu}`);
//   menuCardWrapperRef.innerHTML = "";

//   for (
//     let indexDishes = 0;
//     indexDishes < menu[indexMenu].dishes.length;
//     indexDishes++
//   ) {
//     menuCardWrapperRef.innerHTML += getDishesTemplate(indexMenu, indexDishes);
//   }
// }

function init() {
  renderMenuCard();
}

function renderMenuCard() {
  let menuCardRef = document.getElementById("menu");
  menuCardRef.innerHTML = "";

  for (let indexMenu = 0; indexMenu < menu.length; indexMenu++) {
    menuCardRef.innerHTML += /*html*/ `
        <div class="menu-headline">
            <div class="menu-headline-icon">
            <img
              src=${menu[indexMenu].category.src}
              alt=${menu[indexMenu].category.alt}
            />
          </div>
          <h2>${menu[indexMenu].category.name}</h2>
        </div>`;

    for (
      let indexDishes = 0;
      indexDishes < menu[indexMenu].dishes.length;
      indexDishes++
    ) {
      menuCardRef.innerHTML += /*html*/ `
        <div class="content">
          <div class="menu-card-wrapper">
            <article class="menu-card">
              <div class="menu-img">
                <img src=${menu[indexMenu].dishes[indexDishes].src} alt=${menu[indexMenu].dishes[indexDishes].alt} />
              </div>
  
              <div class="dish-name">
                <h3>${menu[indexMenu].dishes[indexDishes].name}</h3>
                <p>${menu[indexMenu].dishes[indexDishes].description}</p>
              </div>
  
              <div class="price">
                <p>${menu[indexMenu].dishes[indexDishes].price} €</p>
  
                <button class="basket">
                  <p>Add to basket</p>
                </button>
              </div>
            </article>

          </div>
        </div>
                
            `;
    }
  }
}

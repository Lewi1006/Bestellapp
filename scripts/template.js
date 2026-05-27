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
            <div class="menu-card-wrapper">
         ${getDishesTemplate(indexMenu)}
          </div>
        </div>
        `;
}

function getDishesTemplate(indexMenu) {
  let dishCard = "";

  for (
    let indexDishes = 0;
    indexDishes < menu[indexMenu].dishes.length;
    indexDishes++
  ) {
    let dish = menu[indexMenu].dishes[indexDishes];

    dishCard += `
     
            <article class="menu-card">
              <div class="menu-img">
                <img src=${dish.src} alt=${dish.alt} />
              </div>
  
              <div class="dish-name">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
              </div>
  
              <div class="price">
                <p>${dish.price} €</p>
  
                <button class="basket">
                  <p>Add to basket</p>
                </button>
              </div>
            </article>

         
        `;
  }

  return dishCard;
}




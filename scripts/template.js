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

  return /*html*/`     
            <article class="menu-card">
              <div class="menu-img">
                <img src=${dish.src} alt=${dish.alt} />
              </div>
  
              <div class="dish-name">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
              </div>
  
              <div class="price">
                <p>${dish.price.toFixed(2).replace(".",",")} €</p>
  
                <button class="basket-button" aria-label="add to basket">
                  <p>Add to basket</p>
                </button>
              </div>
            </article>

         
        `;
  }


// function getBasketTemplate(){
//   return /*html*/`
    
//   `

// }

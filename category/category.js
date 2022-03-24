//! declaration of variables
const categoryButton = document.querySelector('.category-btn');
const dropdownMenu = document.querySelector('.dropdown-menu')
const body = document.querySelector('body');
const foodCategory = document.querySelector('.food-category');
const drinkCategory = document.querySelector('.drink-category')
const dessertCategory = document.querySelector('.dessert-category');
const foodCardsContainer = document.querySelector('.foodcards-container');
const menuSection = document.querySelector('.menu-section')
let foodUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
let dessertUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert'
let cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
let storageArr = [];
let foodPrice = [19, 25, 20, 30, 23, 27, 22, 18, 29];
let drinkPrice = [10, 15, 13, 9, 12, 15, 14, 15, 17, 18]
let dessertPrice = [15, 12, 18, 10, 17, 14, 15, 18, 13, 12]

//! dropDown Menu function 
categoryButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('display')
})

//! create Food card div Function 
createFoodCard = function (x, y, p) {
  const foodCard = document.createElement('div');
  foodCardsContainer.appendChild(foodCard)
  const foodFlex = document.createElement('div');
  foodCard.appendChild(foodFlex);
  const foodImgBox = document.createElement('div');
  foodFlex.appendChild(foodImgBox);
  const foodImg = document.createElement('img');
  foodImgBox.appendChild(foodImg);
  foodImg.setAttribute('src', `${y}`);
  const foodContent = document.createElement('div');
  foodFlex.appendChild(foodContent);
  const contentHead = document.createElement('div');
  foodContent.appendChild(contentHead);
  const foodTitle = document.createElement('p');
  contentHead.appendChild(foodTitle);
  foodTitle.textContent = `${x}`;
  const foodPrice = document.createElement('p');
  contentHead.appendChild(foodPrice);
  foodPrice.textContent = `${p}$`
  const contentFoot = document.createElement('div');
  foodContent.appendChild(contentFoot);
  const foodDescription = document.createElement('p');
  contentFoot.appendChild(foodDescription);
  foodDescription.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  const addFood = document.createElement('div');
  contentFoot.appendChild(addFood);
  const addMinusIcon = document.createElement('button');
  addFood.appendChild(addMinusIcon);
  addMinusIcon.textContent = '-';
  let quantity = document.createElement('p');
  addFood.appendChild(quantity)
  quantity.textContent = 0;
  const addPlusIcon = document.createElement('button');
  addFood.appendChild(addPlusIcon);
  addPlusIcon.textContent = '+'

  //!  styles of the food card
  foodCard.classList.add('food-card');
  foodFlex.classList.add('food-flex');
  foodImgBox.classList.add('foodImg-box');
  foodImg.classList.add('food-img');
  foodContent.classList.add('food-content');
  contentHead.classList.add('food-head');
  foodTitle.classList.add('food-title');
  foodPrice.classList.add('food-price')
  contentFoot.classList.add('content-foot');
  foodDescription.classList.add('food-description');
  addFood.classList.add('add-food');
  quantity.classList.add('quantity');
  addPlusIcon.classList.add('add-plus-icon');
  addMinusIcon.classList.add('add-minus-icon');

  //! create the add to cart Function and save it to local storage
  addPlusIcon.addEventListener('click', saveToLocalStorage)
  function saveToLocalStorage(e) {
    let quantityTarget = e.target.previousElementSibling
    let foodTitleTarget = e.target.parentElement.parentElement.previousElementSibling.firstChild.textContent
    let imageTarget = e.target.parentElement.parentElement.previousElementSibling.parentElement.previousElementSibling.firstElementChild.src
    let quantity = parseInt(quantityTarget.textContent)
    let price = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.textContent
    price = parseInt(price);
    quantity++
    quantityTarget.textContent = quantity

    let cardsData = JSON.parse(localStorage.getItem('cardsData'));
    if (cardsData != null) {
      let storageObject = { quantity, foodTitleTarget, imageTarget, price }
      let flag = false;
      let i = 0;
      for (i = 0; i < cardsData.length; i++) {
        if (cardsData[i].foodTitleTarget == storageObject.foodTitleTarget) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (flag == true) {
        cardsData[i].quantity = ++cardsData[i].quantity
        localStorage.setItem('cardsData', JSON.stringify(cardsData))
      } else {
        cardsData.push(storageObject);
        localStorage.setItem('cardsData', JSON.stringify(cardsData))
      }
    } else {
      let cardsData = [];
      let storageObject = { quantity, foodTitleTarget, imageTarget, price }
      cardsData.push(storageObject)
      localStorage.setItem('cardsData', JSON.stringify(cardsData))
    }
  }

  //! create minus function to delete from local storage
  addMinusIcon.addEventListener('click', removeFromLocalStorage)
  function removeFromLocalStorage(e) {
    let quantity = e.target.nextElementSibling;
    let num = parseInt(quantity.textContent);
    if (num == 0) {
      return;
    }
    num--;
    quantity.textContent = num;
    let name =
      e.target.parentElement.parentElement.previousElementSibling.firstChild.textContent;
    let cardsData = localStorage.getItem("cardsData");
    cardsData = JSON.parse(cardsData);
    for (let i = 0; i < cardsData.length; i++) {
      if (cardsData[i].foodTitleTarget === name) {
        if (cardsData[i].quantity > 1) {
          cardsData[i].quantity = --cardsData[i].quantity;
        } else {
          cardsData.splice(i, 1);
        }
      }
    }
    localStorage.setItem("cardsData", JSON.stringify(cardsData));
  }
}

// ! main category Api Data Fetch 
fetch(`${foodUrl}`).then(response => {
  return response.json();
}).then(data => {
  const dataArray = data.meals;
  dataArray.forEach((e, i) => {
    createFoodCard(e.strMeal, e.strMealThumb, foodPrice[i])
    // saveToLoclaStorage();

  })
}).catch(error => {
  console.log('Something went wrong', error);
});

//! main Category  Api data Fetch -dessert
fetch(`${dessertUrl}`).then(response => {
  return response.json();
}).then(data => {
  const dataDessertArray = data.meals;
  for (let i = 0; i < 10; i++) {
    createFoodCard(dataDessertArray[i].strMeal, dataDessertArray[i].strMealThumb, dessertPrice[i]);
  }
});

//!  main Category  Api data Fetch -cocktails
fetch(`${cocktailUrl}`).then(response => {
  return response.json();
}).then(data => {
  const dataArray = data.drinks;
  for (let i = 0; i < 10; i++) {
    createFoodCard(dataArray[i].strDrink, dataArray[i].strDrinkThumb, drinkPrice[i]);
  }
}).catch(error => {
  console.log('Something went wrong', error);
});

//! create Food Button on dropMenu by Fetch data from Api
foodCategory.addEventListener('click', () => {
  let foodCard = document.querySelectorAll('.food-card');
  foodCard.forEach(e => e.remove())
  fetch(`${foodUrl}`).then(response => {
    return response.json();
  }).then(data => {
    const dataArray = data.meals;
    dataArray.forEach((e, i) => {
      createFoodCard(e.strMeal, e.strMealThumb, foodPrice[i])
    })
  }).catch(error => {
    console.log('Something went wrong', error);
  });
})

//! create dessert Button on dropMenu by Fetch data from Api
dessertCategory.addEventListener('click', () => {
  let foodCard = document.querySelectorAll('.food-card');
  foodCard.forEach(e => e.remove());
  fetch(`${dessertUrl}`).then(response => {
    return response.json();
  }).then(data => {
    const dataDessertArray = data.meals;
    for (let i = 0; i < 10; i++) {
      createFoodCard(dataDessertArray[i].strMeal, dataDessertArray[i].strMealThumb, dessertPrice[i]);
    }
  });
})

//! create drinks Button on dropMenu by Fetch data from Api
drinkCategory.addEventListener('click', () => {
  let foodCard = document.querySelectorAll('.food-card');
  foodCard.forEach(e => e.remove());
  fetch(`${cocktailUrl}`).then(response => {
    return response.json();
  }).then(data => {
    const dataArray = data.drinks;
    for (let i = 0; i < 10; i++) {
      createFoodCard(dataArray[i].strDrink, dataArray[i].strDrinkThumb, drinkPrice[i]);
    }
  }).catch(error => {
    console.log('Something went wrong', error);
  });
})
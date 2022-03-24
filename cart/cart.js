//! declaration
let orderdFoodSection = document.querySelector(".orderd-food-section");
let items = [];
let secondTotalPrice = document.querySelector(".buy-price");
let firstTotalPrice = document.querySelector(".total-price");

//! create order food card
function createOrderedFoodCard(q, n, im, p) {
  const orderContainer = document.createElement("div");
  orderdFoodSection.appendChild(orderContainer);

  const orderImgDiv = document.createElement("div");
  orderContainer.appendChild(orderImgDiv);

  const orderImg = document.createElement("img");
  orderImgDiv.appendChild(orderImg);

  orderImg.setAttribute("src", `${im}`);

  const orderDetails = document.createElement("div");
  orderContainer.appendChild(orderDetails);

  const orderUp = document.createElement("div");
  orderDetails.appendChild(orderUp);

  let orderName = document.createElement("p");
  orderUp.appendChild(orderName);
  orderName.innerHTML = `${q}`;

  let orderPrice = document.createElement("p");
  orderUp.appendChild(orderPrice);
  orderPrice.textContent = `${p}$`;

  const orderDown = document.createElement("div");
  orderDetails.appendChild(orderDown);

  const countlabel = document.createElement("p");
  orderDown.appendChild(countlabel);
  countlabel.textContent = "count";

  let countNumber = document.createElement("p");
  orderDown.appendChild(countNumber);
  countNumber.innerHTML = `${n}`;

  //! add class list
  orderContainer.classList.add("order-container");
  orderImgDiv.classList.add("order-img");
  orderDetails.classList.add("order-details");
  orderUp.classList.add("order-up");
  orderName.classList.add("order-name");
  orderPrice.classList.add("order-price");
  orderDown.classList.add("order-down");
  countlabel.classList.add("count-label");
  countNumber.classList.add("count-number");
}

//! get the data from local storage and insert it in the cart
function getFromLocalStorage() {
  let cardsData = localStorage.getItem("cardsData");
  if (cardsData == null || cardsData == []) {
    return;
  } else {
    cardsData = JSON.parse(cardsData);
    console.log(cardsData);
    //? iterate it with for loop
    // for (let i = 0; i < cardsData.length; i++) {
    //   createOrderedFoodCard(cardsData[i].foodTitleTarget, cardsData[i].quantity, cardsData[i].imageTarget)
    // }
    //? since it is an array you can iterate it with forEach
    cardsData.forEach((e) => {
      createOrderedFoodCard(
        e.foodTitleTarget,
        e.quantity,
        e.imageTarget,
        e.price
      );
      let itemPrice = e.price * e.quantity;
      items.push(itemPrice);
    });
  }
}
getFromLocalStorage();

//! total price Function
let total = items.reduce((c, n) => c + n);
secondTotalPrice.textContent = `$${total}`;
firstTotalPrice.textContent = `$${total}`;

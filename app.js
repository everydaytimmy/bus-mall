
'use strict';

//Globals
const productImageSectionTag = document.getElementById('product-pics');
const leftProductImageTag = document.getElementById('left-product-img');
const centerProductImageTag = document.getElementById('center-product-img');
const rightProductImageTag = document.getElementById('right-prodoct-img');
const leftProductHeaderTag = document.getElementById('left-product-h2');
const centerProductHeaderTag = document.getElementById('center-product-h2');
const rightProductHeaderTag = document.getElementById('right-product-h2');

const maxClicks = 25;
let totalClicks = 0;

let leftProductOnThePage = null;
let centerProductOnThePage = null;
let rightProductOnThePage = null;

// Constructor Function
const Product = function (title, imgSrc) {
  this.title = title;
  this.clicks = 0;
  this.views = 0;
  this.url = imgSrc;
  Product.all.push(this);

};

Product.all = [];

function pickNewProduct() {
  shuffle(Product.all);
  leftProductOnThePage = Product.all[0];
  centerProductOnThePage = Product.all[1];
  rightProductOnThePage = Product.all[2];

  renderNewProducts();

}

//Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//NEW DAY WORK
//NEW DAY WORK
//NEW DAY WORK
const renderNewProducts = function () {

  leftProductImageTag.src = leftProductOnThePage.url;
  leftProductImageTag.alt = leftProductOnThePage.title;
  leftProductHeaderTag.textContent = leftProductOnThePage.title;

  centerProductImageTag.src = centerProductOnThePage.url;
  centerProductImageTag.alt = centerProductOnThePage.title;
  centerProductHeaderTag.textContent = centerProductOnThePage.title;

  rightProductImageTag.src = rightProductOnThePage.url;
  rightProductImageTag.alt = rightProductOnThePage.title;
  rightProductHeaderTag.textContent = rightProductOnThePage.title;
};

//this is my Event listener
const handleClickOnProduct = function (event) {

  if (totalClicks < maxClicks) {

    const thingWeClickedOn = event.target;
    const id = thingWeClickedOn.id;

    //track the clicks and times shown
    if (id === 'left-product-img' || id === 'right-product-img' ||id === 'right-product-img') {

      if (id === 'left-product-img') {
        leftProductOnThePage.clicks += 1;
      } else {
        rightProductOnThePage.clicks += 1;
      }

      leftProductOnThePage.timesShown += 1;
      rightProductOnThePage.timesShown += 1;

      pickNewProduct();
    }
  }

  totalClicks += 1;

  //when they reach total max clicks, remove the clicky function
  if (totalClicks === maxClicks) {
    productImageSectionTag.removeEventListener('click', handleClickOnProduct);
    alert('Survey is completed. Thank you.');

    renderLikes();

  }
};

// function renderLikes() {
//   const likesListElem = document.getElementById('product-clicks');
//   likesListElem.innerHTML = '';
//   for (let i = 0; i < Product.all.length; i++) {
//     const productPicture = Product.all[i];
//     const productItemElem = document.createElement('li');
//     likesListElem.appendChild(productItemElem);
//     productItemElem.textContent = productPicture.title + ' : ' + productPicture.clicks;
//   }
// }

//this ADDS the event listener
productImageSectionTag.addEventListener('click', handleClickOnProduct);

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegun', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.jpg');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

pickNewProduct();

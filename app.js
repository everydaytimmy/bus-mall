<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

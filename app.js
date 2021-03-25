
'use strict';

//Globals
const productImageSectionTag = document.getElementById('product-pics');

const leftProductImageTag = document.getElementById('left-product-img');
const centerProductImageTag = document.getElementById('center-product-img');
const rightProductImageTag = document.getElementById('right-product-img');

const leftProductHeaderTag = document.getElementById('left-product-h2');
const centerProductHeaderTag = document.getElementById('center-product-h2');
const rightProductHeaderTag = document.getElementById('right-product-h2');

const resultsButton = document.getElementById('button');

const maxClicks = 10;
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

//pick new product

function pickNewProduct() {

  const previousLeft = leftProductOnThePage;
  const previousCenter = centerProductOnThePage;
  const previousRight = rightProductOnThePage;

  shuffle(Product.all);

  for (let product of Product.all) {
    if (product !== previousLeft && product !== previousCenter && product !== previousRight) {
      leftProductOnThePage = product;
      break;
    }
  }

  for (let product of Product.all) {
    if (product !== previousLeft && product !== previousCenter && product !== previousRight && product !== leftProductOnThePage) {
      centerProductOnThePage = product;
      break;
    }
  }

  for (let product of Product.all) {
    if (product !== previousLeft && product !== previousCenter && product !== previousRight && product !== leftProductOnThePage && product !== centerProductOnThePage) {
      rightProductOnThePage = product;
      break;
    }
  }
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

//this is my Event listener for pictures
const handleClickOnProduct = function (event) {

  if (totalClicks < maxClicks) {

    const thingWeClickedOn = event.target;
    const id = thingWeClickedOn.id;

    //track the clicks and times shown
    if (id === 'left-product-img' || id === 'center-product-img' || id === 'right-product-img') {

      if (id === 'left-product-img') {
        leftProductOnThePage.clicks += 1;
      }
      else if (id === 'center-product-img') {
        centerProductOnThePage.clicks += 1;
      }
      else {
        rightProductOnThePage.clicks += 1;
      }

      leftProductOnThePage.views += 1;
      centerProductOnThePage.views += 1;
      rightProductOnThePage.views += 1;

      pickNewProduct();
    }
  }

  totalClicks += 1;

  if (totalClicks === maxClicks) {
    productImageSectionTag.removeEventListener('click', handleClickOnProduct);
    alert('Survey is completed. Thank you.');

    renderLikes();

    makeProductChart();

  }
};

productImageSectionTag.addEventListener('click', handleClickOnProduct);
//End event listener for pictures


//Event listener for results button
const handleClickOnResults = function (event) {
  event.preventDefault();
  const resultsOutput = [];

  for (let i = 0; i < Product.all.length; i++) {
    const string = `${Product.all[i].title} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].views} times.`;
    resultsOutput.push(string);
  }
  alert(resultsOutput);
};

resultsButton.addEventListener('click', handleClickOnResults);
//End Event Listener for results button

function renderLikes() {
  const likesListElem = document.getElementById('product-clicks');
  likesListElem.innerHTML = '';
  for (let i = 0; i < Product.all.length; i++) {
    const productPicture = Product.all[i];
    const productItemElem = document.createElement('li');
    likesListElem.appendChild(productItemElem);
    productItemElem.textContent = productPicture.title + ' : ' + productPicture.clicks;
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
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

pickNewProduct();

//Setting up local storage

function setVotes() {
  let stringVotes = JSON.stringify(Product.all);

  localStorage.setItem('votes', stringVotes);


}

//getting from local storage
function getVotes() {
  let votes = localStorage.getItem('votes');
  if (votes !== null) {
    let parsedVotes = JSON.parse(votes);

    for (let product of parsedVotes) {
      new Product(product.title, product.clicks, product.views);
    }
    renderNewProducts();
  }

}

//this adds the chart
function makeProductChart() {

  const productNamesArray = [];
  const productLikesArray = [];

  for (let product of Product.all) {
    productNamesArray.push(product.title);
    productLikesArray.push(product.clicks);
    // productViewsArray.push(product.view);
  }

  const ctx = document.getElementById('productChart').getContext('2d');
  const productChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Product Likes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: productLikesArray,
        // data: productViewsArray
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

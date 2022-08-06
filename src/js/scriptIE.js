var currencyWrapper = document.querySelector('.currency_wrapper');
var currencyBtn = currencyWrapper.querySelector('.currency_btn');
var currencyOptions = currencyWrapper.querySelector('.currency_options');

var planWrapper = document.querySelector('.plan_wrapper');
var planBtn = planWrapper.querySelector('.plan_btn');
var planOptions = planWrapper.querySelector('.plan_options');
var planContent = planWrapper.querySelector('.plan_content');

var buyBlock = document.querySelector('.buy_block');
var buyBlockOverlay = document.querySelector('.buy_block_overlay');
var priceSale = buyBlock.querySelector('.price_sale');
var priceOriginal = buyBlock.querySelector('.price_original');

var sendToCartBtn = document.querySelector('.send-to-cart');

var mainHeader = document.querySelector('.main-header');
var smallBuyBlock = document.querySelector('.small-buy_block');
var smallBlockInfo = smallBuyBlock.querySelector('.small-buy_short-info');
var smallBlockBuyPrice = smallBlockInfo.querySelector('.small-buy_price');
var smallBlockBuyPlan = smallBlockInfo.querySelector('.small-buy_plan');
var smallBuyBtn = smallBuyBlock.querySelector('.small-buy_btn');

var currencies = ['GBR', 'EUR'];
var currentCurrency = 'GBR';

var plans = [
  { duration: '1 Device, 1 Year', priceGBR: '27.99', priceEUR: '33.99' },
  { duration: '1 Device, 2 Years', priceGBR: '43.99', priceEUR: '52.99' },
  { duration: '3 Devices, 1 Year', priceGBR: '35.99', priceEUR: '42.99' },
  { duration: '3 Devices, 2 Years', priceGBR: '63.99', priceEUR: '75.99' },
  { duration: '5 Devices, 1 Year', priceGBR: '43.99', priceEUR: '52.99' },
  { duration: '5 Devices, 2 Years', priceGBR: '71.99', priceEUR: '85.99' },
];

// CURRENCY ANIMATION

var currencyAnimationState = false;

var addCurrencyAnimation = function addCurrencyAnimation() {
  currencyWrapper.classList.add('active');
  currencyWrapper.classList.remove('closed');
  currencyAnimationState = true;
};

var removeCurrencyAnimation = function removeCurrencyAnimation() {
  currencyWrapper.classList.remove('active');
  currencyWrapper.classList.add('closed');
  currencyAnimationState = false;
};

currencyBtn.addEventListener('click', function () {
  if (currencyAnimationState === false) {
    addCurrencyAnimation();
  } else {
    removeCurrencyAnimation();
  }
});

// CURRENCY SELECTOR

var addCurrency = function addCurrency() {
  currencies.forEach(function (currency) {
    var li = '<li onclick="updateCurrency(this)">'.concat(currency, '</li>');
    currencyOptions.insertAdjacentHTML('beforeend', li);
  });
};
addCurrency();

var updateCurrency = function updateCurrency(selectedLi) {
  currencyBtn.firstElementChild.innerText = selectedLi.innerText;
  currentCurrency = selectedLi.innerText;
  changeCurrencyHandler(currentCurrency);
  removeCurrencyAnimation();
};

var changeCurrencyHandler = function changeCurrencyHandler(currentCurrency) {
  if (currentCurrency === 'GBR') {
    removeCurrentPlans();
    addPlans(currentCurrency);
  } else if (currentCurrency === 'EUR') {
    removeCurrentPlans();
    addPlans(currentCurrency);
  }
};

// PLAN ANIMATION

var planAnimationState = false;

var addPlanAnimation = function addPlanAnimation() {
  planWrapper.classList.add('active');
  planWrapper.classList.remove('closed');
  planAnimationState = true;
};

var removePlanAnimation = function removePlanAnimation() {
  planWrapper.classList.remove('active');
  planWrapper.classList.add('closed');
  planAnimationState = false;
};

planBtn.addEventListener('click', function () {
  if (planAnimationState === false) {
    addPlanAnimation();
  } else {
    removePlanAnimation();
  }
});

// PLAN SELECTOR

var addPlans = function addPlans(currentCurrency) {
  if (currentCurrency === 'GBR') {
    plans.forEach(function (plan, i) {
      var li = '<li onclick="updatePlan(plans['
        .concat(i, '])">')
        .concat(plan.duration, ' &#163;')
        .concat(plan.priceGBR, '</li>');
      planOptions.insertAdjacentHTML('beforeend', li);
    });
  } else if (currentCurrency === 'EUR') {
    plans.forEach(function (plan, i) {
      var li = '<li onclick="updatePlan(plans['
        .concat(i, '])">')
        .concat(plan.duration, ' &#8364;')
        .concat(plan.priceEUR, '</li>');
      planOptions.insertAdjacentHTML('beforeend', li);
    });
  }

  // Setting initial 'selected' class to chosen in HTML current plan
  var currentPlans = planOptions.querySelectorAll('.plan_options li');
  for (var i = 0; i < currentPlans.length; i++) {
    if (
      currentPlans[i].innerText.slice(0, -7).trim() ===
      planBtn.querySelector('.current_plan').innerText.trim()
    ) {
      currentPlans[i].classList.add('selected');
    }
  }

  // Setting initial prices on screen, based on currency and currently selected plan
  var selectedPlanArr = planOptions
    .querySelector('.selected')
    .innerText.split(' ');
  var selectedPlanPrice = selectedPlanArr[selectedPlanArr.length - 1].slice(
    1,
    -3
  );

  if (currentCurrency === 'GBR') {
    priceOriginal.innerText = '\xA3'.concat(
      Math.floor(selectedPlanPrice * 1.2),
      '.'
    );
    priceSale.innerText = '\xA3'.concat(selectedPlanPrice, '.');
  } else if (currentCurrency === 'EUR') {
    priceOriginal.innerText = '\u20AC'.concat(
      Math.floor(selectedPlanPrice * 1.2),
      '.'
    );
    priceSale.innerText = '\u20AC'.concat(selectedPlanPrice, '.');
  }

  smallBlockBuyPrice.innerText = priceSale.innerText;
};
addPlans(currentCurrency);

var updatePlan = function updatePlan(selectedPlan) {
  planBtn.firstElementChild.innerText = selectedPlan.duration;
  smallBlockBuyPlan.innerText = planBtn.firstElementChild.innerText;

  // Setting 'selected' class to clicked plan and removing it from the others
  var currentPlans = planOptions.querySelectorAll('li');
  for (var i = 0; i < currentPlans.length; i++) {
    if (
      currentPlans[i].innerText.slice(0, -7).trim() ===
      selectedPlan.duration.trim()
    ) {
      currentPlans[i].classList.add('selected');
    } else {
      currentPlans[i].classList.remove('selected');
    }
  }

  // Update current sale price and set original, based on currency
  if (currentCurrency === 'GBR') {
    currentPlanPriceSale = Math.floor(selectedPlan.priceGBR);
  } else if (currentCurrency === 'EUR') {
    currentPlanPriceSale = Math.floor(selectedPlan.priceEUR);
  }

  currentPlanPriceOriginal = Math.floor(currentPlanPriceSale * 1.2);

  // Update price on screen from dropdown
  if (currentCurrency === 'GBR') {
    priceOriginal.innerText = '\xA3'.concat(currentPlanPriceOriginal, '.');
    priceSale.innerText = '\xA3'.concat(currentPlanPriceSale, '.');
  } else if (currentCurrency === 'EUR') {
    priceOriginal.innerText = '\u20AC'.concat(currentPlanPriceOriginal, '.');
    priceSale.innerText = '\u20AC'.concat(currentPlanPriceSale, '.');
  }

  smallBlockBuyPrice.innerText = priceSale.innerText;
  removePlanAnimation();
};

var removeCurrentPlans = function removeCurrentPlans() {
  var currentPlans = planOptions.querySelectorAll('li');

  for (var i = 0; i < currentPlans.length; i++) {
    currentPlans[i].remove();
  }
};

// Buttons just logs selected plan to the console
sendToCartBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(planOptions.querySelector('.selected').innerText);
});

smallBuyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(planOptions.querySelector('.selected').innerText);
});

// SMALL STICKY BLOCK

smallBlockInfo.addEventListener('click', function () {
  buyBlock.classList.add('called');
  mainHeader.classList.add('called-by-buy-block');

  var emptySpace = '<div style="height:474px" id="empty-space"></div>';
  buyBlock.insertAdjacentHTML('beforebegin', emptySpace);

  var overlay = '<div class="buy_block_overlay"></div>';
  buyBlock.insertAdjacentHTML('beforebegin', overlay);

  document
    .querySelector('.buy_block_overlay')
    .addEventListener('click', function () {
      buyBlock.classList.remove('called');
      mainHeader.classList.remove('called-by-buy-block');
      document.querySelector('.buy_block_overlay').remove();
      document.querySelector('#empty-space').remove();
    });
});

// Stick buy block to the top on scroll for desktop browsers

(function () {
  // Get the Buy Block with current characteristics
  var offset = buyBlock.offsetTop - 40;
  var rect = buyBlock.getBoundingClientRect();

  var emptyElement = document.createElement('div');
  emptyElement.setAttribute('id', 'empty-space-desktop');
  emptyElement.style.height = parseInt(rect.height) + 'px';

  var fix = function fix() {
    var scroll = window.scrollY;
    var isFixed = buyBlock.classList.contains('desktop-fixed');

    if (scroll >= offset && !isFixed && window.innerWidth > 768) {
      buyBlock.classList.add('desktop-fixed');
      buyBlock.style.width = parseInt(rect.width) + 'px';

      document.body.style.paddingTop = parseInt(rect.height) + 'px';

      buyBlock.parentNode.insertBefore(emptyElement, buyBlock);
    } else if (scroll <= offset && isFixed && window.innerWidth > 768) {
      buyBlock.classList.remove('desktop-fixed');
      buyBlock.style.width = 'auto';

      document.body.style.paddingTop = '0px';

      document.querySelector('#empty-space-desktop').remove();
    }
  };

  window.addEventListener('scroll', fix);
})();

// Change dropdown direction for desktop browsers

(function () {
  if (window.innerWidth < 768) return;

  var offset = buyBlock.offsetTop - 250;

  var dropdownDirection = function dropdownDirection() {
    var scroll = window.scrollY;
    var isFixed = buyBlock.classList.contains('desktop-fixed');

    if (scroll >= offset || isFixed) {
      planContent.classList.add('dropdown-top-to-bot');
    } else if (scroll <= offset || !isFixed) {
      planContent.classList.remove('dropdown-top-to-bot');
    }
  };

  window.addEventListener('scroll', dropdownDirection);
})();

// Stick small buy block to the bottom of page on frame 700

(function () {
  var fix = function fix() {
    var scroll = window.scrollY;
    var isFixed = smallBuyBlock.classList.contains('fixed-small-buy-block');

    if (scroll >= 700 && !isFixed && window.innerWidth <= 768) {
      smallBuyBlock.classList.remove('unfixed-small-buy-block');
      smallBuyBlock.classList.add('fixed-small-buy-block');
    } else if (scroll <= 700 && isFixed && window.innerWidth <= 768) {
      smallBuyBlock.classList.remove('fixed-small-buy-block');
      smallBuyBlock.classList.add('unfixed-small-buy-block');
    }
  };

  window.addEventListener('scroll', fix);
})();

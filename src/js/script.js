const currencyWrapper = document.querySelector('.currency_wrapper');
const currencyBtn = currencyWrapper.querySelector('.currency_btn');
const currencyOptions = currencyWrapper.querySelector('.currency_options');

const planWrapper = document.querySelector('.plan_wrapper');
const planBtn = planWrapper.querySelector('.plan_btn');
const planOptions = planWrapper.querySelector('.plan_options');
const planContent = planWrapper.querySelector('.plan_content');

const buyBlock = document.querySelector('.buy_block');
const buyBlockOverlay = document.querySelector('.buy_block_overlay');
const priceSale = buyBlock.querySelector('.price_sale');
const priceOriginal = buyBlock.querySelector('.price_original');

const sendToCartBtn = document.querySelector('.send-to-cart');

const mainHeader = document.querySelector('.main-header');
const smallBuyBlock = document.querySelector('.small-buy_block');
const smallBlockInfo = smallBuyBlock.querySelector('.small-buy_short-info');
const smallBlockBuyPrice = smallBlockInfo.querySelector('.small-buy_price');
const smallBlockBuyPlan = smallBlockInfo.querySelector('.small-buy_plan');
const smallBuyBtn = smallBuyBlock.querySelector('.small-buy_btn');

const currencies = ['GBR', 'EUR'];
let currentCurrency = 'GBR';

const plans = [
  { duration: '1 Device, 1 Year', priceGBR: '27.99', priceEUR: '33.99' },
  { duration: '1 Device, 2 Years', priceGBR: '43.99', priceEUR: '52.99' },
  { duration: '3 Devices, 1 Year', priceGBR: '35.99', priceEUR: '42.99' },
  { duration: '3 Devices, 2 Years', priceGBR: '63.99', priceEUR: '75.99' },
  { duration: '5 Devices, 1 Year', priceGBR: '43.99', priceEUR: '52.99' },
  { duration: '5 Devices, 2 Years', priceGBR: '71.99', priceEUR: '85.99' },
];

// CURRENCY ANIMATION

let currencyAnimationState = false;

const addCurrencyAnimation = () => {
  currencyWrapper.classList.add('active');
  currencyWrapper.classList.remove('closed');
  currencyAnimationState = true;
};

const removeCurrencyAnimation = () => {
  currencyWrapper.classList.remove('active');
  currencyWrapper.classList.add('closed');
  currencyAnimationState = false;
};

currencyBtn.addEventListener('click', () => {
  if (currencyAnimationState === false) {
    addCurrencyAnimation();
  } else {
    removeCurrencyAnimation();
  }
});

// CURRENCY SELECTOR

const addCurrency = () => {
  currencies.forEach((currency) => {
    let li = `<li onclick="updateCurrency(this)">${currency}</li>`;
    currencyOptions.insertAdjacentHTML('beforeend', li);
  });
};
addCurrency();

const updateCurrency = (selectedLi) => {
  currencyBtn.firstElementChild.innerText = selectedLi.innerText;
  currentCurrency = selectedLi.innerText;
  changeCurrencyHandler(currentCurrency);
  removeCurrencyAnimation();
};

const changeCurrencyHandler = (currentCurrency) => {
  if (currentCurrency === 'GBR') {
    removeCurrentPlans();
    addPlans(currentCurrency);
  } else if (currentCurrency === 'EUR') {
    removeCurrentPlans();
    addPlans(currentCurrency);
  }
};

// PLAN ANIMATION

let planAnimationState = false;

const addPlanAnimation = () => {
  planWrapper.classList.add('active');
  planWrapper.classList.remove('closed');
  planAnimationState = true;
};

const removePlanAnimation = () => {
  planWrapper.classList.remove('active');
  planWrapper.classList.add('closed');
  planAnimationState = false;
};

planBtn.addEventListener('click', () => {
  if (planAnimationState === false) {
    addPlanAnimation();
  } else {
    removePlanAnimation();
  }
});

// PLAN SELECTOR

const addPlans = (currentCurrency) => {
  if (currentCurrency === 'GBR') {
    plans.forEach((plan, i) => {
      let li = `<li onclick="updatePlan(plans[${i}])">${plan.duration} &#163;${plan.priceGBR}</li>`;
      planOptions.insertAdjacentHTML('beforeend', li);
    });
  } else if (currentCurrency === 'EUR') {
    plans.forEach((plan, i) => {
      let li = `<li onclick="updatePlan(plans[${i}])">${plan.duration} &#8364;${plan.priceEUR}</li>`;
      planOptions.insertAdjacentHTML('beforeend', li);
    });
  }

  // Setting initial 'selected' class to chosen in HTML current plan
  const currentPlans = planOptions.querySelectorAll('.plan_options li');
  for (let i = 0; i < currentPlans.length; i++) {
    if (
      currentPlans[i].innerText.slice(0, -7).trim() ===
      planBtn.querySelector('.current_plan').innerText.trim()
    ) {
      currentPlans[i].classList.add('selected');
    }
  }

  // Setting initial prices on screen, based on currency and currently selected plan
  const selectedPlanArr = planOptions
    .querySelector('.selected')
    .innerText.split(' ');
  const selectedPlanPrice = selectedPlanArr[selectedPlanArr.length - 1].slice(
    1,
    -3
  );
  if (currentCurrency === 'GBR') {
    priceOriginal.innerText = `\u00A3${Math.floor(selectedPlanPrice * 1.2)}.`;
    priceSale.innerText = `\u00A3${selectedPlanPrice}.`;
  } else if (currentCurrency === 'EUR') {
    priceOriginal.innerText = `\u20AC${Math.floor(selectedPlanPrice * 1.2)}.`;
    priceSale.innerText = `\u20AC${selectedPlanPrice}.`;
  }
  smallBlockBuyPrice.innerText = priceSale.innerText;
};
addPlans(currentCurrency);

const updatePlan = (selectedPlan) => {
  planBtn.firstElementChild.innerText = selectedPlan.duration;
  smallBlockBuyPlan.innerText = planBtn.firstElementChild.innerText;

  // Setting 'selected' class to clicked plan and removing it from the others
  const currentPlans = planOptions.querySelectorAll('li');
  for (let i = 0; i < currentPlans.length; i++) {
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
    priceOriginal.innerText = `\u00A3${currentPlanPriceOriginal}.`;
    priceSale.innerText = `\u00A3${currentPlanPriceSale}.`;
  } else if (currentCurrency === 'EUR') {
    priceOriginal.innerText = `\u20AC${currentPlanPriceOriginal}.`;
    priceSale.innerText = `\u20AC${currentPlanPriceSale}.`;
  }
  smallBlockBuyPrice.innerText = priceSale.innerText;
  removePlanAnimation();
};

const removeCurrentPlans = () => {
  const currentPlans = planOptions.querySelectorAll('li');
  for (let i = 0; i < currentPlans.length; i++) {
    currentPlans[i].remove();
  }
};

// Buttons just logs selected plan to the console
sendToCartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(planOptions.querySelector('.selected').innerText);
});

smallBuyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(planOptions.querySelector('.selected').innerText);
});

// SMALL STICKY BLOCK

smallBlockInfo.addEventListener('click', () => {
  buyBlock.classList.add('called');
  mainHeader.classList.add('called-by-buy-block');

  let emptySpace = `<div style="height:474px" id="empty-space"></div>`;
  buyBlock.insertAdjacentHTML('beforebegin', emptySpace);

  let overlay = `<div class="buy_block_overlay"></div>`;
  buyBlock.insertAdjacentHTML('beforebegin', overlay);

  document.querySelector('.buy_block_overlay').addEventListener('click', () => {
    buyBlock.classList.remove('called');
    mainHeader.classList.remove('called-by-buy-block');
    document.querySelector('.buy_block_overlay').remove();
    document.querySelector('#empty-space').remove();
  });
});

// Stick buy block to the top on scroll for desktop browsers

(() => {
  // Get the Buy Block with current characteristics
  const offset = buyBlock.offsetTop - 40;
  const rect = buyBlock.getBoundingClientRect();

  const emptyElement = document.createElement('div');
  emptyElement.setAttribute('id', 'empty-space-desktop');
  emptyElement.style.height = parseInt(rect.height) + 'px';

  const fix = () => {
    let scroll = window.scrollY;
    let isFixed = buyBlock.classList.contains('desktop-fixed');

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

(() => {
  if (window.innerWidth < 768) return;

  const offset = buyBlock.offsetTop - 250;

  const dropdownDirection = () => {
    let scroll = window.scrollY;
    let isFixed = buyBlock.classList.contains('desktop-fixed');

    if (scroll >= offset || isFixed) {
      planContent.classList.add('dropdown-top-to-bot');
    } else if (scroll <= offset || !isFixed) {
      planContent.classList.remove('dropdown-top-to-bot');
    }
  };

  window.addEventListener('scroll', dropdownDirection);
})();

// Stick small buy block to the bottom of page on frame 700

(() => {
  const fix = () => {
    let scroll = window.scrollY;
    let isFixed = smallBuyBlock.classList.contains('fixed-small-buy-block');

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

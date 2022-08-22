ymaps.ready(initMap);
let mapWrapper = document.querySelector('.contacts__map-wrapper');
let mapWrapperClose = document.querySelector('.contacts__map-btn');

function disableFocus(mode, disable, elem) {
  let focusableElements;
  if(disable) {
    if(mode === 'inside') {
      focusableElements = elem.querySelectorAll('a[href]:not([tabindex="-1"]), area[href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])');
      focusableElements.forEach(el => {
        el.setAttribute('data-tabindex', el.hasAttribute('tabindex') ? el.getAttribute('tabindex') : 'underfined');
        el.setAttribute('tabindex', '-1');
      });
    } else if(mode === 'outside') {
      focusableElements = document.querySelectorAll('a[href]:not([tabindex="-1"]), area[href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])');
      focusableElements.forEach(el => {
        if(!elem.contains(el)) {
          el.setAttribute('data-tabindex', el.hasAttribute('tabindex') ? el.getAttribute('tabindex') : 'underfined');
          el.setAttribute('tabindex', '-1');
        }
      });
    }
  } else {
    focusableElements = document.querySelectorAll('[data-tabindex]');
    focusableElements.forEach(el => {
      el.removeAttribute('tabindex');
      if(el.getAttribute('data-tabindex') !== 'underfined') {
        el.setAttribute('tabindex', el.getAttribute('data-tabindex'));
      }
      el.removeAttribute('data-tabindex');
    });
  }
}

function initMap() {
  let myMap = new ymaps.Map("map", {
    center: (document.body.clientWidth < 768) ? [55.76541195, 37.63818052] : [55.76421189, 37.62307685],
    zoom: 14
    }),

    myPlacemark = new ymaps.Placemark([55.76959141, 37.63968918], {
        hintContent: '107045, Москва, Даев переулок, дом 41, бизнес-центр «Даев Плаза», этаж 8, офис № 82'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.svg',
        iconImageSize: [12, 12],
        iconImageOffset: [-6, -6]
  });
  myMap.geoObjects.add(myPlacemark);
  myPlacemark.events.add('click', () => {
    mapWrapper.classList.add('contacts__map-wrapper--active');
  })

  window.addEventListener('resize', () => {
    if(document.body.clientWidth < 768) {
      myMap.setCenter([55.76541195, 37.63818052]);
    } else {
      myMap.setCenter([55.76421189, 37.62307685]);
    }
  })
}

mapWrapperClose.addEventListener('click', () => {
  mapWrapper.classList.remove('contacts__map-wrapper--active');
})

let searchBtn = document.querySelector('.header__search');
let searchForm = document.querySelector('.header__search-form');
let searchInp = document.querySelector('.header__search-form-inp');
let searchClose = document.querySelector('.header__search-form-btn');
searchBtn.addEventListener('click', () => {
  searchForm.classList.add('header__search-form--active');
  setTimeout(() => { searchInp.focus(); }, 300);
})

searchClose.addEventListener('click', (e) => {
  e.preventDefault();
  searchForm.classList.remove('header__search-form--active');
}, {passive: false})

searchInp.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    e.preventDefault();
    //some search
  }
}, {passive: false})

let burgerBtn = document.querySelector('.header__burger-btn');
let burgerCloseBtn = document.querySelector('.header__nav-close');
let headerNav = document.querySelector('.header__nav');
let headerNavLink = document.querySelectorAll('.header__nav-link');


burgerBtn.addEventListener('click', () => {
  headerNav.classList.add('header__nav--active');
  document.body.classList.add('stop-scroll');
  disableFocus('outside', true, headerNav);
})

burgerCloseBtn.addEventListener('click', () => {
  headerNav.classList.remove('header__nav--active');
  document.body.classList.remove('stop-scroll');
  disableFocus('outside', false, headerNav);
})

headerNavLink.forEach(el => {
  el.addEventListener('click', () => {
    headerNav.classList.remove('header__nav--active');
    document.body.classList.remove('stop-scroll');
    disableFocus('outside', false, headerNav);
  })
})

/* Form Check */
function ErrorMsg(errorMsg, errorInput, isShow) {
  let inputContainer = errorInput.parentElement;
  let errorContainer = inputContainer.querySelector('.form-error-msg');
  if (isShow) {
    errorContainer.innerText = errorMsg;
    inputContainer.classList.add('form-wrapper--error');
    errorInput.setAttribute('aria-invalid', 'true');
  } else {
    inputContainer.classList.remove('form-wrapper--error');
    errorInput.setAttribute('aria-invalid', 'false');
  }
}

function inputCheck(input) {
  let imputType = input.getAttribute('data-type') === 'login' ? 'login' : input.type;
  let regExp = new RegExp();
  let imputValue = input.value;
  let errorMsg = new String();
  if (imputType === 'text') {
    errorMsg = (imputValue === '') ? 'Вы не ввели имя' : '';
    regExp = RegExp('^([A-Za-zА-Яа-я]{1,}[\- ]{0,1}){1,}$');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false); return true; }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректное имя' : errorMsg;
      ErrorMsg(errorMsg, input, true);
      return false;
    }
  }
  if (imputType === 'email') {
    errorMsg = (imputValue === '') ? 'Вы не ввели e-mail' : '';
    regExp = RegExp('.+(\@).+[.].+');
    if (regExp.test(imputValue)) { ErrorMsg(errorMsg, input, false); return true; }
    else {
      errorMsg = errorMsg === '' ? 'Вы ввели некорректный e-mail' : errorMsg;
      ErrorMsg(errorMsg, input, true);
      return false;
    }
  }
  if (imputType === 'textarea') {
    errorMsg = (imputValue === '') ? 'Вы не ввели сообщение' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
    return (errorMsg === '');
  }
  if (imputType === 'checkbox') {
    imputValue = input.checked;
    errorMsg = imputValue ? '' : 'Вы не отметили флажок';
    ErrorMsg(errorMsg, input, !imputValue);
    return imputValue;
  }
  if (imputType === 'password') {
    errorMsg = (imputValue === '') ? 'Вы не ввели пароль' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
    return (errorMsg === '');
  }
  if (imputType === 'login') {
    errorMsg = (imputValue === '') ? 'Вы не ввели логин' : '';
    ErrorMsg(errorMsg, input, errorMsg !== '');
    return (errorMsg === '');
  }
}

function submitForm(form) {
  let inputs = form.querySelectorAll('input, textarea');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let switcher = true;
    let errorInp;
    inputs.forEach(el => {
      if(!inputCheck(el)) {
        if(switcher) {
          switcher = false;
          errorInp = el;
        }
      }
    })
    if(!switcher) {
      errorInp.focus();
    } else {
      //Submit form
    }
  }, { passive: false })
  inputs.forEach(el => {
    el.addEventListener('change', (e) => { inputCheck(e.target) });
    el.addEventListener('input', (e) => {
      if (e.target.parentElement.classList.contains('form-wrapper--error')) { inputCheck(e.target) }
    });
  });
}

let aboutForm = document.querySelector('.about__form');
let contactsForm = document.querySelector('.contacts__form');
submitForm(aboutForm);
submitForm(contactsForm);

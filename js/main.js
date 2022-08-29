let elCardTemp = document.querySelector(".card__template").content;
let ellistTemp = document.querySelector(".list__temp").content;
let elModalTemp = document.querySelector(".modal__temp").content;

let elCardWrapper = document.querySelector(".card__list");
let elForm = document.querySelector(".render__form");
let elSearchButton = document.querySelector(".search__button");
let elBody = document.querySelector(".book__body");
let elDarkMode = document.querySelector(".dark__mode");
let elBookresult = document.querySelector(".search__result");
let elBackraund = document.querySelector(".card__list");
let elBookList = document.querySelector(".bookmark__list");
let elModalWrapper = document.querySelector(".modal__wrapper");


elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  let SearchInput = elSearchButton.value.trim();
  
  fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${SearchInput}`)
  .then(res => res.json())
  .then(data => renderCard(data.items));
});


elDarkMode.addEventListener("click", function (evt) {
  elBody.classList.toggle("darkmode");
  elCardWrapper.classList.toggle("card__list1");
});




var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


function renderCard(array) {
  let newFragment = document.createDocumentFragment();
  
  elBookresult.textContent = array.length;
  
  for (const item of array) {
    let bookCard = elCardTemp.cloneNode(true);
    
    bookCard.querySelector(".card__heading").innerHTML = item.volumeInfo.title;
    bookCard.querySelector(".card__img").src = item.volumeInfo.imageLinks.thumbnail;
    bookCard.querySelector(".card__text").innerHTML = item.volumeInfo.authors;
    bookCard.querySelector(".card__year").innerHTML = item.volumeInfo.publishedDate;
    bookCard.querySelector(".bookmark__cardtext").dataset.buttonId = item.id;
    bookCard.querySelector(".info__cardtext").dataset.infoId = item.id;
    bookCard.querySelector(".read__cardtext").href = item.volumeInfo.previewLink;    
    newFragment.appendChild(bookCard); 
  }
  
  elCardWrapper.appendChild(newFragment);
}

function renderBookmark(array) {
  let newFragment = document.createDocumentFragment();
  
  for (const item of array) {
    let bookList = ellistTemp.cloneNode(true);
    
    bookList.querySelector(".item__heading").innerHTML = item.volumeInfo.title;
    bookList.querySelector(".item__text").innerHTML = item.volumeInfo.authors;
    bookList.querySelector(".remove__btn").dataset.remove = item.id;
    
    newFragment.appendChild(bookList); 
  }
  elBookList.appendChild(newFragment);
}

function renerModal(array) {
  let newFragment = document.createDocumentFragment();

  for (const item of array) {
    let modalList = elModalTemp.cloneNode(true);

    modalList.querySelector(".modal__heading").innerHTML  = item.volumeInfo.title;
    modalList.querySelector(".img__modal").src = item.volumeInfo.imageLinks.thumbnail;
    modalList.querySelector(".modal__text").innerHTML  = item.volumeInfo.description;
    modalList.querySelector(".authors__name").innerHTML  = item.volumeInfo.authors;
    modalList.querySelector(".published__name").innerHTML  = item.volumeInfo.publishedDate;
    modalList.querySelector(".publishers__name").innerHTML  = item.volumeInfo.publisher;
    modalList.querySelector(".categories__name").innerHTML  = item.volumeInfo.categories;

    newFragment.appendChild(modalList); 
  }
  elModalWrapper.appendChild(newFragment); 
}


// ochirish bookmarkni
elBookList.addEventListener("click", function (evt) {
  console.log("ok");
});


elCardWrapper.addEventListener("click", function (evt) {
  let btnlist = evt.target.dataset.buttonId;
  
  if (btnlist) {
    fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${btnlist}`)
    .then(res => res.json())
    .then(data => renderBookmark(data.items));
  }
});

elCardWrapper.addEventListener("click", function (evt) {
  let btnInfo = evt.target.dataset.infoId;
  
  if (btnInfo) {
    fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${btnInfo}`)
    .then(res => res.json())
    .then(data => renerModal(data.items));
  }
});


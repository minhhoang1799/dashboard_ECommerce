// URL hiện tại
const currentUrl = window.location.href;

// Sử dụng URLSearchParams nếu bạn đang làm việc trong môi trường hỗ trợ URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('product');


const getProductForId = (id) => {
  const ProductList = JSON.parse(localStorage.getItem('Product'));
  for (let i = 0; i < ProductList.length; i++) {
    if (ProductList[i].id === id) {
      renderInfoProduct(ProductList[i])
      renderDescriptionProduct(ProductList[i])
      renderCate(ProductList[i].idCate)
    }
  }
}


const renderInfoProduct = (list) => {
  const getElementRender = document.querySelector('#product-detail .product-info .row');
  const userID = JSON.parse(localStorage.getItem('userID'));
  const price = list.priceDiscount ? ` <p class="product-info__priceOld">${(list.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>  <p class="product-info__price">${(list.priceDiscount).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>` : `<p class="product-info__priceOld" style="opacity: 0;">0 VND</p><p class="product-info__price">${(list.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>`;
  const cart = userID ? `<button id="addToCart" data-product="${list.id}" type="button" class="btn btn-outline-primary">Thêm vào giỏ hàng</button>` : `<a href="./login.html" class="btn btn_center btn-outline-primary">Thêm vào giỏ hàng</a>`
  if (getElementRender) {
    let size = ''
    for (let i = 0; i < list.size.length; i++) {
      size += `
      <input type="radio" class="btn-check" name="btnradio" data-size="${list.size[i]}" id="size${i}" autocomplete="off">
      <label class="btn btn-outline-primary" for="size${i}">${list.size[i]}</label>
    `
    }
    getElementRender.innerHTML = `
    <div class="col-xl-6">
      <p class="product-info__image">
       <img src="${list.image}" alt="${list.name}">
      </p>
     </div>
     <div class="col-xl-6">
      <ul class="product-info__category"></ul>
      <h4 class="main__title">${list.name}</h4>
      ${price}
      <form id="product-info__size">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          ${size}
        </div>
      </form>
        ${cart}
     </div>
  `
  }
}

const renderDescriptionProduct = (list) => {
  const getElementRender = document.querySelector('#product-detail .product-des .product-des__detail');
  return getElementRender.innerHTML = `${list.detail}`
}

const renderCate = (idCate) => {
  const getCate = JSON.parse(localStorage.getItem('Category'));
  const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
  const getElementRenderCategory = document.querySelector('#product-detail .product-info .product-info__category');
  let idCategory;
  let str = '';
  let str2 = '';
  for (let i = 0; i < getSubCate.length; i++) {
    if (getSubCate[i].id === idCate) {
      idCategory = getSubCate[i].idCate;
      str += `<li><a href="./san-pham.html?category=${getSubCate[i].idCate}&sub-cate=${getSubCate[i].id}">Brand: ${getSubCate[i].name}</a></li>`
    }
  }
  for (let k = 0; k < getCate.length; k++) {
    if (getCate[k].id === idCategory) {
      str2 += `<li><a href="./san-pham.html?category=${getCate[k].id}">danh mục: ${getCate[k].name}</a></li>`
    }
  }
  if (getElementRenderCategory) {
    return getElementRenderCategory.innerHTML = str2 + str
  }
}
  // const checkboxes = document.querySelectorAll('#product-info__size input[type="radio"]:checked');

// let sizeProduct = ''
//   checkboxes.forEach(checkbox => {
//     sizeProduct = checkbox.attributes['data-size'].nodeValue;
//   });

getProductForId(paramValue)



console.log(document.querySelectorAll('#addToCart'))
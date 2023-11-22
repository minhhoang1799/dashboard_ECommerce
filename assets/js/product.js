
const getProduct = JSON.parse(localStorage.getItem('Product'));

// URL hiện tại
const currentUrl = window.location.href;

// Sử dụng URLSearchParams nếu bạn đang làm việc trong môi trường hỗ trợ URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('category');
const subUrl = urlParams.get('sub-cate');




const renderProductItem = (list) => {
  if (!Array.isArray(list) || list.length === 0) return;
  const elementListProduct = document.querySelector('.product-list .product-list__wrapper');
  const getUser = JSON.parse(localStorage.getItem('userID'));
  let item = ``;
  for (let i = 0; i < list.length; i++) {
    const price = list[i].priceDiscount ? ` <p class="product-list__priceOld">${(list[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>  <p class="product-list__price">${(list[i].priceDiscount).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>` : `<p class="product-list__priceOld" style="opacity: 0;">0 VND</p><p class="product-list__price">${(list[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VDN</p>`;
    const discount = list[i].priceDiscount ? ((list[i].price - list[i].priceDiscount) / list[i].price) * 100 : 0;
    const renderDiscount = discount ? `<p class="product-list__discount">${Math.ceil(discount)}%</p>` : ``;
    const checkUser = getUser ? `<a href="./san-pham-detail.html?product=${list[i].id}" class="product-list__detail"><i class="fa-solid fa-eye"></i></a> <p id="addToCart" data-product="${list[i].id}" class="product-list__detail"><i class="fa-solid fa-cart-shopping"></i></p>` : `<a href="./san-pham-detail.html?product=${list[i].id}" class="product-list__detail"><i class="fa-solid fa-eye"></i></a>`
    item += `
    <div class="product-list__col">
     <div class="product-list__item">
      <p class="product-list__item--image">
       <img
        src="${list[i].image}"
        alt="${list[i].name}">
      </p>
      <div class="product-list__content">
       <h4 class="product-list__title">${list[i].name}</h4>
       <p class="product-list__des">${list[i].description}</p>
       ${price}
      </div>
      ${renderDiscount}
      <div class="product-list__btn">
       ${checkUser}
      </div>
     </div>
    </div>
  `
  }
  return elementListProduct.innerHTML = item;
}


const filterProductlist = (url, subUrl) => {
  if (!url || url.length === 0) return renderProductItem(getProduct);
  const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
  const ProductAll = JSON.parse(localStorage.getItem('Product'));
  const listCate = [];
  const listProduct = []
  for (let i = 0; i < getSubCate.length; i++) {
    if (getSubCate[i].idCate === url) {
      listCate.push(getSubCate[i].id)
    }
  }
  if (subUrl && subUrl.length > 0) {
    for (let a = 0; a < listCate.length; a++) {
      if(listCate[a] === subUrl) {
          for (let b = 0; b < ProductAll.length; b++) {
            if (listCate[a] === ProductAll[b].idCate) {
              listProduct.push(ProductAll[b])
            }
          }
      }
    
    }
    return renderProductItem(listProduct)
  }
  for (let k = 0; k < listCate.length; k++) {
    for (let j = 0; j < ProductAll.length; j++) {
      if (listCate[k] === ProductAll[j].idCate) {
        listProduct.push(ProductAll[j])
      }
    }
  }
  return renderProductItem(listProduct)
}

filterProductlist(paramValue, subUrl)
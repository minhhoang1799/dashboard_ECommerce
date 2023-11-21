
// URL hiện tại
const currentUrl = window.location.href;

// Sử dụng URLSearchParams nếu bạn đang làm việc trong môi trường hỗ trợ URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('product');

const getProduct = JSON.parse(localStorage.getItem('Product'));
let detailValue = ``
for(let i = 0; i < getProduct.length; i++) {
 if(getProduct[i].id === paramValue) {
  detailValue += `${getProduct[i].detail}`
 }
}



const editor = new RichTextEditor("#product #product-editor--wrapper");  
editor.setHTMLCode(detailValue);
const renderData  = document.querySelector('#product #render_product-editor .is-detail');
if(renderData) {
 renderData.innerHTML = detailValue;
}
function btnShowHTMLCode() {
  detailValue = editor.getHTMLCode();
    for(let k = 0; k < getProduct.length; k++) {
    if(getProduct[k].id === paramValue) {
     getProduct[k].detail = detailValue;
     localStorage.setItem('Product', JSON.stringify(getProduct));
     return window.location.reload();
    }
   }
  
}


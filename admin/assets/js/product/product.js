import { validateText } from "../../../../assets/js/Validate.js";
import hashPassword from "../../../../assets/js/createToken.js";

const getData = JSON.parse(localStorage.getItem('Product'))

// render danh sách sản phẩm
const getProductList = (list) => {
  const getTable = document.querySelector('#product .product__bottom--list tbody');
  const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
  if (!list || list.length === 0) return getTable.innerHTML = `<tr><td class="table-center" colspan="99">Không có sản phẩm trong cửa hàng</td></tr`;
  let str = '';
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < getSubCate.length; j++) {
      const statusMessage = list[i].quantity > 0 ? 'in stock' : 'sold out'
      if (getSubCate[j].id === list[i].idCate) {
        str += `
          <tr>
          <td>${i + 1}</td>
          <td>${list[i].name}</td>
          <td><span class="image"><img src="${list[i].image}" alt="${list[i].name}"></span></td>
          <td>${getSubCate[j].name}</td>
          <td>${(list[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</td>
          <td>${(list[i].priceDiscount).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') || 0} VND</td>
          <td>${list[i].quantity}</td>
          <td>${statusMessage}</td>
          <td class="table-center"><a href="./product-detail.html?product=${list[i].id}"><i class="fa-solid fa-pencil"></i></a></td>
          <td>
            <button type="button" class="btn btn-primary" id="product-editBtn" data-btn="${list[i].id}" data-target="product-edit">Chỉnh sửa</button>
            <button type="button" class="btn btn-danger" id="product-deleteBtn" data-btn="${list[i].id}" data-target="product-delete">Xóa</button>
          </td>
          </tr>
        `
      }
    }
  }
  return getTable.innerHTML = str;
}
getProductList(getData);


// thêm 1 sản phẩm
const addProduct = () => {
  const getElementFormAdd = document.querySelector('#product #form-product .product-add');
  if (getElementFormAdd) {
    const getCate = JSON.parse(localStorage.getItem('Category'));
    const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
    getElementFormAdd.innerHTML = `
      <form>
        <div class="form-group mb-4">
          <label class="form-label">Tên sản phẩm</label>
          <input type="text" class="form-control" id="product-name">
          <p class="name-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Hình ảnh</label>
          <input type="text" class="form-control" id="product-image">
          <p class="image-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Mô tả</label>
          <input type="text" class="form-control" id="product-discription">
          <p class="discription-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Danh mục</label>
          <select id="product-category" class="form-select" aria-label="Default select example">
            <option selected>Chọn 1 danh mục</option>
            ${getCate.map((item) => ` <option value="${item.id}">${item.name}</option>`)}
          </select>
        </div>
        <div class="form-group mb-4 category__sub">
          <label class="form-label">Danh mục phụ</label>
          <select id="product-SubCategory" class="form-select" aria-label="Default select example"></select>
        </div>
         <div class="form-group mb-4">
          <label class="form-label">Size</label>
          <input type="text" class="form-control" id="product-size">
          <p class="size-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Giá</label>
          <input type="text" class="form-control" id="product-price">
          <p class="price-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Giảm Giá</label>
          <input type="text" class="form-control" id="product-priceDiscount">
          <p class="priceDiscount-error"></p>
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Số lượng</label>
          <input type="text" class="form-control" id="product-quatity">
          <p class="quatity-error"></p>
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-primary" value="Thêm sản phẩm">
        </div>
      </form>
  `
    // xử lý khi chọn 1 danh mục sẽ kèm theo danh mục phụ
    const selectProductCate = document.querySelector('#product #form-product #product-category')
    const selectProductSubCate = document.querySelector('#product #form-product #product-SubCategory')
    selectProductCate.addEventListener('change', function () {
      const selectedOption = selectProductCate.value;
      let str = `
      <option selected>Chọn 1 danh mục phụ</option>
    `
      for (let i = 0; i < getSubCate.length; i++) {
        if (getSubCate[i].idCate === selectedOption) {
          str += `
          <option value="${getSubCate[i].id}">${getSubCate[i].name}</option>
        `
        }
      }
      selectProductSubCate.innerHTML = str;
    })
  }
  getElementFormAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const getProductName = document.querySelector('#product #form-product #product-name').value;
    const getProductImage = document.querySelector('#product #form-product #product-image').value;
    const getProductDescription = document.querySelector('#product #form-product #product-discription').value;
    const getProductCategory = document.querySelector('#product #form-product #product-SubCategory').value;
    const getProductPrice = document.querySelector('#product #form-product #product-price').value;
    const getProductPriceDiscount = document.querySelector('#product #form-product #product-priceDiscount').value;
    const getProductSize = document.querySelector('#product #form-product #product-size').value;
    const getProductQuatity = document.querySelector('#product #form-product #product-quatity').value;
    if (!validateText(getProductName, 1)) {
      return document.querySelector('#product #form-product .name-error').innerHTML = 'Không được để trống'
    } else {
      document.querySelector('#product #form-product .name-error').innerHTML = '';
    }
    if (!validateText(getProductDescription, 1)) {
      return document.querySelector('#product #form-product .discription-error').innerHTML = 'Không được để trống'
    } else {
      document.querySelector('#product #form-product .discription-error').innerHTML = '';
    }
    if (!validateText(getProductPrice, 1)) {
      return document.querySelector('#product #form-product .price-error').innerHTML = 'Không được để trống'
    } else {
      document.querySelector('#product #form-product .price-error').innerHTML = '';
    }
     if (!validateText(getProductSize, 1)) {
      return document.querySelector('#product #form-product .size-error').innerHTML = 'Không được để trống'
    } else {
      document.querySelector('#product #form-product .size-error').innerHTML = '';
    }
    if (!validateText(getProductQuatity, 1)) {
      return document.querySelector('#product #form-product .quatity-error').innerHTML = 'Không được để trống'
    } else {
      document.querySelector('#product #form-product .quatity-error').innerHTML = '';
    }
    const createTokenIdProduct = [{
      token1: getProductName,
      token2: getProductQuatity,
    }]
    hashPassword(createTokenIdProduct).then(token => {
      const getProduct = JSON.parse(localStorage.getItem('Product'));
      const getSize = getProductSize.split(',');
      const newProduct = {
        id: token[0],
        name: getProductName,
        description: getProductDescription,
        image: getProductImage,
        idCate: getProductCategory,
        price: getProductPrice,
        priceDiscount: getProductPriceDiscount,
        size: [...getSize],
        quantity: getProductQuatity,
        detail: "",
        CreatedAt: `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}`
      }
      getProduct.push(newProduct);
      localStorage.setItem('Product', JSON.stringify(getProduct));
      return window.location.reload();
    })
  })
}
const handleEditProduct = (id) => {
  const elementFormEdit = document.querySelector('#product #product-edit .product-wrap');
  if (elementFormEdit) {
    const getCate = JSON.parse(localStorage.getItem('Category'));
    const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
    const getProduct = JSON.parse(localStorage.getItem('Product'));
    for (let i = 0; i < getProduct.length; i++) {
      if (getProduct[i].id === id) {
        elementFormEdit.innerHTML = `
          <form>
            <div class="form-group mb-4">
              <label class="form-label">Tên sản phẩm</label>
              <input type="text" class="form-control" id="edit-name" value="${getProduct[i].name}">
              <p class="name-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Hình ảnh</label>
              <input type="text" class="form-control" id="edit-image" value="${getProduct[i].image}">
              <p class="image-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Mô tả</label>
              <input type="text" class="form-control" id="edit-discription" value="${getProduct[i].description}">
              <p class="discription-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Danh mục</label>
              <select id="product-category" class="form-select" aria-label="Default select example">
                <option selected>Chọn 1 danh mục</option>
                ${getCate.map((item) => ` <option value="${item.id}">${item.name}</option>`)}
              </select>
              <p class="category-error"></p>
            </div>
            <div class="form-group mb-4 category__sub">
              <label class="form-label">Danh mục phụ</label>
              <select id="product-SubCategory" class="form-select" aria-label="Default select example"></select>
               <p class="subCategory-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Giá</label>
              <input type="text" class="form-control" id="edit-price" value="${getProduct[i].price}">
              <p class="price-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Giảm Giá</label>
              <input type="text" class="form-control" id="edit-priceDiscount" value="${getProduct[i].priceDiscount}">
              <p class="priceDiscount-error"></p>
            </div>
            <div class="form-group mb-4">
              <label class="form-label">Số lượng</label>
              <input type="text" class="form-control" id="edit-quatity" value="${getProduct[i].quantity}">
              <p class="quatity-error"></p>
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary" value="Cập nhật">
            </div>
          </form>
        `
        // xử lý khi chọn 1 danh mục sẽ kèm theo danh mục phụ
        const selectProductCate = document.querySelector('#product #product-edit .product-wrap #product-category');
        const selectProductSubCate = document.querySelector('#product #product-edit .product-wrap #product-SubCategory');
        selectProductCate.addEventListener('change', function () {
          const selectedOption = selectProductCate.value;
          let str = `
              <option value="0">Chọn 1 danh mục phụ</option>
            `
          for (let i = 0; i < getSubCate.length; i++) {
            if (getSubCate[i].idCate === selectedOption) {
              str += `
                <option value="${getSubCate[i].id}">${getSubCate[i].name}</option>
              `
            }
          }
          selectProductSubCate.innerHTML = str;
        })
        elementFormEdit.addEventListener('submit', function (event) {
          event.preventDefault();
          const getProductName = document.querySelector('#product #product-edit .product-wrap #edit-name').value;
          const getProductImage = document.querySelector('#product #product-edit .product-wrap #edit-image').value;
          const getProductDescription = document.querySelector('#product #product-edit .product-wrap #edit-discription').value;
          const getProductSubCategory = document.querySelector('#product #product-edit .product-wrap #product-SubCategory').value;
          const getProductPrice = document.querySelector('#product #product-edit .product-wrap #edit-price').value;
          const getProductPriceDiscount = document.querySelector('#product #product-edit .product-wrap #edit-priceDiscount').value;
          const getProductQuatity = document.querySelector('#product #product-edit .product-wrap #edit-quatity').value;
          if (!validateText(getProductName, 1)) {
            return document.querySelector('#product #product-edit .product-wrap .name-error').innerHTML = 'Không được để trống'
          } else {
            document.querySelector('#product #product-edit .product-wrap .name-error').innerHTML = '';
          }
          if (!validateText(getProductDescription, 1)) {
            return document.querySelector('#product #product-edit .product-wrap .discription-error').innerHTML = 'Không được để trống'
          } else {
            document.querySelector('#product #product-edit .product-wrap .discription-error').innerHTML = '';
          }
          if (!validateText(getProductSubCategory, 1)) {
            return document.querySelector('#product #product-edit .product-wrap .subCategory-error').innerHTML = 'Không được để trống'
          } else {
            document.querySelector('#product #product-edit .product-wrap .subCategory-error').innerHTML = '';
          }
          if (!validateText(getProductPrice, 1)) {
            return document.querySelector('#product #product-edit .product-wrap .price-error').innerHTML = 'Không được để trống'
          } else {
            document.querySelector('#product #product-edit .product-wrap .price-error').innerHTML = '';
          }
          if (!validateText(getProductQuatity, 1)) {
            return document.querySelector('#product #product-edit .product-wrap .quatity-error').innerHTML = 'Không được để trống'
          } else {
            document.querySelector('#product #product-edit .product-wrap .quatity-error').innerHTML = '';
          }
          getProduct[i].name = getProductName;
          getProduct[i].image = getProductImage;
          getProduct[i].description = getProductDescription;
          getProduct[i].idCate = getProductSubCategory;
          getProduct[i].price = getProductPrice;
          getProduct[i].priceDiscount = getProductPriceDiscount;
          getProduct[i].quantity = getProductQuatity;
          localStorage.setItem('Product', JSON.stringify(getProduct));
          return window.location.reload();
        })
      }
    }
  }
}
const handleDeleteProduct = (id) => {
  const elementFormDelete = document.querySelector('#product #product-delete .product-wrap');
  const getProduct = JSON.parse(localStorage.getItem('Product'));
  for(let i = 0; i < getProduct.length; i++) {
    if(getProduct[i].id === id) {
      elementFormDelete.innerHTML = `
        <p>Bạn muốn xóa sản phẩm <span class="note">${getProduct[i].name}</span>. Sản phẩm này sẽ không được lưu lại trên hệ thống.</p>
        <div class="delete-product">
        <button type="button" class="btn btn-primary delete-yes">Đồng ý</button>
        <button type="button" class="btn delete-cancel btn-danger">Từ chối</button>
       </div>
      `
      const btnDelete = document.querySelector('#product #product-delete .product-wrap .delete-product .delete-yes');
      const btnCancel = document.querySelector('#product #product-delete .product-wrap .delete-product .delete-cancel');
      btnDelete.addEventListener('click', function () {
        getProduct.splice(i, 1);
        localStorage.setItem('Product', JSON.stringify(getProduct))
        return window.location.reload()
      })
      btnCancel.addEventListener('click', function () {
        document.querySelector('#product-delete').classList.remove('active')
      })
    }
  }
}

const handleBtnProduct = () => {
  const btnAddProduct = document.querySelector('#product #add_product');
  const btnEditProduct = document.querySelectorAll('#product #product-editBtn');
  const btnDeleteProduct = document.querySelectorAll('#product #product-deleteBtn');
  btnAddProduct.addEventListener('click', () => addProduct());
  btnEditProduct.forEach(function (data) {
    data.addEventListener('click', () => handleEditProduct(data.dataset.btn))
  })
  btnDeleteProduct.forEach(function (data) {
    data.addEventListener('click', () => handleDeleteProduct(data.dataset.btn))
  })
}

handleBtnProduct()
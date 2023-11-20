import hashPassword from "../../../../assets/js/createToken.js";
import { validateText } from "../../../../assets/js/Validate.js";

const renderElementFormCreateCategory = () => {
 const getTable = document.querySelector('#category_management .category__wrapper--list tbody');
 const getCate = JSON.parse(localStorage.getItem('Category'));
 if (!getCate || getCate.length === 0) return getTable.innerHTML = `<tr><td class="table-center" colspan="99">Không có danh mục</td></tr`;
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 let str = '';
 for (let i = 0; i < getCate.length; i++) {
  let NAME = getSubCate.filter((item) => item.idCate === getCate[i].id)
  str += `
    <tr>
     <td>${i + 1}</td>
     <td>${getCate[i].name}</td>
     <td>
      <ul>
       ${NAME.map((item) => `<li> <p class="name">${item.name}</p> <div class="btn__sub--list"> <div class="btn__sub btn__sub-delete" data-btnCheck="${item.idCate}" data-btnDelete="${item.id}" data-target="delete-subcate"><i class="fa-solid fa-trash"></i></div> <div class="btn__sub btn__sub-update" data-btn="${item.id}" data-target="edit-subcate"><i class="fa-solid fa-pencil"></i></div> </div> </li>`).join('')}
      </ul>
     </td>
     <td class="table-center">
     <button type="button" class="btn btn-success btn__cate btn__cate--addSub" data-btn="${getCate[i].id}"  data-target="add-subcate">Thêm danh mục phụ</button>
     <button type="button" class="btn btn-primary btn__cate btn__cate--edit" data-btn="${getCate[i].id}"  data-target="edit-cate">Chỉnh sửa</button>
     <button type="button" class="btn btn-danger btn__cate btn__cate--delete" data-btn="${getCate[i].id}" data-target="delete-cate">Xóa</button>
     </td>
    </tr>
 `
 }
 return getTable.innerHTML = str;
}
// xử lý tất cả nút danh mục
const getEventBtnCate = () => {
 const addSubElement = document.querySelectorAll('.category__wrapper--list .btn__cate.btn__cate--addSub');
 const editElement = document.querySelectorAll('.category__wrapper--list .btn__cate.btn__cate--edit');
 const deleteElement = document.querySelectorAll('.category__wrapper--list .btn__cate.btn__cate--delete');
 addSubElement.forEach(function (data) {
  data.addEventListener('click', () => handleAddSubCate(data.dataset.btn))
 })
 editElement.forEach(function (data) {
  data.addEventListener('click', () => handleEditCate(data.dataset.btn))
 })
 deleteElement.forEach(function (data) {
  data.addEventListener('click', () => handleDeleteCate(data.dataset.btn))
 })
}

// chỉnh sửa danh mục
const handleEditCate = (id) => {
 const getCate = JSON.parse(localStorage.getItem('Category'));
 const addFormEdit = document.querySelector('#category #edit-cate .edit-sub form')
 for (let i = 0; i < getCate.length; i++) {
  if (getCate[i].id === id) {
   addFormEdit.innerHTML = `
       <div class="form-group mb-4">
          <label class="form-label">Tên danh mục</label>
          <input type="text" class="form-control" id="is-edit" value="${getCate[i].name}">
          <p class="edit-error"></p>
        </div>
      <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Chỉnh sửa">
     </div>
   `
   addFormEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    const isValueEdit = document.querySelector('#category #edit-cate .edit-sub #is-edit').value;
    if (!validateText(isValueEdit, 1)) {
     return document.querySelector('#category #edit-cate .edit-sub .edit-error').innerHTML = 'Không được để trống'
    } else {
     document.querySelector('#category #edit-cate .edit-sub .edit-error').innerHTML = '';
    }
    getCate[i].name = isValueEdit;
    localStorage.setItem('Category', JSON.stringify(getCate))
    return window.location.reload();
   })
  }
 }
}

// xóa danh muc
const handleDeleteCate = (id) => {
 const getCate = JSON.parse(localStorage.getItem('Category'));
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 const addFormDelete = document.querySelector('#category #delete-cate .delete-sub');
 for (let i = 0; i < getCate.length; i++) {
  if (getCate[i].id === id) {
   let str = ''
   for(let j = 0; j <getSubCate.length; j++) {
    if(getCate[i].id === getSubCate[j].idCate) {
      str += `<span class="note">${getSubCate[j].name}</span>`
    }
   }
   if(str) return addFormDelete.innerHTML = `
     <p>Hiện danh mục ${getCate[i].name} đang có chứa danh mục con ${str}. Không thể xóa danh mục ${getCate[i].name}</p>
   `
   addFormDelete.innerHTML = `
     <p>Bạn có muốn xóa danh mục <span class="note">${getCate[i].name}</span>. Danh mục này sẽ không được lưu lại trên hệ thống.</p>
     <div class="delete-subcate">
        <button type="button" class="btn btn-primary delete-yes">Đồng ý</button>
        <button type="button" class="btn delete-cancel btn-danger">Từ chối</button>
       </div>
   `
   const btnDelete = document.querySelector('#category #delete-cate .delete-subcate .delete-yes');
   const btnCancel = document.querySelector('#category #delete-cate .delete-subcate .delete-cancel');
   btnDelete.addEventListener('click', function () {
    getCate.splice(i, 1);
    localStorage.setItem('Category', JSON.stringify(getCate))
    return window.location.reload()
   })
   btnCancel.addEventListener('click', function () {
    document.querySelector('#delete-cate').classList.remove('active')
   })
  }

 }
}

// xử lý tất cả nút danh mục phụ
const getEventBtnSubCate = () => {
 const editElement = document.querySelectorAll('.category__wrapper--list .btn__sub.btn__sub-update');
 const deleteElement = document.querySelectorAll('.category__wrapper--list .btn__sub.btn__sub-delete');
 editElement.forEach(function (data) {
  data.addEventListener('click', () => handleEditSubCate(data.dataset.btn))
 })
 deleteElement.forEach(function (data) {
  data.addEventListener('click', () => handleDeleteSubCate(data.dataset.btncheck, data.dataset.btndelete))
 })
}

// thêm 1 danh mục phụ theo danh mục cha
const handleAddSubCate = (id) => {
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 const getElementAddSub = document.querySelector('#category #add-subcate .add-sub form');
 if(getElementAddSub) {
  getElementAddSub.innerHTML = `
    <div class="form-group mb-4">
     <label class="form-label">Tên danh mục phụ</label>
     <input type="text" class="form-control" id="subCategory-name">
      <p class="add-error"></p>
    </div>
    <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Thêm danh mục phụ">
     </div>
  `
  getElementAddSub.addEventListener('submit', function(event){
   event.preventDefault()
   const isValue = document.querySelector('#category #add-subcate .add-sub #subCategory-name').value;
    if (!validateText(isValue, 1)) {
     return document.querySelector('#category #add-subcate .add-sub .add-error').innerHTML = 'Không được để trống'
    } else {
     document.querySelector('#category #add-subcate .add-sub .add-error').innerHTML = '';
    }
    const newSubcate = {
     idCate: id,
     id: `Subcategory${getSubCate.length + 1}`,
     name: `${isValue}`,
     CreatedAt: `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}`
    }
    getSubCate.push(newSubcate)
    localStorage.setItem('Sub-Category', JSON.stringify(getSubCate))
    return window.location.reload();
  })
 }
}
// chỉnh sửa danh mục phụ
const handleEditSubCate = (id) => {
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 const addFormEdit = document.querySelector('#category #edit-subcate .edit-sub form');
 for (let i = 0; i < getSubCate.length; i++) {
  if (getSubCate[i].id === id) {
   addFormEdit.innerHTML = `
       <div class="form-group mb-4">
          <label class="form-label">Tên danh mục</label>
          <input type="text" class="form-control" id="is-edit" value="${getSubCate[i].name}">
          <p class="edit-error"></p>
        </div>
      <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Chỉnh sửa">
     </div>
   `
   addFormEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    const isValueEdit = document.querySelector('#category #edit-subcate .edit-sub #is-edit').value;
    if (!validateText(isValueEdit, 1)) {
     return document.querySelector('#category #edit-subcate .edit-sub .edit-error').innerHTML = 'Không được để trống'
    } else {
     document.querySelector('#category #edit-subcate .edit-sub .edit-error').innerHTML = '';
    }
    getSubCate[i].name = isValueEdit;
    localStorage.setItem('Sub-Category', JSON.stringify(getSubCate))
    return window.location.reload();
   })
  }
 }
}

// xóa danh mục phụ
const handleDeleteSubCate = (id, id2) => {
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 const getProductList = JSON.parse(localStorage.getItem('Product'));
 const addFormEdit = document.querySelector('#category #delete-subcate .delete-sub');
 for (let i = 0; i < getProductList.length; i++) {
  if (getProductList[i].idCate === id) {
   return addFormEdit.innerHTML = `
    <p>Hiện sản phẩm <span class="note">${getProductList[i].id}</span> đang chứa danh mục này. Không thể xóa danh mục.</p>
   `
  }
 }
 for (let j = 0; j < getSubCate.length; j++) {
  if (getSubCate[j].id === id2) {
   addFormEdit.innerHTML = `
    <p>Bạn có muốn xóa danh mục <span class="note">${getSubCate[j].name}</span>. Danh mục này sẽ không được lưu lại trên hệ thống.</p>
    <div class="delete-subcate">
       <button type="button" class="btn btn-primary delete-yes">Đồng ý</button>
       <button type="button" class="btn delete-cancel btn-danger">Từ chối</button>
      </div>
   `
   const btnDelete = document.querySelector('#category #delete-subcate .delete-subcate .delete-yes');
   const btnCancel = document.querySelector('#category #delete-subcate .delete-subcate .delete-cancel');
   btnDelete.addEventListener('click', function () {
    getSubCate.splice(j, 1);
    localStorage.setItem('Sub-Category', JSON.stringify(getSubCate))
    return window.location.reload()
   })
   btnCancel.addEventListener('click', function () {
    document.querySelector('#delete-subcate').classList.remove('active')
   })
  }
 }
}

// tạo mới 1 danh mục
const createCategory = () => {
 const getForm = document.querySelector('#form-category .category-add form');
 let num = 1
 if (getForm) {
  let str = `
     <div class="form-group mb-4">
      <label class="form-label">Tên danh mục</label>
      <input type="text" class="form-control" id="category-name">
     </div>
     <div class="form-group mb-4">
        <div class="form-wrapper cate">
          <label class="form-label cate-hide">Thêm danh mục phụ</label>
          <button type="button" id="add-field" class="btn btn-info"><i class="fa-solid fa-plus"></i></button>
        </div>
       <div class="form-subcate">
        <p>Danh mục phụ</p>
       </div>
     </div>
     <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Thêm danh mục">
     </div>
   `;
  getForm.innerHTML = str;
  document.querySelector('#add-field').addEventListener('click', () => createFormCateSub());
  return getForm.addEventListener('submit', () => handleSubmitCate(event))
 }
}
// xử lý khi tạo mới 1 danh mục trên form
const handleSubmitCate = (event) => {
 event.preventDefault();
 const cateName = document.querySelector('#form-category #category-name').value;
 const getArr = JSON.parse(localStorage.getItem('sub-html'));
 const getCate = JSON.parse(localStorage.getItem('Category'));
 const getSubCate = JSON.parse(localStorage.getItem('Sub-Category'));
 let listSub = []
 for (let i = 0; i < getArr?.length; i++) {
  listSub.push(document.querySelector(`#form-category .form-subcate #subCategory-name${i + 1}`).value)
 }
 const createToken = [{
  token1: 'category',
  token2: cateName
 }]
 hashPassword(createToken).then(token => {
  getCate.push({
   id: token[0],
   name: `${cateName}`,
   CreatedAt: `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}`
  })
  listSub.map(item => {
   getSubCate.push({
    idCate: token[0],
    id: `Subcategory${getSubCate.length + 1}`,
    name: `${item}`,
    CreatedAt: `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}`
   })
  })
  localStorage.setItem('Category', JSON.stringify(getCate))
  localStorage.setItem('Sub-Category', JSON.stringify(getSubCate))
  localStorage.removeItem('sub-html')
  return window.location.reload();
 })
}

// tạo 1 form danh mục phụ
const createFormCateSub = () => {
 const getArr = JSON.parse(localStorage.getItem('sub-html'));
 const elementSubCate = document.querySelector('#form-category .form-subcate');
 if (!getArr) {
  localStorage.setItem('sub-html', JSON.stringify([`
   <div class="form-group mb-4">
    <label class="form-label">Tên danh mục phụ 1</label>
    <input type="text" class="form-control" id="subCategory-name1">
   </div>
 `]))
  return elementSubCate.innerHTML = `
   <div class="form-group mb-4">
    <label class="form-label">Tên danh mục phụ 1</label>
    <input type="text" class="form-control" id="subCategory-name1">
   </div>
 `
 }
 getArr.push(`
    <div class="form-group mb-4">
    <label class="form-label">Tên danh mục phụ ${getArr.length + 1}</label>
    <input type="text" class="form-control" id="subCategory-name${getArr.length + 1}">
   </div>
 `)
 localStorage.setItem('sub-html', JSON.stringify(getArr))
 return elementSubCate.innerHTML = getArr;
}



renderElementFormCreateCategory();
createCategory();
getEventBtnCate()
getEventBtnSubCate();

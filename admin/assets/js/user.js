const LIST = JSON.parse(localStorage.getItem('userList'));

// render danh sách user
const getUserList = (list) => {
 const isList = document.querySelector('#user-management table.no-border tbody');
 if(list.length === 0) return isList.innerHTML = `<tr><td class="table-center" colspan="10"><span>không có thông tin</span></td></tr>`
 let str = '';
 const newList = list;
 if(isList) {
  for(let i = 1; i < newList.length; i++) {
   const avatar = newList[i].avatar ? newList[i].avatar : '../assets/image/user.png';
   str += `
    <tr>
     <td class="table-center">${i}</td>
     <td>${newList[i].name}</td>
     <td>${newList[i].email}</td>
     <td class="table-center"><p><img src="${avatar}" alt="${newList[i].name}"></p></td>
     <td>${newList[i].profile.location}</td>
     <td class="table-center">${newList[i].position}</td>
     <td>Sản phẩm trong giỏ hàng: ${newList[i].cart.length}</td>
     <td>${newList[i].status ? 'Online' : "Offline"}</td>
     <td class="table-center">
      <button type="button" class="btn btn-primary" data-target="edit-user" onclick="editUser('${newList[i].id}')">Chỉnh sửa</button>
      <button type="button" class="btn btn-danger" data-target="delete-user" onclick="handleDeleteUser('${newList[i].id}')">Xoá</button>
      <button class="btn admin-block" data-target="block-user" onclick=handleBlockUser('${newList[i].id}')>${newList[i].access.status ? '<i class="fa-solid fa-lock-open"></i>' : '<i class="fa-solid fa-lock"></i>'}</button>
     </td>
    </tr>
   `
  }
  return isList.innerHTML = str;
 }
}



// chỉnh sửa user
const handleSubmitEditForm = (event,id) => {
 event.preventDefault();
 const data = LIST;
 const nameEdit = document.querySelector('#user-management #form-editUser #edit-name').value;
 const avatarEdit = document.querySelector('#user-management #form-editUser #edit-avatar').value;
 const positionEdit = document.querySelector('#user-management #form-editUser #edit-position').value;
 const locationEdit = document.querySelector('#user-management #form-editUser #edit-location').value;
 const cityEdit = document.querySelector('#user-management #form-editUser #edit-city').value;
 const countryEdit = document.querySelector('#user-management #form-editUser #edit-country').value;
 const codeEdit = document.querySelector('#user-management #form-editUser #edit-code').value;
 for(let i = 1; i < data.length; i++) {
  if(data[i].id === id) {
   data[i].name = nameEdit;
   data[i].avatar = avatarEdit;
   data[i].position = positionEdit;
   data[i].profile.location = locationEdit;
   data[i].profile.city = cityEdit;
   data[i].profile.country = countryEdit;
   data[i].profile.code = codeEdit;
   localStorage.setItem('userList', JSON.stringify(data));
   return window.location.reload();
  }
 }
}
const editUser = (id) => {
 const getList = LIST;
 for(let i = 1; i < getList.length; i++) {
  if(getList[i].id === id) {
   const formEditUser = document.querySelector('#user-management #form-editUser');
   let str = `
     <div class="form-group mb-4">
      <label class="form-label">Họ và tên</label>
      <input type="text" class="form-control" id="edit-name" value="${getList[i].name}">
     </div>
     <div class="form-group mb-4">
      <label class="form-label">Ảnh đại diện</label>
      <input type="text" class="form-control" id="edit-avatar" value="${getList[i].avatar}">
     </div>
     <div class="form-group mb-4">
      <label class="form-label">Chức năng</label>
      <input type="text" class="form-control" id="edit-position" value="${getList[i].position}">
     </div>
      <div class="form-group mb-4">
      <label class="form-label">Địa chỉ</label>
      <input type="text" class="form-control" id="edit-location" value="${getList[i].profile?.location}">
     </div>
    <div class="form-group mb-4">
      <label class="form-label">Tỉnh / thành phố</label>
      <input type="text" class="form-control" id="edit-city" value="${getList[i].profile?.city}">
     </div>
    <div class="form-group mb-4">
      <label class="form-label">Country</label>
      <input type="text" class="form-control" id="edit-country" value="${getList[i].profile?.country}">
     </div>
    <div class="form-group mb-4">
      <label class="form-label">Postal Code</label>
      <input type="text" class="form-control" id="edit-code" value="${getList[i].profile?.code}">
     </div>
     <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Cập nhật">
      </div>
   `;
   formEditUser.innerHTML = str;
   return formEditUser.addEventListener('submit', () => handleSubmitEditForm(event,id));
  }
 }
}


// xóa user
const handleDeleteUser = (id) => {
 const getList = LIST;
 const renderNotification = document.querySelector('.delete-notification');

 for(let i = 1; i < getList.length; i++) {
  if(getList[i].id === id) {
   renderNotification.innerHTML = `
      <p>Bạn muốn xóa người dùng ${getList[i].name}. Thông tin của người dùng ${getList[i].name} sẽ không lưu lại trên hệ thống.</p>
       <div class="delete-list">
        <button type="button" class="btn btn-primary delete-yes">Đồng ý</button>
        <button type="button" class="btn delete-cancel btn-danger">Từ chối</button>
       </div>
   `
   const btnDelete = document.querySelector('.delete-notification .delete-yes');
   const btnCancel = document.querySelector('.delete-notification .delete-cancel');
   btnDelete.addEventListener('click', function(){
      const newList = getList;
      newList.splice(i,1);
      localStorage.setItem('userList', JSON.stringify(newList));
      localStorage.removeItem('userID');
      return window.location.reload()
   })
   btnCancel.addEventListener('click', function(){
    document.querySelector('#delete-user').classList.remove('active')
   })
  }
 }
}
// block user
const handleBlockUser = (id) => {
  const getList = LIST;
  const renderNotification = document.querySelector('.block-notification');
  for(let i = 1; i < getList.length; i++) {
    if(getList[i].id === id) {
      const notification = getList[i].access.status ? `<p>Bạn muốn khóa người dùng ${getList[i].name}.</p>` : `<p>Bạn muốn mở khóa người dùng ${getList[i].name}.</p>`
      if(getList[i].access.status) {
         renderNotification.innerHTML = `
          ${notification}
          <form id="form-block">
          <div class="row">
            <div class="form-group col-md-12">
            <label class="form-label">Lý do</label>
            <textarea id="user-message" type="text" class="form-control"></textarea>
            </div>
            <div class="block-list">
              <button type="button" class="btn btn-primary block-yes">Đồng ý</button>
              <button type="button" class="btn block-cancel btn-danger">Từ chối</button>
            </div>
          </form>
        `
        const btnDelete = document.querySelector('.block-notification .block-yes');
        const btnCancel = document.querySelector('.block-notification .block-cancel');
        btnDelete.addEventListener('click', function() {
          const isMessage = document.querySelector('#user-message').value;
          getList[i].access.status ? getList[i].access.status = false : getList[i].access.status = true;
          getList[i].access.message = isMessage;
          const createUserBlackList = {
            id: getList[i].id,
            email: getList[i].email,
            access: {
              status:  false,
              message: isMessage
            }
          }
          const getBackList = JSON.parse(localStorage.getItem('black-list'));
          if(!getBackList || getBackList.length === 0) {
            localStorage.setItem('black-list', JSON.stringify([createUserBlackList]));
            localStorage.setItem('userList', JSON.stringify(getList));
            return window.location.reload()
          }
          getBackList.push(createUserBlackList);
          localStorage.setItem('black-list', JSON.stringify(getBackList));
          localStorage.setItem('userList', JSON.stringify(getList));
          return window.location.reload()
        });
        btnCancel.addEventListener('click', function(){
          return document.querySelector('#block-user').classList.remove('active')
        })
        return;
      }
      renderNotification.innerHTML = `
        <p>Tài khoản người dùng ${getList[i].name} hiện đang bị khóa. Lý do: <span class="note">"${getList[i].access.message}"</span>. Mở khóa tài khoản người dùng ${getList[i].name} ?</p>
        <div class="unBlock-list">
          <button type="button" class="btn btn-primary unBlock-yes">Đồng ý</button>
          <button type="button" class="btn unBlock-cancel btn-danger">Từ chối</button>
        </div>
      `
      const btnDelete = document.querySelector('.block-notification .unBlock-yes');
      const btnCancel = document.querySelector('.block-notification .unBlock-cancel');
      btnDelete.addEventListener('click', function() {
        getList[i].access.status ? getList[i].access.status = false : getList[i].access.status = true;
        getList[i].access.message = '';
        const getBlackList = JSON.parse(localStorage.getItem('black-list'));
        for(let j = 0; j < getBlackList.length; j++) {
          if(getList[i].id === getBlackList[j].id) {
            getBlackList.splice((i-1),i);
            localStorage.setItem('black-list', JSON.stringify(getBlackList));
            localStorage.setItem('userList', JSON.stringify(getList));
            return window.location.reload()
          }
        }
      });
      btnCancel.addEventListener('click', function(){
        return document.querySelector('#block-user').classList.remove('active');
      })
   }
 }
}
getUserList(LIST);
import changePassword from "../../../../assets/js/changePassword.js";
import hashPassword from "../../../../assets/js/createToken.js";



const ADMIN = JSON.parse(localStorage.getItem('checkAdmin'));

const getProfile = (id) => {
  if (id.length === 0) return;
  const getListUser = JSON.parse(localStorage.getItem('userList'));
  for (let i = 0; i < getListUser.length; i++) {
    if (getListUser[i].id === id) {
      const elementProfile = document.querySelector('.section__profile');
      if (elementProfile) {
        return elementProfile.innerHTML = `
          <div class="section__profile--name">
              <p class="section__profile--avatar">
               <img src="${getListUser[i].avatar || '../assets/image/user.png'}" alt="${getListUser[i].name}">
              </p>
              <h3>${getListUser[i].name} <span class="section__profile--position">${getListUser[i].position}</span></h3>
             </div>
             <ul class="section__profile--location">
              <li class="location__full"><i class="fa-solid fa-location-dot"></i>${getListUser[i].profile.location}</li>
              <li class="location__city"><i class="fa-solid fa-city"></i>${getListUser[i].profile.city}</li>
              <li class="location__country"><i class="fa-solid fa-globe"></i>${getListUser[i].profile.country}</li>
              <li class="location__code"><i class="fa-solid fa-signs-post"></i>${getListUser[i].profile.code}</li>
             </ul>
             <div class="section__profile--email"><i class="fa-solid fa-envelope"></i>${getListUser[i].email}</div>
            <ul class="section__profile--btn">
             <button type="button" class="btn btn__modal btn-primary" data-target="edit-admin">Chỉnh sửa</button>
             <button type="button" class="btn btn__modal btn-danger" data-target="change-password">Đổi mật khẩu</button>
            </ul>
        `
      }
    }
  }

}

// xử lý việc thay đổi profile
const updateProfile = (id) => {
  if (id.length === 0) return;
  const getListUser = JSON.parse(localStorage.getItem('userList'));
  for (let i = 0; i < getListUser.length; i++) {
    if (getListUser[i].id === id) {
      const formEdit = document.querySelector('#form-edit')
      const str = `
        <div class="form-group mb-4">
          <label class="form-label">Họ và tên</label>
          <input type="text" class="form-control" id="edit-name" value="${getListUser[i].name}">
        </div>
          <div class="form-group mb-4">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" id="edit-location" value="${getListUser[i].profile?.location}">
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Tỉnh / thành phố</label>
          <input type="text" class="form-control" id="edit-city" value="${getListUser[i].profile?.city}">
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Country</label>
          <input type="text" class="form-control" id="edit-country" value="${getListUser[i].profile?.country}">
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Postal Code</label>
          <input type="text" class="form-control" id="edit-code" value="${getListUser[i].profile?.code}">
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-primary" value="Cập nhật">
          </div>
    `
      formEdit.innerHTML = str;
      return formEdit.addEventListener('submit', () => {
        event.preventDefault();
        const nameEdit = document.querySelector('#form-edit #edit-name').value;
        const locationEdit = document.querySelector('#form-edit #edit-location').value;
        const cityEdit = document.querySelector('#form-edit #edit-city').value;
        const countryEdit = document.querySelector('#form-edit #edit-country').value;
        const codeEdit = document.querySelector('#form-edit #edit-code').value;
        const createNewToken = [
          {
            token1: getListUser[i.email],
            token2: nameEdit
          }
        ]
        hashPassword(createNewToken).then(token => {
           getListUser[i].name = nameEdit;
            getListUser[i].profile.location = locationEdit;
            getListUser[i].profile.city = cityEdit;
            getListUser[i].profile.country = countryEdit;
            getListUser[i].profile.code = codeEdit;
            getListUser[i].token = token[0]
          localStorage.setItem('userList', JSON.stringify(getListUser));
          return window.location.reload();
        })
      });
    }
  }
}

getProfile(ADMIN.id);
updateProfile(ADMIN.id);
changePassword("form-changePassword", ADMIN.id)

import hashPassword from "./createToken.js";
import { validatePassWord } from './Validate.js';

// xử lý thay đổi mật khẩu
const handleChangePassWord = (event, form, id) => {
  event.preventDefault();
  const LIST = JSON.parse(localStorage.getItem('userList'));
  const oldPassword = document.querySelector(`#${form} #old-password`).value;
  const newPassword = document.querySelector(`#${form} #new-password`).value;
  const reNewPassword = document.querySelector(`#${form} #reNew-password`).value;

  if (!validatePassWord(oldPassword, 6)) {
    return document.querySelector(`#${form} .password-error`).innerHTML = 'Password không hợp lệ'
  } else {
    document.querySelector(`#${form} .password-error`).innerHTML = '';
  }
  if (!validatePassWord(newPassword, 6)) {
    return document.querySelector(`#${form} .newPassword-error`).innerHTML = 'Password không hợp lệ'
  } else {
    document.querySelector(`#${form} .newPassword-error`).innerHTML = '';
  }
  if (newPassword !== reNewPassword) {
    return document.querySelector(`#${form} .reNewPassword-error`).innerHTML = 'Password không trùng khớp'
  } else {
    document.querySelector(`#${form} .reNewPassword-error`).innerHTML = '';
  }
  if (newPassword === oldPassword) {
    return document.querySelector(`#${form} .reNewPassword-error`).innerHTML = 'Không được trùng với password cũ'
  } else {
    document.querySelector(`#${form} .reNewPassword-error`).innerHTML = '';
  }
  const createNewPassWord = [
    {
      // pass cũ
      token1: oldPassword,
      token2: oldPassword,
    },
    {
      // pass mới
      token1: newPassword,
      token2: newPassword,
    },

  ]
  hashPassword(createNewPassWord).then(password => {
    for(let i = 0; i < LIST.length; i++) {
      if(LIST[i].id === id) {
        if(LIST[i].password === password[0]) {
          LIST[i].password = password[1]
          localStorage.setItem('userList', JSON.stringify(LIST));
          localStorage.removeItem('checkAdmin');
          return window.location.href = './login.html'
        }
        return document.querySelector(`#${form} .password-error`).innerHTML = 'sai mật khẩu cũ';
      }
    }
  })

}
// render form thay đổi mật khẩu
const changePassword = (form, id) => {
  const formchangePassword = document.querySelector(`#${form}`);
  const str = `
    <div class="form-group mb-4">
      <label class="form-label">Mật khẩu cũ</label>
      <input type="password" class="form-control" id="old-password">
      <p class="password-error"></p>
     </div>
    <div class="form-group mb-4">
      <label class="form-label">Mật khẩu mới</label>
      <input type="password" class="form-control" id="new-password">
      <p class="newPassword-error"></p>
     </div>
    <div class="form-group mb-4">
      <label class="form-label">Nhập lại mật khẩu mới</label>
      <input type="password" class="form-control" id="reNew-password">
      <p class="reNewPassword-error"></p>
     </div>
     <div class="form-group">
       <input type="submit" class="btn btn-primary" value="Đổi mật khẩu">
      </div>
 `;
  formchangePassword.innerHTML = str;
  return formchangePassword.addEventListener('submit', () => handleChangePassWord(event, form, id));
}


export default changePassword;
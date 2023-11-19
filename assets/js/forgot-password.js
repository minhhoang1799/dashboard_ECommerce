import {validateEmail,validatePassWord} from './Validate.js';
import hashPassword from './createToken.js';



const renderFormEmail = () => {
 const getElementRenderForm = document.querySelector('.forgot-password .form-forgot');
 getElementRenderForm.innerHTML = `
   <form id="form-checkMail">
     <div class="row">
      <div class="form-group col-md-12">
       <label class="form-label">Email</label>
       <input id="check-email" type="text" class="form-control" placeholder="abc@gmail.com">
       <p class="email-error"></p>
      </div>
      <div class="form-group col-md-12">
       <input type="submit" class="btn btn-primary" value="Xác thức">
      </div>
     </div>
    </form>
 `
 const getFormForgot = document.querySelector('.forgot-password #form-checkMail');
 getFormForgot.addEventListener('submit', function(event) {
   event.preventDefault();
   const getEmailValue = document.querySelector('.forgot-password #form-checkMail #check-email').value;
   if(!validateEmail(getEmailValue)){
    return  document.querySelector('.forgot-password #form-checkMail .email-error').innerHTML = 'Email không hợp lệ'
   } else {
    document.querySelector('.forgot-password #form-checkMail .email-error').innerHTML = '';
   }
   return handleRecoverPassword(getEmailValue,getElementRenderForm);
 })
}


const handleRecoverPassword = (value,element) => {
 const getList = JSON.parse(localStorage.getItem('userList'));
 for(let i = 1; i < getList.length; i++) {
  if(getList[i].email === value) {
   element.innerHTML = `
    <form id="forgot-newPass">
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
       <input type="submit" class="btn btn-primary" value="Xác nhận">
      </div>
    </form>
   `
   return document.querySelector('.forgot-password #forgot-newPass').addEventListener('submit', function(event){
    event.preventDefault();
    const isPassword = document.querySelector('.forgot-password #forgot-newPass #new-password').value;
    const isRePassword = document.querySelector('.forgot-password #forgot-newPass #reNew-password').value;
    if (!validatePassWord(isPassword,6)) {
       return document.querySelector('.forgot-password #forgot-newPass .newPassword-error').innerHTML = 'Password không hợp lệ'
    } else {
      document.querySelector('.forgot-password #forgot-newPass .newPassword-error').innerHTML = '';
    }
    if (isPassword != isRePassword) {
      return document.querySelector('.forgot-password #forgot-newPass .reNewPassword-error').innerHTML = 'Password không hợp lệ'
    } else {
      document.querySelector('.forgot-password #forgot-newPass .reNewPassword-error').innerHTML = '';
    }
    const createNewToken = [
      {
        token1: isPassword,
        token2: isPassword
      }
    ]
    hashPassword(createNewToken).then(token => {
     const newPassWord = getList;
     newPassWord[i].password = token[0];
     localStorage.setItem('userList',JSON.stringify(newPassWord))
     return window.location.href = './login.html'
    })
   })
  }
 }
 const getNotiPassword = document.querySelector('#password-notification');
 return getNotiPassword.classList.add('active');
}


renderFormEmail()
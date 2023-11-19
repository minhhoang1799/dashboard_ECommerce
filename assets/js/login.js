import {validateEmail,validatePassWord} from './Validate.js';
import hashPassword from './createToken.js';

const formElement = document.querySelector('#form-login');

const handleSubmitForm = (event) => {
 event.preventDefault();
 // get all user value
 let userEmail = document.querySelector('#form-login #user-email').value;
 let userPassWord = document.querySelector('#form-login #user-password').value;


 // validate
 if(!validateEmail(userEmail)){
  return  document.querySelector('#form-login .email-error').innerHTML = 'Email không hợp lệ'
 } else {
  document.querySelector('#form-login .email-error').innerHTML = '';
 }
 if (!validatePassWord(userPassWord,6)) {
   return document.querySelector('#form-login .password-error').innerHTML = 'Password không hợp lệ'
 } else {
   document.querySelector('#form-login .password-error').innerHTML = '';
 }
 const getUserList = JSON.parse(localStorage.getItem('userList'));
 const createToken = [{
  token1: userPassWord,
  token2: userPassWord
 }]
 hashPassword(createToken).then(token => {
  // check user
   for(let i = 1; i < getUserList.length; i++) {
    const getNotification = document.querySelector('#admin-notification .message-notification');
    const modalNotification = document.querySelector('.main__modal#admin-notification');
    if(getUserList[i].email === userEmail && getUserList[i].password === token[0]) {
      if(!getUserList[i].access.status) {
        modalNotification.classList.add('active');
        getNotification.innerHTML = `
          <p>Tài khoản ${getUserList[i].email} đang bị khóa. Lý do <span class="note">${getUserList[i].access.message}</span>. Vui lòng liên hệ tới admin</p>
        `
        return;
      }
      const checkLogin = {
        id: getUserList[i].id,
        token: getUserList[i].token,
      }
      const statusList = getUserList;
      statusList[i].status = true;
      localStorage.setItem('userList', JSON.stringify(statusList));
      localStorage.setItem('userID', JSON.stringify(checkLogin));
      return window.location.href = './'
    }
    const getNotiPassword = document.querySelector('#password-notification');
    return getNotiPassword.classList.add('active');
   }
 })
}


const checkUserID = () => {
  const isCheck = JSON.parse(localStorage.getItem('userID')); 
  if(isCheck) return window.location.href = './';
  return formElement.addEventListener('submit', () => handleSubmitForm(event));
}

checkUserID();
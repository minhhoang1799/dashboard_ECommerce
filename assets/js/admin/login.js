import {validateEmail,validatePassWord} from '../Validate.js';
import hashPassword from '../createToken.js';

const adminElementForm = document.querySelector('#admin-login');

const handleSubmitForm = (event) => {
 event.preventDefault();
 let adminEmail = document.querySelector('#admin-login #admin-email').value;
 let adminPassWord = document.querySelector('#admin-login #admin-password').value;

 //validate admin form login
  // validate
 if(!validateEmail(adminEmail)){
  return  document.querySelector('#admin-login .email-error').innerHTML = 'Email không hợp lệ'
 } else {
  document.querySelector('#admin-login .email-error').innerHTML = '';
 }
 if (!validatePassWord(adminPassWord,6)) {
   return document.querySelector('#admin-login .password-error').innerHTML = 'Password không hợp lệ'
 } else {
   document.querySelector('#admin-login .email-error').innerHTML = '';
 }
 const getUserList = JSON.parse(localStorage.getItem('userList'));
 const createAdminToken = [
  {token1: adminPassWord, token2: adminPassWord}
 ]
 hashPassword(createAdminToken).then(token => {
  // check user
   for(let i = 0; i < getUserList.length; i++) {
    if(getUserList[i].password === token[0] && getUserList[i].email === adminEmail && getUserList[i].position === 'admin') {
     localStorage.setItem('checkAdmin', JSON.stringify({id:getUserList[i].id,token:getUserList[i].token}));
     return window.location.href = './'
    }
    return console.log('sai tài khoản hoặc mật khẩu hoặc không có quyền truy cập')
   }
 })
}



const checkAdmin = () => {
  const isCheck = JSON.parse(localStorage.getItem('checkAdmin')); 
  if(isCheck) return window.location.href = './';
  return adminElementForm.addEventListener('submit', () => handleSubmitForm(event));
}

checkAdmin();
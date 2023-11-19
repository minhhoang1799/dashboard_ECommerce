import {validateText,validateEmail,validatePassWord} from './Validate.js';
import hashPassword from './createToken.js';
// handle event form when user submit form register
const formElement = document.querySelector('#form-register');




const handleSubmitForm = (event) => {
 event.preventDefault();
 // get all user value
 let userName = document.querySelector('#user-name').value;
 let userLocation = document.querySelector('#user-location').value;
 let userCity = document.querySelector('#user-city').value;
 let userCode = document.querySelector('#user-code').value;
 let userCountry = document.querySelector('#user-country').value;
 let userEmail = document.querySelector('#user-email').value;
 let userPassWord = document.querySelector('#user-password').value;
 let userRePassword = document.querySelector('#user-rePassword').value;

 // validate
 if(!validateText(userName,4)) {
  return document.querySelector('#form-register .name-error').innerHTML = 'Tên không hợp lệ'
 } else {
  document.querySelector('#form-register .name-error').innerHTML = '';
 }
 if( !validateEmail(userEmail)){
  return  document.querySelector('#form-register .email-error').innerHTML = 'Email không hợp lệ'
 } else {
  document.querySelector('#form-register .email-error').innerHTML = '';
 }
 if (!validatePassWord(userPassWord,6)) {
   return document.querySelector('#form-register .password-error').innerHTML = 'Password không hợp lệ'
 } else {
   document.querySelector('#form-register .email-error').innerHTML = '';
 }
 if (userPassWord !== userRePassword ) {
  return document.querySelector('#form-register .rePassword-error').innerHTML = 'Password không trùng khớp'
 } else {
   document.querySelector('#form-register .rePassword-error').innerHTML = '';
 }
 const getUserList = JSON.parse(localStorage.getItem('userList'));
 const createToken = [
  {
    token1: userEmail,
    token2: new Date().getDay()
  },
  {
    token1: userEmail,
    token2: userName
  },
  {
    token1: userPassWord,
    token2: userPassWord
  }
 ]
 hashPassword(createToken).then(hashedPassword => {
  const userID = {
   id: `${hashedPassword[0]}`,
   name: userName,
   email: userEmail,
   password: `${hashedPassword[2]}`,
   token: hashedPassword[1],
   position: 'User',
   cart: [],
   profile: {
    location: userLocation,
    city: userCity,
    code: userCode,
    country: userCountry
   },
   avatar: '',
   access: {
    status: true,
    message: ''
   },
   status: false
  }
  if(getUserList) {
   const newUserList = getUserList;
   newUserList.push(userID);
   localStorage.setItem('userList', JSON.stringify(newUserList));
   return window.location.href = './login.html'
  }
  localStorage.setItem('userList', JSON.stringify([userID]));
  return window.location.href = './login.html'
 });
}



const checkUserID = () => {
  const isCheck = JSON.parse(localStorage.getItem('userID'));
  if(isCheck) return window.location.href = './';
  return formElement.addEventListener('submit', () => handleSubmitForm(event));
}

checkUserID();




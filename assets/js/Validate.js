const regexCode = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
const validateText = (value,length) => {
 let hasCheck = true;
 if(regexCode.test(value)) return hasCheck = false;
 if(value.length < length) return hasCheck = false;
 return hasCheck;
}
const validateEmail = (value) => {
 let hasCheck = true;
 const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const regex = /[!#$%^&*()+{}\[\]:;<>,?~\\/]/;
 if(regex.test(value)) return hasCheck = false;
 if(!EmailRegex.test(value)) return hasCheck = false;
 return hasCheck;
}
const validatePassWord = (value,length) => {
 let hasCheck = true;
 if(regexCode.test(value)) return hasCheck = false;
 if(value.length < length) return hasCheck = false;
 return hasCheck;
}


export {validateText,validateEmail,validatePassWord} 
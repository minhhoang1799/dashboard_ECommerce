// check user
const checkUser = () => {
  const user = JSON.parse(localStorage.getItem('userID'));
  const getBlackList = JSON.parse(localStorage.getItem('black-list'));
  if(getBlackList || getBlackList.length < 0) {
     if (user) {
      for (let i = 0; i < getBlackList.length; i++) {
        if (user?.id === getBlackList[i].id) {
          localStorage.removeItem('userID');
          return window.location.href = './'
        }
      }
    }
    return user;
  }
  return user;
}


// render user tại header
const renderHeaderTop = (user) => {
  const elementHeaderUser = document.querySelector('.header__top');
  const getUserList = JSON.parse(localStorage.getItem('userList'));
  if (user) {
    for (let i = 0; i < getUserList.length; i++) {
      if (user.id === getUserList[i].id) {
        const avatar = getUserList[i].avatar ? ` <img src="${getUserList[i].avatar}" alt="${getUserList[i].name}">` : ` <img src="./assets/image/user.png" alt="${getUserList[i].name}">`
        return elementHeaderUser.innerHTML = `
          <div class="header__user">
            <p class="header__user--avatar">
              ${avatar}
            </p>
            <div class="btn-group">
            <h5 class="header__user--name dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${getUserList[i].name}</h5>
            <ul class="header__user--dropdown dropdown-menu">
              <li><a href="./user.html?is-user=${getUserList[i].id}"><i class="fa-solid fa-user"></i>Tài khoản của tôi</a></li>
              <li><a href="./gio-hang.html?cart=${getUserList[i].id}"><i class="fa-solid fa-cart-shopping"></i>giỏ hàng</a></li>
              <li id="logout-user"><span><i class="fa-solid fa-right-from-bracket"></i>Đăng xuất</span></li>
            </ul>
            </div>
          </div>
      `
      }
    }
  }
  return elementHeaderUser.innerHTML = `
   <ul class="header__top--nav">
       <li>
        <a href="./login.html"><i class="fa-solid fa-right-to-bracket"></i>Đăng nhập</a>
       </li>
       <li>
        <a href="./register.html"><i class="fa-solid fa-list"></i>Đăng ký</a>
       </li>
      </ul>
 `
}
const logoutUser = () => {
  const elementLogout = document.querySelector('#logout-user');
  if (!elementLogout) return;
  elementLogout.addEventListener('click', function () {
    localStorage.removeItem('userID');
    return window.location.href = './'
  })
}
renderHeaderTop(checkUser());
logoutUser();
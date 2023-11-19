// localStorage.setItem('checkAdmin', JSON.stringify([{status: false}]));




// render admin profile
const getAdmin =  (id) => {
  const admin = JSON.parse(localStorage.getItem('userList'));
  for(let i = 0; i < localStorage.length; i++) {
    if(admin[i]?.id === id) {
       const renderProfile = document.querySelector('.header__profile');
      let proflileAdmin = `
          <div class="header__profile--name">Hi, ${admin[i].name}</div>
          <div class="header__profile--mandates">
            <ul>
            <li>
              <div id="logout"><i class="fa-solid fa-right-from-bracket"></i>Log out</div>
            </li>
            </ul>
          </div>
      `;
      return renderProfile.innerHTML = proflileAdmin
    }
  }
}

const logOutAdmin = () => {
  const btn = document.querySelector(`#logout`);
  btn.addEventListener('click', () => {
    localStorage.removeItem('checkAdmin');
    return window.location.href = './login.html'
  })
}



// check admin
const checkAdmin = () => {
  const isCheck = JSON.parse(localStorage.getItem('checkAdmin')); 
  if(!isCheck) return window.location.href = './login.html';
  getAdmin(isCheck.id);
  logOutAdmin();
}

checkAdmin();
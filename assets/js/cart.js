const user = JSON.parse(localStorage.getItem('userID'));
const addToCart = () => {
  const btnAddToCart = document.querySelectorAll('#addToCart');
  const ProductList = JSON.parse(localStorage.getItem('Product'));
  btnAddToCart.forEach(function (btn) {
    btn.addEventListener('click', () => {
      const idProduct = btn.dataset.product;
      for (let i = 0; i < ProductList.length; i++) {
        if (ProductList[i].id === idProduct) {
          // const checkSize = size ? size : ProductList[i].size;
          ProductList[i].quantity = 1
          // ProductList[i].size = checkSize
          user.cart.push(ProductList[i])
          localStorage.setItem('userID', JSON.stringify(user))
          return window.location.href = `./gio-hang.html?cart=${user.id}`
        }
      }
    })
  })
}

const showPageCart = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get('cart');
  const getElementCartList = document.querySelector('#cart .list-cart table tbody');
  if (paramValue !== user.id || !getElementCartList) return;
  const cartList = user.cart;
  const productList = JSON.parse(localStorage.getItem('Product'));
  let rangeCount = 0;
  let str = ``;
  let total = 0;
  for (let i = 0; i < cartList.length; i++) {
    for(let k = 0; k < productList.length; k++) {
      if(productList[k].id === cartList[i].id) {
        rangeCount = Number(productList[k].quantity)
      }
    }
    str += `
    <tr>
      <td><img src="${cartList[i].image}" alt="${cartList[i].name}"></td>
      <td>${cartList[i].name}</td>
      <td>
        <div class="btn-list">
          <button type="button" id="count-down" data-btn="${cartList[i].id}" class="btn btn-outline-primary ${cartList[i].quantity <= 1 ? 'disable' : ''}">-</button>
          <span id="count-${cartList[i].id}">${cartList[i].quantity}</span>
          <button type="button" id="count-up" data-btn="${cartList[i].id}" class="btn btn-outline-primary ${cartList[i].quantity >= rangeCount ? 'disable' : ''} ">+</button>
        </div>
      </td>
      <td>
         <div class="input-group">
            <form class="cart-size" id="checkSize-${cartList[i].id}">
              <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                ${cartList[i].size.map(item => (`<option value="${item}">${item}</option>`))}
              </select>
            </form>
          </div>
      </td>
      <td class="text-center"><p id="cart-delete" data-btn="${cartList[i].id}"><i class="fa-solid fa-trash"></i></p></td>
      <td id="price-${cartList[i].id}" data-btn="${cartList[i].id}">${(cartList[i].quantity * cartList[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</td>
     </tr>
    `
    total += (cartList[i].price * cartList[i].quantity)
  }
  return getElementCartList.innerHTML = `${str}
     <tr>
      <td class="text-end" colspan="99">
        <p class="cart-total"> Tổng cộng: <span class="note">${total.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span> VND</p>
        <p class="cart-message">Vận chuyển, thuế và giảm giá sẽ được tính khi thanh toán.</p>
        <button type="button" class="btn btn-outline-success" onclick="checkOutCart()">Thanh toán</button>
      </td>
    </tr>
  `;
}


const handleCountUp = (id, element,price,total) => {
  if (!id) return;
  const cartList = user.cart;
  const productList = JSON.parse(localStorage.getItem('Product'));
  let rangeCount = 0
  for (let k = 0; k < productList.length; k++) {
    if (productList[k].id === id) {
      rangeCount = productList[k].quantity;
    }
  }
  let totalPrice = 0;
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      cartList[i].quantity += 1;
      element.innerHTML = cartList[i].quantity;
      price.innerHTML = `${(cartList[i].quantity * cartList[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`;
      const parentElement = element?.parentNode;
      parentElement.querySelector('#count-down').classList.remove('disable')
      if (cartList[i].quantity == rangeCount) {
        parentElement.querySelector('#count-up').classList.add('disable')
      } 
    }
  }
  for(let j = 0; j < cartList.length; j++) {
     totalPrice += (cartList[j].price * cartList[j].quantity)
  }
  total.innerHTML = `${totalPrice.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  return localStorage.setItem('userID', JSON.stringify(user))
}
const handleCountDown = (id, element,price,total) => {
  if (!id) return;
  const cartList = user.cart;
  let totalPrice = 0;
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      cartList[i].quantity -= 1
      element.innerHTML = cartList[i].quantity;
      price.innerHTML = `${(cartList[i].quantity * cartList[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`
      const parentElement = element.parentNode;
      parentElement.querySelector('#count-up').classList.remove('disable')
      if (cartList[i].quantity <= 1) {
        parentElement.querySelector('#count-down').classList.add('disable')
      }
    }
  }
  for(let j = 0; j < cartList.length; j++) {
     totalPrice += (cartList[j].price * cartList[j].quantity)
  }
  total.innerHTML = `${totalPrice.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  return localStorage.setItem('userID', JSON.stringify(user))
}

const handleDelete = (id) => {
  const cartList = user.cart;
  let totalPrice = 0;
  for(let i = 0; i < cartList.length; i++) {
    if(cartList[i].id === id) {
      cartList.splice(i,1);
    }
  }
  localStorage.setItem('userID', JSON.stringify(user));
  return window.location.reload()
}
const handleButtonCart = () => {
  const countUp = document.querySelectorAll('#cart .list-cart #count-up');
  const countDown = document.querySelectorAll('#cart .list-cart #count-down');
  const deleteItem = document.querySelectorAll('#cart .list-cart #cart-delete');
  countUp.forEach(btn => {
    btn.addEventListener('click', () => {
      const getCountElement = document.querySelector(`#cart .list-cart #count-${btn.dataset.btn}`);
      const getPriceElement = document.querySelector(`#cart .list-cart #price-${btn.dataset.btn}`);
      const getTotalElement = document.querySelector(`#cart .list-cart .cart-total span`);
      handleCountUp(btn.dataset.btn, getCountElement,getPriceElement,getTotalElement)
    })
  });
  countDown.forEach(btn => {
    btn.addEventListener('click', () => {
      const getCountElement = document.querySelector(`#cart .list-cart #count-${btn.dataset.btn}`);
      const getPriceElement = document.querySelector(`#cart .list-cart #price-${btn.dataset.btn}`);
      const getTotalElement = document.querySelector(`#cart .list-cart .cart-total span`);
      handleCountDown(btn.dataset.btn, getCountElement,getPriceElement,getTotalElement)
    })
  });
  deleteItem.forEach(btn => {
    btn.addEventListener('click', () => {
      handleDelete(btn.dataset.btn)
    })
  });
}


const checkOutCart = () => {
  const cartList = user.cart;
  const payment = JSON.parse(JSON.stringify(cartList));
  for(let i = 0; i < payment.length; i++) {
    const checkForm = document.querySelector(`#cart .list-cart #checkSize-${payment[i].id}`);
    const checkSelect = document.querySelector(`#cart .list-cart #checkSize-${payment[i].id} #inputGroupSelect04`);
    checkForm.addEventListener('change', function(event) {
      event.preventDefault();
    });
    payment[i].size = checkSelect.value;
  }
  user.payment = payment
  console.log(user)
  localStorage.setItem('userID', JSON.stringify(user));
  return window.location.href = `./thanh-toan.html?user=${user.id}`
}

const checkUser = () => {
  if (!user) return window.location.href = "./";
  addToCart();
  showPageCart();
  handleButtonCart();
}



checkUser(user);
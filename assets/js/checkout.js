const user = JSON.parse(localStorage.getItem('userID'));
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('user');


const showPage = () => {
  const getElementCartList = document.querySelector('#cart .list-cart table tbody');
  if (paramValue !== user.id || !getElementCartList) return;
  const cartList = user.payment;
  let str = ``;
  let total = 0;
  for (let i = 0; i < cartList.length; i++) {
    str += `
    <tr>
      <td><img src="${cartList[i].image}" alt="${cartList[i].name}"></td>
      <td>${cartList[i].name}</td>
      <td>
       ${cartList[i].quantity}
      </td>
      <td>
        ${cartList[i].size}
      </td>
      <td id="price-${cartList[i].id}" data-btn="${cartList[i].id}">${(cartList[i].quantity * cartList[i].price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</td>
     </tr>
    `
    total += (cartList[i].price * cartList[i].quantity)
  }
  return getElementCartList.innerHTML = `${str}
     <tr>
      <td class="text-end" colspan="99">
        <p class="cart-total"> Tổng cộng: <span class="note">${total.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span> VND</p>
        <button type="button" class="btn btn-outline-success" onclick="payment()">Mua hàng</button>
      </td>
    </tr>
  `;
}


const payment = () => {
}
const checkUser = () => {
  if (!user) return window.location.href = "./";
  showPage();
}



checkUser(user);
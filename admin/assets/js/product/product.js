
const getData = JSON.parse(localStorage.getItem('productList'))

// render danh sách sản phẩm
const getProductList = (list) => {
 const getTable = document.querySelector('#product .product__bottom--list tbody');
 if (!list || list.length === 0) return getTable.innerHTML = `<tr><td class="table-center" colspan="99">Không có sản phẩm trong cửa hàng</td></tr`;
 list.map(item => (
  getTable.innerHTML = `
    <tr>
     <td>01</td>
     <td>Product01</td>
     <td><span class="image"><img src="../assets/image/product.jpg" alt="Product01"></span></td>
     <td>Điện thoại</td>
     <td>15.000.000 VND</td>
     <td>10.000.000 VND</td>
     <td>100</td>
     <td>In Stock</td>
     <td>
      <button>xóa</button>
      <button>sửa</button>
     </td>
    </tr>
  `
 ))
}


const addProduct = () => {
 // add 1 form thêm sản phẩm
 
}

getProductList([])




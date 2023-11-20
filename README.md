# Lưu ý khi chạy source

### lần đâu tiên chạy 

tạo biến userList để tạo Database Localstorage;

**Note:  Để đăng nhập vào admin "./admin/" cần có user list default**



localStorage.setItem('userList', JSON.stringify([{"id":"607384d4798863425d7cabf495c4f57e8e60b489892d1db6ad6ad9032fc60ba2","name":"admin","email":"admin@gmail.com","token":"72a0878eb3f4df163357f1f604cddb15cec8288c3bb87544ac4d8458597c5858","password":"c23e1b304bac9ec4855c1cf86009e113efed4180912e02fcb50ccabf9104df31","position":"admin","profile":{"location":"Hưng Thịnh, Trảng Bom, Đồng Nai, Việt Nam","city":"Đồng Nai","code":"600000","country":"Việt Nam"},"avatar":"","status":false}]));

### danh mục 
localStorage.setItem('Category', JSON.stringify([{"id":"28294fce8c7842fa03c8375a9b04f855ff9821aa297c1311b92171f556a37418","name":"Điện thoại","CreatedAt":"21:10:2023"},{"id":"0ae9871583981930ba58ea9389a0789319bb594d2216ebe64262c2dab824def0","name":"Laptop","CreatedAt":"21:10:2023"}]));
### danh mục con
localStorage.setItem('Sub-Category', JSON.stringify([{"idCate":"28294fce8c7842fa03c8375a9b04f855ff9821aa297c1311b92171f556a37418","id":"Subcategory1","name":"Iphone","CreatedAt":"21:10:2023"},{"idCate":"28294fce8c7842fa03c8375a9b04f855ff9821aa297c1311b92171f556a37418","id":"Subcategory2","name":"Samsung","CreatedAt":"21:10:2023"},{"idCate":"0ae9871583981930ba58ea9389a0789319bb594d2216ebe64262c2dab824def0","id":"Subcategory3","name":"Macbook","CreatedAt":"21:10:2023"},{"idCate":"0ae9871583981930ba58ea9389a0789319bb594d2216ebe64262c2dab824def0","id":"Subcategory4","name":"HP","CreatedAt":"21:10:2023"},{"idCate":"0ae9871583981930ba58ea9389a0789319bb594d2216ebe64262c2dab824def0","id":"Subcategory5","name":"Dell","CreatedAt":"21:10:2023"},{"idCate":"0ae9871583981930ba58ea9389a0789319bb594d2216ebe64262c2dab824def0","id":"Subcategory6","name":"Lenovo","CreatedAt":"21:10:2023"}]));

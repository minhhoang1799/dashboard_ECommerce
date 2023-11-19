const elementActive = document.querySelectorAll('.admin__item li');

elementActive.forEach(function(item) {
 item.addEventListener('click', function(){
  this.classList.toggle('active')
 })
})









const btnModal = document.querySelectorAll('[data-target]');
const Modal = document.querySelectorAll('.main__modal');

btnModal.forEach(function(btn){
 const getAttrBtn = btn.getAttribute('data-target');
 btn.addEventListener('click', function(){
    document.querySelector(`#${getAttrBtn}`).classList.add('active')
 })
})
Modal.forEach(function(modal){
  modal.querySelector('.btn__close').addEventListener('click', function(){
   modal.classList.remove('active')
  })
})

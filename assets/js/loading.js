// loading 
const isLoading = document.querySelector('#loading');
function loading() {
 setTimeout(() => {
  isLoading.classList.remove('active')
 }, 1000);
}
loading();
const color = `
 --main1: #2A3650;
 --main2: #374462;
 --main3: #F4F7F9;
 --text1: #fff;
`;
// localStorage.setItem('theme-dark', JSON.stringify(false));

const handleChangeColor = () => {
 const theme = JSON.parse(localStorage.getItem('theme-dark'))
 if(!theme) {
  localStorage.setItem('theme-dark', JSON.stringify(true));
  return document.querySelector('#admin style').innerHTML = `:root {${color}}`;
 }
 localStorage.setItem('theme-dark', JSON.stringify(false));
 return document.querySelector('#admin style').innerHTML = ``;
}

const dark = document.querySelector('#dark');
dark.addEventListener('click', () => handleChangeColor());

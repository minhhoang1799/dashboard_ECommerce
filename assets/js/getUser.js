const getUser = () => {
 const user = JSON.stringify(localStorage.getItem('user'))
 return user
}

export default getUser;
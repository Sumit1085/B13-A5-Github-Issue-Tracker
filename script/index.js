const signIn = document.getElementById('signIn');
signIn.addEventListener('click', function(){
    const userName = document.getElementById('username');
    const userNameValue = userName.value;
    // console.log(userNameValue)
    const password =  document.getElementById('password');
    const passwordValue = password.value

    if(userNameValue === 'admin' && passwordValue === 'admin123'){
      window.location.assign("/home.html");
    }else{
      alert('দেখে দেখে টাইপ করো ভাই 🙃')
    }
    return;
})


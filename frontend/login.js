const loginForm = document.getElementsByClassName('login-form')[0];
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json()
    try{
          if(data.success){
        message.textContent = 'login is done '
        message.color.style = 'green'
        window.location.href = '/frontend/dashboard.html'
    }
    else{
        message.textContent = 'login is failed ' 
        message.color.style = 'orange'
    }
    }
    catch(err){
        message.textContent = 'internal server err'
    }
});  
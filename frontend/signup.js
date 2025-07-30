const { json } = require("express");

const signupform = document.getElementsByClassName('signupForm').addEventlistner('submit',async (e)=>{
    e.preventDefauld();

    const username = document.getElementById('userName').value 
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
try{
  
    const res = await fetch('http://localhost:5005/api/auth/signup',{
      method : 'POST',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({username,email,password})


    })
    const data = await res.json()
    
       if(data.success){
      localStorage.setItem('token',data.token)
      message.textContent = 'signup successfull'
      message.style.color = 'green'
      window.location.href = '/frontend/dashboard.html'
    }
    else{
      message.textContent = 'signup is failed'
      message.style.color = 'red'
    }
    
}
    
    catch(err){
      message.textContent = 'internla server error'
      message.style.color = 'yellow'
    }
})


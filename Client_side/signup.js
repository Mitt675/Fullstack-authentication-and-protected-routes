

const signupform = document.getElementById('signupForm').addEventListener('submit',async (e)=>{
    e.preventDefault

    const username = document.getElementById('userName').value 
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmpassword = document.getElementById('confirmPassword').value
    const message = document.getElementById('message')

try{
  
    const res = await fetch('/api/auth/signup',{
      method : 'POST',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({username,email,password})


    })
    if(!res.ok){
      const erroMsg = await res.text()
      console.error('server responded with erro :' , erroMsg)
    }
    const data = await res.json()

    console.log('Raw response:', res);

    console.log('Parsed JSON:', data);
    
       if(data.success){
      localStorage.setItem('token',data.token)
      message.textContent = 'signup successfull'
      message.style.color = 'green'
      window.location.href = '/Client_side/dashboard.html'
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


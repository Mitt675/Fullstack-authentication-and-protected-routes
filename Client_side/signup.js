

const signupform = document.getElementById('signupForm').addEventListener('submit',async (e)=>{
    e.preventDefault

    const username = document.getElementById('username').value 
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmpassword = document.getElementById('confirmPassword').value
    

try{
  
    const res = await fetch('/api/auth/signup',{
      
      method : 'POST',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({username,email,password})
    })
   const data = await res.json();

   if(data.success){
    console.log('signup is done ')
    window.location.href = '/dashboard.html'
   }
   else{
    console.error('singup is failed :' , data)
   }
}
    catch(err){
      console.error('internal server erro :' , err)
    }
})


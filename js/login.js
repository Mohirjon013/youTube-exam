async function loginUser(e) {
    e.preventDefault()
    
    const data = {
        "name": usernameInput.value,
        "password": passwordInput.value
    }
    
    
    
    
    const res = await axios.post("https://n105.softwareengineer.uz/api/v1/auth/login", data)
    console.log(res);
    
    if(res.status === 201){
        let accesToken = window.localStorage.setItem("accesToken", res.data.accessToken)
        
        window.location = "index.html"
    }
}


loginForm.onsubmit = loginUser
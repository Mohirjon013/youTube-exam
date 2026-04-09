async function registerUser(e) {
    e.preventDefault()
    
    const data = new FormData()

    data.append("name",usernameInput.value)
    data.append("password",passwordInput.value)
    data.append("file",uploadInput.files[0])

    
    const res = await axios.post("https://n105.softwareengineer.uz/api/v1/auth/register", data, {
        headers:{
            "Type-content":"multipart/form-data"
        }
    })
    // console.log(res);
    
    if(res.status === 201){
        window.location = "login.html"
    }
}


registerForm.onsubmit = registerUser
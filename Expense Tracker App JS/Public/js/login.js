document.getElementById('loginForm').addEventListener("submit", async(e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        const response = await axios.post("/user/login", {
            email: email,
            password: password
        })

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        if(response.data.redirectUrl) {
            window.location.href = response.data.redirectUrl;
        } 

    } catch (err) {

        if(err.response.status === 404) {
            errorMessage.textContent = "Error: Email doesn't exist";
        } else {
            errorMessage.textContent = "Incorrect Password";
        } 
    }
});
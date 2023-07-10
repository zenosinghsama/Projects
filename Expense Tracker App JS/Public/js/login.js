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

    } catch (err) {
        const { field } = err.response.data
        if(err.response.status === 500 && field === "email") {
            errorMessage.textContent = "Error: Email doesn't exist";
        } else {
            errorMessage.textContent = "Incorrect Password";
        } 
    }
});
document.getElementById('loginForm').addEventListener("submit", async(e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        console.log('Sending login request...');
        const response = await axios.post("/user/login", {
            email: email,
            password: password
        })

        // Store the Token
        const token = response.data.token;
        if(token) {
            console.log('Storing token:', token);
            localStorage.setItem('token', token);
            window.location.href = '/admin/add-expense';
        }

    } catch (err) {
        console.error('Login error:', err);
        if(err.response.status === 404) {
            errorMessage.textContent = "Error: Email doesn't exist";
        } else {
            errorMessage.textContent = "Incorrect Password";
        } 
    }
});
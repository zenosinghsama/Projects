document.getElementById('signupForm').addEventListener("submit", async(e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    try {
        const response = await axios.post("/user/signup", {
            username: username,
            email: email,
            password: password
        })
        
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

    } catch(err) {
        console.log(err);
        errorMessage.textContent = "Network Error: Unable to submit the form. Please try again later.";
    }
})
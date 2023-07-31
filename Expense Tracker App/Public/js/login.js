document.getElementById('login-form').addEventListener("submit", async(e) => {
  e.preventDefault();

  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  try {
    console.log('Sending Login Request');
    const response = await axios.post("/user/login", {
      email: email,
      password: password
    })

    // Store the Token
    const token = response.data.token;
    const id = response.data.id;
    if(token) {
      console.log('Storing Token', token);
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      window.location.href = "/main.html";
    }
    alert ("User Logged In")
  } catch (err) {
    console.log('Login error', err);
    if(err.response.status === 404)  {
      errorMessage.textContent = "Error: Email doesn't exists";
    } else {
      errorMessage.textContent = "Incorrect Password";
    }
  }
});

function forgotPass() {
  window.location.href = "/forgotPass.html";
}

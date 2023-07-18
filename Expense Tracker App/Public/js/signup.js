document.getElementById("signup-form").addEventListener("submit", async(e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value
  const email = document.getElementById("emailInput").value
  const password = document.getElementById("passwordInput").value

  if(name === "" || email === "" || password === "" ) {
    alert("Please Fill out the fields");
    return;
  }

  try {
    const response = await axios.post("/user/signup", {
      name: name,
      email: email,
      password: password
    })

    alert("User signed Up");
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';

  } catch(err) {
    console.log(err);
    if(err.response.status === 500) {
      errorMessage.textContent = "Error: Email already exists";
    } else {
      errorMessage.textContent = "Network Error: Unable to submit the form";
    }
  }
});

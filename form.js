function HandleSubmit() {
    localStorage.setItem('name', document.getElementById('name').value)
    localStorage.setItem('email', document.getElementById('email').value)
    localStorage.setItem('phonenumber', document.getElementById('phonenumber').value)
    localStorage.setItem('date', document.getElementById('date').value)
    localStorage.setItem('time', document.getElementById('time').value)
}
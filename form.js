function handleSubmit(e) {
    // e.preventDefault()
    // localStorage.setItem('name', document.getElementById('name').value)
    // localStorage.setItem('email', document.getElementById('email').value)
    // localStorage.setItem('phonenumber', document.getElementById('phonenumber').value)
    // localStorage.setItem('date', document.getElementById('date').value)
    // localStorage.setItem('time', document.getElementById('time').value)
    // console.log("called")
    var array = [];
    var existing = localStorage.getItem('details')
    console.log(existing);
    if(existing === null) {
        var obj = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phonenumber: document.getElementById('phonenumber').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        array.push(obj);

        let arr = JSON.stringify(array);
        localStorage.setItem('details', arr);
    } else {
        let parsed = JSON.parse(existing);
        var obj = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phonenumber: document.getElementById('phonenumber').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        parsed.push(obj);

        let arr = JSON.stringify(parsed);
        localStorage.setItem('details', arr);
    }
}

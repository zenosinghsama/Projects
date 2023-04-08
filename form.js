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

        let NewARR = JSON.stringify(parsed);
        localStorage.setItem('details', NewARR);
    }
}



let display = localStorage.getItem('details')
display = JSON.parse(display)

var getdisplay = document.getElementById('displayui')

let list = document.createElement('ul')
for(let i = 0; i < display.length; i++) {
    let LI = document.createElement('li')
    LI.innerHTML = `${display[i].name} ${display[i].email} ${display[i].phonenumber} ${display[i].button}`
    let button = document.createElement('button')
    button.innerHTML = "Delete";
        button.addEventListener("click", function() {
            var index = i;
            display.splice(index, 1);
       
            let arr = JSON.stringify(display);
            localStorage.setItem('details', arr);
       
            list.removeChild(LI);
       });
       LI.appendChild(button);
    list.appendChild(LI);
}
getdisplay.appendChild(list);

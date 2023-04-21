var flag = 0;
var filteredObj;
function handleSubmit(e) {
    // e.preventDefault()
    // localStorage.setItem('name', document.getElementById('name').value)
    // localStorage.setItem('email', document.getElementById('email').value)
    // localStorage.setItem('phonenumber', document.getElementById('phonenumber').value)
    // localStorage.setItem('date', document.getElementById('date').value)
    // localStorage.setItem('time', document.getElementById('time').value)
    // console.log("called")
    
    if(flag === 0) {
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
    } else if (flag === 1) {
        for(var i=0;i<display.length;i++){
            if(display[i].name===filteredObj.name){
                display[i].name=document.getElementById('name').value
                display[i].email=document.getElementById('email').value
                display[i].phonenumber=document.getElementById('phonenumber').value
                display[i].date=document.getElementById('date').value
                display[i].time=document.getElementById('time').value
            }
        }
        let NewARR = JSON.stringify(display);
        localStorage.setItem('details', NewARR);
        flag=0
    }

    window.location.reload()
    
}



let display = localStorage.getItem('details')
display = JSON.parse(display)

var getdisplay = document.getElementById('displayui')

let list = document.createElement('ul')
for(let i = 0; i < display.length; i++) {
    let LI = document.createElement('li')
    LI.innerHTML = `${display[i].name}-${display[i].email}-${display[i].phonenumber}-${display[i].date}-${display[i].time}`
    let button = document.createElement('button')
    button.innerHTML = "Delete";
        button.addEventListener("click", function() {
            var index = i;
            display.splice(index, 1);
       
            let arr = JSON.stringify(display);
            localStorage.setItem('details', arr);
       
            list.removeChild(LI);
       });
       let editBtn = document.createElement('button')
       editBtn.innerHTML = 'Edit';
        editBtn.addEventListener('click', function (e){
            // console.log(e.target.previousSibling.textContent)
            let name=e.target.previousSibling.textContent.split("-")[0]
            console.log(name)

            filteredObj=display.filter((ele,idx)=>{
                return ele.name===name
            })

            console.log(filteredObj)
            filteredObj=filteredObj[0]
            document.getElementById('name').value=filteredObj.name
            document.getElementById('email').value = filteredObj.email
            document.getElementById('phonenumber').value = filteredObj.phonenumber
            document.getElementById('date').value = filteredObj.date
            document.getElementById('time').value = filteredObj.time

            flag = 1;
        });

       LI.appendChild(editBtn);
       LI.appendChild(button);
    list.appendChild(LI);
}
getdisplay.appendChild(list);




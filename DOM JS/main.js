const btn = document.querySelector('.btn');

btn.addEventListener('mouseover', (e) => {
    document.querySelector('#my-form').style.background = '#ccc';
    document.querySelector('body').classList.add('bg-dark');
    document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>'
});


btn.addEventListener('mouseout', (e) => {
    document.querySelector('#my-form').style.background = '#fff';
    document.querySelector('body').classList.add('bg-dark');
    document.querySelector('.items').lastElementChild.innerHTML = '';
});


const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }   else {
        const li = document.createTextNode(`${nameInput.value} : ${emailInput.value}`);

        userList.appendChild(li);

        nameInput.value= '';
        emailInput.value= '';
    }
}
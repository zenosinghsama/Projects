const n = 5;
for(let i =0; i < n; i++){
    let str = '';
    for(let j = 0; j < n-1; j++) {
        str += '*';
    }
    for(let j = 0; j < i; j++) {
        str += ' ';
    }
    for(let j = 0; j < i; j++) {
        str += ' ';
    }
    for(let j = 0; j < n-1; j++) {
        str += '*';
    }
    console.log(str);
}
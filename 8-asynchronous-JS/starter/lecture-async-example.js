const second = () => {
            
    setTimeout(() => {
        console.log('Async Hey There')
    }, 1000);
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('The end');
}

first();
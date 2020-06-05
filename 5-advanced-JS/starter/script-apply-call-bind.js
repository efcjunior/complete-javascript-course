//Lecture call, bind, apply

var john = {
    name: 'john',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if(style === 'formal'){
            console.log('formal style: ' + timeOfDay + ' ' +
            this.name + ', ' + this.age + ', ' + this.job);
        }else if(style === 'friendly'){
            console.log('friendly style: ' + timeOfDay + ' ' +
            this.name + ', ' + this.age + ', ' + this.job);
        }
    }
}

var emily = {
    name: 'Emily',
    age: 43, 
    job: 'designer'
}

john.presentation('formal', 'morning');
john.presentation('friendly', 'night');

/*call method allow us to set the 'this' variable in the first argument*/
john.presentation.call(emily, 'friendly', 'afternoon');

/*apply method is equal, but it has only two arguments: 'this' variable and
array arguments */
john.presentation.apply(emily, ['formal', 'good-night']);

/*bind method is equal, but differs for returning a function to execute 
later
it´s called carrying that is just a technique in wich a function is created
based on another function, but with some preset parameters
*/
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

/*another example */
var years = [1990,1965,1937,2005,1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for(var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function newCalculateAge(el) {
     return 2020 - el;
}

function isFullAge(limit, el){
    return el >= limit;
}

var ages = arrayCalc(years, newCalculateAge);
var fullAges = arrayCalc(ages, isFullAge.bind(this, 83));

console.log(ages);
console.log(fullAges);
// Lecture: let and const

// ES5
var name5 = 'Laby Junior';
var age5 = 35;
names5 = 'Rodrigo Couch';

// ES6
const name6 = 'Laby Junior';
let age6 = 35;
//name6 = 'Rodrigo Couch'; Uncaught typeError: assignment to constant variable

// ES5 vs ES6

function driversLicenseES5(passedTest) {
    if (passedTest){
        //console.log(firstName); output: undefined - variable hoisted and acessible
        var firstName = 'Laby';
        var yearOfBirth = '1990';
        //console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car');
    }
    console.log(firstName + ', born in ' + yearOfBirth 
    + ', is now officially allowed to drive a car'); //Laby, born in 1990, is now officially allowed to drive a car
}

driversLicenseES5(true);


function driversLicenseES6(passedTest) {
    if (passedTest){
        //console.log(firstName); Uncaught ReferenceError: Cannot access 'firstName' before initialization variable hoisted and inacessible
        let firstName = 'Laby';
        const yearOfBirth = '1990';
        console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car');
    }
    /*console.log(firstName + ', born in ' + yearOfBirth 
    + ', is now officially allowed to drive a car'); Uncaught ReferenceError: firstName is not defined*/
}

driversLicenseES6(true);

/*
NOTE 1: LET AND CONST declaration use block scope ({---scope---}), while VAR declaration uses function scope.
*/


let i = 23; //block 1

for (let i = 0; i < 5; i++) {
    //block 2
    console.log(i);
}

console.log(i);

/*
NOTE 2: The blocks don´t change each other.
*/


var j = 50; //block 1

for (var j = 0; j < 5; j++) {
    //block 2
    console.log(j);
}

console.log(j);

/*
NOTE 3: The blocks change
*/

//----------------------------------------------------------------------------------------------------------------------------------

// Lecture: Blocks IIFEs

// ES6
{
    //block scope
    const a = 1;
    let b = 2;
    var c = 3 
}

//console.log(a + b);  Uncaught ReferenceError: a is not defined
//console.log(c); output: 3 - This because var declaration is not block scope.

// ES5
(function () {
    //function scope
    var d = 5;
});

//console.log(d);  Uncaught ReferenceError: a is not defined.

//----------------------------------------------------------------------------------------------------------------------------------

// Lecture: Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2020 - year;
};

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' 
+ yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 - template literals `` (backticks)
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

// ES6 - util methods
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));

//----------------------------------------------------------------------------------------------------------------------------------

// Lecture: Arrow functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el){
    return 2020 - el;
});

console.log(ages5);

// ES6
let ages6 = years.map(el => 2020 - el);
console.log(ages6);

ages6 = years.map((el, index) => `${index + 1}: ${2020 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `${index + 1}: ${age}.`    
});
console.log(ages6);

//---------------------------------------------------------------------------------------------------------------------------------

// Lecture: Arrow functions Lexical 'this' keyword

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;

        function display() {            
            var str = 'This is box number ' + self.position 
            + ' and it is ' + self.color;
            alert(str);
        }

        document.querySelector('.green').addEventListener('click', display);
    }
}

box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        
        function display(self) {            
            let str = `This is box number ${self.position} and it is  ${self.color}`;
            alert(str);
        }

        document.querySelector('.green').addEventListener('click', () => display(this));
    }
}

box6.clickMe();

// ES6
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        /* 
            Note 1: it output undefined, that´s because this method also shares the lexical this keyword from its surroundings.
            And the surrounding of this is the global context.
        */
        function display(self) {            
            let str = `This is box number ${self.position} and it is  ${self.color}`;
            alert(str);
        }
        document.querySelector('.green').addEventListener('click', () => display(this));
    }
}

box66.clickMe();


// ES5
function Person5(name) {
    this.name = name;
}

Person5.prototype.myFriends5 = function(friends) {

    /*var arr = Array.prototype.map.call(friends, function(el) {
        //it´s going to point to the global object
        return this.name + ' is friends with ' + el;
    }, this);*/

    /*var arr = friends.map(function(el) {
        //it´s going to point to the global object
        return this.name + ' is friends with ' + el;
    }, this);*/

    var arr = friends.map(function(el) {
        //it´s going to point to the global object
        return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
};

var friends5 = ['Bob', 'Jane', 'Mark'];

new Person5('John').myFriends5(friends5);


// ES6
function Person6(name) {
    this.name = name;
}

Person6.prototype.myFriends6 = function(friends) {   
    var arr = friends.map((el) => `${this.name} is friends with  ${el}`);

    console.log(arr);
};

var friends6 = ['Bob6', 'Jane6', 'Mark6'];

new Person6('John').myFriends6(friends6);

//-------------------------------------------------------------------------------------------------------------------------

// Lecture: Destructuring

//ES5
var john = ['john', 26];
var name5 = john[0];
var age5 = john[1];

//ES6
const[name, year] = ['john', 26];
console.log(name5);
console.log(age5);

const obj = {
    firstName6: 'John',
    lastName6: 'Smith'
};

const {firstName6, lastName6} = obj;
console.log(firstName6);
console.log(lastName6);

const {firstName6: a, lastName6: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [ageCurrent, retirement] = calcAgeRetirement(1990);
console.log(ageCurrent);
console.log(retirement);

//-------------------------------------------------------------------------------------------------------------------------

// Lecture: Arrays

const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(current){
    current.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
boxesArr5.forEach(current => current.style.backgroundColor = 'red');


//ES5
for(var j = 0; j < boxesArr5.length; j++) {
    if(boxesArr5[j].className === 'box blue'){
        continue;
    }

    boxesArr5[j].textContent = 'I changed to blue!';
}

//ES6
for (const i of boxesArr6) {
    if(i.className.includes('blue')){
        continue;
    }
    i.textContent = 'I changed to blueeeee!';
}

//ES5
var agesChild = [12, 17, 8, 21, 14, 11];
var full = agesChild.map(function(curr){
    return curr >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(agesChild[full.indexOf(true)]);

//ES6
console.log(agesChild.findIndex(cur => cur >= 18));
console.log(agesChild[agesChild.findIndex(cur => cur >= 18)]);
console.log(agesChild.find(cur => cur >= 18));
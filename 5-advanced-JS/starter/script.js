//literal object
var bob = {
    name: 'Bob',
    yearOfBirth: 1990,
    job: 'teacher'
};

//Function constructor or constructor function (pattern)
//It´s a blueprint for creating objects instances;
//conventional: capital letter
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

//instantiate
//new operator create an empty object and  it calls the 'person' function
//with the 'this' variable to the new object that was created here.
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');

/*Each object created has attached to them the calculateAge method because it was defined 
into function construtor.
We have to add all the methods and properties (that´s not really common)
that we want to be inherited into the constructor´s prototype property (or prototype property of 
function constructor).

It´s how inheritance works in Java Script
*/

Person.prototype.calculateAge = function () {
    console.log(2020 - this.yearOfBirth);
};

john.calculateAge();
jane.calculateAge();

/*Another way to create objects and inheritance: Object.create 
First - create an object that act as the prototype
Second - create a new object based on that very prototype
*/

var contactFormProto = {
    submit: function () {
        console.log('form submited with this value: ' + this.value);
    }
}

var myForm = Object.create(contactFormProto);
myForm.value = '123456';
myForm.mail = '@gmail.com';

//there is a better solution than it:

var youForm = Object.create(contactFormProto,
    {
       name: {value:'your name'} ,
       mail: {value: 'you mail'},
       value: {value: '123456'}
    });

/**
 * objet.create vs function constructor pattern
 * 
 * object.create - builds an object {youForm} that inherits directly from the one that was passed into
 * the first argument {contactFormProto}. 
 * 
 * function constructor - the newly created object inherits from the constructor´s prototype property.
 */


 /**Primitive vs Objects */

 /**
  * Primitive: copy value
  * integer
  * string
  * boolean
  * null
  * undefined
  * 
  * Object: everthing else
  */
  var a = 23;
  var b = a;

  a = 46;

  console.log(a);
  console.log(b);

  var obj1 = {
      name: 'John',
      age: 26
  }

  //objects
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

//functions

var age = 27;
var obj3 = {
    name: 'Jonas',
    city: 'Lisbon'
}

function change(a,b){
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj3);

console.log(age);
console.log(obj3.city);

/**
 * First Class Functions: Passing functions as arguments
 */

 /**
  * 1) functions area also objects in Javascript 
  * - they are instance of the object type.
  * - behave like any other object
  * - can be stored in a variable
  * - can be passed as an argument to another function
  * - can be returned from a function
  */

  var years = [1990,1965,1937,2005,1998];

  function arrayCalc(arr, fn) {
      var arrRes = [];
      for(var i = 0; i < arr.length; i++) {
          arrRes.push(fn(arr[i]));
      }
      return arrRes;
  }

  //callback function 1
  function newCalculateAge(el) {
       return 2020 - el;
  }

  console.log(arrayCalc(years, newCalculateAge));

  function isFullAge(el){
      return el >= 18;
  }

  console.log(arrayCalc(years, isFullAge));

  function maxHeartRate(el) {
        if(el >= 18 && el <= 81){
            return Math.round(206.9 - (0.67 * el));
        } else {
            return -1;
        }
  }

  console.log(arrayCalc(arrayCalc(years, newCalculateAge), maxHeartRate));

/**
 * First Class Functions: Functions Returning Functions
 */

 function interviewQuestion(job) {
     if (job === 'designer') {
         return function (name) {
             console.log(name + ', can you explain what UX design is ? ');
         }
     } else if (job === 'teacher') {
         //anonymous function
         return function (name) {
             console.log('What subject do you teach, ' + name + '?');
         }
     } else {
         return function (name) {
             console.log('Hello ' + name + ', what do you do ? ');
         }
     }
 }

 interviewQuestion('teacher')('Everson');
 interviewQuestion('designer')('Rute');
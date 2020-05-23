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
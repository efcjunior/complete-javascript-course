//Lecture clousure

function retirement(retirementAge) {
    return function(yearOfBirth){
        var a = ' year left until retirement.';
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1986);
retirement(1987)(66);
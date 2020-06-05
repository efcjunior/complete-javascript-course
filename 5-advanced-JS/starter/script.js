/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

var Question = function() {

}

Question.prototype.checkAnswer = function (userAnswer){
    var result = 'incorrect';

    if(this.question.answer === userAnswer) {
        result = 'correct';
    }
    console.log(`Answer ${result}`);
}

Question.prototype.display = function (){
    console.log(this.question);
    for(let i = 0; i < this.multipleChoice.length; i++) {
        console.log(`${i + 1}. ${this.multipleChoice[i]}`);
    }
}


var question1 = new Question({});
question1.question = 'Question 1: Who laid the foundations for most of the classical mechanics?';
question1.multipleChoice = [
    'Isaac Newton', 
    'Albert Einstein', 
    'James Clerk Maxwell'
];
question1.answer = 1;

var question2 = new Question();
question2.question = 'Question 2: Who developed the general theory of relativity?';
question2.multipleChoice = [
    'Isaac Newton',
    'Albert Einstein', 
    'James Clerk Maxwell'
];
question2.answer = 1;

var question3 = new Question();
question3.question = 'Question 3: Who developed the theory of classical electromagnetism?';
question3.multipleChoice = [
    'Isaac Newton', 
    'Albert Einstein', 
    'James Clerk Maxwell'
];
question3.answer = 3


var start = function () {
    var questionNumber = Math.floor(Math.random() * 3);
    var questions = [question1, question2, question3];

    return questions[questionNumber];
}

questions[questionNumber].display();

var userAnswer = prompt('Answer');

questions[questionNumber].checkAnswer(userAnswer);
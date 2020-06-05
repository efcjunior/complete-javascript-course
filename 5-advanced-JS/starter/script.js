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


/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


(function (){

    var Question = function() {

    }
    
    function score() {
        var totalScore = 0.0;

        return function(isCorrectAnswer){
            if(isCorrectAnswer){
                totalScore++;
            }
            return totalScore;
        }
    }

    var keepScore = score();
    
    Question.prototype.checkAnswer = function (userAnswer, callback){   
        //consider to user callback function for scoring     
        //consider to display score parcial after answer result
        var userMessage;
        var userScore;

        if(this.answer === userAnswer){
            userMessage = 'correct';
            userScore = callback(true);
        } else {            
            userMessage = 'incorrect';
            userScore = callback(false);
        }

        console.log(`Answer ${userMessage}`);
        this.displayUserScore(userScore);
    }    

    Question.prototype.displayUserScore = function (userScore) {
        console.log(`Score ${userScore}`);
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
    
    var questions = [question1, question2, question3]

    function nextQuestion(){
        var numberQuestion = Math.floor(Math.random() * questions.length);    
        questions[numberQuestion].display();
        var userAnswer = prompt('Type number your answer');

        if(userAnswer !== 'exit'){
            questions[numberQuestion].checkAnswer(parseInt(userAnswer),keepScore);
            nextQuestion();
        }        
    }

    nextQuestion();

})()
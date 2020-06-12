/*Module pattern implementation structure */

var budgetController = (function(){

    //data encapsulation


    return {
        //interface
    }

})();


var UIController = (function(){
    //data encapsulation
    //DOMStrings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        //interface
        getInput: function() {
            //get all data input and return an object
            return {
                inputType: document.querySelector(DOMstrings.inputType).value,
                inputDescription: document.querySelector(DOMstrings.inputDescription).value,
                inputValue: document.querySelector(DOMstrings.inputValue).value
            };
        },
        //DOMStrings
        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();


//Global app controller 
var controller = (function(budgetCtrl, UICtrl){

    var DOM = UICtrl.getDOMstrings();

    /**event listeners and callbacks */
    var ctrlAddItem = function(){
        console.log(UICtrl.getInput());
    };

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){    
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
})(budgetController,UIController);
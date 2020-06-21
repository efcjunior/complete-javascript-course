/*Module pattern implementation structure */

var budgetController = (function(){    
    
    var Expense = function(id, description, value)  {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value)  {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }                
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID = 0;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }             
            data.allItems[type].push(newItem);//end of array
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();


var UIController = (function(){
    //data encapsulation
    //DOMStrings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        //interface
        getInput: function() {
            //get all data input and return an object
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = 
                    `<div class="item clearfix" id="income-%id">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`            
            }else if (type === 'exp'){
                element = DOMstrings.expensesContainer;

                html = 
                    `<div class="item clearfix" id="expense-%id%">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`
            }            
            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //Insert  the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        //DOMStrings
        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

//Global app controller 
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){    
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };    

    /**event listeners and callbacks */
    var ctrlAddItem = function(){  
        var input, newItem;
        //1
        input = UICtrl.getInput(); 
        //2
        newItem  = budgetCtrl.addItem(input.type, input.description, input.value);
        //3
        UICtrl.addListItem(newItem, input.type);
    };

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();
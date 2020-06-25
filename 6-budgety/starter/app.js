/*Module pattern implementation structure */

var budgetController = (function(){    
    
    var Expense = function(id, description, value)  {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var Income = function(id, description, value)  {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function (totalIncome) {

        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(function(current, index, array){
            sum += current.value;
        });

        data.totals[type] = sum;
    };    

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1

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

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current, index, array){
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentage of income that we spent
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(current, index, array){
                current.calculatePercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(current, index, array){
                return current.getPercentage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };


    var formatNumber = function(num, type) {          
        /*
            + - before number
            exactly 2 decimal points comma separating the thousands

            2310.4567 -> 2,310.46
            2000 -> 2,000.00
         */
        var numSplit;
        
         num = Math.abs(num);
         num = num.toFixed(2);

         numSplit = num.split('.');

         int = numSplit[0];
         
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];           

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length;i++) {
            callback(list[i], i);
        }
   };

    return {
        //interface
        getInput: function() {
            //get all data input and return an object
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = 
                    `<div class="item clearfix" id="inc-%id%">
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
                    `<div class="item clearfix" id="exp-%id%">
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));
            //Insert  the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorId) {
            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },

        displayBudget: function(obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);          

            nodeListForEach(fields, function(current, index){
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
                
            });
        },
        
        displayMonth: function() {
            var now, months, month, year;

            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function(){

            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue
            );

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);
    };    

    var updateBudget = function() {
        //1 calculate the budget
        budgetCtrl.calculateBudget();  
        //2 return the budget
        var budget = budgetController.getBudget();     
        //3 display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        //1 calculate percentages
        budgetController.calculatePercentages();
        //2 read percentages from the budget controller
        var percentages = budgetController.getPercentages();
        //3 update the ui with the new percentages
        UIController.displayPercentages(percentages);
    };

    /**event listeners and callbacks */
    var ctrlAddItem = function(){  
        var input, newItem;
        //1
        input = UICtrl.getInput(); 

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2
            newItem  = budgetCtrl.addItem(input.type, input.description, input.value);
            //3
            UICtrl.addListItem(newItem, input.type);
            //4
            UICtrl.clearFields();
            //5
            updateBudget();
            //6
            updatePercentages();
        } 
    };

    var ctrlDeleteItem = function(event){      
        var itemmId,splitId, type, id;

        itemmId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemmId) {
            //inc-1
            splitId = itemmId.split('-')
            type = splitId[0];
            id = parseInt(splitId[1]);

            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, id);
            //2. delete the item from the user interface
            UICtrl.deleteListItem(itemmId);
            //3. update and show the new budget
            updateBudget();
            //4
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log('Application has started');
            UIController.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init(); 
'use strict';

let calculate = document.querySelector('#start');
let reset = document.querySelector('#cancel');
let buttonIncomeAdd = document.querySelector('.income_add');
let buttonExpensesAdd = document.querySelector('.expenses_add');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('.deposit-check');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

const isNumber = function(n) {
    return !isNaN( parseFloat( n ) ) && isFinite(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        salaryAmount.readOnly = true;
        additionalIncomeItem[0].readOnly = true;
        additionalIncomeItem[1].readOnly = true;
        targetAmount.readOnly = true;
        additionalExpensesItem.readOnly = true;
        incomeItems.forEach(function (item) {
            item.querySelector('.income-title').readOnly = true;
            item.querySelector('.income-amount').readOnly = true; 
        });
        expensesItems.forEach( (item) => {
            item.querySelector('.expenses-title').readOnly = true;
            item.querySelector('.expenses-amount').readOnly = true;  
        });

        this.budget = Number(salaryAmount.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
    },
    reset: function() {
        salaryAmount.readOnly = false;
        additionalIncomeItem[0].readOnly = false;
        additionalIncomeItem[1].readOnly = false;
        targetAmount.readOnly = false;
        additionalExpensesItem.readOnly = false;
        incomeItems.forEach(function (item) {
            item.querySelector('.income-title').readOnly = false;
            item.querySelector('.income-amount').readOnly = false; 
        });
        expensesItems.forEach(function (item) {
            item.querySelector('.expenses-title').readOnly = false;
            item.querySelector('.expenses-amount').readOnly = false;  
        });

        salaryAmount.value = '';
        additionalIncomeItem[0].value = '';
        additionalIncomeItem[1].value = '';
        targetAmount.value = '';
        additionalExpensesItem.value = '';
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
        incomeItems.forEach(function (item) {
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = ''; 
        });
        expensesItems.forEach(function (item) {
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';  
        });

        budgetMonthValue.value = '';
        budgetDayValue.value = '';
        expensesMonthValue.value = '';
        additionalIncomeValue.value = '';
        additionalExpensesValue.value = '';
        incomePeriodValue.value = '';
        targetMonthValue.value = '';

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 6) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    addPeriodBlock: function () {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    }, 
    getExpenses: function () {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function () {
        let cloneIncomesItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomesItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 6) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    getIncome: function () {
        incomeItems.forEach(function( item ){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += Number(this.income[key]);
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if ( item !== '' ) {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function( item ){
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push(itemValue);
            }
        });
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', this.addPeriodBlock);
    },
    getExpensesMonth: function () {
        for (const key in this.expenses) {
            this.expensesMonth  += Number( this.expenses[key] );
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor( this.budgetMonth / 30 );
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function () {
        if ( this.budgetDay >= 1200 ) {
            return ('У вас высокий доход');
        } else if ( this.budgetDay >= 600 && this.budgetDay < 1200 ) {
            return ('У вас средний уровень дохода');
        } else if ( this.budgetDay <= 600 && this.budgetDay >= 0 ) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if ( this.deposit ) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while ( !isNumber( this.percentDeposit ) );
            do {
                this.moneyDeposit = prompt('Какая сумма заложенна?', 1000);
            } while ( !isNumber( this.moneyDeposit ) );
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
};

calculate.addEventListener('click', function() {
    calculate.style.display = 'none';
    reset.style.display = 'block';
    appData.start();
});

reset.addEventListener('click', function () {
    reset.style.display = 'none';
    calculate.style.display = 'block';
    appData.reset();
});

buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);







periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
});

const availableOrUnavailableButton = function () {
    calculate.disabled = !salaryAmount.value ? true : false;
};
availableOrUnavailableButton();
salaryAmount.addEventListener('input', availableOrUnavailableButton);





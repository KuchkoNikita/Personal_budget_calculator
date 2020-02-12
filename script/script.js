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

const isNumber = (n) => {
    return !isNaN( parseFloat( n ) ) && isFinite(n);
};
const checkForOutputOnlyCyrillic = (str) => {
    str.value = str.value.replace(/[^а-яА-ЯёЁ ,\-]/g, '');
};
const checkForOutputOnlyNumbers = (num) => {
    num.value = num.value.replace(/[^\d]/g, '');
};

const AppData = function () {
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
};
AppData.prototype.start = function() {
    this.budget = Number(salaryAmount.value);
    
    this.dataEntryLock();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
};
AppData.prototype.dataEntryLock = function() {
    salaryAmount.readOnly = true;
    additionalIncomeItem[0].readOnly = true;
    additionalIncomeItem[1].readOnly = true;
    targetAmount.readOnly = true;
    additionalExpensesItem.readOnly = true;
    //periodSelect.disabled = true;
    buttonIncomeAdd.disabled = true;
    buttonExpensesAdd.disabled = true;
    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').readOnly = true;
        item.querySelector('.income-amount').readOnly = true; 
    });
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').readOnly = true;
        item.querySelector('.expenses-amount').readOnly = true;  
    });
};
AppData.prototype.unlockDataEntry = function() {
    salaryAmount.readOnly = false;
    additionalIncomeItem[0].readOnly = false;
    additionalIncomeItem[1].readOnly = false;
    targetAmount.readOnly = false;
    additionalExpensesItem.readOnly = false;
    buttonIncomeAdd.disabled = false;
    buttonExpensesAdd.disabled = false;
    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').readOnly = false;
        item.querySelector('.income-amount').readOnly = false; 
    });
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').readOnly = false;
        item.querySelector('.expenses-amount').readOnly = false;  
    });
};
AppData.prototype.clearingDataFromInputFields = function() {
    salaryAmount.value = '';
    additionalIncomeItem[0].value = '';
    additionalIncomeItem[1].value = '';
    targetAmount.value = '';
    additionalExpensesItem.value = '';
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;
    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').value = '';
        item.querySelector('.income-amount').value = ''; 
    });
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').value = '';
        item.querySelector('.expenses-amount').value = '';  
    });
};
AppData.prototype.deletingDataInTheOutputField = function(){
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalIncomeValue.value = '';
    additionalExpensesValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';

};
AppData.prototype.zeroingAllObjectVariables = function(){
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
};
AppData.prototype.reset = function() {
    this.unlockDataEntry();
    this.clearingDataFromInputFields();
    this.deletingDataInTheOutputField();
    this.zeroingAllObjectVariables();
    availableOrUnavailableButton();
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 6) {
        buttonExpensesAdd.style.display = 'none';
    }
};
AppData.prototype.addPeriodBlock = function () {
    periodAmount.innerHTML = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMoney(); // appData
};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach( (item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomesItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomesItem, buttonIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 6) {
        buttonIncomeAdd.style.display = 'none';
    }
};
AppData.prototype.getIncome = function () {
    incomeItems.forEach( (item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += Number(this.income[key]);
    }
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
        item = item.trim();
        if ( item !== '' ) {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach( (item) => {
        let itemValue = item.value.trim();
        if ( itemValue !== '' ) {
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', this.addPeriodBlock);
};
AppData.prototype.getExpensesMonth = function () {
    for (const key in this.expenses) {
        this.expensesMonth  += Number( this.expenses[key] );
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor( this.budgetMonth / 30 );
};
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
    if ( this.budgetDay >= 1200 ) {
        return ('У вас высокий доход');
    } else if ( this.budgetDay >= 600 && this.budgetDay < 1200 ) {
        return ('У вас средний уровень дохода');
    } else if ( this.budgetDay <= 600 && this.budgetDay >= 0 ) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    if ( this.deposit ) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
        } while ( !isNumber( this.percentDeposit ) );
        do {
            this.moneyDeposit = prompt('Какая сумма заложенна?', 1000);
        } while ( !isNumber( this.moneyDeposit ) );
    }
};
AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventsListeners = function () {
    salaryAmount.addEventListener('input', availableOrUnavailableButton);
    calculate.addEventListener('click', () => {
        calculate.style.display = 'none';
        reset.style.display = 'block';
        appData.start();
    });
    reset.addEventListener('click', () => {
        reset.style.display = 'none';
        calculate.style.display = 'block';
        appData.reset();
    });
    buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
    buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', () => {
        periodAmount.innerHTML = periodSelect.value;
    });
    salaryAmount.addEventListener('input', () => {
        checkForOutputOnlyNumbers(salaryAmount);
    });
    additionalIncomeItem[0].addEventListener('input', () => {
        checkForOutputOnlyCyrillic(additionalIncomeItem[0]);
    });
    additionalIncomeItem[1].addEventListener('input', () => {
        checkForOutputOnlyCyrillic(additionalIncomeItem[1]);
    });
    additionalExpensesItem.addEventListener('input', () => {
        checkForOutputOnlyCyrillic(additionalExpensesItem);
    });
    targetAmount.addEventListener('input', () => {
        checkForOutputOnlyNumbers(targetAmount);
    });
};
const appData = new AppData();
console.log('appData: ', appData);

/* Блокировка или разблокировка кнопки */
const availableOrUnavailableButton = () => {
    calculate.disabled = !salaryAmount.value ? true : false;
};
availableOrUnavailableButton();
appData.eventsListeners();


'use strict';

const calculate = document.querySelector('#start');
const reset = document.querySelector('#cancel');
const buttonIncomeAdd = document.querySelector('.income_add');
const buttonExpensesAdd = document.querySelector('.expenses_add');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
let expensesAmount = document.querySelectorAll('.expenses-amount');  
let incomeAmount = document.querySelectorAll('.income-amount');
let incomeTitle = document.querySelectorAll('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelectorAll('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositCheck = document.querySelector('.deposit-check');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

const isNumber = (n) => {
    return !isNaN( parseFloat( n ) ) && isFinite(n);
};
const checkForOutputOnlyCyrillic = (str) => {
    str.value = str.value.replace(/[^а-яА-ЯёЁ ,\-]/g, '');
};
const checkForOutputOnlyNumbers = (num) => {
    num.value = num.value.replace(/[^\d]/g, '');
};

class AppData {
    constructor() {
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
    }
    start() {
        this.budget = Number(salaryAmount.value);
        
        this.dataEntryLock();
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
    
        this.showResult();
    }
    dataEntryLock() {
        salaryAmount.readOnly = true;
        additionalIncomeItem[0].readOnly = true;
        additionalIncomeItem[1].readOnly = true;
        targetAmount.readOnly = true;
        additionalExpensesItem.readOnly = true;
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
    }
    unlockDataEntry() {
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
    }
    clearingDataFromInputFields() {
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
    }
    deletingDataInTheOutputField() {
        budgetMonthValue.value = '';
        budgetDayValue.value = '';
        expensesMonthValue.value = '';
        additionalIncomeValue.value = '';
        additionalExpensesValue.value = '';
        incomePeriodValue.value = '';
        targetMonthValue.value = '';
    
    }
    zeroingAllObjectVariables() {
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
    }
    reset() {
        this.unlockDataEntry();
        this.clearingDataFromInputFields();
        this.deletingDataInTheOutputField();
        this.zeroingAllObjectVariables();
        availableOrUnavailableButton();
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        inputCheckExpensesTitles();
        inputCheckExpensesAmounts();
        if (expensesItems.length === 6) {
            buttonExpensesAdd.style.display = 'none';
        }
    }
    addPeriodBlock() {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney(); // appData
    }
    getExpenses() {
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    addIncomeBlock() {
        let cloneIncomesItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomesItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        inputCheckIncomeTitles();
        inputCheckExpensesAmounts();
        if (incomeItems.length === 6) {
            buttonIncomeAdd.style.display = 'none';
        }
    }
    getIncome() {
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
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach( (item) => {
            item = item.trim();
            if ( item !== '' ) {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach( (item) => {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                this.addIncome.push(itemValue);
            }
        });
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    
        periodSelect.addEventListener('input', this.addPeriodBlock);
    }
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth  += Number( this.expenses[key] );
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor( this.budgetMonth / 30 );
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() {
        if ( this.budgetDay >= 1200 ) {
            return ('У вас высокий доход');
        } else if ( this.budgetDay >= 600 && this.budgetDay < 1200 ) {
            return ('У вас средний уровень дохода');
        } else if ( this.budgetDay <= 600 && this.budgetDay >= 0 ) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }
    getInfoDeposit() {
        if ( this.deposit ) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while ( !isNumber( this.percentDeposit ) );
            do {
                this.moneyDeposit = prompt('Какая сумма заложенна?', 1000);
            } while ( !isNumber( this.moneyDeposit ) );
        }
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    availableOrUnavailableButton () {
        calculate.disabled = !salaryAmount.value ? true : false;
    }
    eventsListeners() {
        salaryAmount.addEventListener('input', this.availableOrUnavailableButton);
        calculate.addEventListener('click', () => {
            calculate.style.display = 'none';
            reset.style.display = 'block';
            this.start();
        });
        reset.addEventListener('click', () => {
            reset.style.display = 'none';
            calculate.style.display = 'block';
            this.reset();
        });
        buttonExpensesAdd.addEventListener('click', this.addExpensesBlock);
        buttonIncomeAdd.addEventListener('click', this.addIncomeBlock);
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
    }
}
const appData = new AppData();

const inputCheckIncomeTitles = () => {
    incomeTitle = document.querySelectorAll('.income-title');
    incomeTitle.forEach( (element) => {
        element.addEventListener('input', (event) => {
            checkForOutputOnlyCyrillic(event.target);
        });
    });
};

const inputCheckExpensesTitles = () => {
    expensesTitle = document.querySelectorAll('.expenses-title');
    expensesTitle.forEach( (element) => {
        element.addEventListener('input', (event) => {
            checkForOutputOnlyCyrillic(event.target);
        });
    });
};

const inputCheckExpensesAmounts = () => {
    expensesAmount = document.querySelectorAll('.expenses-amount');  
    expensesAmount.forEach( (element) => {
        element.addEventListener('input', (event) => {
            checkForOutputOnlyNumbers(event.target);
        });
    });
};

const inputCheckIncomeAmounts = () => {
    incomeAmount = document.querySelectorAll('.income-amount');
    incomeAmount.forEach( (element) => {
        element.addEventListener('input', (event) => {
            checkForOutputOnlyNumbers(event.target);
        });
    });
};
inputCheckIncomeTitles();
inputCheckExpensesTitles();
inputCheckExpensesAmounts();
inputCheckIncomeAmounts();

appData.availableOrUnavailableButton();
appData.eventsListeners();


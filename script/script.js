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
const depositCheck = document.querySelector('#deposit-check');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositBank = document.querySelector('.deposit-bank');
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

const checkForOutputOnlyRightPercentage = (num) => {
    num.value = num.value.replace(/[^\d]/g, '');
    if (num.value > 99) {
        num.value = '';
    }
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
        this.getExpensesAndIncome();
        this.getExpensesMonth();
        this.addExpensesAndIncomeBlock();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
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
        this.availableOrUnavailableButton();
    }
    addPeriodBlock() {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney(); // appData
    }
    getExpensesAndIncome() {
        const count = item => {
            let startStr = item.className.split('-')[0];
            let itemTitle = item.querySelector(`.${startStr}-title`).value;
            let itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += Number(this.income[key]);
        }
    }
    addExpensesAndIncomeBlock() {
        const count = (passedItems, buttonAdd) => {
            let passedStr = passedItems[0].className.split('-')[0];
            let cloneItem = passedItems[0].cloneNode(true);
            passedItems[0].parentNode.insertBefore(cloneItem, buttonAdd);
            passedItems = document.querySelectorAll(`.${passedStr}-items`);
            appData.inputCheckExpensesTitles();
            appData.inputCheckExpensesAmounts();
            if (passedItems.length === 6) {
                buttonAdd.style.display = 'none';
            }
        };
        count(expensesItems, buttonExpensesAdd);
        count(incomeItems, buttonIncomeAdd);
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
        const monthDeposit = this.moneyDeposit * ( this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    availableOrUnavailableButton() {
        calculate.disabled = !salaryAmount.value ? true : false;
    }
    changePercent() {
        const valueSelect = this.value;
        if ( valueSelect === 'other' ) {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = valueSelect;
            depositPercent.value = '';
            depositPercent.addEventListener('input', () => {
                checkForOutputOnlyRightPercentage(depositPercent);
            });
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositBank.value = '';
            this.deposit = true;
            depositBank.addEventListener('change', appData.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', appData.changePercent);
        }
    }
    inputCheckIncomeTitles() {
        incomeTitle = document.querySelectorAll('.income-title');
        incomeTitle.forEach( (element) => {
            element.addEventListener('input', (event) => {
                checkForOutputOnlyCyrillic(event.target);
            });
        });
    }
    inputCheckExpensesTitles() {
        expensesTitle = document.querySelectorAll('.expenses-title');
        expensesTitle.forEach( (element) => {
            element.addEventListener('input', (event) => {
                checkForOutputOnlyCyrillic(event.target);
            });
        });
    }
    inputCheckExpensesAmounts() {
        expensesAmount = document.querySelectorAll('.expenses-amount');  
        expensesAmount.forEach( (element) => {
            element.addEventListener('input', (event) => {
                checkForOutputOnlyNumbers(event.target);
            });
        });
    }
    inputCheckIncomeAmounts() {
        incomeAmount = document.querySelectorAll('.income-amount');
        incomeAmount.forEach( (element) => {
            element.addEventListener('input', (event) => {
                checkForOutputOnlyNumbers(event.target);
            });
        });
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
        depositCheck.addEventListener('change', this.depositHandler);
        buttonExpensesAdd.addEventListener('click', this.addExpensesAndIncomeBlock);
        buttonIncomeAdd.addEventListener('click', this.addExpensesAndIncomeBlock);
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
        depositAmount.addEventListener('input', () => {
            checkForOutputOnlyNumbers(depositAmount);
        });
        depositPercent.addEventListener('input', () => {
            checkForOutputOnlyNumbers(depositPercent);
        });
    }
}
const appData = new AppData();

appData.inputCheckIncomeTitles();
appData.inputCheckIncomeAmounts();
appData.inputCheckExpensesTitles();
appData.inputCheckExpensesAmounts();


appData.availableOrUnavailableButton();
appData.eventsListeners();


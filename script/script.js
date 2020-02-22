'use strict';
/* Input */
/* Месячный доход */
const salaryAmount = document.querySelector('.salary-amount');

/* Дополнительный доход */
let incomeAmount = document.querySelectorAll('.income-amount');
let incomeTitle = document.querySelectorAll('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
const buttonIncomeAdd = document.querySelector('.income_add');

/* Возможный доход */
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

/* Обязательные расходы */
let expensesAmount = document.querySelectorAll('.expenses-amount');  
let expensesTitle = document.querySelectorAll('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const buttonExpensesAdd = document.querySelector('.expenses_add');

/* Возможные расходы */
const additionalExpensesItem = document.querySelector('.additional_expenses-item');

/* Депозит */
const depositCheckmark = document.querySelector('.deposit-checkmark'); // !
const depositCheck = document.querySelector('#deposit-check');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositBank = document.querySelector('.deposit-bank');

/* Цель */
const targetAmount = document.querySelector('.target-amount');

/* Период расчета */
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

/* Кнопки */
const calculate = document.querySelector('#start');
const reset = document.querySelector('#cancel');

/* Output */

const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

const isNumber = (n) => {
    return !isNaN( parseFloat(n) ) && isFinite(n);
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

const dataEntryLock = () => {
    salaryAmount.readOnly = true;
    additionalIncomeItem[0].readOnly = true;
    additionalIncomeItem[1].readOnly = true;
    targetAmount.readOnly = true;
    additionalExpensesItem.readOnly = true;
    buttonIncomeAdd.disabled = true;
    buttonExpensesAdd.disabled = true;
    
    depositBank.disabled = true;
    depositAmount.readOnly = true;
    depositPercent.readOnly = true;
    
    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').readOnly = true;
        item.querySelector('.income-amount').readOnly = true; 
    });
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').readOnly = true;
        item.querySelector('.expenses-amount').readOnly = true;  
    });
};

const unlockDataEntry = () => {
    salaryAmount.readOnly = false;
    additionalIncomeItem[0].readOnly = false;
    additionalIncomeItem[1].readOnly = false;
    targetAmount.readOnly = false;
    additionalExpensesItem.readOnly = false;
    buttonIncomeAdd.disabled = false;
    buttonExpensesAdd.disabled = false;
    
    depositBank.disabled = false;
    depositAmount.readOnly = false;
    depositPercent.readOnly = false;

    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').readOnly = false;
        item.querySelector('.income-amount').readOnly = false; 
    });
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').readOnly = false;
        item.querySelector('.expenses-amount').readOnly = false;  
    });
};

const clearingDataFromInputFields = () => {
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
    depositPercent.value = '';
    depositAmount.value = '';
};

const deletingDataInTheOutputField = () => {
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalIncomeValue.value = '';
    additionalExpensesValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';
};

let appDataLocalStorage = { // Обьект
    budgetMonthValueLocalStorage: '',
    budgetDayValueLocalStorage: '',
    expensesMonthValueLocalStorage: '',
    additionalIncomeValueLocalStorage: '',
    additionalExpensesValueLocalStorage: '',
    incomePeriodValueLocalStorage: '',
    targetMonthValueLocalStorage: '',
};

const equateLocaleStorageToAppData = () => { // Присванивание элементов обьекта к значения 
    budgetDayValue.value = appDataLocalStorage.budgetDayValueLocalStorage;
    budgetMonthValue.value = appDataLocalStorage.budgetMonthValueLocalStorage;
    expensesMonthValue.value = appDataLocalStorage.expensesMonthValueLocalStorage;
    additionalIncomeValue.value = appDataLocalStorage.additionalIncomeValueLocalStorage; 
    additionalExpensesValue.value = appDataLocalStorage.additionalExpensesValueLocalStorage; 
    incomePeriodValue.value = appDataLocalStorage.incomePeriodValueLocalStorage;
    targetMonthValue.value = appDataLocalStorage.targetMonthValueLocalStorage;
};

const equateAppDataToLocalStorage = () => { // Приравнивание значений к элементам обьекта
    appDataLocalStorage.budgetDayValueLocalStorage = budgetDayValue.value;
    appDataLocalStorage.budgetMonthValueLocalStorage = budgetMonthValue.value;
    appDataLocalStorage.expensesMonthValueLocalStorage = expensesMonthValue.value;
    appDataLocalStorage.additionalIncomeValueLocalStorage = additionalIncomeValue.value;
    appDataLocalStorage.additionalExpensesValueLocalStorage = additionalExpensesValue.value;
    appDataLocalStorage.incomePeriodValueLocalStorage = incomePeriodValue.value;
    appDataLocalStorage.targetMonthValueLocalStorage = targetMonthValue.value;
};

if (localStorage.getItem('appDataLocalStorage')) { // Проверка на наличие
    appDataLocalStorage = JSON.parse(localStorage.getItem('appDataLocalStorage'));
    equateLocaleStorageToAppData();
    dataEntryLock();
    reset.style.display = 'block';
    calculate.style.display = 'none';
}

const appDataUpdateToLocalStorage = () => { // Создание LS
    localStorage.setItem('appDataLocalStorage', JSON.stringify(appDataLocalStorage));
};

const appDataDeleteLocalStorage = () =>  { // Удаление
    localStorage.removeItem('appDataLocalStorage');
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
        
        dataEntryLock();
        this.getExpensesAndIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();

        this.showResult();

        equateAppDataToLocalStorage();
        appDataUpdateToLocalStorage();
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
        unlockDataEntry();
        clearingDataFromInputFields();
        deletingDataInTheOutputField();
        this.zeroingAllObjectVariables();
        this.availableOrUnavailableButton();
    }
    addPeriodBlock() {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = this.calcSavedMoney(); 
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
    addExpensesAndIncomeBlock(passedItems, buttonAdd) {
        let passedStr = passedItems[0].className.split('-')[0];
        let cloneItem = passedItems[0].cloneNode(true);
        
        passedItems[0].parentNode.insertBefore(cloneItem, buttonAdd);
        passedItems = document.querySelectorAll(`.${passedStr}-items`);
        
        this.inputCheckIncomeTitles();
        this.inputCheckIncomeAmounts();
        this.inputCheckExpensesTitles();
        this.inputCheckExpensesAmounts();
        if (passedItems.length === 6) {
            buttonAdd.style.display = 'none';
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
    
        periodSelect.addEventListener('input', this.addPeriodBlock.bind(this));
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
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
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
    inputCheckIncomeAmounts() {
        incomeAmount = document.querySelectorAll('.income-amount');
        incomeAmount.forEach( (element) => {
            element.addEventListener('input', (event) => {
                checkForOutputOnlyNumbers(event.target);
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
    eventsListeners() {
        this.inputCheckIncomeTitles();
        this.inputCheckIncomeAmounts();
        this.inputCheckExpensesTitles();
        this.inputCheckExpensesAmounts();
        
        this.availableOrUnavailableButton();

        salaryAmount.addEventListener('input', this.availableOrUnavailableButton);
        
        calculate.addEventListener('click', () => {
            calculate.style.display = 'none';
            reset.style.display = 'block';
            this.start();
        });
        reset.addEventListener('click', () => {
            appDataDeleteLocalStorage();
            reset.style.display = 'none';
            calculate.style.display = 'block';
            this.reset();
        });
        
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        
        buttonExpensesAdd.addEventListener('click', () => {
            this.addExpensesAndIncomeBlock(expensesItems, buttonExpensesAdd);
        });
        buttonIncomeAdd.addEventListener('click', () => {
            this.addExpensesAndIncomeBlock(incomeItems, buttonIncomeAdd);
        });
        
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

appData.eventsListeners();


'use strict';

let calculate = document.querySelector('#start');
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
        appData.budget = Number(salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
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
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += Number(appData.income[key]);
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', appData.addPeriodBlock);
    },
    getExpensesMonth: function () {
        for (const key in appData.expenses) {
            appData.expensesMonth  += Number( appData.expenses[key] );
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30 );
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if ( appData.budgetDay >= 1200 ) {
            return ('У вас высокий доход');
        } else if ( appData.budgetDay >= 600 && appData.budgetDay < 1200 ) {
            return ('У вас средний уровень дохода');
        } else if ( appData.budgetDay <= 600 && appData.budgetDay >= 0 ) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if ( appData.deposit ) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            } while ( !isNumber( appData.percentDeposit ) );
            do {
                appData.moneyDeposit = prompt('Какая сумма заложенна?', 1000);
            } while ( !isNumber( appData.moneyDeposit ) );
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};
calculate.addEventListener('click', appData.start);
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

console.log(appData);




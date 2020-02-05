'use strict';

let calculate = document.querySelector('#start');
let buttonIncomeAdd = document.querySelector('.income_add');
let buttonExpensesAdd = document.querySelector('.expenses_add');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //?
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('.deposit-check');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

const isNumber = function(n) {
    return !isNaN( parseFloat( n ) ) && isFinite(n);
};

let money;
const start = function() {
    do {
        money = prompt('Ваш месячный доход?', 45000);
    } while ( !isNumber( money ) );
};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0, 
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Стипендия');
            } while ( isNumber( itemIncome ) );
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 100);
            } while ( !isNumber( cashIncome ) );
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                                    'комунальные услуги, еда, вода');
        } while ( isNumber( addExpenses ) );
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.addExpenses.forEach( ( item, i ) => {
            appData.addExpenses[i] = item.trim().charAt(0).toUpperCase() + item.trim().substr(1);
        });
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let expensesItem, expensesCash;
        for (let i = 0; i < 2; i++) {
            do {
                expensesItem = prompt('Введите обязательную статью расходов', 'Покупки');
            } while ( isNumber( expensesItem ) );
            do {
                expensesCash = prompt('Во сколько это обойдется?', 10000);
            } while ( !isNumber( expensesCash ) );
            appData.expenses[expensesItem] = expensesCash;
        }
    },
    getExpensesMonth: function () {
        for (const key in appData.expenses) {
            appData.expensesMonth  += Number( appData.expenses[key] );
        }
    },
    getBudget: function () {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30 );
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(appData);
console.log('Расходы за день ', appData.budgetDay);
console.log('Расходы за месяц ', appData.budgetMonth);
if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута через', appData.getTargetMonth());
} else {
    console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());



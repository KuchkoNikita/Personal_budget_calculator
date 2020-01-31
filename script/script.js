'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function() {
    do {
        money = prompt('Ваш месячный доход?', 45000);
    } while (!isNumber(money));
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
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'комунальные услуги, еда, вода');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let expensesItem, expensesCash;
        for (let i = 0; i < 2; i++) {
            expensesItem = prompt('Введите обязательную статью расходов', 'Покупки');
            expensesCash = prompt('Во сколько это обойдется?', 10000);
            appData.expenses[expensesItem] = expensesCash;
        }
    },
    getExpensesMonth: function () {
        for (const key in appData.expenses) {
            appData.expensesMonth  += Number(appData.expenses[key]);
        }
    },
    getBudget: function () {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий доход');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
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





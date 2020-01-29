'use strict';

let money = Number(prompt('Ваш месячный доход?'));
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?')
let mission = 150000; 
let period = 3;
let income = 'Акции и облигации';

let expenses1 = prompt('Введите обязательную статью расходов');
let expenses2 = prompt('Введите обязательную статью расходов');

let amount1 = Number(prompt('Во сколько это обойдется'));
let amount2 = Number(prompt('Во сколько это обойдется'));

let massForAddExpenses = [];
massForAddExpenses = addExpenses.toLowerCase().split(', ');
console.log('massForAddExpenses: ', massForAddExpenses);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(mission);

function getExpensesMonth (amount1, amount2) {
    return amount1 + amount2;
}

function getAccumulatedMonth (monthlyIncome, expensesMonth) {
    return monthlyIncome - expensesMonth;
}

let expensesMonth = getExpensesMonth(amount1, amount2);
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

function getTargetMonth (mission , accumulatedMonth) {
    return Math.ceil(mission % accumulatedMonth);
}

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function (budgetDay) {
    if (budgetDay >= 1200) {
        return ('У вас высокий доход');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
console.log(getStatusIncome());





'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'комунальные услуги, еда, вода');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 150000; 
let period = 3;
let income = 'Акции и облигации';

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
    console.log('money: ', money);
};
start();

let expenses = [];
let getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'Покупки');
        sum += Number(prompt('Во сколько это обойдется?', 10000));
    }
    console.log('expenses: ', expenses);
    return sum;
};
let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {
    return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
console.log('accumulatedMonth: ', accumulatedMonth);

let getTargetMonth = function () {
    return Math.ceil(mission / accumulatedMonth);
};
let targetMonth = getTargetMonth();
if (targetMonth > 0) {
    console.log('Цель будет достигнута через', targetMonth);
} else {
    console.log('Цель не будет достигнута');
}

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function () {
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





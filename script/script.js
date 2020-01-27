let money = 0;
let addExpenses = '';
let deposit = false;
let mission = 150000; 
let period = 3;
let income = 'Акции и облигации';

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1;
let expenses2;
expenses1 = prompt('Введите обязательную статью расходов');
expenses2 = prompt('Введите обязательную статью расходов');

let amount1;
let amount2;
amount1 = prompt('Во сколько это обойдется');
amount2 = prompt('Во сколько это обойдется');

// 1
console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);
console.log('income.length: ', income.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

let massForAddExpenses = [];
massForAddExpenses = addExpenses.toLowerCase().split(', ');
console.log('massForAddExpenses: ', massForAddExpenses);

//2
let budgetMonth = money - amount1 - amount2;
console.log('budgetMonth: ', budgetMonth);

let howManyMonthsWillGoalBeAchived =  Math.ceil(mission % budgetMonth);

let budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) {
    alert('У вас высокий доход');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    alert('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
    alert('К сожалению у вас уровень дохода ниже среднего');
} else {
    alert('Что то пошло не так');
}

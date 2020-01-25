let money = 48000;
let income = 'Акции и облигации';
let addExpenses = 'Комнульные услуги, Еда, Интернет, Аренда жилья';
let deposit = true;
let mission = 150000; 
let period = 3;

console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);
console.log('income.length: ', income.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

let massForAddExpenses = [];
massForAddExpenses = addExpenses.toLowerCase().split(', ');
console.log('massForAddExpenses: ', massForAddExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
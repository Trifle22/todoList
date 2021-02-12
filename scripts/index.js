'use strict';

let buttonStart = document.getElementById('start');
let buttonIncomeAdd = document.getElementsByTagName('button')[0];
let buttonExpensesAdd = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeInputs = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitleElement = document.querySelector('.income-title');
let expensesTitleElement = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmountElement = document.querySelector('.target-amount');
let periodSelectElement = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let incomeItem = document.querySelectorAll('.income-items');
let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
let numInputs = document.querySelectorAll('input[placeholder="Сумма"]');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
  period: 3,

  start: function () {
          appData.budget = parseFloat(salaryAmount.value);
          appData.getExpenses();
          appData.getIncome();
          appData.getExpensesMonth();
          appData.getAddExpenses();
          appData.getAddIncome();
          appData.getBudget();
          appData.showResult();
  },

  showResult: function() {
    periodSelectElement.addEventListener('input', function() {
      incomePeriodValue.value = appData.budgetMonth * parseInt(periodSelectElement.value);
    });

    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = 'none';
    }
  },

  addIncomeBlock: function() {
    let cloneIcomeItem = incomeItem[0].cloneNode(true);
    cloneIcomeItem.querySelector('.income-title').value = '';
    cloneIcomeItem.querySelector('.income-amount').value = '';
    incomeItem[0].parentNode.insertBefore(cloneIcomeItem, buttonIncomeAdd);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      buttonIncomeAdd.style.display = 'none';
    }
  },


  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = parseFloat(item.querySelector('.expenses-amount').value);
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function() {
    incomeItem.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = parseFloat(item.querySelector('.income-amount').value);
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
        appData.incomeMonth += cashIncome;
      }
    });
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function() {
    additionalIncomeInputs.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () { 

    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmountElement.value / appData.budgetMonth; 
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) { 
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (appData.budgetDay < 0) {
      return 'Что-то пошло не так';
    }
  },

  getInfoDeposit: function() {
    if (appData.deposit) {
      let percentDeposit;
      let moneyDeposit;
      do {
        percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(percentDeposit));
      do {
        moneyDeposit = prompt('Какая сумма заложена ?', '10000');
      } while (!isNumber(moneyDeposit));
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelectElement.value;
  }
};
buttonStart.disabled = true;
salaryAmount.addEventListener('input', function(){
  if (salaryAmount.value.trim() === '') {
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
});

buttonStart.addEventListener('click', appData.start);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelectElement.addEventListener('input', function() {
  periodAmount.textContent = periodSelectElement.value;
});

textInputs.forEach(function(item) {
  item.addEventListener('change', function() {
    if (isNumber(item.value.trim())) {
      item.style.border = '2px solid red';
      alert('Введите корректные данные');
    } else {
      item.style.border = '2px solid green';
    }
  });
});

numInputs.forEach(function(item) {
  item.addEventListener('change', function() {
    if (!isNumber(item.value.trim())) {
      item.style.border = '2px solid red';
      alert('Введите корректные данные');
    } else {
      item.style.border = '2px solid green';
    }
  });
});



appData.getInfoDeposit();
appData.budgetDay = Math.floor(appData.budgetMonth/30);
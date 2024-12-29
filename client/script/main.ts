const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/client/login.html";
}

const apiUrl = "http://localhost:3000/expenses";

const expenseNameInput = document.getElementById(
  "expenseName"
) as HTMLInputElement;
const expenseAmountInput = document.getElementById(
  "expenseAmount"
) as HTMLInputElement;
const addExpenseBtn = document.getElementById(
  "addExpenseBtn"
) as HTMLButtonElement;
const expenseList = document.getElementById("expenseList") as HTMLUListElement;
const totalAmount = document.getElementById("totalAmount") as HTMLDivElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
const expenseCategory = document.getElementById(
  "expenseCategory"
) as HTMLSelectElement;

let expenses: {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}[] = [];

function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = `Total: $${total.toFixed(2)}`;
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    const listItem = document.createElement("li");
    listItem.classList.add("expense-item");
    listItem.innerHTML = `
      <span>${expense.title} - $${expense.amount.toFixed(2)} (${
      expense.category
    })</span>
      <button class="delete-btn" data-id="${expense.id}">Delete</button>
    `;
    expenseList.appendChild(listItem);
  });

  document.querySelectorAll(".delete-btn").forEach((button) =>
    button.addEventListener("click", (event) => {
      const id = (event.target as HTMLButtonElement).dataset.id;
      if (id) deleteExpense(id);
    })
  );
  renderCharts();
}

function renderCharts() {
  renderCategoryChart();
  renderDayChart();
}

function renderCategoryChart() {
  const chartData = expenses.reduce((data, expense) => {
    if (data[expense.category]) {
      data[expense.category] += expense.amount;
    } else {
      data[expense.category] = expense.amount;
    }
    return data;
  }, {} as Record<string, number>);

  const chartLabels = Object.keys(chartData);
  const chartValues = Object.values(chartData);

  const ctx = document.getElementById("expenseChart") as HTMLCanvasElement;
  if (ctx) {
    new Chart(ctx, {
      type: "bar", // Changed to bar chart
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            backgroundColor: [
              "#6f4f28",
              "#b8860b",
              "#8b4513",
              "#d2691e",
              "#a52a2a",
            ],
          },
        ],
      },
    });
  }
}

function renderDayChart() {
  const dailyData = expenses.reduce((data, expense) => {
    const expenseDate = new Date(expense.date).toISOString().split("T")[0];
    if (data[expenseDate]) {
      data[expenseDate] += expense.amount;
    } else {
      data[expenseDate] = expense.amount;
    }
    return data;
  }, {} as Record<string, number>);

  const chartLabels = Object.keys(dailyData);
  const chartValues = Object.values(dailyData);

  const ctx = document.getElementById("dayExpenseChart") as HTMLCanvasElement;
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Expenses by Day",
            data: chartValues,
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            fill: true,
          },
        ],
      },
    });
  }
}

async function fetchExpenses() {
  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch expenses");
    expenses = await response.json();
    renderExpenses();
    updateTotal();
  } catch (error) {
    console.error(error);
  }
}

async function addExpense(title: string, amount: number, category: string) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, category }),
    });
    if (!response.ok) throw new Error("Failed to add expense");
    const newExpense = await response.json();
    expenses.push(newExpense);
    renderExpenses();
    updateTotal();
  } catch (error) {
    console.error(error);
  }
}

async function deleteExpense(id: string) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete expense");
    expenses = expenses.filter((expense) => expense.id !== id);
    renderExpenses();
    updateTotal();
  } catch (error) {
    console.error(error);
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/client/login.html";
});

addExpenseBtn.addEventListener("click", () => {
  const title = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const category = expenseCategory.value;

  if (title && !isNaN(amount) && amount > 0) {
    addExpense(title, amount, category);
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  } else {
    alert("Please enter valid expense details");
  }
});

fetchExpenses();

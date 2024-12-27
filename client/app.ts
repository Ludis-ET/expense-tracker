const apiBaseUrl = "http://localhost:3000";

function switchToRegister() {
  showElement("register-form");
  hideElement("login-form");
}

function switchToLogin() {
  showElement("login-form");
  hideElement("register-form");
}

function showMessage(type: "success" | "error", text: string) {
  const messageElement = document.getElementById("message")!;
  messageElement.textContent = text;
  messageElement.className = type;
  messageElement.classList.remove("hidden");
  setTimeout(() => {
    messageElement.classList.add("hidden");
  }, 5000);
}

function showLoading() {
  const spinner = document.getElementById("loading-spinner")!;
  spinner.classList.remove("hidden");
}

function hideLoading() {
  const spinner = document.getElementById("loading-spinner")!;
  spinner.classList.add("hidden");
}

async function login() {
  const email = (
    document.getElementById("login-email") as HTMLInputElement
  ).value.trim();
  const password = (
    document.getElementById("login-password") as HTMLInputElement
  ).value.trim();

  if (!email || !password) {
    showMessage("error", "Please fill in all fields.");
    return;
  }

  showLoading();
  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      showMessage("success", "Login successful!");
      loadExpenses();
    } else {
      showMessage("error", data.message || "Invalid login credentials.");
    }
  } catch (error) {
    console.error(error);
    showMessage("error", "An error occurred during login.");
  } finally {
    hideLoading();
  }
}

async function register() {
  const name = (
    document.getElementById("register-name") as HTMLInputElement
  ).value.trim();
  const username = (
    document.getElementById("register-username") as HTMLInputElement
  ).value.trim();
  const email = (
    document.getElementById("register-email") as HTMLInputElement
  ).value.trim();
  const password = (
    document.getElementById("register-password") as HTMLInputElement
  ).value.trim();

  if (!name || !username || !email || !password) {
    showMessage("error", "Please fill in all fields.");
    return;
  }

  showLoading();
  try {
    const response = await fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      showMessage("success", "Registration successful. Please log in.");
      switchToLogin();
    } else {
      showMessage("error", data.message || "Registration failed.");
    }
  } catch (error) {
    console.error(error);
    showMessage("error", "An error occurred during registration.");
  } finally {
    hideLoading();
  }
}

async function loadExpenses() {
  const token = localStorage.getItem("token");

  if (!token) {
    switchToLogin();
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    const expensesList = document.getElementById("expenses-list")!;
    expensesList.innerHTML = "";

    data.forEach((expense: any) => {
      const li = document.createElement("li");
      li.textContent = `${expense.title} - $${expense.amount} (${expense.category})`;
      expensesList.appendChild(li);
    });

    showElement("expenses-section");
    hideElement("login-form");
    hideElement("register-form");
  } catch (error) {
    console.error(error);
    showMessage("error", "An error occurred while loading expenses.");
  }
}

async function addExpense() {
  const title = (
    document.getElementById("expense-title") as HTMLInputElement
  ).value.trim();
  const amount = parseFloat(
    (document.getElementById("expense-amount") as HTMLInputElement).value
  );
  const category = (
    document.getElementById("expense-category") as HTMLInputElement
  ).value.trim();
  const token = localStorage.getItem("token");

  if (!title || !amount || !category) {
    showMessage("error", "Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, category }),
    });

    if (response.ok) {
      showMessage("success", "Expense added successfully!");
      loadExpenses();
    } else {
      showMessage("error", "Failed to add expense.");
    }
  } catch (error) {
    console.error(error);
    showMessage("error", "An error occurred while adding the expense.");
  }
}

function logout() {
  localStorage.removeItem("token");
  switchToLogin();
}

document.getElementById("login-btn")?.addEventListener("click", login);
document.getElementById("register-btn")?.addEventListener("click", register);
document
  .getElementById("add-expense-btn")
  ?.addEventListener("click", addExpense);
document.getElementById("logout-btn")?.addEventListener("click", logout);
document
  .getElementById("switch-to-register")
  ?.addEventListener("click", switchToRegister);
document
  .getElementById("switch-to-login")
  ?.addEventListener("click", switchToLogin);

if (localStorage.getItem("token")) {
  loadExpenses();
} else {
  switchToLogin();
}

function showElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove("hidden");
  }
}

function hideElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add("hidden");
  }
}

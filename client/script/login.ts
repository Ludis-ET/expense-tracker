async function loginApi(email: string, password: string) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const loginSuccess = document.getElementById("successMessage") as HTMLElement;
const loginError = document.getElementById("errorMessage") as HTMLElement;
const loginSubmit = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

loginForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  loginSuccess.classList.add("d-none");
  loginError.classList.add("d-none");
  loginSubmit.classList.add("loading");

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (!email || !password) {
    loginError.textContent = "All fields are required";
    loginError.classList.remove("d-none");
    loginSubmit.classList.remove("loading");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    loginError.textContent = "Please enter a valid email address";
    loginError.classList.remove("d-none");
    loginSubmit.classList.remove("loading");
    return;
  }

  if (password.length < 6) {
    loginError.textContent = "Password must be at least 6 characters long";
    loginError.classList.remove("d-none");
    loginSubmit.classList.remove("loading");
    return;
  }

  try {
    const data = await loginApi(email, password);
    localStorage.setItem("token", data.token);
    loginSuccess.textContent = "Logged in successfully!";
    loginSuccess.classList.remove("d-none");

    setTimeout(() => {
      window.location.href = "/client";
    }, 2000);
  } catch (error) {
    console.error(error);
    const errorMessageText =
      error instanceof Error
        ? error.message
        : "There was an error. Please try again.";
    loginError.textContent = errorMessageText;
    loginError.classList.remove("d-none");
  } finally {
    loginSubmit.classList.remove("loading");
  }
});

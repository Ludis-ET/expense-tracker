const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const loginSuccess = document.getElementById("successMessage") as HTMLElement;
const loginError = document.getElementById("errorMessage") as HTMLElement;
const loginSubmit = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

loginForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  loginSuccess.style.display = "none";
  loginError.style.display = "none";
  loginSubmit.classList.add("loading");

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (!email || !password) {
    loginError.textContent = "All fields are required";
    loginError.style.display = "block";
    loginSubmit.classList.remove("loading");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    loginError.textContent = "Please enter a valid email address";
    loginError.style.display = "block";
    loginSubmit.classList.remove("loading");
    return;
  }

  if (password.length < 6) {
    loginError.textContent = "Password must be at least 6 characters long";
    loginError.style.display = "block";
    loginSubmit.classList.remove("loading");
    return;
  }

  try {
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

    const data = await response.json();
    localStorage.setItem("token", data.token);
    loginSuccess.textContent = "Logged in successfully!";
    loginSuccess.style.display = "block";

    setTimeout(() => {
      window.location.href = "/client";
    }, 2000);
  } catch (error) {
    console.log(error);
    const errorMessageText =
      error instanceof Error
        ? error.message
        : "There was an error. Please try again.";
    loginError.textContent = errorMessageText;
    loginError.style.display = "block";
  } finally {
    loginSubmit.classList.remove("loading");
  }
});

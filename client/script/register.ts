const registrationForm = document.getElementById("registrationForm") as HTMLFormElement;
const registrationSuccess = document.getElementById("successMessage") as HTMLElement;
const registrationError = document.getElementById("errorMessage") as HTMLElement;
const registrationSubmit = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

loginForm.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  loginSuccess.style.display = "none";
  loginError.style.display = "none";
  loginSubmit.classList.add("loading");

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (!name || !username || !email || !password) {
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
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "Email is already in use") {
        throw new Error(
          "This email is already registered. Please use another email."
        );
      }
      if (errorData.message === "Username is already in use") {
        throw new Error(
          "This username is already taken. Please choose another username."
        );
      }
      throw new Error("Failed to register");
    }

    const data = await response.json();
    loginSuccess.textContent = "Registration successful!";
    loginSuccess.style.display = "block";

    setTimeout(() => {
      window.location.href = "/client/login.html";
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

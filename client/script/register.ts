const form = document.getElementById("registrationForm") as HTMLFormElement;
const successMessage = document.getElementById("successMessage") as HTMLElement;
const errorMessage = document.getElementById("errorMessage") as HTMLElement;
const submitButton = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
  submitButton.classList.add("loading");

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (!name || !username || !email || !password) {
    errorMessage.textContent = "All fields are required";
    errorMessage.style.display = "block";
    submitButton.classList.remove("loading");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Please enter a valid email address";
    errorMessage.style.display = "block";
    submitButton.classList.remove("loading");
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters long";
    errorMessage.style.display = "block";
    submitButton.classList.remove("loading");
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
    successMessage.textContent = "Registration successful!";
    successMessage.style.display = "block";

    setTimeout(() => {
      window.location.href = "/client/login.html";
    }, 2000);
  } catch (error) {
    console.log(error);
    const errorMessageText =
      error instanceof Error
        ? error.message
        : "There was an error. Please try again.";
    errorMessage.textContent = errorMessageText;
    errorMessage.style.display = "block";
  } finally {
    submitButton.classList.remove("loading");
  }
});

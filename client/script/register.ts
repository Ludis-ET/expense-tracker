const form = document.getElementById("registrationForm") as HTMLFormElement;
const successMessage = document.getElementById("successMessage") as HTMLElement;
const errorMessage = document.getElementById("errorMessage") as HTMLElement;
const submitButton = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  successMessage.classList.add("d-none");
  errorMessage.classList.add("d-none");
  submitButton.classList.add("loading");

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (!name || !username || !email || !password) {
    errorMessage.textContent = "All fields are required";
    errorMessage.classList.remove("d-none");
    submitButton.classList.remove("loading");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Please enter a valid email address";
    errorMessage.classList.remove("d-none");
    submitButton.classList.remove("loading");
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters long";
    errorMessage.classList.remove("d-none");
    submitButton.classList.remove("loading");
    return;
  }

  const result = await registerUser(name, username, email, password);

  if (result.success) {
    successMessage.textContent = "Registration successful!";
    successMessage.classList.remove("d-none");
    setTimeout(() => {
      window.location.href = "/client/login.html";
    }, 2000);
  } else {
    errorMessage.textContent = result.message;
    errorMessage.classList.remove("d-none");
  }

  submitButton.classList.remove("loading");
});

async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string
) {
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
        return {
          success: false,
          message:
            "This email is already registered. Please use another email.",
        };
      }
      if (errorData.message === "Username is already in use") {
        return {
          success: false,
          message:
            "This username is already taken. Please choose another username.",
        };
      }
      return { success: false, message: "Failed to register" };
    }

    return { success: true, message: "" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "There was an error. Please try again." };
  }
}

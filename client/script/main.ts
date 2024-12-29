const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/client/login.html";
}


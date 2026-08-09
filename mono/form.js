const { submitSignup } = Signup;

document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const status = document.getElementById("signup-status");
  submitSignup(email).match(
    (message) => { status.textContent = message; },
    (error) => { status.textContent = error.message; },
  );
});

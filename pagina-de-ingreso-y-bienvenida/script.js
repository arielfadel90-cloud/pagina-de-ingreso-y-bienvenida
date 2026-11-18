const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const togglePasswordButton = document.getElementById("toggle-password");
const visibilityIcon = document.getElementById("password-visibility-icon");
const strengthLabel = document.getElementById("strength-label");
const matchStatus = document.getElementById("match-status");
const strengthBars = [
  document.getElementById("bar-1"),
  document.getElementById("bar-2"),
  document.getElementById("bar-3"),
  document.getElementById("bar-4")
];

const updatePasswordStrength = () => {
  const value = passwordInput.value;
  let score = 0;
  let label = "Baja";

  if (value.length >= 6) {
    score += 1;
  }

  if (value.length >= 10) {
    score += 1;
  }

  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(value)) {
    score += 1;
  }

  if (value.length === 0 || score === 2) {
    label = "Media";
  }

  if (score === 3) {
    label = "Buena";
  }

  if (score === 4) {
    label = "Fuerte";
  }

  strengthLabel.textContent = `Seguridad: ${label}`;

  strengthBars.forEach((bar, index) => {
    if (index < score) {
      bar.className = "strength-bar filled";
    }

    if (index >= score) {
      bar.className = "strength-bar";
    }
  });
};

const updatePasswordMatch = () => {
  matchStatus.className = "match-status";

  if (confirmPasswordInput.value.length === 0) {
    matchStatus.textContent = "◷";
    matchStatus.setAttribute("aria-label", "Aún no se ha confirmado la coincidencia");
  }

  if (confirmPasswordInput.value.length > 0 && confirmPasswordInput.value === passwordInput.value) {
    matchStatus.className = "match-status match";
    matchStatus.textContent = "✓";
    matchStatus.setAttribute("aria-label", "Las contraseñas coinciden");
  }

  if (confirmPasswordInput.value.length > 0 && confirmPasswordInput.value !== passwordInput.value) {
    matchStatus.className = "match-status no-match";
    matchStatus.textContent = "×";
    matchStatus.setAttribute("aria-label", "Las contraseñas no coinciden");
  }
};

if (passwordInput && confirmPasswordInput && togglePasswordButton && visibilityIcon && strengthLabel && matchStatus) {
  togglePasswordButton.addEventListener("click", () => {
    const showPassword = passwordInput.type === "password";
    passwordInput.type = showPassword ? "text" : "password";
    confirmPasswordInput.type = showPassword ? "text" : "password";
    visibilityIcon.textContent = showPassword ? "◎" : "◉";
    togglePasswordButton.setAttribute("aria-pressed", String(showPassword));
  });

  passwordInput.addEventListener("input", () => {
    updatePasswordStrength();
    updatePasswordMatch();
  });

  confirmPasswordInput.addEventListener("input", updatePasswordMatch);
}
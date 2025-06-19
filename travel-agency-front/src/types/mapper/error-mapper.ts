export function mapLoginErrorMessage(
  message?: string
): "invalidCredentials" | "serverError" {
  if (message === "Invalid credentials") return "invalidCredentials";
  return "serverError"; // fallback
}

export function mapRegisterErrorMessage(
  message?: string
): "missingFields" | "alreadyRegistered" | "serverError" {
  console.log("message");
  if (message === "Missing field(s)") return "missingFields";
  if (message === "You are already registered") return "alreadyRegistered";
  return "serverError"; // fallback
}

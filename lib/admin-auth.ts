export const ADMIN_COOKIE_NAME = "enzora_admin_session";

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME ?? "admin";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin123";
}

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? "enzora-admin-session";
}

export function isValidAdminCredentials(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword();
}

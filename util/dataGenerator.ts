export function generateRandomEmail(): string {
  return `user_${Date.now()}@test.com`;
}
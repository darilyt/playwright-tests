export function generateExpirationDate(monthsAhead = 3): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);
  const expirationDate = ((date.getMonth()+1).toString().padStart(2, "0") + '/' + date.getFullYear());
  return expirationDate;
}
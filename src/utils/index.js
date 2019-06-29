export function randomString(length) {
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
  )
    .toString(36)
    .slice(1);
}

export function printDate(timestamp) {
  const d = new Date(timestamp);
  return d
    .toUTCString()
    .split(' ')
    .slice(1, 4)
    .join('/');
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function printAmount(amount, symbol) {
  const prefix = symbol || '$';
  amount = amount / 100;
  if (amount < 0) {
    return '-' + prefix + Math.abs(amount).toFixed(2);
  }
  return prefix + amount.toFixed(2);
}

export function getDateNDaysFromToday(days) {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setDate(d.getDate() - days);
  return d;
}

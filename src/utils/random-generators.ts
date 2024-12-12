import * as crypto from 'crypto';

export const getTransactionReference = async () => {
  const hash = await crypto.randomBytes(4).toString('hex').substring(0, 12);
  return `TM-${hash}`;
};

export const generateVerificationCode = async () => {
  const hash = await crypto.randomBytes(4).toString('hex').substring(0, 6);
  return hash;
};
export const getRequestId = async () => {
  const date = yyyymmdd();
  //  return date;
  const hash = await crypto.randomBytes(4).toString('hex').substring(0, 9);
  return `${date}${hash}`;
};

function setTimeZone(date) {
  date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);
  return date;
}

function yyyymmdd() {
  let now = new Date();
  now = setTimeZone(now);
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const h = now.getHours() + 1;
  const min = now.getMinutes();
  return (
    '' +
    y +
    (m < 10 ? '0' : '') +
    m +
    (d < 10 ? '0' : '') +
    d +
    (h < 10 ? '0' : '') +
    h +
    (min < 10 ? '0' : '') +
    min
  );
}

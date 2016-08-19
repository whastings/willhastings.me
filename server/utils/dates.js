const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

exports.toDateOnly = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

exports.toFriendlyDate = function(date) {
  let month = MONTHS[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

exports.toISODate = function(date) {
  let month = asTwoDigits(date.getMonth() + 1);
  let day = asTwoDigits(date.getDate());
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

function asTwoDigits(num) {
  let digits = num.toString();
  return digits.length < 2 ? `0${digits}` : digits;
}

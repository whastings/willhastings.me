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

export function toFriendlyDate(dateString) {
  let [ year, month, day ] = dateString.split('-');
  month = MONTHS[parseInt(month, 10) - 1];
  day = day.replace(/^0/, '');

  return `${month} ${day}, ${year}`;
}

const showFormattedDate = (date, locale = 'id') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(locale, options);
};

function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari`;
  } if (diffHours > 0) {
    return `${diffHours} jam`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} menit`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} detik`;
  }
  return 'baru saja';
}

export { showFormattedDate, postedAt };

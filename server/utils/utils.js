function formatDate(date, options, locale = 'en-GB') {
    const dateObject = date ? new Date(date) : null;
    if (dateObject) {
        return dateObject.toLocaleDateString(locale);
    }
}

module.exports = {formatDate}
const formatDate = (date) => {
    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayName = daysOfWeek[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    return `${monthName}, ${day}  •  ${dayName}`;
};

export default formatDate;
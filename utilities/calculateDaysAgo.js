const calculateDaysAgo = (date) => {
    // Given date in the format "2023-12-13T20:08:20.000Z"
    const givenDate = new Date(date);

    // Current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - givenDate;

    // Convert the difference from milliseconds to days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
};

export default calculateDaysAgo;

export const formatPhoneNumber = (phoneNumber) => {
    // Remove non-numeric characters
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Add spaces or other separators for better readability
    const formattedNumber = cleanedNumber.replace(/(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3');

    return formattedNumber;
}


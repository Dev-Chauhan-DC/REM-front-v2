import RazorpayCheckout from 'react-native-razorpay';
import theme from '../theme';



const checkOut = async (data) => {

    try {
        const response = await RazorpayCheckout.open({
            key: 'rzp_live_vbwrr5TXzFK1X3',
            // key: 'rzp_test_pzenTWv8sdvVmZ',
            amount: data.amount, // amount in paise (e.g. 1000 paise = ₹10)
            currency: 'INR',
            name: 'Real Estate Application',
            description: 'Thankyou',
            image: "https://real-estate-properties.s3.us-east-2.amazonaws.com/Group+364+(1).png",
            order_id: data.orderId,
            prefill: {
                email: 'customer@example.com',
                contact: '9999999999',
            },
            theme: { color: theme.color.primary },
        })


        return response
    } catch (error) {
        console.error(error)
        return false
    }



}

export default { checkOut }

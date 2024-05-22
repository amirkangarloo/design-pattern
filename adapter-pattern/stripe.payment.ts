// This is Adaptee
export class StripePayment {
    constructor() { }
    
    public payment(totalAmount: string): { paymentLink: string } {
        // some logic
        return { paymentLink: "stripe link" };
    }
}
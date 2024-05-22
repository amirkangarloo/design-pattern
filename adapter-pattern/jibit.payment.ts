// This is Adaptee
export class JibitPayment {
    constructor() { }
    
    public getPaymentLink({amount: number}): { link: string } {
        // some logic
        return { link: "jibit link" };
    }
}
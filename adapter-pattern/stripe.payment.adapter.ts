import { IPayment, InvoiceEntity } from "./payment.service";
import { StripePayment } from "./stripe.payment";

export class StripePaymentAdapter implements IPayment {
    private stripe: StripePayment;

    constructor() {
        this.stripe = new StripePayment();
    }

    // Wrap
    generateLinkForPayInvoice(invoice: InvoiceEntity): { gatewayLink: string; } {
        const { price } = invoice;
        const totalAmount = price.toString();
        const { paymentLink } = this.stripe.payment(totalAmount);
        return { gatewayLink: paymentLink };
    }
    
}
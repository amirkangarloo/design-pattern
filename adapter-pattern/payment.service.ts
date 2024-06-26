import { JibitPaymentAdapter } from "./jibit.payment.adapter";
import { StripePaymentAdapter } from "./stripe.payment.adapter";

export class InvoiceEntity {
    id: number;
    paymentMethod: PaymentMethodEnum;
    price: number
}

export enum PaymentMethodEnum {
    STRIPE = 'STRIPE',
    JIBIT = 'JIBIT'
}

// This is target
export interface IPayment {
    generateLinkForPayInvoice(invoice: InvoiceEntity): { gatewayLink: string };
}

// This is client - Use singleton pattern
export class Payment {

    private static instance: Payment;
    
    private PaymentGatewayDictionary = {
        [PaymentMethodEnum.JIBIT]: new JibitPaymentAdapter(),
        [PaymentMethodEnum.STRIPE]: new StripePaymentAdapter(),
    }

    private constructor() {}

    static getInstance() {
        if (!this.instance)
            this.instance = new Payment();
        return this.instance;
    }

    payInvoice(invoice: InvoiceEntity): { gatewayLink: string; } {
        const { paymentMethod } = invoice;
        const paymentGateway = this.PaymentGatewayDictionary[paymentMethod];
        if (!paymentGateway) throw new Error('Payment method not valid');
        return paymentGateway.generateLinkForPayInvoice(invoice);
    }
}
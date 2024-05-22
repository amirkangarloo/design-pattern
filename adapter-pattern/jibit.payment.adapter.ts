import { JibitPayment } from "./jibit.payment";
import { IPayment, InvoiceEntity } from "./payment.service";

export class JibitPaymentAdapter implements IPayment {
    private jibit: JibitPayment;

    constructor() {
        this.jibit = new JibitPayment();
    }

    // Wrap
    generateLinkForPayInvoice(invoice: InvoiceEntity): { gatewayLink: string; } {
        const { price: amount } = invoice;
        const { link } = this.jibit.getPaymentLink({ amount });
        return { gatewayLink: link };
    }

}
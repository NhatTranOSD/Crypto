export class TokenOrder {
    id: string;
    receiveTxHash: string;
    SendTxHash: string;
    CreatedDate: string;
    BuyerId: string;
    Amount: number;
    Fee: number;
    TotalPayment: number;
    tokenName: string;
    tokenOrderStatus: TokenOrderStatus
}

export enum TokenOrderStatus {
    pending = 0,
    failed = 1,
    successed = 2
}

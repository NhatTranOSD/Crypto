export class TokenOrder {
    id: string;
    receiveTxHash: string;
    sendTxHash: string;
    revertTxHash: string;
    createdDate: string;
    buyerId: string;
    buyerEmail: string;
    amount: number;
    fee: number;
    totalPayment: number;
    tokenOrderStatus: number;
    pairType: number;
}

export const TokenOrderStatus = [
    'Pending',
    'Failed',
    'Successed',
    'Reverting by Admin',
    'Reverted by Admin'
]

export const PairType = [
    'ETH-FCO'
]

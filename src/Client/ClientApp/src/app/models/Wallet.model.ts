import { WalletCurrency } from './WalletCurrency.model';

export class Wallet {
    id: string;
    userId: string;
    account: Account;
    createdDate: string;
    walletCurrency: WalletCurrency;
}

export class Account {
    address: string;
}

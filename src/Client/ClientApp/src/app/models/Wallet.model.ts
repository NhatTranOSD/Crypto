import { WalletCurrency } from './WalletCurrency.model';

export class Wallet {
    id: string;
    userId: string;
    address: string;
    createdDate: string;
    walletCurrencys: WalletCurrency[];
}

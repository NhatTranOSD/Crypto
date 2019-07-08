import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { environment } from '../../../../environments/environment';
import { TokenConfig } from '../../../models/TokenConfig.model';
import { TokenTransaction } from '../../../models/TokenTransaction.model';
import { ETHTransaction } from '../../../models/ETHTransaction.model';
import { TokenTxResponse } from 'src/app/models/responsemodels/TokenTxResponse.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public adminAddress: string;
  public contractAdress: string;
  public tokenConfig: TokenConfig;
  public tokenConfigForm: FormGroup;
  public formSubmitted: boolean;
  public formLoading: boolean;
  
  public tokenList : TokenTxResponse[];
  public ETHList : TokenTxResponse[];
  public transactionTypeToken = [];
  public transactionTypeETH = [];
  public curr = new Date();
  public firstday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()));
  public lastday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+6));
  
  public days = [];
  public dataReportToken = [];
  public dataReportETH = [];
  
  
  constructor(public tokenService: TokenService, private formBuilder: FormBuilder, private modalService: NgbModal, ) {
    this.adminAddress = environment.adminAddress;
    this.contractAdress = environment.contractAddress;
  }

  ngOnInit ()  {
    this.tokenService.getTokenConfig();

    this.tokenService.getTokenTransactions(this.adminAddress, this.contractAdress, 'desc').subscribe(
      data => {
        this.tokenList = data.result;
        this.daysOfWeek();
        this.dataTokenTransactionReport();
      },
      error => {
        console.log(error);
      });

    this.tokenService.getETHTransactions(this.adminAddress,'desc').subscribe(
      data => {
        this.ETHList = data.result;
        console.log(this.ETHList);
      },
      error => {
        console.log(error);
      });
  }
  get f() { return this.tokenConfigForm.controls; }

  public convertToDateTime(unixtimestamp: string): any {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(+unixtimestamp * 1000);

    // Will display time in 10:30:23 format
    const formattedTime = date.toLocaleString();

    return formattedTime;
  }

  dataTokenTransactionReport(){
    for(var i = 0; i <= 6; i++){
       var transactionTokenTotal = this.totalTransTypeToken(this.days[i]);
       var transactionETHTotal = this.totalTransTypeETH(this.days[i]);

       var tokenTransaction = new TokenTransaction();
       var ethTransaction = new ETHTransaction();

       tokenTransaction.date = this.days[i];
       tokenTransaction.totalIn = transactionTokenTotal[0];
       tokenTransaction.totalOut = transactionTokenTotal[1];
       tokenTransaction.totalFee = transactionTokenTotal[2];

       ethTransaction.date = this.days[i];
       ethTransaction.totalIn = transactionETHTotal[0];
       ethTransaction.totalOut = transactionETHTotal[1];
       ethTransaction.totalFee = transactionETHTotal[2];

       this.dataReportToken.push(tokenTransaction);
       this.dataReportETH.push(ethTransaction);
    }
   console.log(this.ETHList);
  }

  daysOfWeek(){
    for (var i = 0; i <= 6; i++) {
      this.days.push((this.firstday.setDate(this.firstday.getDate() + 1)));
    };
  }

  totalTransTypeToken(date : number) : number[]{
    var dateStr = new DatePipe("en-US").transform(date,'dd/MM/yyyy');
    var tokenNumIn = 0;
    var tokenNumOut = 0;
    var tokenFee = 0;
    var fee = 0;

    for(var item of this.tokenList){
      var itemTimeStamp = new DatePipe("en-US").transform(Number(item.timeStamp)*1000,'dd/MM/yyyy');
      if(itemTimeStamp == dateStr){
        fee = (Number(item.gasPrice)/1000000000)*(Number(item.gas))/1000000000;
        tokenFee += fee;
        if(itemTimeStamp == dateStr && !this.equalString(item.from, this.adminAddress)){
          tokenNumIn ++;
        }
        else if(itemTimeStamp == dateStr && this.equalString(item.from, this.adminAddress)){
        tokenNumOut ++;
        }
      }
    } 
    this.transactionTypeToken = [];
    this.transactionTypeToken.push(tokenNumIn,tokenNumOut,tokenFee);
    return this.transactionTypeToken;
  }

  totalTransTypeETH(date: number) : number[]{
    var dateStr = new DatePipe("en-US").transform(date,'dd/MM/yyyy');
    var ETHNumIn = 0;
    var ETHNumOut = 0;
    var ETHFee = 0;
    var fee = 0;
    for(var item of this.ETHList){

      var itemTimeStamp = new DatePipe("en-US").transform(Number(item.timeStamp)*1000,'dd/MM/yyyy');

      if(itemTimeStamp == dateStr){

        fee = (Number(item.gasPrice)/1000000000)*(Number(item.gas))/1000000000;
        ETHFee += fee;

        if(!this.equalString(item.from, this.adminAddress)){
            ETHNumIn ++;
        }
        else if(this.equalString(item.from, this.adminAddress)){
            ETHNumOut ++;
        }
      }

    }
    this.transactionTypeETH = [];
    this.transactionTypeETH.push(ETHNumIn,ETHNumOut,ETHFee);
    return this.transactionTypeETH;
  }

  equalString(a: string, b: string) {
    if (a.toLowerCase() === b.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

  editOpen(content, item: TokenConfig) {
    this.tokenConfig = item;
    this.tokenConfigForm = this.formBuilder.group({
      tokenName: [item.tokenName, Validators.required],
      priceUSD: [item.priceUSD, Validators.required],
      gasLimit: [item.gasLimit, Validators.required],
      gasPricesInGwei: [item.gasPricesInGwei, Validators.required],
    });
    this.modalService.open(content);
  }

  editSave() {
    this.formSubmitted = true;
    this.formLoading = true;
    // stop here if form is invalid
    if (this.tokenConfigForm.invalid) {
      this.formLoading = false;
      return;
    }
    const requestModel: TokenConfig = {
      id: this.tokenService.tokenConfig.id,
      tokenName: this.tokenService.tokenConfig.tokenName,
      tokenSymbol: this.tokenService.tokenConfig.tokenSymbol,
      contractAddress: this.tokenService.tokenConfig.contractAddress,
      adminAddress: this.tokenService.tokenConfig.adminAddress,
      decimals: this.tokenService.tokenConfig.decimals,
      priceUSD: this.f.priceUSD.value,
      gasLimit: this.f.gasLimit.value,
      gasPricesInGwei: this.f.gasPricesInGwei.value,

    };

    this.tokenService.updateTokenConfig(requestModel).pipe()
      .subscribe(
        data => {
          if (data) {
            this.modalService.dismissAll();
            this.tokenService.getTokenConfig();
          }
          this.formLoading = false;
          this.formSubmitted = false;
        },
        error => {
          this.formLoading = false;
          this.formSubmitted = false;
        });
  }
  public closeModal(reason: any): void {
    this.modalService.dismissAll();
    this.formSubmitted = false;
  }

}

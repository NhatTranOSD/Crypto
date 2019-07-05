import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { environment } from '../../../../environments/environment';
import { TokenConfig } from '../../../models/TokenConfig.model';
import { TokenTransaction } from '../../../models/TokenTransaction.model';
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
  public currentDate = new Date();
  public tokenList : TokenTxResponse[];
  public transactionType = [];
   curr = new Date;
   firstday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()));
   lastday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+6));
  
  public days = [];
  public dataReport = [];
  
  
  constructor(public tokenService: TokenService, private formBuilder: FormBuilder, private modalService: NgbModal, ) {
    this.adminAddress = environment.adminAddress;
    this.contractAdress = environment.contractAddress;
  }

  ngOnInit ()  {
    this.tokenService.getTokenConfig();
    this.tokenService.getTokenTransactions(this.adminAddress, this.contractAdress, 'asc').subscribe(
      data => {
        this.tokenList = data.result;
        this.daysOfWeek();
        this.dataTokenTransactionReport();
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
       var transactionTotal = this.totalTransType(this.days[i]);
       var tokenTransaction = new TokenTransaction();
       tokenTransaction.date = this.days[i];
       tokenTransaction.totalIn = transactionTotal[0];
       tokenTransaction.totalOut = transactionTotal[1];
     
       this.dataReport.push(tokenTransaction);
    }
   console.log(this.dataReport);
  }
  daysOfWeek(){
    for (var i = 0; i <= 6; i++) {
      this.days.push((this.firstday.setDate(this.firstday.getDate() + 1)));
    };
  }

  totalTransType(date : number) : number[]{
    var dateStr = new DatePipe("en-US").transform(date,'dd/MM/yyyy');
    var numIn = 0;
    var numOut = 0;
    
    
    for(var item of this.tokenList){
      var itemTimeStamp = new DatePipe("en-US").transform(Number(item.timeStamp)*1000,'dd/MM/yyyy');
      if(itemTimeStamp == dateStr && !this.equalString(item.from, this.adminAddress)){
        numIn ++;
      }
      else if(itemTimeStamp == dateStr && this.equalString(item.from, this.adminAddress)){
        numOut ++;
      }
    }
    this.transactionType.push(numIn,numOut);
    console.log(this.transactionType);
    //console.log(this.days[0]);
    return this.transactionType;
    
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

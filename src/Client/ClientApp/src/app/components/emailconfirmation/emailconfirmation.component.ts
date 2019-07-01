import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public loading: boolean = true;
  public result : string;
  public userId : string;
  public code : string;
  
  constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router,) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userid'];
      this.code = params['code'];
    }
  );
  }
  ngOnInit() 
  {
    this.confirmEmail();
  }

  confirmEmail() : void {
  this.authenticationService.emailConfirmation(this.userId, this.code)
  .pipe()
  .subscribe(
    data => {
      if(data != null)
      {
        this.result = data;
        this.loading = false
      }
     
    });
    console.log(this.result);
  }
}





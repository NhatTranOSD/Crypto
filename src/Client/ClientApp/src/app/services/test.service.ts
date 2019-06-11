import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
    // this.click();
  }

  public click(): void {
    this.http.get<any>(`${environment.authApi}api/Values/1`).subscribe(data => {
      console.log(data);
    });
  }

}

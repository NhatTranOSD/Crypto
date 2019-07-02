import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
@Injectable({
  providedIn: 'root'
})
export class NotifyService  {private notifier: NotifierService;
  public constructor( notifier: NotifierService ) {	this.notifier = notifier; }
  public showNotification( type: string, message: string ) {
    this.notifier.notify( type, message );
  }

// 	public hideOldestNotification() {
//     this.notifier.hideOldest();
//   }
// 	public hideNewestNotification(){
// 		this.notifier.hideNewest();
// 	}
// 	public hideAllNotifications(){
// 		this.notifier.hideAll();
// 	}
// 	public showSpecificNotification( type: string, message: string, id: string ) {
// 		this.notifier.show( {
// 			id,
// 			message,
// 			type
// 		});
// 	}
//  public hideSpecificNotification( id: string ) {
// 		this.notifier.hide( id );
// 	}
}

import { Component } from '@angular/core';
import { Push,PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private push: Push,private alertCtrl:AlertController)
   {
    // to check if we have permission
this.push.hasPermission()
.then((res: any) => {

  if (res.isEnabled) {
    console.log('We have permission to send push notifications');
    this.initPush();
  } else {
    console.log('We do not have permission to send push notifications');
  }

});
  }

  initPush()
  {
    const options: PushOptions = {
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   }
   const pushObject: PushObject = this.push.init(options);
   pushObject.on('notification').subscribe((notification: any) => 
{
  //we will ad handler here
//this.presentAlert();
let alert =  this.alertCtrl.create({
  //  title: 'New Notification',
    message: notification.message,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'See',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
 // alert.present();
}
);

   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
   
  }

  async presentAlert(){
    let alert = await this.alertCtrl.create({
    //  title: 'New Notification',
      message: 'notification.message',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'See',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
   await alert.present();
  }
  
}

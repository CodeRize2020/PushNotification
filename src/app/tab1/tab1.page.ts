import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
msg:string;
  constructor(private admobFree: AdMobFree,
  //  private firebaseConfig: FirebaseConfig
    ) {

  // this.remoteNotify();
    }
    // remoteNotify()
    // {
    //   this.firebaseConfig.getBoolean('is_my_notification_on')
    //   .then((res: any) => console.log("Tab1 Remot Config Plugin",res))
    //   .catch((error: any) => console.error("Tab1 Remot Config Plugin",error));
    //       }
showBanner()
{
  this.msg="Inside Banner";
  const bannerConfig: AdMobFreeBannerConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    id:"ca-app-pub-3578110622295181/7166555646",
   isTesting: false,
    autoShow: true
   };
   this.admobFree.banner.config(bannerConfig);
   
   this.admobFree.banner.prepare()
     .then(() => {
       // banner Ad is ready
       // if we set autoShow to false, then we will need to call the show method here
       this.showBanner();
     })
     .catch(e => console.log(e));
   
}
}

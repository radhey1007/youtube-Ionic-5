import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsService } from './services/settings.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  commonSettings: any='';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public settings :SettingsService
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadSettings();
    });
  }

   loadSettings = async () => {
    await this.settings.load().then(res=> {
      this.commonSettings = this.settings.getallSettings();
      console.log('this.commonSettings==', this.commonSettings);
    },err=> {
      console.log(err , 'err in getting settings');
    });    
  }

}

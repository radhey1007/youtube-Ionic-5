import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Storage } from '@ionic/storage';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  commonSettings: any;
  
  constructor(public settings :SettingsService , private storage: Storage,public photoService:PhotoService){
  }
  
  clearStorage = () => {
    this.removeStorage();
  }

  removeStorage = () => {
    this.settings.load().then(res=> {
     this.settings.setValue('host','');
     this.settings.setValue('projectName','');
      this.settings.save();
  },err => {
    console.log('err', err);
  });
  }

  loadSettings = async () => {
    await this.settings.load().then(res=> {
      this.commonSettings = this.settings.getallSettings();
      console.log('this.commonSettings in tabs 1 ==', this.commonSettings);
    },err=> {
      console.log(err , 'err in getting settings');
    });    
  }

  getImage = () => {
    this.photoService.loadSaved();    
    this.photoService.takePicture();
  }

}


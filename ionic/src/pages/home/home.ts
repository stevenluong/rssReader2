import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
    goToList(){
        this.navCtrl.push(ListPage);
    }
    goToConfiguration(){
        this.navCtrl.push(ConfigurationPage);
    }

}

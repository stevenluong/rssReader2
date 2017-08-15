import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
@Component({
    selector: 'configuration-list',
    templateUrl: 'configuration.html'
})
export class ConfigurationPage {
    date: string;
    today: Date;
    dayBefore: Date;
    dayAfter: Date;
    items: Array<{name: string,display: boolean}>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public events: Events) {
        this.items = this.navParams.get('sources'); 
        var d = this.navParams.get('date');
        this.updateConfDate(d);
    }
    updateSources(item){
        //console.log(item);
        for(var i=0;i<this.items.length;i++){
            if(this.items[i].name==item.name){
                this.items[i].display=!this.items[i].display;
            }
        }
        //console.log(this.items);
        this.events.publish('sources:updated', this.items);
    }
    updateStringDate(date){
        var d = new Date(date);
        this.updateDate(d);
    }
    updateDate(date){
        this.updateConfDate(date);
        //TODO opti same date, no up
        this.events.publish('date:updated', date);
    }
    updateConfDate(d){
        this.date = d.toISOString();
        this.today = new Date();
        this.dayBefore = new Date(d.getTime()-86400000);
        this.dayAfter= new Date(d.getTime()+86400000);
    }
}

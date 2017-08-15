import { Component } from '@angular/core';
import { NavController, NavParams,PopoverController,Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ConfigurationPage } from '../configuration/configuration';
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    selectedItem: any;
    icons: string[];
    date: Date;
    news: Array<{title: string, source: string, image_link: string,datetime:Date,link:string}>;
    displayedNews: Array<{title: string, source: string, image_link: string,datetime:Date,link:string}>;
    //TODO Object NEWS
    sources: Array<{name: string,display: boolean}>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController, public events: Events, public loadingCtrl: LoadingController) {
        this.date = new Date();

        this.http.get("http://apollo_ror.slapps.fr/sources.json").map(res => res.json()).subscribe(data => {
            this.sources = [];


            //this.items = {};
            console.log(data);
            for(var i=0;i<data.length;i++){
                //this.items[data[i].name]=data[i].display;
                this.sources.push({
                    name: data[i].name,
                    display: data[i].display,
                });
            };
            this.fetchNews(this.date);
            /*
            this.http.get("http://apollo_ror.slapps.fr/news.json").map(res => res.json()).subscribe(data => {
                this.news = [];
                console.log(data);
                for(var i=0;i<data.length;i++){
                    this.news.push({
                        title: data[i].title,
                        source: data[i].source,
                        image_link: data[i].image_link,
                        datetime:new Date(data[i].date),
                        link:data[i].link
                    });
                };
                this.updateNews();
            });
             */
        });

        events.subscribe('date:updated', (date) => {
            this.fetchNews(date);
        });
        events.subscribe('sources:updated', () => {
            this.updateNews();
        });
    }
    //TODO FIX TWICE BUTTON CLICK
    fetchNews(date){
        var loader = this.loadingCtrl.create({
            content: "Loading news...",
        });
        loader.present().then(()=> {
            console.log("fetchNews");
            var y = date.getFullYear();
            var m = ("0" + (date.getMonth() + 1)).slice(-2);
            var d = ("0" + date.getDate()).slice(-2);
            this.http.get("http://apollo_ror.slapps.fr/news.json?date="+y+m+d).map(res => res.json()).subscribe(data => {
                this.news = [];
                console.log(data);
                for(var i=0;i<data.length;i++){
                    this.news.push({
                        title: data[i].title,
                        source: data[i].source,
                        image_link: data[i].image_link,
                        datetime:new Date(data[i].date),
                        link:data[i].link
                    });
                };
                this.updateNews();
                loader.dismiss();
            });
        });
    }
    updateNews(){
        //TODO FILTER
        this.displayedNews = [];
        for(var k=0;k<this.news.length;k++){
            var n = this.news[k];
            for(var j=0;j<this.sources.length;j++){
                var s = this.sources[j];
                if(n.source==s.name && s.display)
                    this.displayedNews.push(n);
            }
        }
        console.log(this.displayedNews);

    }
    presentPopover(event){
        let popover = this.popoverCtrl.create(ConfigurationPage,{
            sources: this.sources,
            date: this.date
        });
        popover.present({
            ev:event
        });
    }
    openLink(event, news) {
        //console.log(news.link);
        //window.open(news.link, '_system', 'location=yes'); 
        window.open(news.link); 
        return false; 
    }
}

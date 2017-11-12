import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        //var y = new Date();
        //y.setDate(y.getDate()-1);
        this.state = {
            titles : [],
            sources : [],
            date : new Date(),
            //date : y,
        };
        fetch("http://apollo-loopback.slapps.fr/api/Sources")
            .then(result=>result.json())
            .then(sources=>{
                this.setState({sources:sources});
            })
        this.updateTitles();
    }
    updateTitles(){
        var currentDate = this.state.date;
        console.log("current:"+currentDate);
        console.log("updateTitles");
        var start = new Date(currentDate);
        //start.setDate(currentDate.getDate()-1);
        start.setHours(0,0,0,0);
        //TODO GOOD
        var s = start.toISOString();
        console.log("s:"+s);
        var end = new Date(currentDate);
        end.setHours(23,59,59,999);
        //TODO GOOD
        var e = end.toISOString();
        console.log("e:"+e);
        fetch("http://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e)
            .then(result=>result.json())
            .then(titles=>{
                console.log(titles);
                this.setState({titles:titles});
            });
    }
    toggleSource(sourceName){
        var updatedSources = []
        this.state.sources.map(source=>{
            var s;
            if(source.name===sourceName){
                s = source;
                s.display = !s.display;
            }else{
                s = source;
            }
            updatedSources.push(s);
        });
        this.setState({sources:updatedSources});
    }
    updateDate(date){
        this.setState({date:date},()=>{
            this.updateTitles();
        });
    }
    render() {
        var date = this.state.date;
        var beforeDate = new Date(date.getTime());
        beforeDate.setDate(date.getDate()-1);
        var afterDate = new Date(date.getTime());
        afterDate.setDate(date.getDate()+1);
        var d = ("0" + date.getDate()).slice(-2);
        var m = ("0" + (date.getMonth() + 1)).slice(-2);
        var y = date.getFullYear();
        var selectedTitles = [];
        var selectedSources = [];
        this.state.sources.map(source=>{
            if(source.display)
                selectedSources.push(source.name);
        });
        this.state.titles.map(title=>{
            if(selectedSources.indexOf(title.source)>=0)
                selectedTitles.push(title);
        });
        selectedTitles.sort(function(a,b){
            return new Date(b.datetime) - new Date(a.datetime);
        })
        return (
                <div>
                <h1>Apollo</h1>
                <div>Date : {y+'-'+m+'-'+d}</div>
                <button onClick={()=>this.updateDate(beforeDate)}>Before</button><button onClick={()=>this.updateDate(afterDate)}>After</button>
                <div>Sources: {this.state.sources.map(source=>
                        <Source 
                        key={source.id}
                        name={source.name}
                        display={source.display}
                        onClick={()=>this.toggleSource(source.name)}
                        />)}
                </div>
                <table>
                <tbody>
                <tr>
                <th>date</th>
                <th>source</th>
                <th>image</th>
                <th>title</th>
                </tr>
                {selectedTitles.map(title=>
                        <Title 
                        key={title.guid}
                        date={title.datetime}
                        source={title.source}
                        image={title.image_link}
                        title={title.title}
                        />
                        )}
        </tbody>
            </table>
            </div>
            );
    }
}
class Title extends Component {
    render() {
        return (
                <tr>
                <td>{time(this.props.date)}</td>
                <td>{this.props.source}</td>
                <td><img src={this.props.image} alt="" height="45"/></td>
                <td>{this.props.title}</td>
                </tr>
               );
    }
}
class Source extends Component {
    render() {
        return (
                <Button bsStyle="primary" onClick={this.props.onClick}>{this.props.name} - {this.props.display?"Y":"N"}</Button>
               );
    }
}
function time(date){
    var d = (new Date(date)).toString();
    return d.substring(16,18)+':'+d.substring(19,21);
};

export default App;

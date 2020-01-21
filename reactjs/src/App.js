import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
            toggled : false,
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
    toggle(){
        this.setState({toggled:!this.state.toggled});
        console.log(this.state.toggled);
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
                <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                <a href="#">Apollo</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                <NavItem eventKey={1} href="#" onClick={()=>this.toggle()}>
                Filters
                </NavItem>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div id="wrapper" className={this.state.toggled?"toggled":""}>
                <div id="sidebar-wrapper">
                <div>Date : {y+'-'+m+'-'+d}</div>
                <Button onClick={()=>this.updateDate(beforeDate)}>Before</Button><Button onClick={()=>this.updateDate(afterDate)}>After</Button>
                <hr/>
                <div>Sources: {this.state.sources.map(source=>
                        <Source 
                        key={source.id}
                        name={source.name}
                        display={source.display}
                        onClick={()=>this.toggleSource(source.name)}
                        />)}
        </div>
            </div>

            <div id="page-content-wrapper">
            <Table responsive striped hover>
            <thead>
            <tr>
            <th>Image</th>
            <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {selectedTitles.map(title=>
                    <Title 
                    key={title.guid}
                    date={title.datetime}
                    source={title.source}
                    image={title.image_link}
                    link={title.link}
                    title={title.title}
                    />
                    )}
        </tbody>
            </Table>
            </div>
            </div>
            </div>
            );
    }
}
class Title extends Component {
    render() {
        return (
                <tr>
                <td><img src={this.props.image} alt="" height="40"/></td>
                <td><a href={this.props.link}>{this.props.title}</a><br/>{this.props.source} - {time(this.props.date)}</td>
                </tr>
               );
    }
}
class Source extends Component {
    render() {
        return (
                <Button bsStyle={this.props.display?"primary":"default"} onClick={this.props.onClick}>{this.props.name}</Button>
               );
    }
}
function time(date){
    var d = (new Date(date)).toString();
    return d.substring(16,18)+':'+d.substring(19,21);
};

export default App;

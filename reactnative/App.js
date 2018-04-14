import React from 'react';
import { StyleSheet, Text, View, ScrollView, SectionList,YellowBox  } from 'react-native';
import { Button, Header,ListItem,Avatar } from 'react-native-elements';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class App extends React.Component {
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
        var selectedSources = [];
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
     const list = [
       {
         title: 'Appoazeoiazje oazejaioze azioej azoiej azoiej aoejazoiejaz ioejaz intments',
         icon: 'av-timer'
       },
       {
         title: 'Trips',
         icon: 'flight-takeoff'
       },

]
       return (
<View>
<Header
leftComponent={{ icon: 'menu', color: '#fff' }}
centerComponent={{ text: 'Apollo', style: { color: '#fff' } }}
rightComponent={{ icon: 'home', color: '#fff' }}
/>

<ScrollView>
{
selectedTitles.map((item, i) => (
  <ListItem
         key={i}
         title={item.title}
         subtitle={item.source+"-"+time(item.datetime)}
         avatar={<Avatar source={{uri:item.image_link}}/>}
       />
))
}
</ScrollView>


</View>




           );
   }

}
function time(date){
    var d = (new Date(date)).toString();
    return d.substring(16,18)+':'+d.substring(19,21);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

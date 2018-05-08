import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as api from './api'
import * as NumberFormat from 'react-number-format';



class App extends Component {

  state = {
    data: [],
    records: 3,
    sortOrder: "ascend",
    sortCriteria: "accountNumber"
  }

  componentDidMount(){

  api.get().then(d =>{
    this.setState({data: d.sort(function(a, b){

     var l=a["accountNumber"];
      var m=b["accountNumber"];
    return ((l < m) ? -1 : ((l > m) ? 1 : 0));

    })})
  })
  };
  showTest=()=>
  {
this.setState({records: 4});

  }

  showMore=()=>{
   this.setState({records: this.state.data.length});
   var x=document.getElementById("button");
   x.parentNode.removeChild(x);
  }
  showTt=()=>
  {
this.setState({records: 5});

  }

  sorting=(criteria)=>{
    var newData = [];
    var newSortOrder = (this.state.sortOrder=="ascend" ? "descend" : "ascend");

    newData = this.state.data.sort(function(a, b){      
                        var l=a[criteria];
                        var m=b[criteria];
                        
                        
                        if (newSortOrder=="ascend")
                           return ((l > m) ? -1 : ((l < m) ? 1 : 0));
                      else if(newSortOrder=="descend") 
                        return ((l < m) ? -1 : ((l > m) ? 1 : 0));
          });
    
    this.setState({      
      data: newData ,
     sortCriteria: criteria,
      sortOrder: newSortOrder});
  } 
  

  render() {
      
    return (
      
      <div className="App">
      <div className="bkcolor">
            <div className="cashHeader">
            <input type="button" className="headerButtons" value="Available Cash" onClick={(criteria)=>this.sorting("cash")} />
            {this.state.sortCriteria === "cash" &&
            <input type="image" className={this.state.sortOrder==="ascend"?"upArrow":(this.state.sortOrder==="descend"?"downArrow":"hide")} />
            }
            </div>
            <div className="line">
               <span className="accountHeader">
               <input type="button" className="headerButtons" value="Account" onClick={(criteria)=>this.sorting("accountNumber")} />
               </span>
               {this.state.sortCriteria ==="accountNumber" &&
            <input type="image" className={this.state.sortOrder==="ascend"?"upArrow":(this.state.sortOrder==="descend"?"downArrow":"hide")} />
               }
               <span className="percentHeader">Today's Change</span>
            </div>
       </div>
           

           <div>
           <ol className="list-spacing">
            {this.state.data.slice(0,this.state.records).map(acc=>
            <li className="detailsList" key={acc.accountNumber}>
   
              <div className="container">
               <div className="fixed">
               <span> {acc.accountType} &nbsp; - &nbsp; {acc.accountNumber}</span>
                </div>             
               <div className="flex-item">
               <NumberFormat value={acc.cash} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => 
                <span className="cashPosition">{value}</span> } />               
   
               <br/>

               <span className="percentPosition">
                  
                  {acc.todayChangePercent>0
                    &&
                    <span className="percentGreen">+{acc.todayChangePercent}%{` `}/{` `}{acc.currency}{acc.value.toFixed(2)}
                 </span>}

                  {acc.todayChangePercent==0 &&
                    <span className="percentGray">0.00%{` `}/{` `}{acc.currency}{acc.value.toFixed(2)}</span>}

                 {acc.todayChangePercent<0 &&
                 <span className="percentRed">{acc.todayChangePercent}%{` `}/{` `}{acc.currency}{acc.value.toFixed(2)}</span>
                  }
                    
                </span>
                </div>
                </div>
               </li>
              
        )}

        </ol>
        </div>
        <div className="button">
        <input type="submit" id="button" value="Load more" onClick={this.showMore}/>
        </div>
      </div>
      
    );
  }
}

export default App;

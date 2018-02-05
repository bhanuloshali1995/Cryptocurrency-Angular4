import { Component } from '@angular/core';
import { GetCryptoDataService } from './get-crypto-data.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var Highcharts:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private cryptoResponseArray=[];
  private timer=null;
   
  constructor(private getCryptoData:GetCryptoDataService){  //GetCryptoDataService contains the method which is used to fetch the data from the given API 
    }

  ngOnInit(){  //Function called when component is initialized
    this.logCryptoData();
    this.countDownTimer();
    setInterval(()=>{this.countDownTimer();console.log("Refreshed after 5 min");this.logCryptoData()},300000);
  }

  //Function is made async becuase we will wait till the Promise is resolved and then continue further
  async logCryptoData(){  
    let currencyName=[]; //Array of Crypto currency name
    let currencyValueInUSD=[]; //Array of Crypto currency cost in USD
    await this.getCryptoData.callApiForCryptoData().   //will stop the execution until Promise is resolved 
      then(
        (data)=>{
          this.cryptoResponseArray=data;   //Data from the Service GetCryptoDataService
        }
      );
      this.cryptoResponseArray.forEach((obj)=>{
        currencyName.push(obj.name);
        currencyValueInUSD.push(parseFloat(obj.price_usd));
      })
      this.drawBarChart(currencyName,currencyValueInUSD);  //Will draw bar graph
    }
    /* Function to generate chart using High Charts*/ 
  drawBarChart(currencyName,currencyValueInUSD){
    //It will show error but ignore it as we have directly included the JS file of HighCharts
    Highcharts.chart('container', {
      chart: {
          type: 'column' //Vertical Bar graph
      },
      title: {
          text: 'Crypto Currencies exchange rate in USD($)' //Title 
      },
      subtitle: {
          text: 'Api: https://api.coinmarketcap.com/v1/ticker/?limit=10'
      },
      xAxis: {
          title:{
            text: 'Crypto Currencies'
  
          },
          categories:  //Passing array containing names of Crypto currencies
              currencyName
          ,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'USD($)'
          }
      },
      tooltip: {
          
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          series: {
            dataLabels: {
                enabled: true,
            },
            minPointLength: null
        }
      },
      series: [{ //Data that is cost of Crypto currency is passed here as an array
          name:"Cost(USD)" ,
          data: currencyValueInUSD
      }]
  });
}
/**  Function to generate count-down timer of 5 mins  **/
countDownTimer(){ 
    clearInterval(this.timer); //Added so that the timer can be reloaded again.
    let min=4 ; //Minutes
    let sec=59 ;//Seconds
    let timerValue; //This will contain a string of min and sec for displaying in UI
    let htmlElemForTimerView=document.getElementById("counter_value"); //Contains the html element so that the value can be displayed in UI
    htmlElemForTimerView.innerHTML=0+""+5+"m "+0+""+0+"s"; // will set the string as 05m 00sec
    this.timer=setInterval(()=>{
        if(0==sec){  //If 1 min is completed
            min--;  
            sec=60;  
        }
        if(10>sec){
            timerValue=0+""+min+"m "+0+sec+"s"; //will set the string as 0Xm 0Yec where X,Y are variables
        }
        else{
            timerValue=0+""+min+"m "+sec+"s";    //will set the string as 0Xm XXsec where X,Y are variables
        }
        htmlElemForTimerView.innerHTML=""; // To remove the previous value
        htmlElemForTimerView.innerHTML=timerValue; //changing the value in UI 
        sec--;
    },1000)
}
}

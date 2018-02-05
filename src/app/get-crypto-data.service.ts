import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetCryptoDataService{
  constructor(private http:Http  ) { }
  callApiForCryptoData(){
      return this.http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10").map((res:Response)=>{return res.json()}).toPromise();
  }
}

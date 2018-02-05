import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { GetCryptoDataService } from './get-crypto-data.service';
import { Http } from '@angular/http/src/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpModule
  ],
  providers: [GetCryptoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}

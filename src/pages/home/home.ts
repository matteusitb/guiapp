import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  searchQuery: string = '';
  btns: any;

  constructor(private http: HttpClient,
      navParams: NavParams,
      public navCtrl: NavController,) {   
  }
  
}

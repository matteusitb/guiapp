import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { GuiaDetalhePage } from '../../pages/guia-detalhe/guia-detalhe';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-guia',
  templateUrl: 'guia.html'
})
export class GuiaPage{
  public allCategory = [];
  searchQuery: string = '';

  private data:any[];
  public searchItems = [];
  public allAnunciantes: any = [];
  public isEmpty = true;
  
  constructor(private http: HttpClient,navParams: NavParams,public navCtrl: NavController, public DataProvider: DataProvider){
    this.DataProvider.getAll()
      .subscribe((data)=>{
        this.data = data.map((items)=>{
          items = items.items.filter((anunciantes)=>{
            this.allAnunciantes.push(anunciantes);
            console.log(this.allAnunciantes);
          });
        });
      });
      this.isEmpty = false;
  }

  initializeItems() {
    this.searchItems = this.allAnunciantes;
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isEmpty = true;
      this.searchItems = this.searchItems.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.searchItems=[];
      this.isEmpty = false;
    }
  }

  ionViewDidLoad(){
    this.DataProvider.getAll()
    .subscribe(response =>{
      this.allCategory = response;
    })
  }
 
  goToDetailsOfCategory(category){
    this.navCtrl.push(GuiaDetalhePage, {
      categoryDetails: category
    })
  }
}

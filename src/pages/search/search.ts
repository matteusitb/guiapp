import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery: string = '';
  private data:any[];
  public searchItems = [];
  public allAnunciantes: any = [];
  public isEmpty = true;
  constructor(
    private DataProvider: DataProvider, 
    public http: HttpClient, 
    public navCtrl: NavController) {

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

  goToProductDetailPage(product){

  }

  ionViewDidLoad() {
   
  }

}

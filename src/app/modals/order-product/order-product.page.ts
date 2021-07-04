import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.page.html',
  styleUrls: ['./order-product.page.scss'],
})
export class OrderProductPage implements OnInit {

  productorsList: Observable<any[]>;

  allProductsList: Observable<any[]>;

  productsList:string;
  orderDate;

  modalTitle: string;
  modelId: number;

  orderQuantity:number;

  selectedProductor: string = "";
  test = "";

  selectedProd: string;

  connecterUserEmail: string;
  connected:boolean;

  arr = [];
  arrIndex = {};

  orderArray = [];

  constructor(public afDB: AngularFireDatabase,public afAuth: AngularFireAuth, private modalController: ModalController, private navParams: NavParams, ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log("connecté");
        this.connected = true;
        this.connecterUserEmail = auth.email;
      }
    });

    this.orderDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.productorsList = afDB.list('Productors').valueChanges();

    this.allProductsList = afDB.list('Products').valueChanges();

    console.log(this.productorsList);


  }

  ngOnInit() {
  }

  selectedProdChange(){
    console.log(this.selectedProd);
    this.test = this.selectedProd;
  }

  order() {
    this.afDB.list('Orders').push({
      products: this.orderArray,
      orderDate: this.orderDate,
      productorName: this.selectedProd.toString(),
      from: this.connecterUserEmail
    });

    this.productsList = '';
    this.orderDate = '';
    this.closeModal();
  }
  t(q, n:string){
    var element = document.getElementById('idOrder');
    console.log("OO : " + element)
    console.log(q, n);
  }

  add(arr, n, q) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some(el => el.product === n);
    if (!found) arr.push({ id, product: n, quantity: q });
    else{
      for (var i in this.orderArray) {
        if (this.orderArray[i].product == n) {
          this.orderArray[i].quantity = q;
           break;
        }
      }
   
    }
    console.log(this.orderArray);
  }

  
  


  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  selectProductor(p){
    this.selectedProductor = p;
    console.log(this.selectedProductor);
    //console.log(p)

  }

}

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConnectPage } from 'src/app/modals/connect/connect.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AddproductPage } from 'src/app/modals/addproduct/addproduct.page'
import { ModifyProductPage } from 'src/app/modals/modify-product/modify-product.page'
import { OrderProductPage } from 'src/app/modals/order-product/order-product.page'
import { Observable } from 'rxjs';

ModifyProductPage


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataUser = {
    email: '',
    password: ''
  };
  connecterUserEmail: string;
  connectedUserUid: string;
  connected:boolean;

  productsInventory: Observable<any[]>;

  ordersInventory: Observable<any[]>;

  getTransactionList: Observable<any[]>;

  dataReturned: any;

  todayDate = new Date();
  inSevenDay = new Date();

  productorName;

  day:string;
  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth, public modalController: ModalController) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log("connecté");
        this.connected = true;
        this.connecterUserEmail = auth.email;
        this.connectedUserUid = auth.uid;
      }
    });

    this.productsInventory = afDB.list('Products').valueChanges();
    this.ordersInventory = afDB.list('Orders').valueChanges();

    console.log(this.productsInventory);


    let transactionTemp = this.afDB.list('Products');
    this.getTransactionList = transactionTemp.valueChanges();

  }


//#region 
  async openModal() {
    const modal = await this.modalController.create({
      component: ConnectPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  returnType(p){
    return typeof(p);
  }

  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  returnDay(p){
    var a = Number(p);
    a = a+1;
    p = a.toString()
    //return p;
    this.day = this.pad(p);
    //return typeof(this.day);
    return this.day;
  }

  
  returnTodayDate(){
    // getMount + 1 => January is 0 and december 11
    var a = this.todayDate.getFullYear() + "-" + this.pad(this.todayDate.getMonth()+1) + "-" + this.pad(this.todayDate.getDate());
    return a.toString();
  }

  returnInSevenDay(){
    const nextWeek = new Date()
    nextWeek.setDate(new Date().getDate() + 7)
    var a = nextWeek.getFullYear() + "-" + this.pad(nextWeek.getMonth()+1) + "-" + nextWeek.getDate();
    return a;
  }

  async modifyProductModal(i){
    const modal = await this.modalController.create({
      component: ModifyProductPage,
      componentProps: {
        "productName": i.Name,
        "productDesc": i.Desc,
        "productQuantity": i.Quantity,
        "expirationDate": i.expirationDate,
        "KEY : ": i.key
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
    
  }

  async addProductModal(){
    const modal = await this.modalController.create({
      component: AddproductPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Add product title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  deleteAll() {
    const ref = this.afDB.list('Products');
    ref.remove();
  }

  removeFromInventaire(){
    const itemsRef = this.afDB.list('Products');
    // to get a key, check the Example app below
    console.log('clic')
    itemsRef.remove('MYu48fpKUBfOMOsKe6R');
    
  }

  async orderProductModal(){
    const modal = await this.modalController.create({
      component: OrderProductPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  addProductor(){
    this.afDB.list('Productors').push({
      productorName: this.productorName,
    });
    this.productorName = '';
  }

}

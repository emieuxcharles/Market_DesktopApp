import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.page.html',
  styleUrls: ['./order-product.page.scss'],
})
export class OrderProductPage implements OnInit {

  productorsList: Observable<any[]>;

  productsList:string;
  orderDate;

  modalTitle: string;
  modelId: number;

  selectedProductor: string = "";

  selectedProd: string;

  constructor(public afDB: AngularFireDatabase, private modalController: ModalController, private navParams: NavParams, ) {
    this.orderDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.productorsList = afDB.list('Productors').valueChanges();

    console.log(this.productorsList);


  }

  ngOnInit() {
  }

  order() {
    this.afDB.list('Orders').push({
      products: this.productsList,
      orderDate: this.orderDate,
      productorName: this.selectedProd
    });

    this.productsList = '';
    this.orderDate = '';
    this.closeModal();
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

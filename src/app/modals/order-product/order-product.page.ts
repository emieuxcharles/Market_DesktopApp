import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';



@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.page.html',
  styleUrls: ['./order-product.page.scss'],
})
export class OrderProductPage implements OnInit {

  productsList:string;
  orderDate;

  modalTitle: string;
  modelId: number;

  constructor(public afDB: AngularFireDatabase, private modalController: ModalController, private navParams: NavParams, ) {
    this.orderDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  }


  ngOnInit() {
  }

  order() {
    this.afDB.list('Orders').push({
      products: this.productsList,
      orderDate: this.orderDate
    });

    this.productsList = '';
    this.orderDate = '';
    this.closeModal();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}

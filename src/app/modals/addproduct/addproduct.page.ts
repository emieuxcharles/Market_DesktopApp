import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  productName:string;
  productDesc:string;
  productQuantity;
  expirationDate;

  modalTitle: string;
  modelId: number;

  constructor(public afDB: AngularFireDatabase, private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  addProduct() {
    this.afDB.list('Products').push({
      Name: this.productName,
      Desc: this.productDesc,
      Quantity: this.productQuantity,
      expirationDate: this.expirationDate
    });
    this.productName = '';
    this.productDesc = '';
    this.productQuantity = '';
    this.closeModal();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}

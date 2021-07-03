import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

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

  connecterUserEmail: string;
  connected:boolean;

  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth, private modalController: ModalController, private navParams: NavParams) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log("connecté");
        this.connecterUserEmail = auth.email;
      }
    });
  }

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
      expirationDate: this.expirationDate,
      owner: this.connecterUserEmail
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

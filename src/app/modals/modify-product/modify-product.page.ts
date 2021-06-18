import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.page.html',
  styleUrls: ['./modify-product.page.scss'],
})
export class ModifyProductPage implements OnInit {

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

    var test = this.navParams.get('customID');
    console.log(test);

  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  modifyProduct(){
    const itemsRef = this.afDB.list('Products');

    itemsRef.update('key-of-some-data', { Desc: 'newSize' });

  }

}

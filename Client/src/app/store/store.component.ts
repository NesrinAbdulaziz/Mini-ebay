import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Product} from '../Product';
import {ProductsService} from '../products.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products: Product[];
  id: String;
  op: Number;
  pname: String;
  pprice: Number;
  seller: String;
  showModal: String;
  showSeller: String;
  constructor(private userService:UserService, private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this.productsService.getProducts().subscribe(function (res) {
      if (res.msg === 'Products retrieved successfully.') {
        this.products == res.data;
        console.log(this.products);
      }
      else {
        alert(res.msg);
      }
    },
    function(error){
      alert("wrong name");
    });
  }
  updateProduct(){
    var product = {
      name: this.pname,
      price: this.pprice
    };
    this.productsService.updateProduct(product,this.id).subscribe(function (res) {
      if (res.msg === 'Product was updated successfully.') {
        alert('successfully updated');
      }
      else {
        alert(res.msg);
      }
    },
    function(error){
      alert('failed');
    });
    this.getProducts();

  }
  deleteProduct(id: string){
    this.productsService.deleteProduct(id).subscribe(function (res) {
        alert(res.msg);
    },
    function(error){
      alert('failed');
    });
    this.getProducts();
  }
  createProduct(){
    var product = {
      name:this.pname,
      price: this.pprice,
      sellerName: this.seller
    };
    this.productsService.createProduct(product).subscribe(function (res) {
        alert(res.msg);
    },
    function(error){
      alert('failed');
    });
    this.getProducts();
  }
  showProductModal(id:String){
    this.showModal='block';
    if(id){
      this.op = 1;
      this.showSeller = 'hidden';
      this.id = id;

    }
    else{
      this.op = 0;
      this.showSeller = 'visible';
    }
  }
  closeModal(): void {
    this.showModal = 'none';
  }
  execute(){
    this.showModal = 'none';
    if(this.op===0){
      this.createProduct();
    }
    else{
      this.updateProduct();

    }
  }

}

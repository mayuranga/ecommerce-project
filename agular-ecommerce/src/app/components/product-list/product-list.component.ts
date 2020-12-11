import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  protects: Product[];
  currentCatogaryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private protectService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log('searchMode' + this.searchMode);
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleListProducts() {

    // CHECK IF "ID" parameter is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log('hasCategoryId' + hasCategoryId);
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol.
      this.currentCatogaryId = +this.route.snapshot.paramMap.get('id');
      console.log('currentCatogaryIdTruID' + this.currentCatogaryId);

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
      console.log('this.currentCategoryName' + this.currentCategoryName);
    }
    else {
      // not category id available ... defult to category id 1
      this.currentCatogaryId = 1;
      this.currentCategoryName = 'Book';
    }

    // now get the products for the given catagory id
    this.protectService.getProductList(this.currentCatogaryId).subscribe(
      data => {
        this.protects = data;
      }
    )

  }


  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    // now search for the products using keyword
    this.protectService.searchProducts(theKeyword).subscribe(
      data => {
          this.protects = data;
      }
    )
  }

}



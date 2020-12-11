import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  protect: Product = new Product;
  constructor(private protectService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails(){
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.protectService.getProduct(theProductId).subscribe(
      data => {
        console.log('productvvvvvvvvvvvvvvvvvvvvvvvvvvv Categories=' + JSON.stringify(data));
        this.protect = data;
      }
    )
  }
}

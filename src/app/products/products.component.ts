import { Component, OnInit } from '@angular/core';
import { IProducts } from './products';
import { ProductService } from './products.service';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterdProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  filterdProducts: IProducts[];
  products: IProducts[] = [];

  constructor(private productService: ProductService) {
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filterdProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProducts) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

}

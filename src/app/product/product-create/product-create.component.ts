import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};
  category: null;
  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    image: new FormControl(''),
    category: new FormControl('')
  });

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }
  get nameControl() {
    return this.productForm.get('name');
  }
  get priceControl() {
    return this.productForm.get('price');
  }
  get descriptionControl() {
    return this.productForm.get('description');
  }
  get imageControl() {
    return this.productForm.get('image');
  }
  get categoryControl() {
    return this.productForm.get('category');
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categoriesBE) => {
      this.categories = categoriesBE;
    });
  }

  createProduct() {
    let product = new FormData();
    product.append('name', this.productForm.value.name);
    product.append('price', this.productForm.value.price);
    product.append('description', this.productForm.value.description);
    const files = (document.getElementById('image') as HTMLInputElement).files;
    if (files.length > 0) {
      product.append('image', files[0]);
    }
    product.append('category', this.productForm.value.category);
    console.log(product);
    this.productService.createProduct(product).subscribe(()=>{
      alert('Tạo mới thành công')
    },error => {
      console.log(error);
    })
  }

}

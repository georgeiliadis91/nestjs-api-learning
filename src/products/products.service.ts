import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

// makes the class injectable into the controller constructor
@Injectable()
export class ProductsService {
  products: Product[] = [];

  // method inside class that can be used
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id == id);
    const product = this.products[productIndex];
    if (!product) {
      // There are many error types supplied by NestJs to try out
      throw new NotFoundException('Not found');
    }
    return [product, productIndex];
  }

  // Inserting one product service
  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.floor(Math.random() * 1000).toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  // Getting products service
  getProducts() {
    return [...this.products];
  }

  // Single product method
  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  // update with patch
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }

    this.products[index] = { ...updateProduct };

    return { ...updateProduct };
  }

  // remove product
  deleteProduct(prodId: string) {
    // One method of removing.
    // const products = this.products.filter(item => item.id != prodId);
    // this.products = products;

    //  Second Method of doing things
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);

    return `item with ${prodId} has been removed`;
  }
}

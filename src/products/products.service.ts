import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, description, price);

    this.products.push(newProduct);

    return productId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProductByProductId(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    productTitle: string,
    productPrice: number,
    productDescription: string,
  ) {
    const [product, index] = this.findProductByProductId(productId);
    const updatedProduct = { ...product };
    if (productTitle) {
      updatedProduct.title = productTitle;
    }
    if (productPrice) {
      updatedProduct.price = productPrice;
    }
    if (productDescription) {
      updatedProduct.description = productDescription;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const index = this.findProductByProductId(productId)[1];
    this.products.splice(index, 1);
  }

  private findProductByProductId(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return [product, productIndex];
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  // initiallises the class of the service we created so we can use the methods we have here.
  constructor(private readonly productsService: ProductsService) {}

  // Route handling for the product post
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('title') prodDescription: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }

  // Route handling for the product get
  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  // Route handling for the product get
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id);
  }

  // patch call
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.updateProduct(
      id,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  // Delete method
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}

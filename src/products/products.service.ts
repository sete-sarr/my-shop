import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import{PaginationService
} from '../common/pagination/pagination.service';

@Injectable()
export class ProductsService {

  constructor(
  @InjectRepository(Product)
  private productsRepository: Repository<Product>,
  private readonly paginationService:PaginationService
    ) {}

   async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto)
    await this.productsRepository.save(product)
    return {message:'produit enregistre avec succes', product}
  }

  async findAll(page=1, limit=10) {
    const products =await this.productsRepository.find({
      skip:(page-1)*limit, take:limit
    });
    return {products};
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({where:{id}}
    
    
    )
    return {product}  ;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

  // 1. vérifier si le produit existe
  const product = await this.productsRepository.findOne({
    where: { id }
  });

  if (!product) {
    return { message: 'produit non trouvé' };
  }

  // 2. fusionner les nouvelles données avec l'ancien produit
  Object.assign(product, updateProductDto);

  // 3. sauvegarder les modifications
  await this.productsRepository.save(product);

  // 4. retourner le résultat
  return {
    message: 'produit mis à jour avec succès',
    product
  };
}

async remove(id: string) {

  const product = await this.productsRepository.findOne({
    where: { id }
  });

  if (!product) {
    return { message: 'produit non trouvé' };
  }

  await this.productsRepository.delete(id);

  return { message: 'produit supprimé avec succès' };
}

}

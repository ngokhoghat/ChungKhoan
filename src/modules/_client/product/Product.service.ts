import { Category } from "../../../data/entities/Categories";
import { Product } from "../../../data/entities/Products";

export default class ProductService {
  public static async getAll() {
    return Product.find().populate('category').lean().exec();
  }

  public static async findByCategory(params) {
    const product = await Product
      .find()
      .populate('category')
      .exec((err, result) => {
        
      })

    // const newProduct = product.filter((item: any) => {
    //   if (item.category) {
    //     return item;
    //   }
    // })

    return product;
  }
}
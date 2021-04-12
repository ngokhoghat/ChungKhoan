import * as fs from 'fs'
import { Product } from "../../../data/entities/Products";

export default class ProductService {
  public static async getAll() {
    return Product.find().populate('category').lean().exec();
  }

  public static async getById(id) {
    return Product.findById(id).populate('category').lean().exec();
  }

  public static async createProduct(imageFile, product) {
    let uploadPath: string;

    try {
      uploadPath = './public/uploads/' + new Date().getTime() + imageFile.name;
      const imagePath = '/uploads/' + new Date().getTime() + imageFile.name;

      const { displayName, price, quantity, category } = product;

      return Product.create({
        displayName: displayName,
        imageLinks: imagePath,
        category: category,
        price: price,
        quantity: quantity
      })
    } catch (error) {
      return error;
    } finally {
      imageFile.mv(uploadPath, function (err) {
        if (err) return err;
      });
    }
  }

  public static async deleteProduct(id) {
    try {
      const product: any = await Product.findByIdAndDelete(id).lean()
      fs.unlinkSync("./public" + product.imageLinks);
      return Product.findByIdAndDelete(id).lean();
    } catch (error) {
      return error;
    }
  }
}
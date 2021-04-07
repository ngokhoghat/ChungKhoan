import * as fs from 'fs'
import { Product } from "../../../data/entities/Products";

export default class ProductService {
  public static async getAll() {
    return Product.find().lean().exec();
  }

  public static async getById(id) {
    return Product.findById(id).lean().exec();
  }

  public static async createProduct(imageFile, product) {
    let uploadPath: string;

    try {
      uploadPath = './public/uploads/' + new Date().getTime() + imageFile.name;
      const imagePath = '/uploads/' + new Date().getTime() + imageFile.name;

      const { productName, productPrice, productQuantity } = product;

      return Product.create({
        displayName: productName,
        imageLinks: imagePath,
        price: productPrice,
        quantity: productQuantity
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
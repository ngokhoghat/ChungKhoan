import { Product } from "../../../data/entities/Products";

export default class ProductService {
    public static async getAll() {
        return Product.find().lean().exec();
    }

    public static async getById(id) {
        return Product.findById(id).lean().exec();
    }

    public static async createProduct(product) {
        return Product.create(product);
    }

    public static async deleteProduct(id) {
        return Product.findByIdAndDelete(id).lean();
    }
}
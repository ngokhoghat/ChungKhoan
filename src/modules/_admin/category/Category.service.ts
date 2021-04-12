import { Category } from "../../../data/entities/Categories";

export default class CategoriesService {
  public static async getAll() {
    return Category.find().lean().exec();
  }

  public static async create(category) {
    return Category.create(category);
  }

  public static async update(category) {
    return Category.findByIdAndUpdate(category.id, category);
  }

  public static async delete(id) {
    return Category.deleteOne({ _id: id });
  }
}
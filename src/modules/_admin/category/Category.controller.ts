import { Request, Response } from "express";

import { Controller, Get, Post, UseMidlleware } from "../../../base/decorator/common.decorator";
import { AuthGuard } from "../../../service/AuthGuard";
import CategoriesService from "./Category.service";

@UseMidlleware(AuthGuard)
@Controller('/admin/category')
export default class AdminCategoryController {
  @Get('/')
  public async index(req: Request, res: Response) {
    res.render('admin/category', { layout: 'admin.layout.hbs' })
  }

  @Get('/add-category')
  public async createIndex(req: Request, res: Response) {
    res.render('admin/add-category', { layout: 'admin.layout.hbs' })
  }

  @Post('/add-category')
  public async createCategory(req: Request, res: Response) {
    return CategoriesService.create({ ...req.body })
      .then((result) => res.send(result))
      .catch(err => res.send(err.toString()))
  }
}
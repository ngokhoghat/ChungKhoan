import { Request, Response } from "express";
import { UseAuthen } from "../../../base/decorator/auth.decorator";

import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
import { AuthGuard } from "../../../service/AuthGuard";
import ProductService from "./Product.service";
@UseAuthen(AuthGuard)
@Controller('/admin/product')
export default class AdminProductController {
  @Get('/')
  public async index(req: Request, res: Response) {
    const listProduct = await ProductService.getAll();
    res.render('admin/product', { layout: 'admin.layout.hbs', listProduct })
  }

  @Get('/:id')
  public async productDetail(req: Request, res: Response) {
    const product: any = await ProductService.getById(req.params.id);
    return res.render('admin/product-detail', { layout: 'admin.layout.hbs', product: product })
  }

  @Get('/add-product')
  public async addProduct(req: Request, res: Response) {
    res.render('admin/add-product', { layout: 'admin.layout.hbs' })
  }

  @Post('/add-product')
  public async createProduct(req: Request | any, res: Response) {
    const imageFile = await req?.files?.imageFile;
    return ProductService.createProduct(imageFile, req.body)
      .then(() => res.render('admin/add-product', {
        layout: 'admin.layout.hbs',
        status: 'Success'
      }))
      .catch((err) => res.send(err))
  }

  @Get('/delete-product/:id')
  public async deleteProduct(req: Request, res: Response) {
    return ProductService.deleteProduct(req.params.id)
      .then(() => res.redirect('back'))
      .catch(err => res.send(err))
  }
}
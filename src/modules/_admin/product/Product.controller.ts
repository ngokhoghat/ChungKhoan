import { Request, Response } from "express";
import * as fs from 'fs'

import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
import ProductService from "./Product.service";

@Controller('/admin')
export default class AdminProductController {
  @Get('/product')
  public async index(req: Request, res: Response) {
    const listProduct = await ProductService.getAll();
    res.render('admin/product', { layout: 'admin.layout.hbs', listProduct })
  }

  @Get('/product/:id')
  public async productDetail(req: Request, res: Response) {
    const product: any = await ProductService.getById(req.params.id);
    return res.render('admin/product-detail', { layout: 'admin.layout.hbs', product: product })
  }

  @Get('/delete-product/:id')
  public async deleteProduct(req: Request, res: Response) {
    try {
      const product: any = await ProductService.deleteProduct(req.params.id);
      fs.unlinkSync("./public" + product.imageLinks);

      res.redirect('back');
    } catch (error) {
      res.redirect('back');
    }
  }

  @Post('/add-product')
  public async createProduct(req: Request, res: Response) {
    let productImage;
    let uploadPath;

    productImage = req?.files?.productImage;

    try {
      uploadPath = './public/uploads/' + new Date().getTime() + productImage.name;
      const imagePath = '/uploads/' + new Date().getTime() + productImage.name;

      const { productName, productPrice, productQuantity } = req.body;

      return ProductService.createProduct({
        displayName: productName,
        imageLinks: imagePath,
        price: productPrice,
        quantity: productQuantity
      }).then(() => res.render('admin/add-product', { layout: 'admin.layout.hbs', status: 'Success' }))
    } catch (error) {
      res.render('admin/add-product', { layout: 'admin.layout.hbs', status: 'Success' })
    } finally {
      productImage.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });

    }
  }

  @Get('/add-product')
  public async addProduct(req: Request, res: Response) {
    res.render('admin/add-product', { layout: 'admin.layout.hbs' })
  }
}
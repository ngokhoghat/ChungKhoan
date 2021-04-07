import { Request, Response } from "express";
import { Controller, Get } from "../../../base/decorator/common.decorator";
import { Product } from "../../../data/entities/Products";

@Controller('/product')
export default class ProductClientController {
  @Get('/')
  public async index(req: Request | any, res: Response) {
    const listProduct = await Product.find().lean().exec();

    const wishList = await req.session.wishList;
    const cartList = await req.session.cartList;

    return res.render('product', { listProduct, wishList, cartList });
  }

  @Get('/:id')
  public async details(req: Request | any, res: Response) {
    const product = await Product.findById(req.params.id).lean().exec();
    const wishList = await req.session.wishList;
    const cartList = await req.session.cartList;

    return res.render('productDetail', { product, wishList, cartList });
  }

  @Get('/wish-list/:id')
  public async addWishList(req: Request | any, res: Response) {
    const product = await Product.findById(req.params.id).lean().exec();
    const wishList = await req.session.wishList;

    if (wishList) {
      const exitsProduct = wishList.filter(item => item._id === req.params.id)

      if (!exitsProduct) {
        req.session.wishList = [
          ...req.session.wishList,
          product
        ]
      }
    } else {
      req.session.wishList = [product]
    }

    return res.redirect('back');
  }

  @Get("/addToCard/:id")
  public async addToCard(req: Request | any, res: Response) {
    const product = await Product.findById(req.params.id).lean().exec();
    const cartList = await req.session.cartList;

    if (cartList) {
      const exitsProduct = cartList.filter(item => item._id === req.params.id)

      if (!exitsProduct.length) {
        req.session.cartList = [
          ...req.session.cartList,
          product
        ]
      }
    } else {
      req.session.cartList = [product]
    }

    return res.redirect('back')
  }
}
import Controller, { Get, Post } from "../../base/Controller";
import { PuppeteerService } from "../../service/PuppeteerService";

export default class DemoController extends Controller {
  constructor() {
    super()
  }

  @Get()
  async getAllBook() {
    const ckService = new PuppeteerService();
    return ckService.start().then(() => {
      return ckService.handlePageEvent()
        .then((res) => res)
    })
  }

  @Get('/:id')
  getBookById(params) {
    const ckService = new PuppeteerService();

    return ckService.start().then(() => {
      ckService.handlePageEvent().then((res) => {
        console.log('INNNN', res);

        return res.toString();
      })
    })
  }

  @Post()
  createBook(book) {
    console.log('book', book);
    return 'null'
  }
}
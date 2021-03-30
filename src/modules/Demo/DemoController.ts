import Controller, { Get, Post } from "../../base/Controller";

export default class DemoController extends Controller {
    constructor() {
        super()
    }


    @Get()
    getAllBook() {
        return 'index'
    }

    @Get('/:id')
    getBookById(params) {
        console.log(params);
        return params
    }

    @Post()
    createBook(book) {
        console.log('book', book);
        return 'null'
    }
}
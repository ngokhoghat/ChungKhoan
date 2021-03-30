import Controller, { Get, Post } from "../../base/Controller";

export default class DemoController extends Controller {
    constructor() {
        super()
    }

    @Get()
    getAllBook() {
        return 'Demo'
    }

    @Post()
    createBook(book) {
        console.log('book', book);
        return null
    }
}
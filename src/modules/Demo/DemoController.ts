import Controller, { Get } from "../../base/Controller";

export default class DemoController extends Controller {
    constructor() {
        super()
    }

    @Get('/')
    getAllBook() {
        return 'Demo'
    }
}
import Controller, { Get } from "../base/Controller";

export default class AppController extends Controller {
    constructor() {
        super()
    }

    @Get('/')
    landingPage() {
        return 'Hello baby'
    }
}
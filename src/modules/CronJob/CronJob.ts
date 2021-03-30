import * as cron from 'node-cron'

export class CronJobService {
    // cron: Cron

    constructor() {

    }

    start() {
        cron.schedule('* * * * *', () => {
            console.log('running a task every minute');
        });
    }

    stop() {

    }

    cronJobSendMail() {

    }

    cronJobUpdataSomThing() {

    }
}
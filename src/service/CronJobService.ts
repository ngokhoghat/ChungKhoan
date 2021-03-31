import * as cron from 'node-cron'

export class CronJobService {
    constructor() {

    }

    async start() {
        await cron.schedule('* * * * *', () => {
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
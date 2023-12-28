import { Injectable, Logger } from "@nestjs/common";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class CronJobService {
    constructor(private schedulerRegistry : SchedulerRegistry){

    }
    private readonly logger = new Logger(CronJobService.name)

    @Cron('* * * * * *', {name : 'Cron-Test'})
    handleCron(){
        this.logger.log(`Running cron at ${new Date().getTime()}`)
    }

    getJobInfoByName(name) {
        const job = this.schedulerRegistry.getCronJob(name)
        job.stop()
        console.log("last executed on ", job.lastDate())
    }
}
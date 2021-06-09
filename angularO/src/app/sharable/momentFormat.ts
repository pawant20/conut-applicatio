import * as moment from 'moment';
import { Injectable } from "@angular/core";

@Injectable()
export class MomentFormat {
    public formatDates = async (date) => {
        return moment(date).format('YYYY-MM-DD');
    }
}

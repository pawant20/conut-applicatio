import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import * as range from 'lodash.range';
import { OrdersService } from '../../preLazyServices/orders.service';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  skipped?: boolean;
  delivered?: boolean;
}

/**
 * We are using momentJS
 * generateCalendar is responsible for generating calendar and
 * whole new calendar is generated each time when:-
 * 1) user click on day
 * 2) navigate to next or previus day
 * Filldate is resonsible for filling and marking selected and skipped  dates
 */

@Component({
  selector: 'app-order-calendar',
  templateUrl: './order-calendar.component.html',
  styleUrls: ['./order-calendar.component.scss']
})
export class OrderCalendarComponent implements OnInit {

  @Input() orderData;
  public currentDate: moment.Moment;
  public namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public weeks: Array<CalendarDate[]> = [];
  public selectedDate;
  public failedToSaveSkippedDelAlert = false;

  constructor(
    private order: OrdersService
  ) { }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates = (currentMoment: moment.Moment) => {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const lastDayOfGrid = moment(currentMoment).endOf('month').subtract(lastOfMonth, 'days').add(7, 'days');

    const startCalendar = firstDayOfGrid.date();

    return range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')).map((date) => {
      const newDate: any = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
        skipped: this.specialMarking(newDate._d, this.orderData.skippedDates),
        delivered: this.specialMarking(newDate._d, this.orderData.deliverdDates),
        bonus: this.specialMarking(newDate._d, this.orderData.bonusDates)
      };
    });
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  public isDisabledMonth(currentDate): boolean {
    const today = moment();
    return moment(currentDate).isAfter(today, 'months');
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected = (date: moment.Moment): boolean => {
    return this.selectedDate === this.formatDates(date);
  }

  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, 'month') && moment(date).isSameOrAfter(today);
  }

  public selectDate = (date: CalendarDate) => {
    if (!this.orderData.editCalendar) {
      return;
    }
    this.selectedDate = this.formatDates(date.mDate);
    this.skippedDatesMeth(this.selectedDate);
    this.generateCalendar();
  }

  /**
   * date on calendar is compared with skipped date or
   * dilivered dates if matched then returned true and special class is added by ng class to apply css styling
   * @param date one of the date from calendar
   * @param array skippedDates or diliveredDates array
   */
  public specialMarking = (date, array: any[]): boolean => {
    if (!array || array.length === 0) {
      return false;
    }
    const parsedDate = this.formatDates(date);
    for (let index = 0; index < array.length; index++) {
      const formatArrayDate = this.formatDates(array[index]);
      // if found then return else continue checking
      if (formatArrayDate === parsedDate) {
        return true;
      }

      // if it is last and not equal then return false
      if (index == ((array.length) - 1) && array[index] !== parsedDate) {
        return false;
      }
    }
  }

  public skippedDatesMeth = (date) => {
    /**
     * here we are checking if selected date is already present in skippedDatesArray
     * if it present then user wants to unskip
     * thats why we will remove that date and return
     * else we will push
     */
    for (const i of this.orderData.skippedDates) {
      const formatedDate = this.formatDates(i);
      if (formatedDate == date) {
        // here we are passing 'i' instead of formatedDate as orderData.skippedDates array contains
        // unformated data
        this.orderData.skippedDates.splice(this.orderData.skippedDates.indexOf(i), 1);
        return;
      }
    }
    this.orderData.skippedDates.push(date);
  }

  saveSkippedDeliveries = () => {
    const passedData = {
      skippedDates: this.orderData.skippedDates,
      orderId: this.orderData._id
    };
    this.order.saveSkipped(passedData).subscribe(
      data => {
        console.log('skipped mongoData', data);
      },
      (error: Response) => {
        this.failedToSaveSkippedDelAlert = true;
      }
    );
    this.orderData.editCalendar = false;
  }

  formatDates = (date) => {
    return moment(date).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.currentDate = moment();
    this.selectedDate = this.formatDates(this.currentDate);
    this.generateCalendar();
  }

}

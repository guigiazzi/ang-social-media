import { Injectable } from '@angular/core';

@Injectable()
export class FormatDateService {

  constructor() { }

  formatDate(date: string) {
    console.log(date)
    return (this.formatHour(date) + ` - ` + this.formatDatewithoutHour(date));
  }

  formatHour(date: string) {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    console.log(hour, minutes);
    if (hour < 10 && minutes < 10) {
      date = (`0` + `${hour}` + ':' + `0` + `${minutes}`);
    } else if (minutes < 10) {
      date = (`${hour}` + ':' + `0` + `${minutes}`);
    } else if (hour < 10) {
      date = (`0` + `${hour}` + ':' + `${minutes}`);
    } else {
      date = ( `${hour}` + ':' + `${minutes}`);
    }
    return date;
  }

  formatDatewithoutHour(date: string) {
    let dayMonthYearSTR = date.substr(0, 10);
    const dayMonthYearNBR = new Date(dayMonthYearSTR.replace(/-/g, '\/'));
    dayMonthYearSTR =  ('0' + dayMonthYearNBR.getDate()).substr(-2) + '/'
    + ('0' + (dayMonthYearNBR.getMonth() + 1)).substr(-2) + '/' + dayMonthYearNBR.getFullYear();

    return dayMonthYearSTR;
  }

}

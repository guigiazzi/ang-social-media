import { Injectable } from '@angular/core';

@Injectable()
export class FormatDateService {

  constructor() { }

  formatDate(date: string) {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    let dayMonthYearSTR = date.substr(0, 10);
    const dayMonthYearNBR = new Date(dayMonthYearSTR.replace(/-/g, '\/'));
    dayMonthYearSTR =  ('0' + dayMonthYearNBR.getDate()).substr(-2) + '/'
    + ('0' + (dayMonthYearNBR.getMonth() + 1)).substr(-2) + '/' + dayMonthYearNBR.getFullYear();

    if (minutes < 10 || hour < 10) {
      if (hour < 10 && minutes < 10) {
        date = (`0` + `${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      } else if (minutes < 10) {
        date = (`${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      } else {
        date = (`0` + `${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      }
    } else {
      date = (`${hour}` + ':' + `${minutes}` + ` - ` + dayMonthYearSTR);
    }
    return date;
  }

  formatDatewithoutHour(date: string) {
    let dayMonthYearSTR = date.substr(0, 10);
    const dayMonthYearNBR = new Date(dayMonthYearSTR.replace(/-/g, '\/'));
    dayMonthYearSTR =  ('0' + dayMonthYearNBR.getDate()).substr(-2) + '/'
    + ('0' + (dayMonthYearNBR.getMonth() + 1)).substr(-2) + '/' + dayMonthYearNBR.getFullYear();

    date = ( dayMonthYearSTR);

    return date;
  }

}

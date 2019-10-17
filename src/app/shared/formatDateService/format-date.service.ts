import { Injectable } from '@angular/core';

@Injectable()
export class FormatDateService {

  constructor() { }

  formatDate(date: string) {
    return (this.formatHour(date) + ` - ` + this.formatDatewithoutHour(date.toString()));
  }

  formatHour(date: string) {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
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

  formatMonth(date: string) {
    let YearMonthSTR = date.substr(0, 10);
    let YearMonth = new Date(YearMonthSTR.replace(/-/g, '\/'));
    YearMonthSTR =  YearMonth.getFullYear() + '-'+ ('0' + (YearMonth.getMonth() + 1)).substr(-2);
    return YearMonthSTR;
  }

  formatDateAmerican(date: string){
    let YearMonthDaySTR = date.substr(0, 10);
    let YearMonthDay = new Date(YearMonthDaySTR.replace(/-/g, '\/'));
    YearMonthDaySTR =  YearMonthDay.getFullYear() + '-'
    + ('0' + (YearMonthDay.getMonth() + 1)).substr(-2) + '-' +  ('0' + YearMonthDay.getDate()).substr(-2);

    return YearMonthDaySTR;
  }

}

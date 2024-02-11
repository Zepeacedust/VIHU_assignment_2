import { DATE_UNIT_TYPES } from "./constants";
import { addDays, addMinutes, addMonths, addSeconds, addWeeks, addYears, yearsToMonths } from "date-fns";



export function getCurrentYear() : Number {
  return new Date().getFullYear();
}

export function add(date:Date, number:number, type:DATE_UNIT_TYPES = DATE_UNIT_TYPES.DAYS): Date {
  switch (type) {
    case DATE_UNIT_TYPES.DAYS:
      return addDays(date, number)
    case DATE_UNIT_TYPES.MINUTES:
      return addMinutes(date, number)
    case DATE_UNIT_TYPES.MONTHS:
      return addMonths(date, number)
    case DATE_UNIT_TYPES.SECONDS:
      return addSeconds(date, number)
    case DATE_UNIT_TYPES.WEEKS:
      return addWeeks(date, number)
    case DATE_UNIT_TYPES.YEARS:
      return addYears(date, number)
    default:
      throw new Error("Invalid Input");
  }
}

export function isWithinRange(date:Date, from:Date, to:Date) : Boolean {
  return from < date && date < to;
}

export function isDateBefore(date:Date, compareDate:Date) : Boolean {
  return date < compareDate;
}

// slightly strange solution but I guess that it works
// I genuinely don't get why there isn't a method that truncats time to the day.
export function isSameDay(date:Date, compareDate:Date) : Boolean {
  return date.getDate() == compareDate.getDate() 
  && date.getFullYear() == compareDate.getFullYear()
  && date.getMonth() == compareDate.getMonth();
}

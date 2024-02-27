import { describe, expect, test } from "vitest";

import {
  add,
  getCurrentYear,
  isDateBefore,
  isWithinRange,
  isSameDay,
} from "../dateUtils";
import moment from "moment";
import { DATE_UNIT_TYPES } from "../constants";

describe("Date Utils", () => {
  describe("Get Current Year", () => {
    // Better than hardcoding the year and I will not add more dependancies just for testing.
    test("Is it the current Year?", () => {
      expect(getCurrentYear()).to.equal(moment().year());
    });
  });
  describe("Add", () => {
    test("12 months in a year", () => {
      const now = moment().toDate();
      //
      expect(add(now, 12, DATE_UNIT_TYPES.MONTHS).getTime()).to.equal(
        add(now, 1, DATE_UNIT_TYPES.YEARS).getTime(),
      );
    });

    test("360 seconds in 60 minutes", () => {
      const now = moment().toDate();
      //
      expect(add(now, 3600, DATE_UNIT_TYPES.SECONDS).getTime()).to.equal(
        add(now, 60, DATE_UNIT_TYPES.MINUTES).getTime(),
      );
    });
  });
  describe("isWithinRange", () => {
    test("Within boundaries", () => {
      const now = moment().toDate();
      const a = add(now, 1, DATE_UNIT_TYPES.SECONDS);
      const b = add(now, 2, DATE_UNIT_TYPES.SECONDS);
      const c = add(now, 3, DATE_UNIT_TYPES.SECONDS);
      expect(isWithinRange(b, a, c)).toBeTruthy();
    });
    test("Not within boundaries", () => {
      const now = moment().toDate();
      const a = add(now, 1, DATE_UNIT_TYPES.SECONDS);
      const b = add(now, 2, DATE_UNIT_TYPES.SECONDS);
      const c = add(now, 3, DATE_UNIT_TYPES.SECONDS);
      expect(isWithinRange(a, b, c)).toBeFalsy();
    });
    test("On lower boundary", () => {
      const now = moment().toDate();
      const a = add(now, 1, DATE_UNIT_TYPES.SECONDS);
      const b = add(now, 2, DATE_UNIT_TYPES.SECONDS);
      expect(isWithinRange(a, a, b)).toBeFalsy();
    });
    test("On upper boundary", () => {
      const now = moment().toDate();
      const a = add(now, 1, DATE_UNIT_TYPES.SECONDS);
      const b = add(now, 2, DATE_UNIT_TYPES.SECONDS);
      expect(isWithinRange(a, b, a)).toBeFalsy();
    });
    test("All the same", () => {
      const now = moment().toDate();
      expect(isWithinRange(now, now, now)).toBeFalsy();
    });
  });
  describe("isDateBefore", () => {
    test("a<b", () => {
      const a = moment().toDate();
      const b = add(a, 1, DATE_UNIT_TYPES.SECONDS);
      expect(isDateBefore(a, b)).toBeTruthy();
    });
    test("a=b", () => {
      const a = moment().toDate();
      const b = add(a, 0, DATE_UNIT_TYPES.SECONDS);
      expect(isDateBefore(a, b)).toBeFalsy();
    });
    test("a>b", () => {
      const a = moment().toDate();
      const b = add(a, -1, DATE_UNIT_TYPES.SECONDS);
      expect(isDateBefore(a, b)).toBeFalsy();
    });
  });
  describe("isSameDay", () => {
    test("Same time", () => {
      const now = moment().toDate();
      expect(isSameDay(now, now)).toBeTruthy();
    });
    test("Different Days", () => {
      const now = moment().toDate();
      const tomorrow = add(now, 1, DATE_UNIT_TYPES.MONTHS);
      expect(isSameDay(now, tomorrow)).toBeFalsy();
    });
  });
});

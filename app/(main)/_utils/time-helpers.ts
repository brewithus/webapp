import { googleMapsApiKey } from '@/config/google-maps';
import type { DayHour, Hour } from '@/types/yelp';
import { isBefore, isAfter, addMinutes, subMinutes } from 'date-fns';

/**
 * get DayHour of the biz local time
 * @param {Date} today biz local time
 * @param {Hour[]} hours yelp hours
 * @returns {DayHour} returns the biz open time of the biz local day time
 */
export function getTodayDayTime(today: Date, hours: Hour[]): DayHour | null {
  const regHours = hours.find((hour) => hour.hours_type === 'REGULAR');
  if (!regHours) {
    return null;
  }
  return (
    regHours.open.find((dayHour) => dayHour.day === today.getDay()) ?? null
  );
}

/**
 * Format time string
 * @param {string} time input time string in the format `HHMM`
 * @returns {string} returns time string with the format `HH:MM`
 */
export function formatTime(time: string): string {
  const hour = parseInt(time.substring(0, 2), 10);
  const minute = time.substring(2);

  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = ((hour + 11) % 12) + 1; // converts 24h to 12h format

  return `${formattedHour}:${minute} ${ampm}`;
}

/**
 * Format biz opening time
 * @param {DayHour} dayHour biz current local day
 * @returns {string} Returns biz local opening time string
 */
export function formatOpeningTimes(dayHour: DayHour): string {
  const startTime = formatTime(dayHour.start);
  const endTime = formatTime(dayHour.end);

  return `${startTime} - ${endTime}`;
}

/**
 * Converts a day number to a string.
 * @param {number} dayIndex week day as a number (0-indexed)
 * @returns {string} Returns day as string
 */
export function getWeekDayString(dayIndex: number): string {
  return (
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][dayIndex] || ''
  );
}

/**
 * find the biz local time by geocoding
 * @param {number} latitude latitude
 * @param {number} longitude longitude
 * @returns {string} Returns Date object of current time at biz location, null if an error happened while getting the time
 */
export async function reverseGeocodingWithGoogle(
  latitude: number,
  longitude: number,
): Promise<Date | null> {
  const targetDate = new Date();
  // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
  const timestamp =
    targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${googleMapsApiKey}`,
    );
    const response = await res.json();
    return new Date(
      (timestamp + response.rawOffset ?? 0 + response.dstOffset ?? 0) * 1000,
    );
  } catch (status) {
    return null;
  }
}

/**
 * find the biz local time by geocoding
 * @param {DayHour} dayHour biz local open time of the day
 * @param {Date} date biz current local time
 * @returns {boolean} Returns a boolean determine if the biz is closed or open
 */
export function isBusinessOpen(dayHour: DayHour, date: Date): boolean {
  const currentDay = date.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentHour = date.getHours(); // Get the current hour (0-23)
  const currentMinute = date.getMinutes(); // Get the current minute (0-59)

  // Convert the start and end times to 24-hour format and split into hours and minutes

  const startHour = parseInt(dayHour.start.substring(0, 2), 10);
  const startMinute = parseInt(dayHour.start.substring(2));

  const endHour = parseInt(dayHour.end.substring(0, 2), 10);
  const endMinute = parseInt(dayHour.end.substring(2));

  // If the business day spans across midnight
  if (dayHour.is_overnight) {
    // If the current time is between the start time and midnight, or between midnight and the end time
    if (
      currentHour > startHour ||
      (currentHour === startHour && currentMinute >= startMinute) ||
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      return true;
    }
  } else {
    // If the current day matches the business day, and the current time is between the start and end times
    if (
      (currentDay === dayHour.day && currentHour > startHour) ||
      (currentHour === startHour &&
        currentMinute >= startMinute &&
        currentHour < endHour) ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      return true;
    }
  }

  return false;
}

const OPENING_SOON_THRESHOLD = 30; // in minutes
const CLOSING_SOON_THRESHOLD = 60; // in minutes

export const isBusinessOpeningSoon = (
  todayOpenTime: DayHour,
  currentTime: Date,
): boolean => {
  const openingTime = new Date(todayOpenTime.start);
  const openingSoonThreshold = subMinutes(openingTime, OPENING_SOON_THRESHOLD);

  return (
    isAfter(currentTime, openingSoonThreshold) &&
    isBefore(currentTime, openingTime)
  );
};

export const isBusinessClosingSoon = (
  todayOpenTime: DayHour,
  currentTime: Date,
): boolean => {
  const closingTime = new Date(todayOpenTime.end);
  const closingSoonThreshold = addMinutes(closingTime, CLOSING_SOON_THRESHOLD);

  return (
    isAfter(currentTime, closingTime) &&
    isBefore(currentTime, closingSoonThreshold)
  );
};

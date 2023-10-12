import React from "react";
import { useLocation } from "react-router-dom";

/// Url matches
export const urlRegex =
  /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

/**
 * Router query hook
 * @returns `URLSearchParams`
 */
export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Phone mask parser
 */
export function phoneMaskParse(
  phoneNumber?: string
): { code: string; number: string } | null {
  if (!phoneNumber) return null;
  const pattern = /\+|\(|\)/g;
  const parseData = phoneNumber.replace(pattern, "").split(" ").join("");
  const code = parseData.substring(0, 2);
  const number = parseData.substring(2, phoneNumber.length);
  return { code, number };
}

/**
 * Expire date parser
 * of credit card
 */
export function expireMaskParse(
  expire?: string
): { month: string; year: string } | null {
  if (!expire) return null;
  const pattern = /\//g;
  const parseData = expire.replace(pattern, "");
  const month = parseData.substring(0, 2);
  const year = "20" + parseData.substring(2, expire.length);
  return { month, year };
}

/**
 * Credit card number parser
 */
export function cardNumberMaskParse(cardNumber?: string): string | null {
  if (!cardNumber) return null;
  const pattern = /\ /g;
  const parseData = cardNumber.replace(pattern, "");
  return parseData;
}

/**
 * Delay method
 * @params ms
 * default [1000] ms
 */
export async function wait(ms?: number): Promise<void> {
  ms ??= 1000;
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Date to Format string
 */
export function dateToFormat(
  date: string | Date | null | undefined
): string | null {
  if (date == null) return null;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleString("en-US", options);
}

/**
 * Caption
 * @param value
 * @returns
 */
export function caption(value?: string) {
  if (!value) return null;
  const splitValue = value.split(" ");
  if (splitValue.length === 1) {
    return value[0].toUpperCase();
  }
  return `${splitValue[0][0].toUpperCase()}${splitValue[1][0].toUpperCase()}`;
}

/**
 * Expand list
 * @param list
 * @param key
 * @returns
 */
export function expand(list: any[], key: string): any[] {
  const combinedItems = list.reduce((accumulator, currentObject) => {
    // currentObject'un "items" özelliği varsa ve bir dizi ise, accumulator dizisine ekleyin
    if (Array.isArray(currentObject[key])) {
      accumulator = accumulator.concat(currentObject[key]);
    }
    return accumulator;
  }, []);
  return combinedItems;
}

/**
 * Check equal object
 * @param o1
 * @param o2
 * @returns
 */
export function equalInterface<T extends Record<string, any>>(
  o1: T | null,
  o2: T | null
): boolean {
  let result = true;
  if (!o1 || !o2) return false;
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);

  /// Keys length check
  if (keys1.length !== keys2.length) return false;

  /// Value of key check
  for (const key of keys1) {
    if (typeof o1[key] === "object" && o1[key]) {
      result = equalInterface(o1[key], o2[key]);
    }
    if (o1[key] !== o2[key]) {
      return false;
    }
  }

  return result;
}

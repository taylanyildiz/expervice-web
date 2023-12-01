import React, { DependencyList, EffectCallback, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDialog } from "./hooks/dialog_hook";
import { LatLng } from "@Components/SelectLocation";
import SelectLocationDialog from "@Components/dialogs/SelectLocationDialog";
import { Crop } from "react-image-crop";

/**
 * Url regex
 */
export const urlRegex =
  /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

/**
 * Script regex
 */
export const scriptRegex = /<script.*?>((.|\n|\r)*?)<\/script>/g;

/**
 * Router query hook
 * @returns `URLSearchParams`
 */
export function useQuery() {
  const { search } = useLocation();
  const [_, setParams] = useSearchParams();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);

  const deleteParams = (key: string) => {
    params.delete(key);
    setParams(params);
  };

  const setSearchParams = (key: string, value: string) => {
    params.set(key, value);
    setParams(params);
  };

  type TypeQuery = readonly [
    params: URLSearchParams,
    deleteParams: (key: string) => void,
    setParams: (key: string, value: string) => void
  ];

  const value: TypeQuery = [params, deleteParams, setSearchParams];
  return value;
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
  date: string | Date | null | undefined,
  onlyDate?: boolean
): string | null {
  if (date == null) return null;
  let options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  if (!(onlyDate ?? false)) {
    options = Object.assign({}, options, {
      hour: "numeric",
      minute: "numeric",
    });
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleString("en-US", options);
}

/**
 * String date to only date string
 */
export function getOnlyDate(date: string | null | undefined): string | null {
  if (!date) return null;
  return date.split(" ")[0];
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
  if (!o1 || !o2) return false;
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);

  /// Keys length check
  if (keys1.length !== keys2.length) return false;

  /// Value of key check
  for (const key of keys1) {
    const isObject = typeof o1[key] === "object" && o1[key];
    const isArray = Array.isArray(o1[key]);
    if (isObject) {
      if (isArray) {
        if (!equalArray(o1[key], o2[key])) return false;
      } else {
        if (!equalInterface(o1[key], o2[key])) return false;
      }
    } else {
      if (o1[key] !== o2[key]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Check equal array
 * @param a1
 * @param a2
 * @returns
 */
export function equalArray(a1?: any[], a2?: any[]) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

/**
 * Open form pdf
 * @param base64
 */
export function openBase64PDF(base64: string): void {
  const pdfWindow = window.open("");
  pdfWindow?.document.write(
    "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
      encodeURI(base64) +
      "'></iframe>"
  );
}

/**
 * Open Select location dialog
 */
export function useLocationDialog() {
  const { closeDialog, openDialog } = useDialog();
  return {
    locationDialog: async (value: LatLng | null): Promise<LatLng | null> => {
      return await new Promise((resolve) => {
        openDialog(
          <SelectLocationDialog
            value={value}
            onDone={(value) => {
              resolve(value);
              closeDialog();
            }}
          />,
          "md"
        );
      });
    },
  };
}

/**
 * Time ago
 * @param input
 * @returns
 */
export function timeAgo(input?: Date | string) {
  if (!input) return null;
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let [key, value] of Object.entries(ranges)) {
    if (value < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / value;
      return formatter.format(
        Math.round(delta),
        key as Intl.RelativeTimeFormatUnit
      );
    }
  }
}

/**
 * Iyzipay parser
 */
export function iyziParser(data: string) {
  const scripts = [...data.matchAll(scriptRegex)];
  const combinedScript = scripts.map((script) => script[1]).join("\n");
  const scriptElement = document.createElement("script");
  scriptElement.type = "text/javascript";
  scriptElement.text = combinedScript;
  document.head.appendChild(scriptElement);
}

export function useCustomEffect(
  destroy: (event?: Event) => void,
  effect?: EffectCallback | null,
  deps?: DependencyList
): void {
  useEffect(() => {
    effect?.();
    window.addEventListener("beforeunload", destroy);
    return () => {
      window.removeEventListener("beforeunload", destroy);
      destroy();
    };
  }, deps);
}

/**
 * Cropped image
 * @param image
 * @param pixelCrop
 * @returns
 */
export const getCroppedImg = (
  src: HTMLImageElement,
  crop: Crop
): Promise<{ url: string; formData: FormData }> => {
  const scaleX = src.naturalWidth / src.width;
  const scaleY = src.naturalHeight / src.height;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = crop.width!;
  canvas.height = crop.height!;

  ctx.drawImage(
    src,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    crop.width!,
    crop.height!
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        /// Url
        const url = URL.createObjectURL(blob);

        /// File
        const formData = new FormData();
        formData.append("image", blob, "newfile.jpeg");

        resolve({ url, formData });
      },
      "image/jpeg",
      1.0
    );
  });
};

export function calculateDiffDay(date1?: Date, date2?: Date) {
  if (!date1 || !date2) return 0;
  const diff = date1.getTime() - date2.getTime();
  const dayDifference = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.abs(dayDifference);
}

import { store } from "@Store/index";
import tr from "./tr";
import en from "./en";

export type ObjectString = {
    [key: string]: string;
};

export type ObjectStringToAny = {
    [key: string]: any;
};

/**
 * Detection user language with key
 * @param key
 * @param opt
 */
export function detecLanguage(key: string, opt?: ObjectStringToAny): string {
    const lang = store.getState().user.language?.language_code ?? "en";
    let str = "";
    switch (lang) {
        case "en":
            str = en[key];
            break;
        case "tr":
            str = tr[key];
            break;
        default:
            break;
    }

    if (opt) {
        for (let [key, value] of Object.entries(opt)) {
            const regex = `/{${key}}/`;
            str = str.replace(regex.substring(1, regex.length - 1), value);
        }
    }
    return str;
}

declare global {
    export interface String {
        /**
         * Localization Extension
         */
        tr(opt?: ObjectStringToAny): string;
    }
}

/**
 * Localization Extension
 */
String.prototype.tr = function (opt?: ObjectStringToAny) {
    return detecLanguage(this as string, opt);
};
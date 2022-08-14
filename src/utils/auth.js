
import { getItem, setItem } from "./storage";
const timekey = 'toutiao-key'
export function getTimeSamp() {
    return getItem(timekey)
}

export function setTimeSamp() {
    return setItem(timekey, Date.now())
}
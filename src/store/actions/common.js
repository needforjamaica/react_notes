import {
    COMMON_SET_BIG_LOADER,
    COMMON_SET_TITLE
} from "./actionTypes";

export const setPageTitle = data => {
    return {
        type: COMMON_SET_TITLE,
        data
    }
}
export const setBigLoader = data => {
    return {
        type: COMMON_SET_BIG_LOADER,
        data
    }
}
import { monthShortNames } from "../constant";

/**
 * Convert date to year week format [YYYY/WW].
 * If convertable return the converted data, empty string otherwise.
 */
export const convertToYearWeek = (date: Date): string => {
    try {
        let d = new Date(date)
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((Number(d) - Number(yearStart)) / 86400000) + 1) / 7);
        const yearWeek = `${d.getFullYear()}/${weekNo}`;
        return yearWeek;
    } catch (error) {
        console.log(`Error at convertToYearWeek(): ${error}`);
        return "";
    }
}

/**
 * Convert date time to text format [DD MMM YYYY, hh:mm am/pm].
 * If convertable return the converted data, empty string otherwise.
 */
export const convertDateTimeToText = (date: string): string => {
    try {
        let localDate = new Date(date).toString();
        const monthShortName = monthShortNames[(new Date(date)).getMonth()];
        const _date = {
            year: localDate.split(" ")[3],
            monthShortName: monthShortName,
            day: localDate.split(" ")[2],
        };
        const time = localDate.split(" ")[4].split(":");
        const _time = {
            hour: time[0],
            minute: time[1],
            isAM: Number(time[0]) <= 12
        };
        return `${_date.day} ${_date.monthShortName} ${_date.year}, ${_time.hour}:${_time.minute} ${_time.isAM ? "AM" : "PM"}`;
    } catch (error) {
        console.log("Error at convertDateTimeToText()", error);
        return "";
    }
}

/**
 * Convert date range to text format [MMM DD - MMM DD].
 * If convertable return the converted data, empty string otherwise.
 */
export const convertDateRangeToText = (startDate: Date, endDate: Date): string => {
    try {
        let localstartDate = new Date(startDate).toString();
        const monthShortName1 = monthShortNames[(new Date(startDate)).getMonth()];
        const _startDate = {
            year: localstartDate.split(" ")[3],
            monthShortName: monthShortName1,
            day: localstartDate.split(" ")[2],
        };

        let localendDate = new Date(endDate).toString();
        const monthShortName2 = monthShortNames[(new Date(endDate)).getMonth()];
        const _endDate = {
            year: localendDate.split(" ")[3],
            monthShortName: monthShortName2,
            day: localendDate.split(" ")[2],
        };
        return `${_startDate.monthShortName} ${_startDate.day} - ${_endDate.monthShortName} ${_endDate.day}`
    } catch (error) {
        console.log("Error at convertDateRangeToText()", error);
        return "";
    }
}
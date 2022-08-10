import { staffAnyDays, normalDays } from "../constant";

export const getTodayDateRangeInWeek = (): { startDateOfCurrentWeek: Date, endDateOfCurrentWeek: Date } => {
    const today = new Date();
    const todayIdx = staffAnyDays.indexOf(normalDays[today.getDay()]);
    const startGap = todayIdx - staffAnyDays.indexOf('Mon');
    const endGap = staffAnyDays.indexOf('Sun') - todayIdx;
    let startDate = new Date(today);
    let endDate = new Date(today);

    startDate.setDate(startDate.getDate() - startGap);
    endDate.setDate(endDate.getDate() + endGap);
    return { startDateOfCurrentWeek: startDate, endDateOfCurrentWeek: endDate }
}
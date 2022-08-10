import { getAxiosInstance } from ".";

export const getShiftsPublished = async () => {
    const api = getAxiosInstance()
    const { data } = await api.get("/shifts-published?order[date]=DESC&order[startTime]=ASC");
    return data;
};

export const getShiftPublishedByYearWeek = async (yearWeek: string) => {
    const api = getAxiosInstance()
    const { data } = await api.get(`/shifts-published/year-week/${yearWeek}`);
    return data;
};

export const createShiftsPublished = async (payload: any) => {
    const api = getAxiosInstance()
    const { data } = await api.post("/shifts-published", payload);
    return data;
};
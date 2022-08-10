export enum EStatusShiftPublished {
    PUBLISHED = 'published',
}
export interface IShiftPublished {
    id: string;
    yearWeek: string;
    status: EStatusShiftPublished;
    createdAt: string;
    updatedAt: string;
}
export interface CatholicEventDTO {
    id: string,
    position?: number,
    dateOfEvent?: string,
    dateCreated?: string,
    dateUpdated?: string,
    eventBookNumber?: string,
    churchId?: string,
    catholicId?: string,
    catholicName?: string | null,
    eventTypeId?: string,
    eventType?: string,
    churchName?: string | null,
}
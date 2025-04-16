export const IconName = {
    back: 'chevron-back',
    book: "book",
    home: "home",
    calendar: "calendar",
    person: "person"
} as const;

export type IconNameType = keyof typeof IconName;
export enum DocumentType {
    Fiction = 'Fiction',
    NonFiction = 'Non-Fiction',
    Poetry = 'Poetry',
    Play = 'Play',
    Screenplay = 'Screenplay',
    Other = 'Other',
    Programming = 'Programming',
    Business = 'Business',
    Legal = 'Legal',
    Medical = 'Medical',
    Scientific = 'Scientific',
    Academic = 'Academic',
    Technical = 'Technical',
    OtherNonFiction = 'Other Non-Fiction',
    OtherFiction = 'Other Fiction',
}

export interface ComposerDocument {
    id: string;
    metaData: Section[];
    docOutline: Section[];
    title: string;
    author: string; // user.
    documentType: DocumentType;
}

export interface Section {
    id: string;
    label: string; // single word label
    title: string; // long form title
    content: string; // the actucal save data

    type?: string; // section editor type
    icon?: string;
    instructions?: string;  // instrcutions for filling out the data
    children?: Section[];
    allowsChildren: boolean;
}
import {DocumentType} from 'common/types/ComposerDocument';

export interface Todo {
  id: number;
  content: string;
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
export interface Meta2 {
  totalCount: number;
}

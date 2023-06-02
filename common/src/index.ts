import {IsString, Length} from "class-validator";
import {ComposerDocument, Section, DocumentType} from './types/ComposerDocument';

// don't need these now, but they might be useful later. Copied from here: https://leejjon.medium.com/sharing-code-between-frontend-and-backend-in-a-full-stack-typescript-app-1c8711c40304
// export class ResponseBody {
//     @Length(1,100)
//     @IsString()
//     message: string;
//     constructor(message: string) {
//         this.message = message;
//     }
// }
//
// export class RequestBody {
//     @Length(1, 30)
//     @IsString()
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }

export { ComposerDocument, Section };
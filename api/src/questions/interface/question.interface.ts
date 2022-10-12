import { Document } from 'mongoose'

export interface IQuestion extends Document {
    readonly name: string;
    readonly body: string;
}
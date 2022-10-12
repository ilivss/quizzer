import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Question {
   @Prop()
   name: string;
   @Prop()
   body: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

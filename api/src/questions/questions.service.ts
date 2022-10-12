import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { IQuestion } from './interface/question.interface';

@Injectable()
export class QuestionsService {

  constructor(@InjectModel('Question') private questionModel: Model<IQuestion>) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
    const newQuestion = new this.questionModel(createQuestionDto);
    return await newQuestion.save();
  }

  async findAll(): Promise<IQuestion[]> {
    return await this.questionModel.find();
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true })
  }

  async remove(id: string) {
    return await this.questionModel.findByIdAndRemove(id);
  }
}

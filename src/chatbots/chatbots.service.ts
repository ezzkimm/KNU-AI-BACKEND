import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatbot } from '../schemas/chatbot.schema';
import { Model } from 'mongoose';
import { ChatbotDto } from './dto/chatbot.dto';
import { SaveChatDto } from './dto/save-chat.dto';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class ChatbotsService {
  constructor(
    @InjectModel(Chatbot.name) private readonly chatbotModel: Model<Chatbot>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async getChatbots() {
    const chatbots = await this.chatbotModel.find();

    return chatbots.map((chatbot) => ChatbotDto.fromSchema(chatbot));
  }

  async saveChat(request: SaveChatDto) {
    const chatbot = await this.chatbotModel.findById(request.chatbotId);

    const saveChat = { ...request, chatbot };

    const createdChat = new this.chatModel(saveChat);
    return createdChat.save();
    // const chat = await this.chatModel.create();
  }
}

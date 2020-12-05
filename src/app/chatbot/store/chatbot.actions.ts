import { createAction, props } from '@ngrx/store';
import { ChatbotResponse } from '../ChatbotResponse.model';
import { ChatMessage } from '../ChatMessage.model';



export const pushMessage = createAction(
  '[chatbot] push message',
  props<{
    message: ChatMessage
  }>()
);

export const finishPushingMessages = createAction(
  '[chatbot] finish pushing message',
  props<{
    dataBuffer: ChatbotResponse
  }>()
);

export const sendMessages = createAction(
  '[chatbot] send messages',
  props<{
    messages: string[]
  }>()
);

export const receiveMessages = createAction(
  '[chatbot] receive messages',
  props<{
    response: ChatbotResponse
  }>()
);

export const sendMessagesFailure = createAction(
  '[chatbot] send messages fail'
);

export const refreshConversation = createAction(
  '[chatbot] refresh conversation'
);
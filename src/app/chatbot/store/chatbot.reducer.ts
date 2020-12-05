import { Action, createReducer, on } from '@ngrx/store';
import { ChatbotOption, ChatbotResponse, Disease } from '../ChatbotResponse.model';
import { ChatMessage } from '../ChatMessage.model';
import * as chatbotActions from "./chatbot.actions";

export interface State {
  conversation: ChatMessage[],
  dataBuffer: ChatbotResponse,
  options: ChatbotOption[],
  diseases: Disease[],
  type: number
}

const initialState: State = {
  conversation: [],
  dataBuffer: new ChatbotResponse([], 1, [], []),
  options: [],
  diseases: [],
  type: 0
}

const chatbotReducer = createReducer( //this'll return a switch function like the old fashion one
  initialState,
  on(
    chatbotActions.pushMessage,
    (state, {message}) => ({
      ...state,
      conversation: [...state.conversation, message]
    })
  ),
  on(
    chatbotActions.finishPushingMessages,
    (state, {dataBuffer}) => ({
      ...state,
      options: dataBuffer.options,
      diseases: dataBuffer.diseases,
      type: dataBuffer.type
    })
  ),
  on(
    chatbotActions.sendMessages,
    (state) => ({
      ...state,
      options: [],
      dataBuffer: {
        ...state.dataBuffer,
        messages: []
      },
    })
  ),
  on(
    chatbotActions.receiveMessages,
    (state, {response}) => ({
      ...state,
      dataBuffer: response
    })
  ),
  on(
    chatbotActions.refreshConversation,
    (state) => ({
      ...state,
      conversation: [],
      diseases: [],
      type: 0
    })
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return chatbotReducer(state, action);
}


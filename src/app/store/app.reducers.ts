import { ActionReducerMap } from '@ngrx/store';
import * as fromChatbot from '../chatbot/store/chatbot.reducer';

export interface AppState {
  chatbot: fromChatbot.State
}

export const appReducersMap: ActionReducerMap<AppState> = {
  chatbot: fromChatbot.reducer
}
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';


export const conversationSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.conversation
);
export const optionsSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.options
);
export const diseasesSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.diseases
);
export const typeSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.type
);

export const dataBufferSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.dataBuffer
);
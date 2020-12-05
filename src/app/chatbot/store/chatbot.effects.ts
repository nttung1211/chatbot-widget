import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ChatbotService } from '../chatbot.service';
import { ChatbotResponse } from '../ChatbotResponse.model';
import * as ChatbotActions from './chatbot.actions';

@Injectable()
export class ChatbotEffects {
  sendMessage$ = createEffect(() => this.actions$.pipe(
      ofType(ChatbotActions.sendMessages),
      switchMap(
        ({ messages }) => {
          this.chatbotService.isTyping.next(true);
          return this.chatbotService.converse(messages)
          .pipe(
            map(
              (response: ChatbotResponse) => {
                return ChatbotActions.receiveMessages({response});
              }
            )
          )
        }
      )
    )
  );

  refreshConversation$ = createEffect(() => this.actions$.pipe(
      ofType(ChatbotActions.refreshConversation),
      map(
        () => {
          this.chatbotService.refreshSender_id();
          this.chatbotService.getHostname();
          return ChatbotActions.sendMessages({messages: []});
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private chatbotService: ChatbotService
  ) { }
}

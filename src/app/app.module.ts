import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { IsTyppingComponent } from './chatbot/is-typping/is-typping.component';
import { appReducersMap } from './store/app.reducers';
import { ChatbotEffects } from './chatbot/store/chatbot.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    IsTyppingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    StoreModule.forRoot(appReducersMap),
    EffectsModule.forRoot([ChatbotEffects]),
  ],
  exports: [
    MatIconModule
  ],
  entryComponents: [
    ChatbotComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(ChatbotComponent, {injector: this.injector});
    customElements.define('chatbot-widget', element);
  }
}

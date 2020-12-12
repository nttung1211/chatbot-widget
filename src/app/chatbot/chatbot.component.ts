import { AfterViewChecked, Component, ElementRef, NgModule, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { concatMap, delay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from '../store/app.reducers';
import { ChatbotService } from './chatbot.service';
import { ChatbotOption, Disease } from './ChatbotResponse.model';
import { ChatMessage } from './ChatMessage.model';
import * as chatbotActions from './store/chatbot.actions';
import * as chatbotSelectors from './store/chatbot.selectors';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  uiSetName: string = 'default';
  isOpen: boolean = false;
  initial: boolean = true;
  answer: string[] = [];

  options: ChatbotOption[] = [];
  type!: Observable<number>;
  diseases!: Observable<Disease[]>;
  conversation!: Observable<ChatMessage[]>;
  env = environment;

  isTyping = false;
  private isTypingSub!: Subscription;
  private optionsSub: Subscription = new Subscription;
  private delayTime = 1000;
  @ViewChild('dialogBox')
  dialogBox!: ElementRef;


  constructor(
    private chatbotService: ChatbotService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isTypingSub = this.chatbotService.isTyping.subscribe(
      isTyping => {
        this.isTyping = isTyping;
      }
    );
    this.optionsSub = this.store.pipe(select(chatbotSelectors.optionsSelector)).subscribe(
      options => {
        this.options = JSON.parse(JSON.stringify(options));
      }
    );
    this.diseases = this.store.pipe(select(chatbotSelectors.diseasesSelector));
    this.type = this.store.pipe(select(chatbotSelectors.typeSelector));

    this.store.pipe(
      select(chatbotSelectors.dataBufferSelector),
      tap(
        (dataBuffer) => {
          if (dataBuffer.messages.length) {
            this.delayTime = dataBuffer.diseases.length > 0 ? 3000 : 1000;
            setTimeout(() => {
              this.store.dispatch(chatbotActions.finishPushingMessages({dataBuffer}));
            }, dataBuffer.messages.length * this.delayTime);
          }
        }
      ),
      switchMap(
        (dataBuffer) => of(...dataBuffer.messages)
      ),
      concatMap(
        message => of(message).pipe(
          tap(() => { 
            this.chatbotService.isTyping.next(true);
          }),
          delay(this.delayTime)
        )
      )
    ).subscribe(
      (message) => {
        this.store.dispatch(chatbotActions.pushMessage({ message }));
        this.chatbotService.isTyping.next(false);
      }
    );

    this.conversation = this.store.pipe(
      select(chatbotSelectors.conversationSelector),
      tap(
        () => {
          setTimeout(() => {
            this.scrollDown();
          });
        }
      )
    );

    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://deepcare-chatbot-widget.s3-ap-southeast-1.amazonaws.com/ui-sets/' + this.uiSetName +  '/styles/style.css';
    // link.href = './chatbot-widget/assets/css/style.css';
    link.media = 'all';
    // head.appendChild(link);

    const body  = document.getElementsByTagName('body')[0];
    const script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://deepcare-chatbot-widget.s3-ap-southeast-1.amazonaws.com/ui-sets/' + this.uiSetName +  '/js/fontawesome.js';
    // script.src = './chatbot-widget/assets/js/fontawesome.js';
    script.defer = true;
    body.appendChild(script);
  }

  onAnswer(skip: boolean = false) {
    if (skip) {
      this.answer = [];
      this.store.dispatch(chatbotActions.pushMessage({
        message: new ChatMessage('Bỏ qua', 'user')
      }));
    } else {
      this.answer.forEach(message => {
        this.store.dispatch(chatbotActions.pushMessage({
          message: new ChatMessage(message, 'user')
        }));
      })
    }

    this.store.dispatch(chatbotActions.sendMessages({ messages: this.answer }));
    this.answer = [];
  }

  changeSelection() {
    this.answer = this.options.reduce((answer: string[], option) => {
      if (option.isChecked) {
        answer.push(option.text);
      }
      return answer;
    }, []);
  }

  scrollDown() {
    this.dialogBox.nativeElement.scrollBy({
      top: this.dialogBox.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  refresh() {
    this.answer = [];
    this.store.dispatch(chatbotActions.refreshConversation());
  }

  closeChatbot() {
    this.isOpen = false;
    document.querySelector('body')!.style.overflow = 'auto';
  }

  openChatbot() {
    if (this.initial) {
      this.store.dispatch(chatbotActions.refreshConversation());
      
      const metaTag = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      metaTag.content = "width=device-width, initial-scale=1, maximum-scale=1"; 
      this.initial = false;
    }
    this.isOpen= true;
    document.querySelector('body')!.style.overflow = 'hidden';
  }

  ngAfterViewChecked() {
    const textInputElement = document.querySelector('#textInputELement') as HTMLInputElement;
    if (textInputElement && !this.initial) {
      textInputElement.focus();
    }
  }

  ngOnDestroy() {
    this.isTypingSub.unsubscribe();
    this.optionsSub.unsubscribe();
  }
}


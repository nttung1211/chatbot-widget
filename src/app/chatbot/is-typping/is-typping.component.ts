import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-is-typping',
  templateUrl: './is-typping.component.html',
  styleUrls: ['./is-typping.component.scss']
})
export class IsTyppingComponent implements OnInit {
  env = environment;
  uiSetName: string = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}

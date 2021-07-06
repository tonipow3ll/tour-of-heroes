import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // must be public, we will bind this to the template. Angular will only bind to PUBLIC component properties. 
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}

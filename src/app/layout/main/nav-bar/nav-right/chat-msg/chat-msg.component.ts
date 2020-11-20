import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements OnInit {
  @Input() friendId: number;
  @Output() onChatToggle = new EventEmitter();
  @ViewChild(PerfectScrollbarComponent, {static: false}) componentRef?: PerfectScrollbarComponent;
  public friendsList: any;
  public userChat: any;
  public chatMessage: any;
  public message: string;
  public message_error: boolean;
  public friendWriting: boolean;
  public newReplay: any;

  constructor(private rend: Renderer2) {
    this.newReplay = '';
  }

  ngOnInit() {
    this.friendsList = [
      {
        id: 1,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Josephin Doe',
        new: 3,
        status: 1,
        time: 'typing'
      },
      {
        id: 2,
        photo: 'assets/images/user/avatar-2.jpg',
        name: 'Lary Doe',
        new: 1,
        status: 1,
        time: 'online'
      },
      {
        id: 3,
        photo: 'assets/images/user/avatar-3.jpg',
        name: 'Alice',
        status: 1,
        time: 'online'
      },
      {
        id: 4,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Alia',
        status: 0,
        new: 1,
        time: '10 min ago'
      },
      {
        id: 5,
        photo: 'assets/images/user/avatar-4.jpg',
        name: 'Suzen',
        status: 0,
        time: '15 min ago'
      },
      {
        id: 1,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Josephin Doe',
        new: 3,
        status: 1,
        time: 'typing'
      },
      {
        id: 2,
        photo: 'assets/images/user/avatar-2.jpg',
        name: 'Lary Doe',
        new: 1,
        status: 1,
        time: 'online'
      },
      {
        id: 3,
        photo: 'assets/images/user/avatar-3.jpg',
        name: 'Alice',
        status: 1,
        time: 'online'
      },
      {
        id: 4,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Alia',
        status: 0,
        new: 1,
        time: '10 min ago'
      },
      {
        id: 5,
        photo: 'assets/images/user/avatar-4.jpg',
        name: 'Suzen',
        status: 0,
        time: '15 min ago'
      },
      {
        id: 3,
        photo: 'assets/images/user/avatar-3.jpg',
        name: 'Alice',
        status: 1,
        time: 'online'
      },
      {
        id: 4,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Alia',
        status: 0,
        new: 1,
        time: '10 min ago'
      },
      {
        id: 5,
        photo: 'assets/images/user/avatar-4.jpg',
        name: 'Suzen',
        status: 0,
        time: '15 min ago'
      },
      {
        id: 3,
        photo: 'assets/images/user/avatar-3.jpg',
        name: 'Alice',
        status: 1,
        time: 'online'
      },
      {
        id: 4,
        photo: 'assets/images/user/avatar-1.jpg',
        name: 'Alia',
        status: 0,
        new: 1,
        time: '10 min ago'
      },
      {
        id: 5,
        photo: 'assets/images/user/avatar-4.jpg',
        name: 'Suzen',
        status: 0,
        time: '15 min ago'
      },
    ];
    this.userChat = [
      {
        friend_id: 1,
        friend_photo: 'assets/images/avatar-3.jpg',
        messages: [
          {
            type: 1,
            msg: 'I\'m just looking around. Will you tell me something about yourself?',
            time: '8:20 a.m'
          },
          {
            type: 0,
            msg: 'Ohh! very nice',
            time: '8:22 a.m'
          },
          {
            type: 1,
            msg: 'can you come with me?',
            time: '8:22 a.m'
          }
        ]
      },
      {
        friend_id: 2,
        friend_photo: 'assets/images/avatar-2.jpg',
        messages: [
          {
            type: 1,
            msg: 'Hiii!!! Good Morning',
            time: '6:48 a.m'
          },
          {
            type: 0,
            msg: 'Hello, Very Good Morning',
            time: '6:50 a.m'
          },
          {
            type: 0,
            msg: 'How are You?',
            time: '8:50 a.m'
          },
          {
            type: 1,
            msg: 'Fine, What do you do?',
            time: '8:51 a.m'
          }
        ]
      },
      {
        friend_id: 3,
        friend_photo: 'assets/images/avatar-4.jpg',
        messages: [
          {
            type: 1,
            msg: 'I\'m just looking around. Will you tell me something about yourself?',
            time: '8:20 a.m'
          },
          {
            type: 0,
            msg: 'Ohh! very nice',
            time: '8:22 a.m'
          },
          {
            type: 1,
            msg: 'can you come with me?',
            time: '8:22 a.m'
          }
        ]
      },
      {
        friend_id: 4,
        friend_photo: 'assets/images/avatar-3.jpg',
        messages: [
          {
            type: 1,
            msg: 'Hiii!!! Good Morning',
            time: '6:48 a.m'
          },
          {
            type: 0,
            msg: 'Hello, Very Good Morning',
            time: '6:50 a.m'
          },
          {
            type: 0,
            msg: 'How are You?',
            time: '8:50 a.m'
          },
          {
            type: 1,
            msg: 'Fine, What do you do?',
            time: '8:51 a.m'
          }
        ]
      },
    ];
    this.chatMessage = findObjectByKeyValue(this.friendsList, 'id', this.friendId);
    if (this.chatMessage) {
      const message = findObjectByKeyValue(this.userChat, 'friend_id', this.friendId);
      if (message) {
        this.chatMessage['chat'] = message['messages'];
      }
    }
  }

  sentMsg(flag) {
    if (this.message === '' || this.message === undefined) {
      this.message_error = true;
    } else {
      if (flag === 1) {
        this.message_error = false;
      } else {
        this.message_error = false;
        const temp_replay = this.message;
        let html_send;
        html_send = '<div class="media chat-messages">' +
          '<div class="media-body chat-menu-reply">' +
            '<div class="">' +
              '<p class="chat-cont">' + this.message + '</p>' +
            '</div>' +
            '<p class="chat-time">now</p>' +
          '</div>' +
        '</div>';

        this.newReplay = this.newReplay + html_send;
        this.message = '';

        setTimeout(() => {
          this.componentRef.directiveRef.scrollToBottom();
        }, 100);
        this.friendWriting = true;
        setTimeout(() => {
          this.friendWriting = false;

          let html_replay;
          html_replay = '<div class="media chat-messages">' +
            '<a class="media-left photo-table" href="javascript:">' +
            '<img class="media-object img-radius img-radius m-t-5" src="' + this.chatMessage.photo + '" alt="' + this.chatMessage.name + '">' +
            '</a>' +
            '<div class="media-body chat-menu-content">' +
            '<div class="">' +
            '<p class="chat-cont">hello superior personality you write</p>' +
            '<p class="chat-cont">' + temp_replay + '</p>' +
            '</div>' +
            '<p class="chat-time">now</p>' +
            '</div>' +
            '</div>';
          this.newReplay = this.newReplay + html_replay;
          setTimeout(() => {
            this.componentRef.directiveRef.scrollToBottom();
          }, 100);
        }, 3000);
      }
    }
  }

}

function findObjectByKeyValue(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return false;
}

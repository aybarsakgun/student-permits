import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent {
  @Input() friends;
  @Output() onChatOn = new EventEmitter();

  constructor() {
  }

  public innerChatToggle(friendId: number): void {
    this.onChatOn.emit();
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() uID: string;
  @Input() toastTitle: string;
  @Input() toastCaption: string;
  @Input() toastClass: string;

  public isShow: boolean;

  private toastEvent$: Subscription = null;

  constructor(
    private toastService: ToastService
  ) {
    this.isShow = false;
  }

  ngOnInit(): void {
    this.toastEvent$ = this.toastService.toggleToast.subscribe((toast) => {
      document.querySelector('#' + toast.uid).classList.add('show');
      setTimeout(() => {
        document.querySelector('#' + toast.uid).classList.remove('show');
      }, toast.delay ? toast.delay : 500);
    });
  }

  ngOnDestroy(): void {
    this.toastEvent$.unsubscribe();
  }

  closeToast(uid): void {
    document.querySelector('#' + uid).classList.remove('show');
  }

}

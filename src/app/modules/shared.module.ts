import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertModule} from '../components/alert/alert.module';
import {CardModule} from '../components/card/card.module';
import {ToastService} from '../components/toast/toast.service';
import {BreadcrumbModule} from '../components/breadcrumb/breadcrumb.module';
import {SpinnerComponent} from '../components/spinner/spinner.component';
import {ModalModule} from '../components/modal/modal.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../components/toast/toast.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    ClickOutsideModule
  ],
  declarations: [
    SpinnerComponent,
    ToastComponent,
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    SpinnerComponent,
    ToastComponent,
    ClickOutsideModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ToastService
  ]
})
export class SharedModule {
}

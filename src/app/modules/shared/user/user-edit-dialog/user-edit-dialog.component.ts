import {AfterViewInit, ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../interfaces/user.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  template: `
    <div class="form-row" [formGroup]="userForm">
      <div class="form-group col-md-6">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Name" formControlName="name">
        <div class="invalid-feedback" [class.d-block]="userForm.get('name').errors">Name is required.</div>
      </div>
      <div class="form-group col-md-6">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" placeholder="Last Name" formControlName="lastName">
        <div class="invalid-feedback" [class.d-block]="userForm.get('lastName').errors">Last name is required.</div>
      </div>
      <div class="form-group col-12">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone" placeholder="Phone" formControlName="phone" maxlength="14">
        <div class="invalid-feedback" [class.d-block]="userForm.get('phone').errors">The phone number is invalid.</div>
      </div>
    </div>
    <app-alert [dismiss]="true" [type]="'danger'" *ngIf="errorMessage">
      {{errorMessage}}
    </app-alert>
    <div class="float-right">
      <button type="button" class="btn btn-secondary" mat-dialog-close [disabled]="isSaving">Close</button>
      <button type="button" class="btn btn-primary ml-1" (click)="save()" [disabled]="isSaving"><span class="spinner-border spinner-border-sm" *ngIf="isSaving"></span>Save changes</button>
    </div>
  `
})
export class UserEditDialogComponent {
  public userForm: FormGroup;
  public isSaving: boolean;
  public errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User
    }
  ) {
    this.userForm = this.formBuilder.group({
      id: data.user.id,
      name: [data.user.name, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      phone: [data.user.phone],
    });
  }

  async save(): Promise<void> {
    this.isSaving = true;
    this.errorMessage = null;
    this.userForm.disable();
    await this.userService.updateUser(this.userForm.getRawValue()).then((data) => {
      this.dialogRef.close(data);
    }).catch((err: Error) => {
      this.isSaving = false;
      this.errorMessage = err.message;
      this.userForm.enable();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Class} from '../../../../interfaces/class.interface';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../../ngrx';
import {Observable} from 'rxjs';
import {User, USER_ROLE} from '../../../../interfaces/user.interface';
import {ResolverData} from '../../../../interfaces/resolver-data.interface';
import {MatDialog} from '@angular/material/dialog';
import {UserEditDialogComponent} from '../../../shared/user/user-edit-dialog/user-edit-dialog.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  public class: Class = null;
  public user$: Observable<User> = this.store.select(fromRoot.getCoreUser);
  public userRoles = USER_ROLE;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: ResolverData<Class>) => {
      this.class = data.response;
    });
  }

  editStudent(user: User): void {
    this.dialog.open(UserEditDialogComponent, {
      data: {
        user
      }
    }).afterClosed().pipe(take(1)).subscribe((data: User) => {
      const findStudent = this.class.students.findIndex(student => student.id === data.id);
      if (findStudent !== -1) {
        this.class.students[findStudent] = data;
      }
    });
  }
}

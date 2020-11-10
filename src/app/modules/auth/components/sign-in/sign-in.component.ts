import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {from} from 'rxjs';
import {first} from 'rxjs/operators';
import {BASE_URL} from '../../../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public tokenVerifying: boolean;

  constructor(
    title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    title.setTitle('Sign In - Student Permits');
  }

  /**
   * @return void
   */
  public ngOnInit(): void {
    this.init();
    window.scroll(0, 0);
  }

  /**
   * @returns Promise<void>
   */
  public init(): void {
    const queryParams: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    if (queryParams.has('token')) {
      this.tokenVerifying = true;
      from(this.auth.verifyToken(queryParams.get('token'))).pipe(
        first()
      ).subscribe((result: boolean) => {
        if (result) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigate(['']);
          this.tokenVerifying = false;
        }
      });
    }
  }

  /**
   * @return void
   */
  public login(): void {
    window.location.href = `${BASE_URL}/auth/google`;
  }

}

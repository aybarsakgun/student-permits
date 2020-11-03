import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  /** Sign in form */
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  constructor(
    title: Title,
  ) {
    title.setTitle('Sign In - Student Permits');
  }

  /**
   * @return void
   */
  public ngOnInit(): void {
    window.scroll(0, 0);
  }

  /**
   * @param property (string)
   * @returns ValidationErrors
   */
  public FrmCtrlErrs(property: string): ValidationErrors {
    return this.form.controls[property].errors;
  }

  /**
   * @returns Promise<void>
   */
  public async SignIn(): Promise<void> {
    // try {
    //   const {email, password} = this.form.value;
    //   await this.auth.SignIn(email, password);
    //   this.form.reset();
    //   this.modal.OpenMessage({
    //     title: 'Welcome!',
    //     message: 'You are sign in successfully.'
    //   });
    //   this.router.navigateByUrl('/client/todos');
    // } catch (err) {
    //   console.warn('[ERROR] SignInComponent.SignIn:', err);
    //   this.form.reset();
    //   this.modal.OpenMessage({
    //     title: 'Oops!',
    //     message: 'Your email or password is wrong!'
    //   });
    // }
  }

  public login(): void {
    window.open('http://127.0.0.1:3000/auth/google', 'mywindow', 'location=1,status=1,scrollbars=1, width=800,height=800');
    window.addEventListener('message', (message) => {
      console.log(message);
    });
  }
}

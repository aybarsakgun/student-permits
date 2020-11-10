import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public seconds = 5;

  constructor(title: Title, private router: Router) {
    title.setTitle('404 - Student Permits');
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    window.scroll(0, 0);
    const interval = setInterval(() => {
      if (this.seconds > 0) {
        return --this.seconds;
      }
      this.router.navigateByUrl('/');
      clearInterval(interval);
    }, 1000);
  }
}

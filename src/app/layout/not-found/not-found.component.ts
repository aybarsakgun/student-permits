import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {appName} from '../../constants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public seconds = 5;

  constructor(
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle('404 Not Found - ' + appName);
  }

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

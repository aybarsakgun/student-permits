import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('Home - Student Permits');
  }

  /**
   * @return void
   */
  public ngOnInit(): void {
    window.scroll(0, 0);
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Class} from '../../../../interfaces/class.interface';

export interface ResolverData<T> {
  response: T;
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  public class: Class = null;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: ResolverData<Class>) => {
      console.log(data);
      this.class = data.response;
    });
  }

}

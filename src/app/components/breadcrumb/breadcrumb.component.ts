import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NavigationItem, NavigationItems} from '../../layout/main/navigation/navigation';
import {appName} from '../../constants';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  private routerEvents$: Subscription = null;
  private navigation: NavigationItem[] = NavigationItems;
  public navigationList: NavigationItem[] = [];

  constructor(
    private route: Router,
    private titleService: Title
  ) {
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    let routerUrl: string;
    routerUrl = this.route.url;
    if (routerUrl && typeof routerUrl === 'string') {
      this.filterNavigation(routerUrl);
    }
  }

  ngOnDestroy(): void {
    this.routerEvents$.unsubscribe();
  }

  private setBreadcrumb(): void {
    let routerUrl: string;
    this.routerEvents$ = this.route.events.subscribe((router) => {
      if (router instanceof NavigationEnd) {
        routerUrl = router.urlAfterRedirects;
        if (routerUrl && typeof routerUrl === 'string') {
          const activeLink = router.url;
          this.filterNavigation(activeLink);
        }
      }
    });
  }

  private filterNavigation(activeLink): void {
    let result = [];
    let title = 'Dashboard';
    this.navigation.forEach((a) => {
      if (a.type === 'item' && 'url' in a && a.url === activeLink) {
        result = [
          {
            url: ('url' in a) ? a.url : false,
            title: a.title,
            breadcrumbs: ('breadcrumbs' in a) ? a.breadcrumbs : true,
            type: a.type
          }
        ];
        title = a.title;
      } else {
        if (a.type === 'group' && 'children' in a) {
          a.children.forEach((b) => {
            if (b.type === 'item' && 'url' in b && b.url === activeLink) {
              result = [
                {
                  url: ('url' in b) ? b.url : false,
                  title: b.title,
                  breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                  type: b.type
                }
              ];
              title = b.title;
            } else {
              if (b.type === 'collapse' && 'children' in b) {
                b.children.forEach((c) => {
                  if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                    result = [
                      {
                        url: ('url' in b) ? b.url : false,
                        title: b.title,
                        breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                        type: b.type
                      },
                      {
                        url: ('url' in c) ? c.url : false,
                        title: c.title,
                        breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                        type: c.type
                      }
                    ];
                    title = c.title;
                  } else {
                    if (c.type === 'collapse' && 'children' in c) {
                      c.children.forEach((d) => {
                        if (d.type === 'item' && 'url' in d && d.url === activeLink) {
                          result = [
                            {
                              url: ('url' in b) ? b.url : false,
                              title: b.title,
                              breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                              type: b.type
                            },
                            {
                              url: ('url' in c) ? c.url : false,
                              title: c.title,
                              breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                              type: c.type
                            },
                            {
                              url: ('url' in d) ? d.url : false,
                              title: d.title,
                              breadcrumbs: ('breadcrumbs' in c) ? d.breadcrumbs : true,
                              type: d.type
                            }
                          ];
                          title = d.title;
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
    this.navigationList = result;
    this.titleService.setTitle(title + ' - ' + appName);
  }

}

import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public links = [
    { name: 'MWC Demo Home', icon: 'home', href: '' },
    { name: 'Project info and contacts', icon: 'person', href: 'contacts' },
    { name: 'MyUW Web Components', icon: 'apps', href: 'https://github.com/myuw-web-components/' }
  ];

  public sessionRoutes = [
    { session1: './demo-sessions/session.json '}
  ];

  constructor(
    private router: Router,
    private _ref: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  /**
   * Use angular routing when drawer links are clicked
   */
  useAngularRoute(route: string, event: any) {
    // Stop click event on drawer component
    event.preventDefault();
    event.stopPropagation();

    // Go to the angular route
    this.router.navigate([route]);

    // Hacky way to manually close the drawer
    try {
      ((document.querySelector('myuw-drawer') as any).shadowRoot.querySelector('div#drawer-container') as any).removeAttribute('open');
    } catch (err) {
      console.error(err);
    }
  }
}

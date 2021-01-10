import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cyc';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 0 ||     
    document.documentElement.scrollTop > 0) {
      document.getElementById('navbar').classList.add('sticky');
      /* document.getElementById('navbar').classList.add('fixed-top'); */
    } else{
      document.getElementById('navbar').classList.remove('sticky');
      /* document.getElementById('navbar').classList.remove('fixed-top'); */
    }
  }
}

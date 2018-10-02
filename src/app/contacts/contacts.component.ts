import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  
  constructor(
    private router: Router
  ) { }

}

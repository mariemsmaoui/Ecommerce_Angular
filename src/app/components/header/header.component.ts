import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  slides = [
    {
      image:
        'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    },
  ];
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

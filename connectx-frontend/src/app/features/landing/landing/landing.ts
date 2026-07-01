import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  scrollToFeatures() {
    const section = document.getElementById('features');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
}

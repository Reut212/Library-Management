import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'library';
  name: string = 'Reut';
  search_subtitle : string = 'Please add a book name to search:'
  loadedFeature : string  = 'library-list'

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

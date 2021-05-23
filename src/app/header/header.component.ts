import { Component } from '@angular/core';
import { DataStorageServices } from '../shared/data-storage.services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private DataStorageServices: DataStorageServices) {}
  onSaveData() {
    this.DataStorageServices.storeRecipes();
  }
  onFetchData() {
    this.DataStorageServices.fetchRecipes().subscribe();
  }
}

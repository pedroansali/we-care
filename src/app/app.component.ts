import { Component } from '@angular/core';
import * as Parse from 'parse';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(){
    Parse.initialize("DhfqZaozdGV6FKMO1RhkwOsoRACmQo1upy478yfi","yzCWazMAgDqw31lvVuZBzrKqXV7Wa6nY9WvGUsGQ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }
  title = 'WeCare';
}

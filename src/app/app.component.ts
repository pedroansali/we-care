import { Component } from '@angular/core';
import * as Parse from 'parse';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(){
    Parse.initialize("kyl9W1N6CuZWtOQhsF34Ehe9PyzNgMw8eIKKan66","9cYcu6YnT5uKNVh6MVZcBtPWfHFDcFLoFzacNtnF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }
  title = 'WeCare';
}

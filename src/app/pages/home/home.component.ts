import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private translate: TranslateService){
    
  }
  switchlang(){
    let lang =  document.getElementById('lang');
    if (lang && lang.getAttribute('href') == 'assets/css/style-ltr.css') {
      lang.setAttribute('href', 'assets/css/style-rtl.css');
      this.translate.use('ar');
  } else {
    lang && lang.setAttribute('href', 'assets/css/style-ltr.css');
    this.translate.use('en');

  }
  }
}

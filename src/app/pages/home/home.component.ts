import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dafaultLang: string = 'EN';

  switchlang(){
    let lang =  document.getElementById('lang');
    if (lang && lang.getAttribute('href') == 'assets/css/style-ltr.css') {
      lang.setAttribute('href', 'assets/css/style-rtl.css');
      this.dafaultLang = 'EN'
  } else {
    lang && lang.setAttribute('href', 'assets/css/style-ltr.css');
    this.dafaultLang = 'AR'

  }
  }
}

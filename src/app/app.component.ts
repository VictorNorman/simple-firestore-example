import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
  ) {
    firebase.initializeApp({
      // put your project information here from the firestore console.
    });
    firebase.firestore().enablePersistence().catch((err) => {
      console.log('Offline persistence set up failed', err);
    });
  }
}

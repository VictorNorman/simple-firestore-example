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
      apiKey: 'AIzaSyDeOgRwEdboVJ2e_SPFpuJJsYKS9aP31Uc',
      authDomain: 'event-manager-26d59.firebaseapp.com',
      databaseURL: 'https://event-manager-26d59.firebaseio.com',
      projectId: 'event-manager-26d59',
      storageBucket: '',
      messagingSenderId: '482629668920'
    });
    firebase.firestore().enablePersistence().catch((err) => {
      console.log('Offline persistence set up failed', err);
    });
  }
}

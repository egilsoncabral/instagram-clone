import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'insta-clone';

  ngOnInit() : void {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA_0ULVleBLAu2LZEkqMhgsvhkwqV4AV2g",
      authDomain: "app-insta-clone.firebaseapp.com",
      databaseURL: "https://app-insta-clone.firebaseio.com",
      projectId: "app-insta-clone",
      storageBucket: "app-insta-clone.appspot.com",
      messagingSenderId: "435213342051"
    };

    firebase.initializeApp(config)
  }
}

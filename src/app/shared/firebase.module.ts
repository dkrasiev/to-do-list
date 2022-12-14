import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot({
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // {
        //   scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
        //   customParameters: {
        //     auth_type: 'reauthenticate',
        //   },
        //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // },
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
          requireDisplayName: false,
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // tosUrl: '<your-tos-link>',
      // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    }),
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule,
  ],
})
export class FirebaseModule {}

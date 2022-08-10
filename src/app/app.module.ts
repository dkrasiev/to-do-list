import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-list/todo-item/todo-item.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoFilterPipe } from './pipes/todo-filter.pipe';
import { TodoSortingComponent } from './components/todo-sorting/todo-sorting.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CheckboxComponent } from './components/UI/checkbox/checkbox.component';
import { GroupComponent } from './components/UI/group/group.component';

import { environment } from '../environments/environment';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { ModalComponent } from './components/UI/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFilterComponent,
    TodoFilterPipe,
    TodoSortingComponent,
    SidenavComponent,
    CheckboxComponent,
    GroupComponent,
    StopPropagationDirective,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [TodoFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

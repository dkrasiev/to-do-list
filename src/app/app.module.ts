import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-list/todo-item/todo-item.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoFilterPipe } from './pipes/todo-filter.pipe';
import { TodoSortingComponent } from './components/todo-sorting/todo-sorting.component';
import { SidenavComponent } from './components/UI/sidenav/sidenav.component';
import { CheckboxComponent } from './components/UI/checkbox/checkbox.component';
import { GroupComponent } from './components/UI/group/group.component';
import { ModalComponent } from './components/UI/modal/modal.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';

import { MaterialModule } from './shared/material.module';

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

    MaterialModule,
  ],
  providers: [TodoFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

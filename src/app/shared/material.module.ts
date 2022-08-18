import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatChipsModule,
  ],
})
export class MaterialModule {}

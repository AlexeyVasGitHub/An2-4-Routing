import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent, PathNotFoundComponent, MessagesComponent, LoginComponent } from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AboutComponent, PathNotFoundComponent, MessagesComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LayoutModule { }

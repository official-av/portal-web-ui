import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  exports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule]
})
export class MaterialModule {

}

import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule, MatInputModule,MatFormFieldModule],
  exports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule, MatInputModule,MatFormFieldModule]
})
export class MaterialModule {

}

import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule],
  exports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule]
})
export class MaterialModule {

}

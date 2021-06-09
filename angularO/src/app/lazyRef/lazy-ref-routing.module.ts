import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveRefidComponent } from './save-refid/save-refid.component';

const routes: Routes = [
      {
        path: 'save/:refId',
        component : SaveRefidComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRefRoutingModule { }

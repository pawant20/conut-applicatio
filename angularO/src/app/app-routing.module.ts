import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eagerUrl, modules } from './angularUrl/angularUrl';

import { AuthGaurdService } from './route-gaurds/auth-gaurd.service';
import { AlreadyLoggedInGaurdsService } from './route-gaurds/already-logged-in-gaurds.service';
import { PreLoadingStrategyService } from './services/pre-loading-strategy.service';
import { AdminGaurdService } from './route-gaurds/admin-gaurd.service';
import { DeliveryGaurdService } from './route-gaurds/delivery-gaurd.service';

import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: eagerUrl.home,
    component : HomeComponent
  },
  { path: 'login-register',
    component : LoginRegisterComponent ,
    canActivate: [AlreadyLoggedInGaurdsService]
  },
  { path: modules.preLazy,
    data: { preload: true },
    loadChildren: () => import('./preLazy/pre-lazy.module').then(m => m.PreLazyModule)
  },
  { path: modules.lazy,
    loadChildren: () => import('./lazyModule/lazy-load.module').then(m => m.LazyLoadModule)
  },
  {
    path: modules.lazyTwo,
    loadChildren: () => import('./lazy-two/lazy-two.module').then(m => m.LazyTwoModule)
  },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate : [AdminGaurdService]
  },
  { path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
    canActivate : [DeliveryGaurdService]
  },
  {
    path: modules.lazySaveRef,
    loadChildren: () => import('./lazyRef/lazy-ref.module').then(m => m.LazyRefModule),
    canActivate : [AuthGaurdService]
  },
  { path: '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
              {
                scrollPositionRestoration: 'enabled',
                preloadingStrategy: PreLoadingStrategyService
              })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

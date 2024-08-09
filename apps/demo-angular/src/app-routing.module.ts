import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'flutter', loadChildren: () => import('./plugin-demos/flutter.module').then((m) => m.FlutterModule) },
  { path: 'ionic-portals', loadChildren: () => import('./plugin-demos/ionic-portals.module').then((m) => m.IonicPortalsModule) },
  { path: 'jetpack-compose', loadChildren: () => import('./plugin-demos/jetpack-compose.module').then((m) => m.JetpackComposeModule) },
  { path: 'rive', loadChildren: () => import('./plugin-demos/rive.module').then((m) => m.RiveModule) },
  { path: 'rive-demos/rive-examples', loadChildren: () => import('./rive-demos/rive-demos.module').then((m) => m.RiveDemosModule) },
  { path: 'swift-ui', loadChildren: () => import('./plugin-demos/swift-ui.module').then((m) => m.SwiftUiModule) },
  { path: 'swift-ui-demos', loadChildren: () => import('./swift-ui-demos/swift-ui-demos.module').then((m) => m.SwiftUiDemosModule) },
  { path: 'swift-ui-demo-type/:id', loadChildren: () => import('./swift-ui-demos/swift-ui-demo-type.module').then((m) => m.SwiftUiDemoTypeModule) },
  { path: 'ui-charts', loadChildren: () => import('./plugin-demos/ui-charts.module').then((m) => m.UiChartsModule) },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

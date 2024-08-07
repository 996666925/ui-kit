import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SwiftUiComponent } from './swift-ui.component';

const routes = [{ path: '', component: SwiftUiComponent }];

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [SwiftUiComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SwiftUiModule {}

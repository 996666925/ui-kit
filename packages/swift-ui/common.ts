import { EventData, View, Property, Utils } from '@nativescript/core';

export * from './view-helper';

export type RegistryCallback = (view: SwiftUICommon) => BaseUIDataDriver<SwiftUICommon>;
export declare function registerSwiftUI(id: string, callback: RegistryCallback);
export declare interface SwiftUIEventData<T> extends EventData {
  data: T;
}

/**
 * Custom view lifecycle for flavor integrations.
 */
export type CustomViewLifeCycle = { create: (id: string, component: any) => View; destroy: (id: string) => void };

export class SwiftUICommon extends View {
  static swiftUIEventEvent = 'swiftUIEvent';
  data: any;
  swiftId: string;
}

export abstract class BaseUIDataDriver<ViewType extends SwiftUICommon = SwiftUICommon, DataType = unknown, ReceivedDataType = unknown> {
  protected owner: WeakRef<ViewType>;
  constructor(view: ViewType) {
    this.owner = new WeakRef(view);
  }
  updateData?(data: DataType): void;
  onEvent?(data: ReceivedDataType): void;
  abstract createNativeView(): UIView;
  registerEvents?(callback: (data: ReceivedDataType) => void): void;
  destroyNativeView?(): void;
}

export const dataProperty = new Property<SwiftUICommon, any>({
  name: 'data',
});

dataProperty.register(SwiftUICommon);

export const swiftIdProperty = new Property<SwiftUICommon, string>({
  name: 'swiftId',
});

swiftIdProperty.register(SwiftUICommon);

export interface NativeScriptWindowCommon {
  id: string;

  open(props?: any): Promise<void>;

  close(): Promise<void>;

  update(props?: any): Promise<void>;
}

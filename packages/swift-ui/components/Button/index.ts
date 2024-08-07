// @ts-nocheck
import { LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUILayoutBase, SwiftUIViewBase } from '../common';

export const titleProperty = new Property<Button, string>({
  name: 'title',
  valueConverter: (v) => `${v || ''}`,
});

export class Button extends SwiftUIViewBase {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = ButtonProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }

  _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    this.props.children.push(view.nativeViewProtected);
    this.updateData();
    return true;
  }
  [titleProperty.setNative](value: string) {
    this.props.title = value;
    this.updateData();
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}
titleProperty.register(Button);

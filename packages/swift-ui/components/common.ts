import { LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '..';

export class SwiftUIBase extends View {}

const modifiersProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

type FrameModifier = { width: number; height: number };
const frameProperty = new Property<SwiftUIViewBase, FrameModifier>({
  name: 'frame',
});

type EnvironmentType = { colorScheme: 'dark' | 'light' };
const environmentProperty = new Property<SwiftUIViewBase, EnvironmentType>({
  name: 'environment',
});

export class SwiftUIViewBase extends View {
  provider: UIViewController & any;
  modifiers: Array<any>;
  props: any = {};

  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }
  [frameProperty.setNative](value: FrameModifier) {
    if (value) {
      this.updateModifier(frameProperty.name, value);
    }
  }
  [environmentProperty.setNative](value: FrameModifier) {
    if (value) {
      this.updateModifier(environmentProperty.name, value);
    }
  }
  [modifiersProperty.setNative](value: any) {
    if (!value) {
      value = [];
    }
    // NOTE: maybe always add frame?
    // const frameIndex = value.findIndex((m) => !!m.frame);
    // if (frameIndex === -1) {
    //   value.push({ frame: { width: this.width, height: this.height } });
    // }
    // console.log('update base modifiers!', this.width, this.height);
    // TODO: use a Map with modifiers to compose/combine them faster
    for (const mod of value) {
      for (const key of Object.keys(mod)) {
        this.props.modifiers = this.combineModifers(key, mod[key]);
      }
    }
    this.updateData(modifiersProperty.name, this.props.modifiers);
  }
  updateModifier(key: string, value: any) {
    this.updateData(modifiersProperty.name, this.combineModifers(key, value));
  }

  private combineModifers(key: string, value: any) {
    let modifiers = this.props.modifiers;
    if (!modifiers) {
      modifiers = [];
    }
    // Note: may need to consider when you "want" duplicate modifiers
    const index = modifiers.findIndex((m) => !!m[key]);
    if (index > -1) {
      modifiers[index][key] = value;
      modifiers = [...modifiers];
    } else {
      modifiers = [
        ...modifiers,
        {
          [key]: value,
        },
      ];
    }
    return modifiers;
  }

  updateData(key?: string, value?: any) {
    if (key) {
      this.props[key] = value;
    }
    console.log('modifiers:', this.props.modifiers);
    this.provider.updateDataWithData(this.props);
  }
}

modifiersProperty.register(SwiftUIViewBase);
frameProperty.register(SwiftUIViewBase);
environmentProperty.register(SwiftUIViewBase);

const modifiersLayoutProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

export class SwiftUILayoutBase extends LayoutBase {
  provider: UIViewController & any;
  props: any = {};

  addChild(view: View): void {
    const autoLayout = new AutoLayoutView();
    autoLayout.addChild(view);
    super.addChild(autoLayout);
  }

  _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    if (!this.props.children) {
      this.props.children = [];
    }
    this.props.children.push(view.nativeViewProtected);
    this.updateData();
    return true;
  }

  [modifiersLayoutProperty.setNative](value: any) {
    if (!value) {
      value = [];
    }
    // NOTE: maybe always add frame?
    // const frameIndex = value.findIndex((m) => !!m.frame);
    // if (frameIndex === -1) {
    //   value.push({ frame: { width: this.width, height: this.height } });
    // }
    // console.log('update base modifiers!', this.width, this.height);
    // TODO: use a Map with modifiers to compose/combine them faster
    for (const mod of value) {
      for (const key of Object.keys(mod)) {
        this.props.modifiers = this.combineModifers(key, mod[key]);
      }
    }
    this.updateData(modifiersLayoutProperty.name, this.props.modifiers);
  }
  updateModifier(key: string, value: any) {
    this.updateData(modifiersLayoutProperty.name, this.combineModifers(key, value));
  }

  private combineModifers(key: string, value: any) {
    let modifiers = this.props.modifiers;
    if (!modifiers) {
      modifiers = [];
    }
    // Note: may need to consider when you "want" duplicate modifiers
    const index = modifiers.findIndex((m) => !!m[key]);
    if (index > -1) {
      modifiers[index][key] = value;
      modifiers = [...modifiers];
    } else {
      modifiers = [
        ...modifiers,
        {
          [key]: value,
        },
      ];
    }
    return modifiers;
  }

  updateData(key?: string, value?: any) {
    if (key) {
      this.props[key] = value;
    }
    console.log('modifiers:', this.props.modifiers);
    this.provider.updateDataWithData(this.props);
  }
}

modifiersLayoutProperty.register(SwiftUILayoutBase as any);

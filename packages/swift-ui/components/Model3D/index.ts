import { Property, Utils, knownFolders, path } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const srcProperty = new Property<Model3D, string>({
  name: 'src',
});

const depthProperty = new Property<Model3D, number>({
  name: 'depth',
  defaultValue: 200,
  valueConverter: (value) => Number(value),
});

export type Model3DModifiers = 'accessibilitySortPriority' | 'dragRotation';

const accessibilitySortPriorityModifier = new Property<Model3D, number>({
  name: 'accessibilitySortPriority',
  valueConverter: (value) => Number(value),
});

type DragRotationType = { yawLimit: number; pitchLimit: number };
const dragRotationModifier = new Property<Model3D, DragRotationType>({
  name: 'dragRotation',
});

export class Model3D extends SwiftUIViewBase {
  src: string;
  depth: number;
  dragRotation: DragRotationType;
  accessibilitySortPriority: number;

  createNativeView() {
    // @ts-expect-error
    this.provider = Model3DViewProvider.new();
    return this.provider.view;
  }

  [srcProperty.setNative](value: string) {
    if (value) {
      if (value.indexOf('http') === 0) {
        this.props.url = value;
      } else {
        if (value.indexOf(Utils.RESOURCE_PREFIX) > -1) {
          value = value.replace(Utils.RESOURCE_PREFIX, '');
        } else if (value.indexOf('~/') === 0) {
          const paths = value.replace('~/', '').split('/');
          const appFilePath = path.join(knownFolders.currentApp().path, ...paths);
          // console.log('appFilePath:', appFilePath);
          value = appFilePath;
        }
        this.props.name = value;
      }
      this.updateData();
    }
  }
  [depthProperty.setNative](value: number) {
    this.updateData(depthProperty.name, value);
  }
  [dragRotationModifier.setNative](value: DragRotationType) {
    if (value) {
      this.updateModifier(dragRotationModifier.name, value);
    }
  }
  [accessibilitySortPriorityModifier.setNative](value: number) {
    if (value) {
      this.updateModifier(accessibilitySortPriorityModifier.name, value);
    }
  }
}

srcProperty.register(Model3D);
depthProperty.register(Model3D);
dragRotationModifier.register(Model3D);
accessibilitySortPriorityModifier.register(Model3D);

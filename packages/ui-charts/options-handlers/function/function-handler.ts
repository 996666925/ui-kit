import { isAndroid } from '@nativescript/core';
import { toStringArray } from '../helpers/helpers';

// Old function, toString
// export function functionHandler(functionOptions) {
//   const cleanFunction = (fun) => fun.toString().replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, ' ');
//   const hiFunction = isAndroid ?
//     new com.highsoft.highcharts.core.HIFunction(cleanFunction(functionOptions)) :
//     new HIFunction({ JSFunction: cleanFunction(functionOptions) });

//   return hiFunction;
// }

// Fire and forget
// export function functionHandler(functionOptions) {
//   if (isAndroid) {
//     return new com.highsoft.highcharts.core.HIFunction(new java.lang.Runnable({
//       run: () => {
//         functionOptions();
//       }
//     }));
//   }

//   return new HIFunction({ closure: () => functionOptions() });
// }

// With event?
export function functionHandler(functionOptions) {
  if (isAndroid) {
    return new com.highsoft.highcharts.core.HIFunction(
      new java.lang.Runnable({
        run: functionOptions,
      })
    );
  }

  return new HIFunction({ closure: (event) => functionOptions(event) });
}

export function dataPointFunctionHandler(functionOptions) {
  if (isAndroid) {
    return new com.highsoft.highcharts.core.HIFunction(
      new java.lang.Runnable({
        run: functionOptions,
      })
    );
  }

  return new HIFunction({ closure: (event) => functionOptions(event) });
}

# cordova-plugin-crop-mod

> This is just cordova-plugin-crop v0.4.0 with few changes which allow control crop mode via options.

[![npm](https://img.shields.io/npm/v/cordova-plugin-crop-mod.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/l/cordova-plugin-crop-mod.svg?style=flat-square)]()

## Install

```
$ cordova plugin add --save cordova-plugin-crop-mod
```

## Changes

```
options.keepingAspectRatio = true; // Default value is "false"
```
![keepingAspectRatio=false](https://img.shields.io/badge/keepingAspectRatio-false-orange.svg?style=flat-square) |  ![keepingAspectRatio=true](https://img.shields.io/badge/keepingAspectRatio-true-green.svg?style=flat-square)
--- | ---
![keepingAspectRatio=false](https://i.imgur.com/OUblUsM.png)  | ![keepingAspectRatio=true](https://i.imgur.com/S3nc199.png)
### Libraries used

 * Source: [cordova-plugin-crop ](https://www.npmjs.com/package/cordova-plugin-crop)
 * iOS: [PEPhotoCropEditor](https://github.com/kishikawakatsumi/PEPhotoCropEditor)
 * Android: [android-crop](https://github.com/jdamcd/android-crop)
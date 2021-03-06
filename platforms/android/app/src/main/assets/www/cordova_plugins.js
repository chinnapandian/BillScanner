cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-camera.Camera",
    "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "Camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverOptions",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverOptions"
    ]
  },
  {
    "id": "cordova-plugin-camera.camera",
    "file": "plugins/cordova-plugin-camera/www/Camera.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "navigator.camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverHandle",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverHandle"
    ]
  },
  {
    "id": "cordova-save-image-gallery.saveImageGallery",
    "file": "plugins/cordova-save-image-gallery/www/saveImageGallery.js",
    "pluginId": "cordova-save-image-gallery",
    "clobbers": [
      "cordova.saveImageGallery"
    ]
  },
  {
    "id": "cordova-plugin-crop-mod.CropPlugin",
    "file": "plugins/cordova-plugin-crop-mod/www/crop.js",
    "pluginId": "cordova-plugin-crop-mod",
    "clobbers": [
      "plugins.crop"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-camera": "4.0.3",
  "cordova-save-image-gallery": "0.0.26",
  "cordova-plugin-crop-mod": "1.0.0"
};
// BOTTOM OF METADATA
});
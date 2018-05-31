/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
"use strict";
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btn').addEventListener('click', app.takePicture);
    },

    //This method is used while using ONLY ImageDetectionPlugin and CORDOVA-PLUGIN-CAMERA
    takePicture: function(){
        var ratio = window.devicePixelRatio || 1;
            let opts = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                mediaType: Camera.MediaType.PICTURE,
                encodingType: Camera.EncodingType.JPEG,
                cameraDirection: Camera.Direction.BACK,
                saveToPhotoAlbum: true,
                targetWidth: screen.width * ratio,
                targetHeight: screen.height * ratio
            };

            navigator.camera.getPicture(app.onSuccess, app.onError, opts);
    },

    onSuccess: function(imgURI){
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function(){
                app.ToDataURL(this);
            };
            img.src = imgURI;
    },
    onError: function(msg){
            console.log(msg);
    },
    
    ToDataURL: function (self) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.height = self.height;
            canvas.width = self.width;
            ctx.drawImage(self, 0, 0);

            let src = cv.imread(canvas);
            let dst = new cv.Mat();
            // To distinguish the input and output, we graying the image.
            // You can try different conversions.
            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY,0);
            cv.adaptiveThreshold(src, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 41, 9);
            cv.imshow('canvasOutput', dst);
            //Store the adaptiveThreshold image into local storage.
            let canvasOutput = document.getElementById('canvasOutput');
            let dataURL = canvasOutput.toDataURL("image/jpeg", 0.8);
            var params = {data: dataURL, prefix: 'ATPic_', format: 'JPG', quality: 100};
            window.imageSaver.saveBase64Image(params,
                                              function (filePath) {
                                                  console.log('File saved on ' + filePath);
                                              },
                                              function (msg) {
                                                  console.error(msg);
                                              }
                                          );
            src.delete();
            dst.delete();
        },
    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

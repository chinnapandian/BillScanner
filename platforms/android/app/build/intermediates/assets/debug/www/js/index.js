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
                                //allowEdit: true,
                                targetWidth: screen.width * ratio,
                                targetHeight: screen.height * ratio
                            };

                    navigator.camera.getPicture(app.onSuccess, app.onError, opts);
            },

            onSuccess: function(imgURI){
            var ratio = window.devicePixelRatio || 1;
            plugins.crop(function success (imgPath) {
                    let img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.onload = function(){
                        app.ToDataURL(this);
                    };
                    img.src = imgPath;
            }, function fail () {
                    //console.log(msg);
            }, imgURI, { quality: 100, allowEdit: true, targetWidth: screen.width, targetHeight: screen.height});
            },

            onError: function(msg){
                    console.log(msg);
            },

            //To generate URI for the captured image
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
                    var params = {data: dataURL, prefix: 'ATPic_', format: 'JPG', quality: 100, mediaScanner: true};
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
                    canvas.remove();
            },

            onDeviceReady: function() {
                    this.receivedEvent('deviceready');
            },

            // Update DOM on a Received Event
            receivedEvent: function(id) {
                    console.log('Received Event: ' + id);
            }
        };

function onOpenCvReady() {
          document.getElementById('status').innerHTML = 'Bill Scanner is ready to use.';
        }
app.initialize();



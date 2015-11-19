UnoDropZone
==========


What is UnoDropZone?
-----

UnoDropZone is a tool to easily create ***single*** image drop zone areas. The library will convert the targeted html elements into Drop/click area to allow loading a single Image. The loaded image automatically changes into a thumbnail.
 
Demo 
--------


[UnoDropZone Demo page.](https://cdn.rawgit.com/suleimana/unodropzone/master/examples/index.html)



Prerequisites
-------
The only requirement is include JQuery library before using UnoDropZone . 

Features
--------

### - Easy to use
- **Import**  UnoDropZone js/css files into html page. 
- **Define** single drop zone areas by adding **'file-upload'**  class into each targeted html element.
- **Call** UnoDropZone.init() once the page finish loading. 
 Here is an example: 
  
````html
<html>
<head>    
    <script src="https://code.jquery.com/jquery-2.1.4.js"></script>
    <link rel="stylesheet" type="text/css" href="../lib/fileManager.css">
    <script src="../lib/fileManager.js"></script>
      <script>
        $(document).ready(function () {
            UnoDropZone.init();
        });
    </script>
</head>
<body>    
        <div class="file-upload" data-input-name="myFieldName">
        </div>
</body>
</html>
````


### - Thumbnail Functionality 
Once image is uploaded a thumbnail image will be generated. 

### - Image Information
Image will be populated under under hidden element with class 'info'.  Currently the library generates the span element for Name and size information.  

###  - Callback Function
You can define a callback function to executed after loading the image, by adding data attribute called **"data-unodz-callback"**. The callback passes only one argument into the executed function, which is a reference to the targeted drop zone.
     

###  - Custom Message 
unoDropzone comes with default message "Drop image in here or click to upload", which  appears at the top drop zone on mouse hover.  However,  you can customize the message  by  one of the following ways: 

 - **On init call**: You can change the default message for all unoDropZone areas, by passing the custom message at   initializing: 
 
 ```js
 UnoDropZone.init('My Custom Message Here.');
 ```

- Using **'data-unodz-msg'** attribute: in case you want a diffident custom message for drop zone area, all you need to do is to add **'data-unodz-msg'** into the man container. For Example: 

```html
<div class="file-upload" data-input-name="myFieldName" data-unodz-msg="My Custom Message Here.">
        </div>
```
 
 
UnoDropZone html structure
---
The html structure consists of the following main areas: 
 - File input (with class: **'file-input'**): contains the file input element 
 - Drop zone (with class: **'drop-click-zone'**), contains the image thumbnail. 
 - Image info (with class: **'info'**): Contains the loaded image information. this area is hidden be default. It can be used to lookup the following info:  
	 -  Name: image name with extension. 
	 - Size: image normalized size value.

Here is how the html structure looks like: 

````html

    <div class="file-upload" data-input-name="myFieldName" title="Name: xx Size: xx">
        <div class="file-input">
            <input name="myFieldName" type="file" accept="image/*">
        </div>
        <div class="drop-click-zone">
            <div class="filethumbnail">
                <img class="img" src="data:image/jpeg xx">
            </div>
        </div>
        <div class="info">
            <span class="name">xx</span>
            <span class="size">xx</span>
        </div>
        <div class="message">Drop image in here or click to upload</div>
    </div>
    
````

UnoDropZone Details : 
---
### - Attributes:
 - **data-input-name** :  name of the file input element. This is useful when submitting  the file into your back-end  server. 
 - **data-unodz-callback** :  full function name  to be called back after loading the image. 
 - **data-unodz-msg** :  set a custom message for this particular drop zone area. 
### - Functions:
- UnoDropZone.init() : must be called after page finish loading to initialize all drop zones.  

Browser support
--------
The library tested in the following browsers:  
- Chrome 
- Firefox 



### TODO List

Here are the list of tasks that should be included next: 
- Develop JS unit test.
- Include JS Document.
- Remove all JQuery dependencies in library and make pure it JavaScript.
- Add support to other Browser such IE.    

How can You help?
-----------------

UnoDropZone is an open source tool and welcomes contributions.


Author
--------
Suleiman Alrosan 

License
-------
 UnoDropZone is under Apache License

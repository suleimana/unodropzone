

UnoDropZone
var UnoDropZone = {
    settings: {
        uploadContSelector: '.file-upload',
        defaultMessage: 'Drop image in here or click to upload'
    },
    util: {
        executeFunctionByName: function (functionName, cont) {
            var context = '';
            try {
                context = functionName.substring(0, functionName.indexOf('.'));
                context = window[context];
                functionName = functionName.substring(functionName.indexOf('.') + 1, functionName.length);                

                var args = [].slice.call(arguments).splice(2);
                var namespaces = functionName.split(".");
                var func = namespaces.pop();

                for (var i = 0; i < namespaces.length; i++) {
                    context = context[namespaces[i]];
                }
                context[func].apply
                return context[func].apply(this, [cont]);
            } catch (err) {
                console.log('Error while calling callback method[' + functionName + ']');
                console.log(err);
            }
        },

        bytesToSize: function (bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0)
                return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }
    },
    init: function (uploadMessage) {
        //look for all divs with file-upload class
        $(UnoDropZone.settings.uploadContSelector).each(function (i, e) {
            UnoDropZone.initSingleFileZone(e, uploadMessage);
        });
    },
    initSingleFileZone: function (e, uploadMessage) {
        console.log('initSingleFileZone:');
        console.log(e);
        $(e).html('');       

        //create input area 
        var inputDiv = document.createElement('div');
        inputDiv.classList.add('file-input');

        var inputFiled = document.createElement('input');
        var inputName = e.getAttribute('data-input-name');
        inputFiled.setAttribute('name', inputName);
        inputFiled.setAttribute('type', 'file');
        inputFiled.setAttribute('accept', 'image/*');
        var onChnageCallback = e.getAttribute('data-callback');
        if (onChnageCallback) {
            inputFiled.setAttribute('data-callback', onChnageCallback);
        }

        inputFiled.addEventListener('change', UnoDropZone.handleInputFiles, false);

        inputDiv.appendChild(inputFiled);

        e.appendChild(inputDiv);

        //create drop-click-zone area 
        var dropZoneDiv = document.createElement('div');
        dropZoneDiv.classList.add('drop-click-zone');

        //create filethumbnail area 
        var filethumbnailDiv = document.createElement('div');
        filethumbnailDiv.classList.add('filethumbnail');
        dropZoneDiv.appendChild(filethumbnailDiv);

        //config drop zone
        dropZoneDiv.addEventListener("dragenter", UnoDropZone.dropZone.dragenter, false);
        dropZoneDiv.addEventListener("dragover", UnoDropZone.dropZone.dragover, false);
        dropZoneDiv.addEventListener("drop", UnoDropZone.dropZone.drop, false);
        dropZoneDiv.addEventListener("click", UnoDropZone.dropZone.click, false);

        e.appendChild(dropZoneDiv);

        //create info area 
        var infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        e.appendChild(infoDiv);

        //create message area 
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        var message = UnoDropZone.settings.defaultMessage;
        if (uploadMessage) {
            message = uploadMessage;
        }

        if (e.getAttribute('data-unodz-msg')) {
            message = e.getAttribute('data-unodz-msg');
        }

        messageDiv.innerHTML = message;
        messageDiv.addEventListener("click", UnoDropZone.dropZone.click, false);
        e.appendChild(messageDiv);

    },
    handleInputFiles: function () {
        UnoDropZone.handleFiles(this.files, this);
    },
    handleFiles: function (fileList, inputElemnt) {
        
         var uplaodContSelector = UnoDropZone.settings.uploadContSelector;

        //read file
        console.log('handleInputFiles ...');
        var file = fileList[0]; // assumning there is only one file.
        if (!file)
            return;
        console.log(file.name);
        console.log(file.size);
        console.log(UnoDropZone.util.bytesToSize(file.size));
        
        // check type 
        var imageType = /^image\//;
        if (!imageType.test(file.type)) {
            console.log('is not an image. we will not proccess ');
            $(this).val('');
            return;
        }

        //insert file info
        var fileName = document.createElement('span');
        fileName.classList.add('name');
        fileName.innerHTML = file.name;

        var fileSize = document.createElement('span');
        fileSize.classList.add('size');
        fileSize.innerHTML = UnoDropZone.util.bytesToSize(file.size);


        var tootipVal = 'Name: ' + file.name + ' Size:' + UnoDropZone.util.bytesToSize(file.size);
        
        
        var mainCont = $(inputElemnt).parents(uplaodContSelector);
        var infoSec = $(mainCont).find('.info');
        
        $(mainCont).attr('title', tootipVal);
        
        $(infoSec).html('');
        $(infoSec).append(fileName);
        $(infoSec).append(fileSize);
        
        
        //insert filethumbnail image
        var filethumbnailImg = document.createElement('img');
        filethumbnailImg.classList.add('img');
        var fileThumbnail = $(mainCont).find('.drop-click-zone .filethumbnail');
        $(fileThumbnail).html('');
        $(fileThumbnail).append(filethumbnailImg);
        
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(filethumbnailImg);
        reader.readAsDataURL(file);

        //make callback
        if ($(mainCont).attr('data-unodz-callback')) {
            UnoDropZone.util.executeFunctionByName($(mainCont).attr('data-unodz-callback'), $(mainCont));
        }
    },

    dropZone: {
        dragenter: function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("dragenter");
        },

        dragover: function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("dragover");
        },

        drop: function (e) {
            e.stopPropagation();
            e.preventDefault();
            
            var dt = e.dataTransfer;
            var files = dt.files;
            var inputElement = $(this).siblings('.file-input').first().children('input').first();
            inputElement.files = files;
            UnoDropZone.handleFiles(files, inputElement);
        },

        click: function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).siblings('.file-input').first().children('input').first().click();
        }
    }

};
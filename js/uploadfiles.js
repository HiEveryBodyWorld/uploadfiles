    //构建类似java中StringBuffer
    function StringBuffer() {
        this.__strings__ = new Array();
    }
    StringBuffer.prototype.append = function (str) {
        this.__strings__.push(str);
        return this;    //方便链式操作
    }
    StringBuffer.prototype.toString = function () {
        return this.__strings__.join("");
    }

//上传文件
    $.uploadAskAttachment =  function (files,options){
        var fileSize = 0;
        var fileNameLength = 0;
        var flag = true;
        var array = ["txt", "pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "dcm", "zip","rar","bmp","7zip","jpeg"];
        var fileNum = 0;
        $.each(files, function (i, data) {
            fileSize = fileSize + parseInt(data.size);
            fileNameLength = fileNameLength + data.name.length;
            fileNum++;
            var fileType = data.name.split(".")[1].toLowerCase();
            if ($.inArray(fileType, array) == -1) {
                flag = false;
                return false;
            }
        })

        if (fileSize > 10240000) {
            swal("上传文件不能大于10M")
            return false;
        }
        else if (fileNameLength > 250) {
            swal("文件上传名过长")
            return false;
        }
        else if (fileNum > 5) {
            swal("文件一次上传数量不能超过5个")
            return false;
        }
        else if (flag == false) {
            swal("上传文件格式错误,请重新选择文件");
            return false;
        }
        else {
            $.ajax({
                url: options.url,
                type: "POST",
                data: options.formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON",
                success: function (data) {
                        var returnmessage = data[options.message];
                        if (returnmessage) {
                            swal("上传文件成功")
                        }else{
                            swal("上传文件失败")
                        }
                },
                error:function(){
                    swal("上传url不可用")
                }

            })
        }
    }

    function changeFiles(options){
        var filesBuffer = new StringBuffer();
        var files = document.getElementById("upload_file").files;
        $.each(files,function(index,value){
            filesBuffer.append(value.name)
            if(index!=files.length-1) {
                filesBuffer.append(',')
                filesBuffer.append()
            }
        })
        document.getElementById("upload_file_tmp").value = filesBuffer.toString();
        var returnValue = $.uploadAskAttachment(files,options);
        if(returnValue == false){
            document.getElementById("upload_file_tmp").value = '';
        }
    }





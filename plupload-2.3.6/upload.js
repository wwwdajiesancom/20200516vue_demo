var obj =   {
    "accessid": "LTAI4G7qr9KVs6K8U9wnbzw4",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0wOC0xOFQxMToxODowNi43NTVaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIxLyJdXX0=",
    "signature": "8PRqMCwJfeJYnLMwSdTWMuvs3aY=",
    "dir": "1/",
    "host": "http://pysx.oss-cn-beijing.aliyuncs.com",
    "expire": "1597749486",
    "callback": "eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vYXBpLWRldi5jbG91ZHAuY2MvY2xvdWRwU2VydmVyL3YxL2FkbWluL29zcy92ZXJpZnkiLCJjYWxsYmFja0JvZHkiOiJ7XFxcImJ1Y2tldFxcXCI6JHtidWNrZXR9LFxcXCJmaWxlbmFtZVxcXCI6JHtvYmplY3R9LFxcXCJzaXplXFxcIjoke3NpemV9LFxcXCJtaW1lVHlwZVxcXCI6JHttaW1lVHlwZX0sXFxcImlkXFxcIjo2MX0iLCJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9",
    "bucket": "pysx"
};

var fileInfoLj = {
    pfs:null,
    getPfs(){
        if(this.pfs==null){
            console.log('-------------------getPfs---------null------------');
            this.pfs = document.createElement('div');
            this.pfs.style.display = 'none';
            this.pfs.id = 'jiegehaop';
            document.body.appendChild(this.pfs);
        }
        console.log('-------------------getPfs---------!null------------');
        return this.pfs;
    },
    sfs:null,
    getSfs(){
        if(this.sfs==null){
            console.log('-------------------getSfs---------null------------');
            this.sfs = document.createElement('div');
            this.sfs.style.display = 'none';
            this.sfs.id = 'jiegehaos';
            this.getPfs().appendChild(this.sfs);
        }
        console.log('-------------------getSfs---------!null------------');
        return this.sfs;
    },
    zfs:null,
    getZfs(){
        if(this.zfs==null){
            console.log('-------------------getZfs---------null------------');
            this.zfs = document.createElement('div');
            this.zfs.style.display = 'none';
            this.zfs.id = 'jiegehaoz';
            this.getPfs().appendChild(this.zfs);
        }
        console.log('-------------------getZfs---------!null------------');
        return this.zfs;
    },
    uploader:null,
    getUploader(){
        if(this.uploader==null){
            console.log('-------------------getUploader---------null------------');
            this.uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button:fileInfoLj.getSfs(),
                flash_swf_url : '../../libs/plupload-2.3.6/js/Moxie.swf',
                silverlight_xap_url : '../../libs/plupload-2.3.6/js/Moxie.xap',
                url : 'http://oss.aliyuncs.com',
                filters:{},
                init:{
                    PostInit:function(){
                        console.log('PostInit:start');
                        fileInfoLj.getZfs().addEventListener('click',function(){
                            fileInfoLj.set_upload_param(fileInfoLj.getUploader(),'',false);
                        });
                        console.log('PostInit:end');
                    },
                    BeforeUpload:function(up,file){
                        console.log('BeforeUpload:start');
                        fileInfoLj.set_upload_param(up,file.name,true);
                        console.log(file);
                        console.log('BeforeUpload:end');
                    },
                    UploadProgress:function(up,file){
                        console.log('UploadProgress:start');
                        console.log(file);
                        console.log(up);
                        console.log('UploadProgress:end');
                    },
                    FileUploaded:function(up,file,info){
                        console.log('FileUploaded:start');
                        console.log(file);
                        console.log(info);
                        console.log('FileUploaded:end');
                    },
                    Error:function(up,err){
                        console.log('Error:start');
                        console.log(err);
                        console.log('Error:end');
                    }
                }
            });
            this.uploader.init();
        }
        console.log('-------------------getUploader---------!null------------');
        return this.uploader;
    },
    set_upload_param(up, filename, params){
            var g_object_name = this.ljParams['dir'];
            if (filename != '') { 
                g_object_name = this.ljParams['dir'] + "${filename}";
            }

            var new_multipart_params2 = {
                'key' : g_object_name,
                'policy': this.ljParams['policy'],
                'OSSAccessKeyId': this.ljParams['accessid'], 
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'callback' : this.ljParams['callback'],
                'signature': this.ljParams['signature'],

            };

            up.setOption({
                url: this.ljParams['host'],
                multipart:true,
                multipart_params: new_multipart_params2
            });

            up.start();
    },
    ljParams:null,
    ljUpload(params,file){
        this.ljParams = params;
        
        setTimeout(function(){
            let removeFiles = [];
            fileInfoLj.getUploader().files.forEach(element => {
                removeFiles.push(element.id);
            });
            removeFiles.forEach(ele=>{
                try{
                    fileInfoLj.getUploader().removeFile(ele);
                }catch(e){}
            });
            fileInfoLj.getUploader().addFile(new plupload.File(file));
            fileInfoLj.getZfs().click();
        },50);

        
    }
};

fileInfoLj.getPfs();
fileInfoLj.getSfs();
fileInfoLj.getZfs();
fileInfoLj.getUploader();

// function set_upload_param(up, filename, ret)
// {
//     var g_object_name = obj['dir'];
//     if (filename != '') { 
//         g_object_name = obj['dir'] + "${filename}";
//     }
//     var new_multipart_params = {
//         'key' : g_object_name,
//         'policy': obj['policy'],
//         'OSSAccessKeyId': obj['accessid'], 
//         'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
//         'callback' : obj['callback'],
//         'signature': obj['signature'],
//     };

//     up.setOption({
//         'url': obj['host'],
//         'multipart_params': new_multipart_params
//     });

//     up.start();
// }

// var sfs = document.createElement('div');
// sfs.style.display = 'none';

// document.getElementById('selectfiles').addEventListener('click',function(){
//     sfs.click();
// });

// var uploader = new plupload.Uploader({
// 	runtimes : 'html5,flash,silverlight,html4',
// 	browse_button : sfs, 
//     //multi_selection: false,
// 	// container: document.getElementById('container'),
// 	flash_swf_url : 'js/Moxie.swf',
// 	silverlight_xap_url : 'js/Moxie.xap',
//     url : 'http://oss.aliyuncs.com',

//     filters: {
//         // mime_types : [ //只允许上传图片和zip文件
//         // { title : "Image files", extensions : "jpg,gif,png,bmp" }, 
//         // { title : "Zip files", extensions : "zip,rar" }
//         // ],
//         // max_file_size : '10mb', //最大只能上传10mb的文件
//         // prevent_duplicates : true //不允许选取重复文件
//     },

// 	init: {
// 		PostInit: function() {
// 			document.getElementById('ossfile').innerHTML = '';
// 			// document.getElementById('postfiles').onclick = function() {
//             //     // uploader.addFile(new plupload.File(document.getElementById('nx').files[0]));
//             //     // set_upload_param(uploader, '', false);
//             //     uploader.start();
//             //     return false;
// 			// };
// 		},

// 		FilesAdded: function(up, files) {
// 			plupload.each(files, function(file) {
// 				document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
// 				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
// 				+'</div>';
// 			});
// 		},

// 		BeforeUpload: function(up, file) {
//             set_upload_param(up, file.name, true);
//         },

// 		UploadProgress: function(up, file) {
// 			var d = document.getElementById(file.id);
// 			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
//             var prog = d.getElementsByTagName('div')[0];
// 			var progBar = prog.getElementsByTagName('div')[0]
// 			progBar.style.width= 2*file.percent+'px';
// 			progBar.setAttribute('aria-valuenow', file.percent);
// 		},

// 		FileUploaded: function(up, file, info) {
//             if (info.status == 200)
//             {
//                 document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name: 回调服务器返回的内容是:' + info.response;
//             }
//             else if (info.status == 203)
//             {
//                 document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
//             }
//             else
//             {
//                 document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
//             } 
// 		},

// 		Error: function(up, err) {
//             if (err.code == -600) {
//                 document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
//             }
//             else if (err.code == -601) {
//                 document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
//             }
//             else if (err.code == -602) {
//                 document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
//             }
//             else 
//             {
//                 document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
//             }
// 		}
// 	}
// });

// uploader.init();
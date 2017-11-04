

## do:

multi-level-distribute-render-server

多次分步骤渲染服务

可以在服务端和客户端写同一套模版页面，进行配置化的渲染。

前端支持angular.js，后端使用xtemplate

写这个项目的初衷是公司项目要做静态化宣传页，而宣传页经常会变化

2016.8.8

npm run start

端口默认是3000

样板代码放在public中，使用angularjs1.directive写的。

第一次渲染的文件应该有一个json被系统检测到，会使用xtemplate做一次渲染。

第二次渲染会被angular完全渲染


# stream



 - start download foreach
 - start download : no.1 url:http://admin.*.com/resource/template/2016-08-05/leoeji/index0728/index.css
 - start download : no.2 url:http://admin.*.com/resource/template/2016-08-05/leoeji/index0728/index.json
 - start download : no.3 url:http://admin.*.com/resource/template/2016-08-05/leoeji/index0728/index.tar
 - start download : no.4 url:http://admin.*.com/resource/template/2016-08-05/leoeji/index0728/index.html
 > start thread to render
 - download complete
 - start inject fn {
   -  start load file
   -  load file complete
   -  start inject
   -  inject complete }
 - start return
 - result start
 - result 2
 - GET /template/load/index 200 59.902 ms - -
 > render thread info
 - start render static file
 - render complete



 http://127.0.0.1:3000/project/code/0000B001P5DRCDM

 http://172.27.102.139:19080/basics-tag-web/api/sign/0000B001P5DRCDM

 http://127.0.0.1:3000/project/index/

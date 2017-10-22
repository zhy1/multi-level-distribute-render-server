

## do:

multi-level-distribute-render-server

多次分步骤渲染服务

2016.8.8

npm run start



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

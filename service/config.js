/**
 * Created by gtbzh on 2016/6/30.
 */

export default {

    templateFileSystemServer: {
        host:       'localhost',
        port:       '9000',
        path:       '/',
        method:     'GET',
        //url:        "http://172.27.102.10/template/"
        url:        "http://admin.itrace.com/resource/template/"
        //    url:        "http://admin.itrace.com/resource/template/2016-08-05/leoeji/index0728/"
        //    url:        "http://admin.itrace.com/resource/template/2016-08-09/index-0809/"
        //    url:        "http://admin.itrace.com/resource/template/2016-08-09/index-old0809/"
        //    url:        http://admin.itrace.com/resource/template/2016-08-09/index0809/index.html
        //    url:        http://admin.itrace.com/resource/template/2016-08-09/index-old0809/index.html

    },

    assertFile: {
        css:        ".css",
        json:       ".json",
        tar:        ".tar",
        html:       ".html"
    },

    renderType: ".xtpl",

    dirs: [
        "/views/project/",
        "/public/project/"
    ],

    dynamicData: [
        "productSubCode",
        "productDate",
        "productId",
        "productMakeCompany"
    ],

    workDirectory: {
        views:  "/views/project/",
        pub:    "/public/project/"
    },

    appEncoding: "utf-8",

    httpHeader: {'Content-Type': 'text/html;charset=utf-8'},

    scanRequestUrl: "http://172.27.102.139:19080/basics-tag-web/api/sign/"


    //scanRequestUrl: "http://enterprise.itrace.com/api/sign/"
}


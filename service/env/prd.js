/**
 * Created by gtbzh on 2016/8/8.
 */

export default {

    templateFileSystemServer: {
        host:       'localhost',
        port:       '9000',
        path:       '/',
        method:     'GET',
        url:        "http://admin.itrace.com/resource/template/2016-08-05/leoeji/index0728/"
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

    httpHeader: {'Content-Type': 'text/html;charset=utf-8'}
}


/**
 * Created by gtbzh on 2016/6/24.
 */
import http from'http';
import querystring from'querystring';


import jsn from'../jsn/jsn';

class Request {
    constructor(params, success, err) {
        //console.info(params)
        let path = params.path;
        let host = params.host;
        let port = params.port;
        let method = params.method;
        let data = params.data;
        let headers;
        let responseObject = ''
        let responseString = ''
        let dataString
        let debug_count = 0;
        if (method == 'GET') {
            data && (path += '?' + querystring.stringify(data))
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
            }
        }
        else {
            dataString = JSON.stringify(data);
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
            }
        }
        let options = {
            hostname: host === undefined || host == null || host == "" ? 'localhost' : host,
            port: port === undefined || port == null || port == "" ? 80 : port,
            path: path,
            method: method,
            headers: headers
        };
        //console.info(options.hostname + ":" + options.port + options.path);
        //console.info(options);
        var req = http.request(options, res=> {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', data=> {
                responseString += data;
                debug_count++;
                //console.info(data);  //当前下载的数据量
            });
            res.on('end', data=> {
                try {
                    let responseObject = JSON.parse(responseString);
                    if (responseObject.code === undefined) {
                        return success(responseObject);
                    }
                    switch (responseObject.code) {
                        case 200 :
                            responseObject = responseObject.data;
                            break;
                        default :
                            responseObject = undefined;
                    }
                } catch (e) {
                    responseObject = undefined;
                }
                //console.info(debug_count);
                responseObject && success(responseObject) || responseString && success(responseString);
            })
        })
        req.on('error', () =>console.error("err : ")
            //err();
        )
        req.end();
    }
}


export default Request
import request from '@/utils/request'
import wx from 'weixin-js-sdk';

// 河南人保 wx770fee7853e5388b
// 测试  wx283779586bbbd4e1
var appId = "wx283779586bbbd4e1";
let baseURL
let localUrl
baseURL = "https://wxservertest.picc-henan.net/";
// localUrl = "https://www.niuchenyang.com";
// baseURL = "http://91micogame.com:8088";
export const initWxJsSdk = (path, cb) => {
    let myurl = location.href.split("#")[0];
    request({
        baseURL: baseURL,
        url: '/wx/config',
        method: 'post',
        params: {
            url: myurl || path
        }
    }).then(res => {
        var retData = res.wxJsapiSignature;
        wx.config({
            debug: false,
            appId: appId,
            timestamp: retData.timestamp,
            nonceStr: retData.nonceStr,
            signature: retData.signature,
            jsApiList: [
                'getNetworkType',
                'chooseImage',
                'previewImage',
                'uploadImage']
        });
        wx.error(function (res) { });
        wx.ready(function () {
            cb && cb();
        });
    });
};
const qsQuery = query => {
    let url = "";
    if (query) {
        Object.keys(query).forEach(key => {
            url += `${key}=${query[key]}&`;
        });
        return "r=1&" + url;
    } else {
        return "r=1";
    }
};
/**
 * 微信认证接口
 */
// export const initWxConfig = (path, query) => {
//     let qpath = qsQuery(query);
//     var callbackURL = baseURL + "/wx/redirect/" + appId + "/greet";
//     // console.log(
//     //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
//     //     appId +
//     //     "&redirect_uri=" +
//     //     encodeURIComponent(callbackURL) +
//     //     "&response_type=code&scope=snsapi_userinfo&state=" +
//     //     encodeURIComponent(localUrl + "/#" + path + "?" + qpath) +
//     //     "#wechat_redirect"
//     // );
//     console.log('callbackURL', callbackURL);
//     console.log('path', path);
//     console.log('qpath', qpath);
//     debugger
//     window.location.href =
//         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
//         appId +
//         "&redirect_uri=" +
//         encodeURIComponent(callbackURL) +
//         "&response_type=code&scope=snsapi_userinfo&state=" +
//         encodeURIComponent(localUrl + "/#" + path + "?" + qpath) +
//         "#wechat_redirect";
// };
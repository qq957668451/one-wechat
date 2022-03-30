import request from '@/utils/request'
import wx from 'weixin-js-sdk';


// 河南人保 wx770fee7853e5388b
// 测试  wx4c8abe3ccc2b662c
var appId = "wx4c8abe3ccc2b662c";
let baseURL
baseURL = "https://wxservertest.picc-henan.net/";
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
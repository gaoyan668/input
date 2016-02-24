/**
 * Created by zyg on 2015/10/9.
 */
var tool = {
    checked:false,
    checked1:false,
    getCss: function (ele, attr) {
        return parseFloat(window.getComputedStyle(ele, null)[attr]);
    },
    hasClass: function () {
        var cName = arguments[0], ele = arguments[1], reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        return reg.test(ele.className);
    },
    addClass: function () {
        var cName = arguments[0], ele = arguments[1];
        if (!this.hasClass(cName, ele)) {
            ele.className += " " + cName;
        }
    },
    mySub: function (string) {
        var len = arguments[1] || 10;
        var isD = arguments[2] || false;//默认是不加的，想加的话传true
        var str = "", n = 0;
        for (var i = 0; i < string.length; i++) {
            var s = string.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    },
    //验证弹出框
    tips:function(ele,width,str){
        ele.innerHTML=str;
        ele.style.width=width+"px";
        ele.style.marginLeft=-width/2+"px";
        ele.style.webkitAnimation="tips 3s linear";
        ele.style.mozAnimation="tips 3s linear";
        ele.addEventListener("webkitAnimationEnd",function(){
            ele.style.webkitAnimation="";
        });
        ele.addEventListener("mozAnimationEnd",function(){
            ele.style.mozAnimation="";
        });

    },

    isMobile: function () {
        var sUserAgent = navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp = sUserAgent.match(/midp/i) == "midp",
            bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid = sUserAgent.match(/android/i) == "android",
            bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
            bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    },
    click: function (ele, fn1, fn2) {
        if (tool.isMobile()) {
            ele.addEventListener("touchstart", function (e) {
                e = e || window.event;
                e.stopPropagation();
                //e.preventDefault();
                this.setAttribute("data-moved", "n");
                this.setAttribute("startX", e.touches[0].clientX);
                this.setAttribute("startY", e.touches[0].clientY);
                if (typeof fn2 == "function") {
                    fn2.call(ele);
                }
            }, false);
            ele.addEventListener("touchmove", function (e) {
                e = e || window.event;
                e.stopPropagation();
                //e.preventDefault();
                var startX = this.getAttribute("startX");
                var startY = this.getAttribute("startY");
                var moveX = e.touches[0].clientX - startX;
                var moveY = e.touches[0].clientY - startY;
                if (Math.abs(moveX) > 10 || Math.abs(moveY) > 10) {
                    this.setAttribute("data-moved", "y");
                }
            }, false);
            ele.addEventListener("touchcancel", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
            }, false);
            ele.addEventListener("touchend", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                if (this.getAttribute("data-moved") === "y") {
                    return false;
                }
                if (typeof fn1 == "function") {
                    fn1.call(ele);
                }
            }, false);
        } else {
            ele.addEventListener("click", fn1, false)
        }
    },
    radioCheck: function (eles) {
        for (var i = 0; i < eles.length; i++) {
            if (eles[i].checked) {
                return eles[i].value;
            }
        }
    },
    isChecked: function (eles, flag, fn) {
        for (var i = 0; i < eles.length; i++) {
            if (eles[i].checked) {
                flag = true;
                break;
            }
        }
        if (flag == false) {
            if (typeof fn == "function") {
                fn();
            }
            return;
        }
    },
    //账号验证  验证规则：字母，数字，下划线；字母开头，4-16位
    checkUser:function(str){
        var reg=/^[a-zA-Z]\w{3,15}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //验证手机号码  验证规则 11位数字 1开头
    checkMobile:function(str){
        var reg=/^1\d{10}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //验证电话号码  验证规则：区号+号码，区号以0开头，3位或4位
    checkPhone:function(str){
        var reg=/^0\d{2,3}-?\d{7,8}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //邮箱验证
    //验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
    //第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
    //第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
    //而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
    checkEmail:function(str){
        var reg=/^(\w-?\.?)+@(\w-?)+(\.\w{2,})+$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    }



};

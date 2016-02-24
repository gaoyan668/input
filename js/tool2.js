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
        var isD = arguments[2] || false;//Ĭ���ǲ��ӵģ���ӵĻ���true
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
    //��֤������
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
    //�˺���֤  ��֤������ĸ�����֣��»��ߣ���ĸ��ͷ��4-16λ
    checkUser:function(str){
        var reg=/^[a-zA-Z]\w{3,15}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //��֤�ֻ�����  ��֤���� 11λ���� 1��ͷ
    checkMobile:function(str){
        var reg=/^1\d{10}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //��֤�绰����  ��֤��������+���룬������0��ͷ��3λ��4λ
    checkPhone:function(str){
        var reg=/^0\d{2,3}-?\d{7,8}$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    },
    //������֤
    //��֤���򣺹��Ұ������ַ�ֳɡ���һ����@�ڶ����֡�����
    //��һ���֣�����ĸ�����֡��»��ߡ����ߡ�-������š�.����ɣ�
    //�ڶ����֣�Ϊһ����������������ĸ�����֡����ߡ�-����������׺��ɣ�
    //��������׺һ��Ϊ.xxx��.xxx.xx��һ����������׺һ��Ϊ2-4λ����cn,com,net�����������е�Ҳ�����4λ
    checkEmail:function(str){
        var reg=/^(\w-?\.?)+@(\w-?)+(\.\w{2,})+$/;
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
    }



};

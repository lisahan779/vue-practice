"use strict";
var Components;
(function (Components) {
    var header = /** @class */ (function () {
        function header() {
            var elem = document.createElement('div');
            elem.innerText = "this is a header";
            document.body.appendChild(elem);
        }
        return header;
    }());
    Components.header = header;
    var content = /** @class */ (function () {
        function content() {
            var elem = document.createElement('div');
            elem.innerText = "this is a content";
            document.body.appendChild(elem);
        }
        return content;
    }());
    Components.content = content;
    var footer = /** @class */ (function () {
        function footer() {
            var elem = document.createElement('div');
            elem.innerText = "this is a footer";
            document.body.appendChild(elem);
        }
        return footer;
    }());
    Components.footer = footer;
})(Components || (Components = {}));
console.log("lisa");
// 通过namespace 模块化 ，就会解决编译的类定义为全局的这种结果
var Home;
(function (Home) {
    var page = /** @class */ (function () {
        function page() {
            new Components.header();
            new Components.content();
            new Components.footer();
        }
        return page;
    }());
    Home.page = page;
})(Home || (Home = {}));

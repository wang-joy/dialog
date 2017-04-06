/**
 * Created by Administrator on 2017/4/1 0001.
 */
var Dialog = new Class;
Dialog.include({
    /**
     * 初始化
     * @param obj
     * @returns {init}
     */
    init: function (obj) {
        //初始化ID
        var id = this.guid();
        this.id = id;
        var body = $("body");
        $("<div id='" + id + "mask' class='mask'></div>").appendTo(body);
        $("<div id='" + id + "' class='dialog'></div>").appendTo(body);
        var dialog = $("#" + id);
        //添加头
        $("<div class='title'> <a href='javascript:void(0)'>标题</a> <img src='img/cancel.png' id='close'></div>").appendTo(dialog);
        //设置内容
        $("<div class='content'></div>").appendTo(dialog);
        //设置底部
        $("<div class='bottom'><div class='button'> <button class='ok'>确定</button> <button class='cancel'>取消</button> </div></div>").appendTo(dialog);
        //初始化宽高
        this.setWidth(dialog.find(".content").width());
        this.setHeight(dialog.find(".content").height());
        //设置标题
        this.setTitle(dialog.find("title a").text());
        if (obj) {
            //设置宽度
            if (obj.width) {
                this.setWidth(obj.width);
            }
            //设置高度
            if (obj.height) {
                this.setHeight(obj.height);
            }
            //设置标题
            if (obj.title) {
                this.setTitle(obj.title);
            }
            //设置URL
            if(obj.url){
                this.setUrl(obj.url);
            }
            if ((typeof obj.show) == "function") {
                this.subscribe("show", obj.show);
            }
            if ((typeof obj.hide) == "function") {
                this.subscribe("hide", obj.hide);
            }
            if ((typeof obj.close) == "function") {
                this.subscribe("close", obj.close);
            }
            if ((typeof obj.ok) == "function") {
                this.subscribe("ok", obj.ok);
            }
        }
        var self = this;
        dialog.find("#close").click(this.proxy(self.close, self));
        dialog.find(".ok").click(this.proxy(self.ok, self));
        dialog.find(".cancel").click(this.proxy(self.cancel, self));
        return this;
    },
    /**
     * 设置宽度
     * @param width
     */
    setWidth: function (width) {
        if (!isNaN(parseInt(width))) {
            this.width = width;
            var dialog = $("#" + this.id);
            dialog.width(this.width);
            //左右居中
            dialog.css({"margin-left": -($(".dialog").width() / 2) + "px"});
        }
    },
    setHeight: function (height) {
        var dialog = $("#" + this.id);
        /**
         * 设置高度
         * @param heigth
         */
        if (!isNaN(parseInt(height))) {
            this.height = height;
            //设置内容的高度
            dialog.find(".content").height(this.height);
            //设置整个弹出框的高度
            dialog.height(this.height + dialog.find(".title").height() + dialog.find(" .bottom").height());
            //上下居中
            dialog.css({"margin-top": -($(".dialog").height() / 2) + "px"});
        }
    },
    setTitle: function (title) {
        var dialog = $("#" + this.id);
        var objTitle = this.title || (this.title = {});
        if (title) {
            if ((typeof title) == "object") {
                objTitle = title;
                if (title.text) {
                    objTitle.text = title.text;
                }
                if (title.color) {
                    objTitle.color = title.text;
                }
                dialog.find(".title a").color(title.color);
                dialog.find(".title").background(title.background);
            } else {
                objTitle.text = title;
            }
            dialog.find(".title a").text(objTitle.text);
        }
    },
    setUrl:function(url){
        var content = $("#" + this.id).find(".content");
        $("<iframe id='ifm' name='ifm' width='100%' height='100%' src='"+url+"'frameborder='0'></iframe>").appendTo(content);
    },
    show: function (func) {
        var dialog = $("#" + this.id);
        var mask = $("#" + this.id + "mask")
        if ((typeof func) == "function") {
            this.subscribe("show", func);
        }
        this.publish("show");
        mask.show();
        dialog.show();

    },
    hide: function (func) {
        if ((typeof func) == "function") {
            this.subscribe("hide", func);
        }
        this.publish("hide");
        var dialog = $("#" + this.id);
        var mask = $("#" + this.id + "mask")
        mask.hide();
        dialog.hide();
    },
    close: function (func) {
        if ((typeof func) == "function") {
            this.subscribe("close", func);
        }
        this.publish("hide");
        var id = this.id;
        var dialog = $("#" + id);
        var mask = $("#" + id + "mask");
        dialog.hide();
        mask.hide();
        this.publish("close");
    },
    ok: function (func) {
        if ((typeof func) == "function") {
            this.subscribe("ok", func);
        }
        this.publish("hide");
        var dialog = $("#" + this.id);
        var mask = $("#" + this.id + "mask");
        mask.hide();
        dialog.hide();
        this.publish("ok");
    },
    cancel: function (func) {
        if ((typeof func) == "function") {
            this.subscribe("cancel", func);
        }
        this.publish("hide");
        var dialog = $("#" + this.id);
        var mask = $("#" + this.id + "mask");
        mask.hide();
        dialog.hide();
        this.publish("cancel")
    }
})

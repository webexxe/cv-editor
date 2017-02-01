$(function () {

    var editor = $(".editor"),
        action = $(".action-buttons"),
        menu_file = $(".file-menu a"),
        editor_title = $(".editor-header .title .file"),
        line = $(".row");

    editor.find(".a").on("click", function () {
        editor.addClass("close");

        setTimeout(function () {
            editor.removeClass("close");
        }, 4000)
    });

    editor.find(".b").on("click", function () {
        editor.toggleClass("min")
    });

    editor.find(".c").on("click", function () {
        editor.toggleClass("full")
    });

    menu_file.on("click", function () {
        var _this = $(this);

        editor_title.html(_this.html() + " ");
        menu_file.removeClass("active");
        _this.addClass("active")
    });

    line.on("click", function () {
        line.removeClass("active");
        $(this).addClass("active");
    });

});
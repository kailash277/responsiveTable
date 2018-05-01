
vatbleTimer_ = '';
vatbleTimer2_ = '';
$(document).ready(function () {
    doVtable();

    $(".dataTables_length").find("select").on("change", function () {
        setTimeout(function () {
            doVtable();
        }, 400);
    });
    $(".dataTables_filter").find("input[type='text']").on("keyup", function () {
        clearTimeout(vatbleTimer2_);
        vatbleTimer2_ = setTimeout(function () {
            doVtable();
        }, 400);
    });
    $(".dataTables_paginate").find("a").on("click", function () {
        setTimeout(function () {
            doVtable();
        }, 400);
    });
    $(window).resize(function () {
        clearTimeout(vatbleTimer_);
        vatbleTimer_ = setTimeout(function () {
            doVtable();
        }, 400);
    });
});
function doVtable() {
    $(".vt-caption").remove();
    $.each($(".vtable"), function (i, vtable) {
    if($(this).is(":visible")){

            var thisTableW = $(vtable).width();
            var doVtableOn = $(vtable).attr("data-max-width");
            if (typeof doVtableOn === typeof undefined || doVtableOn === false) {
                doVtableOn = "767";
            }
            if (doVtableOn > thisTableW) {
                vtable_head_cap = [];
                $.each($(vtable).find("tr").eq(0).find("th,td"), function (j, th) {
                    var this_vtable_caption = $(th).attr("data-vt-caption");
                    if (typeof this_vtable_caption !== typeof undefined && this_vtable_caption !== false) {
                        vtable_head_cap.push(this_vtable_caption);
                    } else {
                        var this_txt = $(th).text();
                        if (typeof this_txt === typeof undefined) {
                            this_txt = '&nbsp;';
                        }
                        vtable_head_cap.push(this_txt);
                    }
                });
                $.each($(vtable).find("tr:not('.novt')").slice(1), function (k, vt_row) {
                    $.each($(vt_row).find("td"), function (l, vt_td) {
                        $(vt_td).prepend("<div class='vt-caption'>" + vtable_head_cap[l] + "</div>");
                        $(vt_td).css("min-height", $(vt_td).find(".vt-caption").height());
                    });
                });
                $(vtable).addClass("vtable_show");
            } else {
                $(vtable).removeClass("vtable_show");
            }
    }
    });
}



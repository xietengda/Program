/**
 * create by iLong
 */
;(function () {
    var doc = window.document,
        docEl = doc.documentElement,
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if(width > 540){
            width = 750;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem+'px';
    }

    window.addEventListener('resize',function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem,100);
    },false);

    window.addEventListener('pageshow',function (e) {
        if(e.persisted){
            clearTimeout(tid);
            tid = setTimeout(refreshRem,100);
        }
    },false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function() {
            doc.body.style.fontSize = 12 + 'px';
        }, false);
    }

    refreshRem();
})();
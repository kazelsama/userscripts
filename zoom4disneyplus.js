// ==UserScript==
// @name         Zoom4Disney+
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  zoom in and zoom out with up and down arrows
// @author       Fabio Giughese <kazel.nki@gmail.com>
// @match        https://www.disneyplus.com/**/video/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createZoomControl(){

        localStorage.setItem("zoom", localStorage.getItem("zoom") || 1.33);

        var chromecastButton = document.querySelector('[aria-label="Chromecast"]');

        var zoomControlStyle = document.createElement('style');
        zoomControlStyle.innerHTML = ""+
            "#zoom-control{height: 30px; margin: 3px 0px 0px; border-radius: 4px; background: transparent; color: #fff; font-size: 26px; display: block; border: 1px solid transparent;}"+
            '#zoom-control:after{content:"\\2A09";}'+
            "";

        var zoomControl = document.createElement('span');
        zoomControl.id = "zoom-control";
        zoomControl.innerHTML = localStorage.getItem("zoom");
        document.onkeydown = function(event){
            if(event.keyCode == 38){
                localStorage.setItem("zoom", localStorage.getItem("zoom")*1 + 0.01);
            }else if(event.keyCode == 40){
                localStorage.setItem("zoom", localStorage.getItem("zoom")*1 - 0.01);
            }
            document.querySelector(".btm-media-client>video").style.transform = "scale("+localStorage.getItem("zoom")+")";
            zoomControl.innerHTML = localStorage.getItem("zoom");
        };

        document.querySelector(".btm-media-client>video").style.transform = "scale("+zoomControl.innerHTML+")";

        chromecastButton.parentNode.insertBefore(zoomControl, chromecastButton.nextSibling);
        zoomControl.parentNode.insertBefore(zoomControlStyle, zoomControl.nextSibling);

    }

    var createZoomControlInterval = setInterval(() => !document.getElementById("zoom-control")&&createZoomControl(),50);

})();

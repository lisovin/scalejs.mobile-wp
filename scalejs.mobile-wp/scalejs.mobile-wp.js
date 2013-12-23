/*global define*/
define([
    //'./scalejs.mobile-wp/panorama/panorama',
    //'./scalejs.mobile-wp/listbox/listbox',
    //'./scalejs.mobile-wp/pivot/pivot',
    './scalejs.mobile-wp/appbar/appbar',
    'knockout'
    //'modernizr'
], function (
    //panorama,
    //listbox,
    //pivot,
    appbar,
    ko
) {
    'use strict';

    //ko.bindingHandlers.panorama = panorama;
    //ko.virtualElements.allowedBindings.panorama = true;

    ko.bindingHandlers.appbar = appbar;
    ko.virtualElements.allowedBindings.appbar = true;

    //ko.bindingHandlers.listbox = listbox;
    //ko.virtualElements.allowedBindings.listbox = true;

    //ko.bindingHandlers.pivot = pivot;
    //ko.virtualElements.allowedBindings.pivot = true;
});


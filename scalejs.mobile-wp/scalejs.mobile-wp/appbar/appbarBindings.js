/// <reference path="../scripts/_references.js" />
/*global console,define*/
define([
    //'scalejs!core',
    //'knockout'
], function (
    //core,
    //ko
) {
    'use strict';

    return {
        'appbar-content': function () {
            return {
                template: {
                    name: 'appbar_content_template',
                    data: this.content
                }
            };
        },
        'appbar__button-icon': function (ctx) {
            var col = 'col-' + (ctx.$index() + 2);

            return {
                style: {
                    'background': 'url("' + this.iconUri + '") no-repeat',
                    'background-position': 'center'
                },
                css: col,
                click: this.action
            };
        },

        'appbar__button-label': function (ctx) {
            var expandedCss,
                col;

            expandedCss = ctx.$parents[1].expandedCss();
            col = 'col-' + (ctx.$index() + 2);

            return {
                html: this.text,
                css: expandedCss + ' ' + col
            };
        }
    };
});


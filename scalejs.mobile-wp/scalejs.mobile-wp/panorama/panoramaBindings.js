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
        'panorama-header-content': function () {
            if (this.headerTemplate) {
                return {
                    template: {
                        name: this.headerTemplate,
                        data: this.header
                    }
                };
            }

            return {
                template: {
                    name: 'panorama_header_default_template',
                    data: this.header
                }
            };
        },

        'panorama-items': function () {
            return {
                foreach: this.items
            };
        },

        'panorama-item': function (context) {
            var item = context.$data,
                parent = context.$parent,
                index = parent.items.indexOf(item);

            return {
                style: {
                    left: 480 * index + 'px'
                }
            };
        },

        'panorama-page-content': function (ctx) {
            if (ctx.$data.contentTemplate || ctx.$data.pageTemplate) {
                return {
                    template: {
                        name: ctx.$data.contentTemplate || ctx.$parent.pageTemplate,
                        data: ctx.$data.content
                        //afterRender: afterRender
                    }
                };
            }

            if (ctx.$data.content) {
                return {
                    render: {
                        text: JSON.stringify(ctx.$data.content)
                        //afterRender: afterRender
                    }
                };
            }
            // default
            return {
                text: ctx.$data
            };
        }
    };
});


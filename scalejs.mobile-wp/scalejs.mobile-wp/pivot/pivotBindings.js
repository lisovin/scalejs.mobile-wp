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
        'pivot-header-content': function () {
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
                    name: 'pivot_header_default_template',
                    data: this.header
                }
            };
        },

        'pivot-item-content': function (ctx) {
            if (ctx.$data.contentTemplate) {
                return {
                    template: {
                        name: ctx.$data.contentTemplate,
                        data: ctx.$data.content
                    }
                };
            }

            if (ctx.$data.content) {
                return {
                    render: {
                        text: JSON.stringify(ctx.$data.content)
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


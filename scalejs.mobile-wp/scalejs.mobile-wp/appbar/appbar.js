/*global define, setTimeout, console*/
define([
    'scalejs!core',
    './appbarBindings',
    'text!./appbar.html',
    'knockout',
    'scalejs.mvvm'
], function (
    core,
    appbarBindings,
    appbarViews,
    ko
) {
    'use strict';

    var registerBindings = core.mvvm.registerBindings,
        registerTemplates = core.mvvm.registerTemplates,
        merge = core.object.merge,
        //isObservable = ko.isObservable,
        unwrap = ko.utils.unwrapObservable,
        observable = ko.observable,
        computed = ko.computed,
        observableArray = ko.observableArray,
        expandedCss = observable('appbar__details--collapsed');

    function toggleExpand() {
        expandedCss(expandedCss() === 'appbar__details--expanded' ? 'appbar__details--collapsed' : 'appbar__details--expanded');
    }

    function appbar(opts, element) {
        var content = merge({ buttons: [] }, opts);

        return {
            content: content,
            expandedCss: expandedCss,
            toggleExpanded: toggleExpand
        };
    }

    function replaceClassName(oldClassName, newClassName, timeout) {
        return function(completed) {
            var el = this.getElement(),
                regexp = new RegExp('\\s*' + oldClassName);

            el.className = el.className.replace(regexp, ' ' + newClassName);

            setTimeout(completed, timeout || 0);
        }
    }

    function wrapValueAccessor(valueAccessor, element) {
        return function () {
            var options = unwrap(valueAccessor()),
                self = appbar(options, element);

            if (options) {
                return {
                    template: {
                        name: 'appbar_template',
                        data: self
                    },
                    transitions: {
                        inTransitions: [
                            replaceClassName('appbar--hidden', 'appbar--showing', 300),
                            replaceClassName('appbar--showing', 'appbar--shown')
                        ],
                        outTransitions: [
                            replaceClassName('appbar--shown', 'appbar--hiding', 300),
                            replaceClassName('appbar--hiding', 'appbar--hidden'),
                            function (completed) {
                                expandedCss('appbar__details--collapsed');
                                completed();
                            }
                        ]
                    }
                };
            }
        };
    }

    function init(
        element,
        valueAccessor,
        allBindingsAccessor,
        viewModel,
        bindingContext
    ) {
        element.className += ' appbar appbar--hidden';

        document.body.addEventListener('click', function () {
            expandedCss('appbar__details--collapsed');
        });

        element.addEventListener('click', function (event) {
            event.stopPropagation();
        }, false);

        return ko.bindingHandlers.render.init(
            element,
            wrapValueAccessor(valueAccessor, element),
            allBindingsAccessor,
            viewModel,
            bindingContext
        );
    }

    function update(
        element,
        valueAccessor,
        allBindingsAccessor,
        viewModel,
        bindingContext
    ) {
        return ko.bindingHandlers.render.update(
            element,
            wrapValueAccessor(valueAccessor, element),
            allBindingsAccessor,
            viewModel,
            bindingContext
        );
    }

    registerBindings(appbarBindings);
    registerTemplates(appbarViews);

    return {
        init: init,
        update: update
    };
});


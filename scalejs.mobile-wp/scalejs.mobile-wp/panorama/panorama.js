/*global define, setTimeout, console*/
define([
    'scalejs!core',
    './panoramaBindings',
    'text!./panorama.html',
    'hammer',
    'knockout',
    'jQuery',
    'modernizr',
    'scalejs.mvvm'
], function (
    core,
    panoramaBindings,
    panoramaTemplate,
    Hammer,
    ko,
    $,
    Modernizr
) {
    'use strict';

    var registerBindings = core.mvvm.registerBindings,
        registerTemplates = core.mvvm.registerTemplates,
        //isObservable = ko.isObservable,
        unwrap = ko.utils.unwrapObservable,
        observableArray = ko.observableArray;
        //array = core.array;

    function panorama(options, element) {
        var //merge = core.object.merge,
            sourceItems = unwrap(options.items),
            items = observableArray(),
            panoramaEl,
            container;

        items([sourceItems[sourceItems.length - 1]].concat(sourceItems.slice(0, sourceItems.length - 1)));

        function setContainerOffset(percent, dontAnimate) {
            if (dontAnimate) {
                container.removeClass("animate");
            } else {

                container.addClass("animate");
            }

            if (Modernizr.csstransforms3d) {
                container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
            } else if (Modernizr.csstransforms) {
                container.css("transform", "translate(" + percent + "%,0)");
            } else {
                var px = (480 * items().length) * (percent / 100);
                container.css("left", px + "px");
            }
        }


        function showItem(index, dontAnimate) {
            var offset = -100 / items().length * index;
            setContainerOffset(offset, dontAnimate);
        }

        function prev() {
            showItem(0);
            setTimeout(function () {
                var oldItems = unwrap(items),
                    newItems = [oldItems[oldItems.length - 1]].concat(oldItems.slice(0, oldItems.length - 1));

                items(newItems);

                showItem(1, true);
            }, 300);
        }

        function next() {
            showItem(2);
            setTimeout(function () {
                var oldItems = unwrap(items),
                    newItems = oldItems.slice(1, oldItems.length).concat([oldItems[0]]);

                items(newItems);

                showItem(1, true);
            }, 300);
        }

        function onGesture(ev) {

            ev.gesture.preventDefault();

            var paneOffset = 0,
                dragOffset = 0;

            switch (ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                paneOffset = -100 / items().length;
                dragOffset = (100 / 480) * ev.gesture.deltaX / items().length;

                setContainerOffset(dragOffset + paneOffset, true);
                break;

            case 'swipeleft':
                next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 50% moved, navigate
                if (Math.abs(ev.gesture.deltaX) > 480 * 0.25) {
                    if (ev.gesture.direction === 'right') {
                        prev();
                    } else {
                        next();
                    }
                } else {
                    showItem(1);
                }
                break;
            }

        }

        function setupGestures() {
            panoramaEl = ko.virtualElements.firstChild(element).nextSibling;
            container = $('.panorama-content >ul', panoramaEl);
            //options.items(items);

            setTimeout(function () {
                showItem(1, true);

                return new Hammer(panoramaEl, { drag_lock_to_axis: true })
                    .on('release dragleft dragright swipeleft swiperight', onGesture);
            }, 0);
        }

        return {
            items: items,
            header: options.header,
            setupGestures: setupGestures
        };


    }

    function wrapValueAccessor(valueAccessor, element) {
        return function () {
            var options = valueAccessor(),
                myPanorama = panorama(options, element);

            return {
                name: 'panorama_template',
                data: myPanorama,
                afterRender: function () {
                    myPanorama.setupGestures();
                }
            };
        };
    }

    function init(
        element,
        valueAccessor,
        allBindingsAccessor,
        viewModel,
        bindingContext
    ) {
        ko.bindingHandlers.template.update(
            element,
            wrapValueAccessor(valueAccessor, element),
            allBindingsAccessor,
            viewModel,
            bindingContext
        );

        return { 'controlsDescendantBindings': true };
    }

    registerBindings(panoramaBindings);
    registerTemplates(panoramaTemplate);

    return {
        init: init
    };
});


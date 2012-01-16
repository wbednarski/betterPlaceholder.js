/**
 * betterPlaceholder.js 0.0.1
 * (c) 2012 Wojciech Bednarski
 * betterPlaceholder.js may be freely distributed under the MIT license.
 */

(function ($) {

    var methods = {
        init: function (options) {

            // Create some defaults, extending them with any options that were provided
            var settings = $.extend({
                'activeClass': 'active',
                'emptyActiveClass': 'empty-active'
            }, options),
                placeholderValue,
                el;

            for (var i = 0, j = this.length; i < j; i++) {
                placeholderValue = $.trim(this[i].placeholder);

                if (this[i].type === 'password' && placeholderValue !== '' || this[i].type === 'text' &&  placeholderValue !== '') {
                    el = this[i];

                    if (el.type === 'password') {
                        $.data(el, 'type', 'password');
                    }

                    $(el).on('focus keyup', function () {
                        if (this.value === '') {
                            if (this.type === 'password') {
                                this.type = 'text';
                            }

                            $(this).addClass(settings.emptyActiveClass);
                            this.value = this.placeholder;
                            this.setSelectionRange(0, 0);
                        }
                    });

                    $(el).on('blur keydown', function (e) {
                        if (this.selectionStart === 0 && this.selectionEnd === 0 && e.keyCode === 8) {
                            return false;
                        }

                        if ($(this).hasClass(settings.emptyActiveClass) === true && e.keyCode !== 16 && e.keyCode !== 17 && e.keyCode !== 18) {
                            if ($.data(this, 'type') === 'password') {
                                this.type = 'password';
                            }

                            this.value = '';
                            $(this).removeClass(settings.emptyActiveClass);
                        }
                    });


                    console.log('text'); // add event listener here
                }
//                else if (this[i].type === 'password' && placeholderValue !== '') {
//                    console.log('pass');
//                }
            }

            console.log('this', this, 'options', options);

        },
        update: function () {

        },
        destroy: function () {

        }
    };

    $.fn.betterPlaceholder = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.betterPlaceholder!');
        }

    };

}(jQuery));

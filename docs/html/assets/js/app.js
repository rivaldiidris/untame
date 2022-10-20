(function (window, $, fx, undefined) {

    var jsGroupWidget = (function () {

        var $window;
        var $wrapper;
        var $widgets;
        var $widgetsGroup;
        var $widgetsTitle;
        var $widgetsGroupWrapper;
        var T = FXM.Template;
        var O = FXM.ObjectQuery;
        var goToInstance;

        var className = {
            activeGroup: 'is-grouping-active',
            groupWrapper: 'js-grouping-wrapper',
            groupItem: 'js-grouping',
            groupTitleWrapper: 'js-grouping-title-wrapper',
            groupTitle: 'js-group-title',
            groupContentWrapper: 'js-grouping-content-wrapper'
        };

        var domStr = {
            widgetGroupWrapper: '<div class="' + className.groupWrapper + '"></div>',
            widgetWrapper: '<div id="{{Id}}" class="' + className.groupItem + '"></div>',
            widgetTitleWrapper: '<div class="' + className.groupTitleWrapper + '"></div>',
            widgetTitle: '<div class="' + className.groupTitle + '">{{Title}}</div>',
            widgetContentWrapper: '<div class="' + className.groupContentWrapper + '"></div>',
            widgetContent: '<div></div>'
        };

        var prepareElement = function () {
            $widgets.each(function (i) {
                var $this = $(this);
                var $h3 = $this.find('h3').first();

                var $wrap = $(T.replace(domStr.widgetWrapper, {
                    Id: i + "-" + O.standardObjectKey($h3.text())
                }));

                var $titleWrapper = $(T.replace(domStr.widgetTitleWrapper, {

                }));

                var $title = $(T.replace(domStr.widgetTitle, {
                    Title: $h3.html()
                }));

                var $contentWrapper = $(T.replace(domStr.widgetContentWrapper, {

                }));

                var $content = $(T.replace(domStr.content, {

                }));

                $titleWrapper.append($title);
                $contentWrapper.append($content);
                $wrap.append($titleWrapper).append($contentWrapper);
                $this.before($wrap).appendTo($contentWrapper);
                $h3.hide();
            });

            $widgetsGroup = $wrapper.find('.' + className.groupItem);
            $widgetsTitle = $wrapper.find('.' + className.groupTitle);

            // Wrap all
            $widgetsGroupWrapper = $(T.replace(domStr.widgetGroupWrapper, {

            }));
            $widgetsGroup.first().before($widgetsGroupWrapper);
            $widgetsGroup.appendTo($widgetsGroupWrapper);

            goToInstance = FXM.goTo('.' + className.groupWrapper, {
                onInitRun: false,
                targetSelector: '.' + className.groupItem + '.' + className.activeGroup  + '',
                disableAnimationAt: -1,
                duration: 0,
                delay: 100,
                offsetElements: function () {
                    return 0;
                },
                onbeforestart: function () {},
                oncomplete: function () {}
            });
        };

        var addEvent = function () {
            $widgetsTitle.on('click', function () {
                var $this = $(this);
                var $parent = $this.closest('.' + className.groupItem);

                if ($parent.hasClass(className.activeGroup)) {
                    $parent.removeClass(className.activeGroup);
                } else {
                    $widgetsGroup.not($parent).removeClass(className.activeGroup);
                    $parent.addClass(className.activeGroup);
                    goToInstance.run();
                }
            });

            $window.on('hashchange', function (e) {
                e.preventDefault();
                checkHash();
            });
        };

        var checkHash = function () {
            var loc = (window.location).toString().split('#');
            var $target;
            var $parent;

            if (loc[1]) {
                $target = $('#' + loc[1]);
                $parent = $target.closest('.' + className.groupItem);

                if ($parent.length > 0) {
                    $widgetsGroup.removeClass(className.activeGroup);
                    $parent.addClass(className.activeGroup);
                    setTimeout(function () {
                        $window.trigger('fx.footerSticktoBottom.check');
                        goToInstance.run();
                    }, 15);
                }
            }
        };

        return {
            init: function () {
                $window = $(window);
                $wrapper = $('.js-group-widget');
                $widgets = $wrapper.find('.group-widget');

                if ($wrapper.length > 0) {
                    prepareElement();
                    addEvent();
                    checkHash();
                }
            }
        };

    }());

    // No need document ready for these... ~
    jsGroupWidget.init();
    FXM.footerStickToBottom('footer', {});

    // One body ready...
    $(function () {
        fx.loadHtml("header", "parts/header.html", function () {
            var hash = document.location.hash,
                $target = $(hash);

            if ($target.length > 0) {
                setTimeout(function () {
                    $(window).scrollTop($target.offset().top);
                }, 25);
            }
        });
        fx.loadHtml("footer", "parts/footer.html");
    });

    // Prism fix
    Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
        'remove-initial-line-feed': true
    });

}(window, jQuery, FXM));
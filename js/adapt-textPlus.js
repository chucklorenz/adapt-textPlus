/*
 * adapt-textPlus
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Code is based on adapt-contrib-text, adapt-contrib-graphic, and adapt-contrib-reveal.
 */
define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var TextPlus = ComponentView.extend({

        events: function () {
            return Adapt.device.touch == true ? {
                'inview' : 'inview',
                'touchstart .textPlus-popup-open' : 'openPopup',
                'click .textPlus-popup-open' : 'openPopup',
                'touchstart .textPlus-popup-close' : 'closePopup',
                'click .textPlus-popup-close' : 'closePopup'
            }:{
                'inview' : 'inview',
                'click .textPlus-popup-open' : 'openPopup',
                'click .textPlus-popup-close' : 'closePopup'
            }
        },

        preRender: function () {
            this.listenTo(Adapt, 'device:changed', this.setDeviceSize, this);
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
            this.listenTo(Adapt, 'device:resize', this.setDeviceSize, this);
            this.checkIfResetOnRevisit();
            this.setDeviceSize();
        },

        // Used to check if the text should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');
            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.set({
                    _isEnabled: true,
                    _isComplete: false
                });
            }
        },

        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'small') {
                var charLimit = 100;
                var firstCharLimit = this.model.get('_maxBodyCharacters') || charLimit;
                var hasPopup = this.model.get('body') && this.model.get('body').length > firstCharLimit;
                if (hasPopup) {
                    this.model.set('body-short', this.model.get('body').substring(0, firstCharLimit) + '...');
                }
                this.model.set('_displayShortText', hasPopup);
                if (hasPopup) {
                    this.$('.textPlus-short').removeClass('textPlus-hidden');
                    this.$('.textPlus-long').addClass('textPlus-hidden');
                }
                return;
            }
            this.model.set('_displayShortText', false);
            this.$('.textPlus-short').addClass('textPlus-hidden');
            this.$('.textPlus-long').removeClass('textPlus-hidden');
        },

        postRender: function() {
            if(this.model.has('_graphic')){
                this.resizeImage(Adapt.device.screenSize);
            } else {
                this.setReadyStatus();
            }
            // Check if instruction or body is set, otherwise force completion
            var cssSelector = this.$('.component-instruction').length > 0
                ? '.component-instruction'
                : (this.$('.component-body').length > 0 ? '.component-body' : null);

            if (!cssSelector) {
                this.setCompletionStatus();
            } else {
                this.model.set('cssSelector', cssSelector);
                this.$(cssSelector).on('inview', _.bind(this.inview, this));
            }
        },

        resizeImage: function(width) {
            var src = this.$('.textPlus-graphic-inner img').attr('data-' + width);
            this.$('.textPlus-graphic-inner img').attr('src', src);
            this.$('.textPlus-graphic-inner').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        },

        openPopup: function (event) {
            event.preventDefault();
            var outerMargin = parseFloat(this.$('.textPlus-popup-inner').css('margin'));
            var innerPadding = parseFloat(this.$('.textPlus-popup-inner').css('padding'));
            var toolBarHeight = this.$('.textPlus-toolbar').height();
            this.$('.textPlus-popup-content').removeClass('textPlus-hidden');
            this.$('.textPlus-popup-inner').css('height', $(window).height() - (outerMargin * 2) - (innerPadding * 2));
            this.$('.textPlus-popup').removeClass('textPlus-hidden');
            this.$('.textPlus-popup-content').css('height', (this.$('.textPlus-popup-inner').height() - toolBarHeight));
        },

        closePopup: function (event) {
            event.preventDefault();
            this.$('.textPlus-popup-close').blur();
            this.$('.textPlus-popup-content').addClass('textPlus-hidden');
            this.$('.textPlus-popup').addClass('textPlus-hidden');
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$(this.model.get('cssSelector')).off('inview');
                    this.setCompletionStatus();
                }
            }
        }

    });

    Adapt.register("textPlus", TextPlus);

    return TextPlus;

});
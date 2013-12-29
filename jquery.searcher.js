(function IIFE($, window, document, undefined) {
	"use strict";

	var pluginName = "searcher",
		defaults = {
			itemSelector: "",
			textSelector: "",
			inputSelector: "",
			caseSensitive: false
		};

	function Plugin(element, options)
	{
		this.element = element;

		this.options = $.extend({ }, defaults, options);

		this._create();
	}

	Plugin.prototype = {
		_create: function()
		{
			this._$element = $(this.element);

			// find the input and listen to various events
			this._$input = $(this.options.inputSelector).on("input change keyup", $.proxy(this._onValueChange, this));

			// remember the last entered value
			this._lastValue = "";
		},
		_onValueChange: function(event)
		{
			var options = this.options,
				itemSelector = options.itemSelector,
				textSelector = options.textSelector,
				caseSensitive = options.caseSensitive;

			var value = this._$input.val();

			// lower all texts for case insensitive searches
			if (!caseSensitive)
				value = value.toLowerCase();

			if (value === this._lastValue)
				return; // nothing has changed

			this._lastValue = value;

			// get all items
			this._$element
				.find(itemSelector)
				.each(function toggleItem() {
					var containsText = false,
						$item = $(this),
						$textElements = $item.find(textSelector)
							.each(function compareText() {
								var text = $(this).text();

								// lower all texts for case insensitive searches
								if (!caseSensitive)
									text = text.toLowerCase();

								// check if the text contains the entered text
								containsText = text.indexOf(value) >= 0;
								return !containsText; // end each loop on true
							});

					$item.toggle(containsText);
				});
		}
	};

	$.fn[pluginName] = function pluginHandler(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName))
			{
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
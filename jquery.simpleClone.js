/*!
 * jQuery Simple Clone.
 *
 * @category   Plugins
 * @author     KUCKLU
 * @license    Licensed under MIT (http://www.opensource.org/licenses/mit-license.php)
 * @copyright  (c) 2022 KUCKLU
 * @version    1.2.0
 */
(function ($) {
	'use strict';

	const defaults = {
		copyValue         : true,
		cloneLimit        : false,
		limitMessageClass : 'simpleClone-clnLmt',
		limitMessageText  : 'Maximum count has been reached.',
		targetClass       : 'simpleClone-clnElem',
		addButtonWrapClass: 'simpleClone-btnWrap',
		removeButtonClass : 'simpleClone-rmvBtn',
		removeButtonText  : 'Remove',
		filterCloneElement: null,
		onClone           : null,
		onComplete        : null,
		onRemove          : null,
		onCompleteRemove  : null
	};

	$.fn.simpleClone = function (options) {
		const opts = $.extend({}, defaults, options);

		$(document).on('click', '.' + opts.removeButtonClass, function (e) {
			e.preventDefault();

			const $self = $(this);
			const $parent = $self.parent();

			if ($.isFunction(opts.onRemove)) {
				opts.onRemove.call(this, opts);
			}

			$parent.remove();

			if ($.isFunction(opts.onCompleteRemove)) {
				opts.onCompleteRemove.call(this, opts);
			}
		});

		this.on('click', function (e) {
			e.preventDefault();

			const $self = $(this);
			const $wrap = $self.closest('.' + opts.addButtonWrapClass);
			const $targetWrap = $wrap.prev();
			const $targets = $targetWrap.find('.' + opts.targetClass);
			const $target = $targets.first();
			const count = $target.parent().children('.' + opts.targetClass).length + 1;

			if (opts.cloneLimit === false || (typeof opts.cloneLimit === 'number' && count <= opts.cloneLimit)) {
				let $clone = $target.clone(true);

				const rmvButton = $('<button>')
					.attr('type', 'button')
					.addClass(opts.removeButtonClass === null ? defaults.removeButtonClass : defaults.removeButtonClass + ' ' + opts.removeButtonClass)
					.text(opts.removeButtonText);

				$clone.append(rmvButton);

				if ($.isFunction(opts.filterCloneElement)) {
					$clone = opts.filterCloneElement.call(this, $clone, opts);
				}

				$clone.find('select').each(function (index, item) {
					$(item).val($target.find('select').eq(index).val());
				});

				if (opts.copyValue === false) {
					$clone.find('input:not("input[type=radio], input[type=button], input[type=submit]"), textarea, select').each(function (index, item) {
						$(item).val('');
					});
				}

				if ($.isFunction(opts.onClone)) {
					opts.onClone.call(this, $clone, opts);
				}

				$target.parent().append($clone);

				if ($.isFunction(opts.onComplete)) {
					opts.onComplete.call(this, $clone, opts);
				}
			} else {
				const message = $('<span>')
					.addClass(opts.limitMessageClass)
					.text(opts.limitMessageText);

				if ($self.next('.' + opts.limitMessageClass).length === 0) {
					$self.after(message);

					setTimeout(function () {
						$self.next('.' + opts.limitMessageClass).fadeOut().remove();
					}, 4000);
				}
			}
		});

		return this;
	};
})(jQuery);
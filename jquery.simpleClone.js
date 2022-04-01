/*!
 * jQuery Simple Clone.
 *
 * @category   Plugins
 * @author     KUCKLU
 * @license    Licensed under MIT (http://www.opensource.org/licenses/mit-license.php)
 * @copyright  (c) 2022 KUCKLU
 * @version    1.1.2
 */
(function ($) {
	'use strict';

	$.fn.simpleClone = function (options) {
		const opts = $.extend({}, $.fn.simpleClone.defaults, options);
		const elems = this;

		return elems.each(function () {
			$(this).on('click', function (e) {
				e.preventDefault();

				const $self = $(this);
				const $wrap = $self.closest('.' + opts.addButtonWrapClass);
				const $targetWrap = $wrap.prev();
				const $targets = $targetWrap.find('.' + opts.targetClass);
				const $target = $targets.first();
				const count = $target.parent().children('.' + opts.targetClass).length + 1;

				if (opts.cloneLimit === false || (typeof opts.cloneLimit === 'number' && count <= opts.cloneLimit)) {
					const clone = $target[0].cloneNode(true);
					let $clone = $(clone);
					const rmvButton = document.createElement('button');
					rmvButton.type = 'button';
					rmvButton.className = opts.removeButtonClass === null ? $.fn.simpleClone.defaults.removeButtonClass : $.fn.simpleClone.defaults.removeButtonClass + ' ' + opts.removeButtonClass;
					rmvButton.innerText = opts.removeButtonText;

					$clone.append(rmvButton);

					$clone.find('select').each(function(index, item) {
						$(item).val($target.find('select').eq(index).val());
					});

					if (opts.copyValue === false) {
						$clone.find('input:not("input[type=radio], input[type=button], input[type=submit]"), textarea, select').each(function(index, item) {
							$(item).val('');
						});
					}

					if ($.isFunction(opts.filterCloneElement)) {
						$clone = opts.filterCloneElement.call(elems, $clone, opts);
					}

					if ($.isFunction(opts.onClone)) {
						opts.onClone.call(elems, $clone, opts);
					}

					$target.parent().append($clone);

					if ($.isFunction(opts.onComplete)) {
						opts.onComplete.call(elems, $clone, opts);
					}
				} else {
					const message = document.createElement('span');
					message.className = opts.limitMessageClass;
					message.innerText = opts.limitMessageText;

					if ($self.next('.' + opts.limitMessageClass).length === 0) {
						$self.after(message);

						setTimeout(function () {
							$self.next('.' + opts.limitMessageClass).fadeOut().remove();
						}, 4000);
					}
				}
			});

			$(document).on('click', '.' + $.fn.simpleClone.defaults.removeButtonClass, function (e) {
				e.preventDefault();

				const $self = $(this);

				if ($.isFunction(opts.onRemove)) {
					opts.onRemove.call(elems, opts);
				}

				$self.parent().remove();

				if ($.isFunction(opts.onCompleteRemove)) {
					opts.onCompleteRemove.call(elems, opts);
				}
			});
		});
	};

	$.fn.simpleClone.defaults = {
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
})(jQuery);

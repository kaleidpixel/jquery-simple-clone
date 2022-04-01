# jQuery simple clone plugin

This jQuery Plugin is a simple plugin that clones the HTML Dom Element.

# How To Install

1. Put `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>`.
2. Put `<script src="/assets/js/jquery.sinpleClone.min.js"></script>` after jQuery library.
3. Done.

# Document

Coding is quite simple. The options are only simple, so you won't get lost.

## Basic markup

```html

<div>
    <div class="simpleClone-clnElem">
        TEXT.
    </div>
</div>
<div class="simpleClone-btnWrap">
    <button type="button" class="addBtn">
        + Add
    </button>
</div>
```

```js
<script>
    (function ($) {
        'use strict';

        $('.addBtn').simpleClone();
    })(jQuery);
</script>
```

## Don't want to copy the value.

```js
<script>
    (function ($) {
        'use strict';

        $('.addBtn').simpleClone({
            copyValue: false
        });
    })(jQuery);
</script>
```

## Options

|                                                            Options | Description |
|-------------------------------------------------------------------:|:------------|
|                                   **copyValue**<br>_default: true_ | .           |
|                                 **cloneLimit**<br>_default: false_ | .           |
|                                              **limitMessageClass** | .           |
| **limitMessageText**<br>_default: Maximum count has been reached._ | .           |
|                                                    **targetClass** | .           |
|                                             **addButtonWrapClass** | .           |
|                                              **removeButtonClass** | .           |
|                          **removeButtonText**<br>_default: Remove_ | .           |

## Callback function

|                                   Function | Description |
|-------------------------------------------:|:------------|
|  **filterCloneElement**<br>_default: null_ | .           |
|             **onClone**<br>_default: null_ | .           |
|          **onComplete**<br>_default: null_ | .           |
|            **onRemove**<br>_default: null_ | .           |
|    **onCompleteRemove**<br>_default: null_ | .           |

# License
MIT License  
Copyright (c) 2020 Kaleid Pixel

# jQuery Searcher Plugin

The jQuery Searcher Plugin connects any list-like data with an input for searching.

## Installation

Download the latest [release](https://github.com/lloiser/jquery-searcher/releases/) of this plugin on GitHub.

Include the jquery.searcher.js script after the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.searcher.js"></script>
```

## Usage

```js
$("...").searcher({
    itemSelector:  "...", // jQuery selector for the data item element
    textSelector:  "...", // jQuery selector for the element which contains the text
    inputSelector: "..."  // jQuery selector for the input element
});
```

## Example

See the live version of the following example on the [GitHub page](http://lloiser.github.io/jquery-searcher/).

Given the following HTML markup:
```html
<input id="tablesearchinput" />
<table id="tabledata">
    <tbody>
        <tr>
            <td>#1</td>
            <td>Like a Rolling Stone</td>
            <td>Bob Dylan</td>
            <td>1965</td>
        </tr>
        <tr>
            <td>#2</td>
            <td>(I Can't Get No) Satisfaction</td>
            <td>The Rolling Stones</td>
            <td>1965</td>
        </tr>
        ...
    </tbody>
</table>
```
And executing the following script connects the input with the table:
```js
$("#tabledata").searcher({
    inputSelector: "#tablesearchinput"
    // itemSelector (tbody > tr) and textSelector (td) already have proper default values
});
```

## Documentation

The following table contains all possible options which can be passed to the plugin.

<table id="documentation">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>itemSelector</td>
        <td>string</td>
        <td>
            jQuery selector for the data item element (e.g. <code>tr, li</code>).<br />
            Default: <code>"tbody &gt; tr"</code>
        </td>
    </tr>
    <tr>
        <td>textSelector</td>
        <td>string</td>
        <td>
            jQuery selector for the element which contains the text within the item element.<br />
            If not specified the data item element is used instead.<br />
            Default: <code>"td"</code>
        </td>
    </tr>
    <tr>
        <td>inputSelector</td>
        <td>string</td>
        <td>
            jQuery selector for the input element which is used to filter the data.<br />
            Default: <code>""</code>
        </td>
    </tr>
    <tr>
        <td>caseSensitive</td>
        <td>bool</td>
        <td>
            Determines whether the search should be case sensitive or not.<br />
            Default: <code>false</code>
        </td>
    </tr>
    <tr>
        <td>toggle</td>
        <td>function</td>
        <td>
            this function is called for each data item element when the text in the input changes.<br />
            it is called with the data item element and a boolean value indicating whether the item contains the text or not.<br />
            Default: <code>function(item, containsText) { $(item).toggle(containsText); }</code>
        </td>
    </tr>
    </tbody>
</table>

## License

Copyright (c) 2014 Lukas Beranek Licensed under the MIT license.
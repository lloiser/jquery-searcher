# jQuery Searcher Plugin

The jQuery Searcher Plugin connects any list-like data with an search input to easily filter the data.

## Installation

Include the jquery.searcher.js script after the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.searcher.js"></script>
```

## Usage

```js
$("...").searcher({
	itemSelector:  "...",   // jQuery selector for the data item element
	textSelector:  "...",   // jQuery selector for the element which contains the text
	inputSelector: "..."    // jQuery selector for the input element
});
```

## Example

Given the following HTML markup:
```html
<input id="searchinput" type="text" />
<table id="data">
  <thead>...</thead>
  <tbody>
    <tr>
      <td>#1</td>
      <td>Bob Dylan - Like a Rolling Stone (1965)</td>
    </tr>
    <tr>
      <td>#2</td>
      <td>The Rolling Stones - (I Can't Get No) Satisfaction (1965)</td>
    </tr>
    ...
  </tbody>
</table>
```
And executing the following script connects the input with the table:
```js
$("#data").searcher({
	inputSelector: "#searchinput"
});
```

_Note_: the plugin call for tables is that short because the `itemSelector` and `textSelector` already have proper default values.

See the live example in [this jsfiddle](http://jsfiddle.net/lloiser/ZV64w/).

## Documentation

The following table contains all possible options which can be passed to the plugin.

<table>
  <tr>
    <th>Name</th><th>Type</th><th>Description</th>
  </tr>
  <tr>
    <td>itemSelector</td>
    <td>string</td>
    <td>
      jQuery selector for the data item element (e.g. <code>tr, li</code>).<br />
      Default: <code>"tbody > tr"</code>
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
</table>

## License

Copyright (c) 2013 Lukas Beranek Licensed under the MIT license.
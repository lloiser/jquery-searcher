/*global module, test, ok, equal, deepEqual */

(function() {

	"use strict";

	module("jQuery Searcher Tests", {
		teardown: function()
		{
			$table.searcher("dispose");
			$list.searcher("dispose");
			$any.searcher("dispose");
		}
	});

	var inputSelector = "#testinput";
	var $input = $(inputSelector);
	var $table = $("#testtable");
	var $list =  $("#testlist");
	var $any =   $("#testany");

	var testData = {
		"dylan":    ["1", "Like a Rolling Stone",          "Bob Dylan",          "1965"],
		"stones":   ["2", "(I Can't Get No) Satisfaction", "The Rolling Stones", "1965"],
		"lennon":   ["3", "Imagine",                       "John Lennon",        "1971"],
		"gaye":     ["4", "What's Going On",               "Marvin Gaye",        "1971"],
		"franklin": ["5", "Respect",                       "Aretha Franklin",    "1967"]
	};

	/*
	 * BASIC TESTS
	 */

	test("plugin exists", function() {
		// on any jQuery wrapped element
		ok($table.searcher);
		ok($list.searcher);
		ok($any.searcher);
	});

	test("basic table", function() {
		// GIVEN: a table and an input
		// WHEN: I connect the table and the input
		$table.searcher({
			inputSelector: inputSelector
		});

		// AND: run some basic tests
		var $items = $table.find("tr");
		basicTests($items);
	});

	test("basic list", function() {
		// GIVEN: a list and an input
		// WHEN: I connect the list and an input
		$list.searcher({
			inputSelector: inputSelector,
			itemSelector: "li",
			textSelector: ""
		});

		// AND: run some basic tests
		var $items = $list.find("li");
		basicTests($items);
	});

	test("basic any", function() {
		// GIVEN: a list like structure and an input
		// WHEN: I connect the list like structure and the input
		$any.searcher({
			inputSelector: inputSelector,
			itemSelector: ".item",
			textSelector: "> *"
		});

		// AND: run some basic tests
		var $items = $any.find(".item");
		basicTests($items);
	});

	function basicTests($items)
	{
		// THEN: nothing should have changed for the items (all 5 are visible)
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I change the text in the input to "a"
		write("a");
		// THEN: all items are visible because everyone contains an "a"
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I change the text in the input to "rolling"
		write("rolling");
		// THEN: "Bob Dylan" (title contains "Rolling") and "The Rolling Stones" are visible
		assertItems($items.filter(":visible"), ["dylan", "stones"]);

		// WHEN: I change the text in the input to "john"
		write("john");
		// THEN: only "John Lennon" is visible
		assertItems($items.filter(":visible"), ["lennon"]);

		// WHEN: I change the text in the input to "1971"
		write("1971");
		// THEN: "John Lennon" and "Aretha Franklin" are visible (date is "1971")
		assertItems($items.filter(":visible"), ["lennon", "gaye"]);

		// WHEN: I clear the text in the input
		write("");
		// THEN: all items should be visible again
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);
	}

	/*
	 * OPTION caseSensitive
	 */

	test("caseSensitive table", function() {
		// GIVEN: a connected table and input
		$table.searcher({
			inputSelector: inputSelector,
			// AND: case sensitive search is activated
			caseSensitive: true
		});

		// WHEN: I run some tests
		var $items = $table.find("tr");
		caseSensitiveTests($items);

		// wHEN: I change the caseSensitive option to false
		$table.searcher({
			caseSensitive: false
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	test("caseSensitive list", function() {
		// GIVEN: a connected list and input
		$list.searcher({
			inputSelector: inputSelector,
			itemSelector: "li",
			textSelector: "",
			// AND: case sensitive search is activated
			caseSensitive: true
		});

		// WHEN: I run some tests
		var $items = $list.find("li");
		caseSensitiveTests($items);

		// wHEN: I change the caseSensitive option to false
		$list.searcher({
			caseSensitive: false
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	test("caseSensitive any", function() {
		// GIVEN: a connected list-like structure and input
		$any.searcher({
			inputSelector: inputSelector,
			itemSelector: ".item",
			textSelector: "> *",
			// AND: case sensitive search is activated
			caseSensitive: true
		});

		// WHEN: I run some tests
		var $items = $any.find(".item");
		caseSensitiveTests($items);

		// wHEN: I change the caseSensitive option to false
		$any.searcher({
			caseSensitive: false
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	function caseSensitiveTests($items)
	{
		// THEN: nothing should have changed for the items (all 5 are visible)
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I change the text in the input to "l"
		write("l");
		// THEN: "Bob Dylan", "The Rolling Stones" and "Aretha Franklin" are visible
		assertItems($items.filter(":visible"), ["dylan", "stones", "franklin"]);

		// WHEN: I change the text in the input to "L"
		write("L");
		// THEN: "Bob Dylan" (title contains "L") and "John Lennon" are visible
		assertItems($items.filter(":visible"), ["dylan", "lennon"]);

		// WHEN: I change the text in the input to "rolling"
		write("rolling");
		// THEN: no item is visible because non of the items contains "rolling"
		assertItems($items.filter(":visible"), []);

		// WHEN: I change the text in the input to "Rolling"
		write("Rolling");
		// THEN: "Bob Dylan" (title contains "Rolling") and "The Rolling Stones" are visible
		assertItems($items.filter(":visible"), ["dylan", "stones"]);

		// WHEN: I change the text in the input to "1971"
		write("1971");
		// THEN: "John Lennon" and "Aretha Franklin" are visible (date is "1971")
		assertItems($items.filter(":visible"), ["lennon", "gaye"]);

		// WHEN: I clear the text in the input
		write("");
		// THEN: all items should be visible again
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);
	}

	/*
	 * OPTION toggle
	 */

	test("toggle table", function() {
		// GIVEN: a connected table and input
		$table.searcher({
			inputSelector: inputSelector,
			// AND: a custom toggle function
			toggle: function(item, containsText)
			{
				$(item).toggleClass("containsText", containsText);
			}
		});

		// WHEN: I run some tests
		var $items = $table.find("tr");
		toggleTests($items);

		// wHEN: I change the toggle function back to it's default
		$table.searcher({
			toggle: null
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	test("toggle list", function() {
		// GIVEN: a connected list and input
		$list.searcher({
			inputSelector: inputSelector,
			itemSelector: "li",
			textSelector: "",
			// AND: a custom toggle function
			toggle: function(item, containsText)
			{
				$(item).toggleClass("containsText", containsText);
			}
		});

		// WHEN: I run some tests
		var $items = $list.find("li");
		toggleTests($items);

		// wHEN: I change the toggle function back to it's default
		$list.searcher({
			toggle: null
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	test("toggle any", function() {
		// GIVEN: a connected list-like structure and input
		$any.searcher({
			inputSelector: inputSelector,
			itemSelector: ".item",
			textSelector: "> *",
			// AND: a custom toggle function
			toggle: function(item, containsText)
			{
				$(item).toggleClass("containsText", containsText);
			}
		});

		// WHEN: I run some tests
		var $items = $any.find(".item");
		toggleTests($items);

		// wHEN: I change the toggle function back to it's default
		$any.searcher({
			toggle: null
		});

		// THEN: all basic tests should work
		basicTests($items);
	});

	function toggleTests($items)
	{
		// THEN: nothing has changed for the items (all 5 are visible)
		assertItems($items.filter(".containsText"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I change the text in the input to "a"
		write("a");
		// THEN: all items have the "containsText" class because everyone contains an "a"
		assertItems($items.filter(".containsText"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I change the text in the input to "rolling"
		write("rolling");
		// THEN: "Bob Dylan" (title contains "Rolling") and "The Rolling Stones" have the "containsText" class
		assertItems($items.filter(".containsText"), ["dylan", "stones"]);

		// WHEN: I change the text in the input to "john"
		write("john");
		// THEN: only "John Lennon" has the "containsText" class
		assertItems($items.filter(".containsText"), ["lennon"]);

		// WHEN: I change the text in the input to "1971"
		write("1971");
		// THEN: "John Lennon" and "Aretha Franklin" have the "containsText" class (date is "1971")
		assertItems($items.filter(".containsText"), ["lennon", "gaye"]);

		// WHEN: I clear the text in the input
		write("");
		// THEN: all items have the "containsText" class
		assertItems($items.filter(".containsText"), ["dylan", "stones", "lennon", "gaye", "franklin"]);
	}

	/*
	 * public function "filter"
	 */

	test("filter function", function() {
		// GIVEN: a connected table and input
		$table.searcher({
			inputSelector: inputSelector
		});

		// WHEN: I run some tests
		var $items = $table.find("tr");

		// WHEN: I filter the items with "a"
		$table.searcher("filter", "a");
		// THEN: all items are visible because everyone contains an "a"
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);

		// WHEN: I filter the items with "rolling"
		$table.searcher("filter", "rolling");
		// THEN: "Bob Dylan" (title contains "Rolling") and "The Rolling Stones" are visible
		assertItems($items.filter(":visible"), ["dylan", "stones"]);

		// WHEN: I filter the items with "john"
		$table.searcher("filter", "john");
		// THEN: only "John Lennon" is visible
		assertItems($items.filter(":visible"), ["lennon"]);

		// WHEN: I filter the items with "1971"
		$table.searcher("filter", "1971");
		// THEN: "John Lennon" and "Aretha Franklin" are visible (date is "1971")
		assertItems($items.filter(":visible"), ["lennon", "gaye"]);

		// WHEN: I filter the items with ""
		$table.searcher("filter", "");
		// THEN: all items should be visible again
		assertItems($items.filter(":visible"), ["dylan", "stones", "lennon", "gaye", "franklin"]);
	});

	/*
	 * HELPERS
	 */

	function write(text)
	{
		$input.val(text).change();
		// info for debugging purposes - could be removed
		ok(true, "changed text to '" + text + "'");
	}

	function assertItems($elements, expectedData)
	{
		var expected = expectedData.length;
		equal($elements.length, expected, expected + " item(s) should be visible");
		$elements.each(function(i) {
			assertItem($(this), testData[expectedData[i]]);
		});
	}

	function assertItem($item, expectedData)
	{
		var actualData = [];
		$item.children().each(function() {
			actualData.push($(this).text());
		});
		deepEqual(actualData, expectedData);
	}

}).call(this);

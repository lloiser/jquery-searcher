(function() {

	module("jQuery Searcher Tests", {
		teardown: function() {
			$table.searcher("dispose");
			$list.searcher("dispose");
			$any.searcher("dispose");
		}
	})

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
		// on any jquery wrapped element
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
		// THEN: nothing should have changed for the table items (all 5 are visible)
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

	// TODO

	/*
	 * OPTION toggle
	 */

	// TODO

	/*
	 * OPTION highlight
	 */

	// TODO

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
		})
	}

	function assertItem($item, expectedData)
	{
		var actualData = [];
		$item.children().each(function() {
			actualData.push($(this).text());
		});
		deepEqual(actualData, expectedData);
	}

}());
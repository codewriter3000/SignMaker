export default (function() {

	/**
	 * Clears out the children from a given element.
	 * @param {Element} parentElmt - Parent element to be cleared of children.
	 */
	const clearChildren = function(parentElmt) {
		while (parentElmt.firstChild) {
			parentElmt.removeChild(parentElmt.firstChild);
		}
	};

	/**
	 * Creates and appends an option element to a given Select element.
	 * @param {Element} selectElmt - Select element to be appended to.
	 * @param {string} value - Value to be held by the option.
	 * @param {boolean} [selected=false] - Whether or not the new option should be auto-selected.
	 * @param {string} [text] - Display text for the option.
	 */
	const appendOption = function(selectElmt, value, {selected = false, text} = {}) {
		if (!text) {
			text = value;
		}
		const optionElmt = document.createElement("option");
		optionElmt.value = value;
		optionElmt.selected = selected;
		optionElmt.appendChild(document.createTextNode(text));
		selectElmt.appendChild(optionElmt);
	};

	// FHW-defined colors.
	const colors = {
		green : "rgb(0, 95, 77)",
		blue : "rgb(0, 67, 123)",
		brown : "rgb(98, 51, 30)",
		yellow : "rgb(255, 178, 0)",
		white : "rgb(255, 255, 255)",
		black : "rgb(0, 0, 0)"
	};

	const specialCharacters = {
		sideLeftArrow : "h", // "h" is left-side up arrow in Roadgeek 2005 Arrows 1
		sideRightArrow : "H", // "H" is right-side up arrow in Roadgeek 2005 Arrows 1

		"Left/Down Arrow" : "f", // "f" is left-down arrow in Roadgeek 2005 Arrows 1
		"Left/Up Arrow" : "F",
		"Left Arrow" : "j", // "j" is left arrow in Roadgeek 2005 Arrows 1
		"Right/Down Arrow" : "F", // "F" is right-down arrow in Roadgeek 2005 Arrows 1
		"Right/Up Arrow" : "f",
		"Right Arrow" : "J", // "J" is right arrow in Roadgeek 2005 Arrows 1

		"Up Arrow" : "4", // "4" is up arrow in Roadgeek 2005 Arrows 2
		"Down Arrow" : "$" // "$" is down arrow in roadgeek 2005 arrows 2
	};

	const shieldPositions = {
		Left : "row",
		Above : "column",
		Right : "row-reverse"
	};

	return {
		clearChildren : clearChildren,
		appendOption : appendOption,
		colors : colors,
		specialCharacters : specialCharacters,
		shieldPositions : shieldPositions
	};
})();
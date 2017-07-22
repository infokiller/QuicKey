define([
	"cp"
], function(
	cp
) {
	const ProtocolPattern = /^[^:]+:\/\//;


	var bookmarks = [],
		urls = {};


	function processNodes(
		nodes)
	{
		nodes.forEach(function(node) {
			var url = node.url;

				// don't return any duplicate URLs
			if (url && !urls[url]) {
				node.displayURL = url.replace(ProtocolPattern, "");
				urls[url] = true;
				bookmarks.push(node);
			} else if (node.children) {
				processNodes(node.children);
			}
		});
	}


	function getBookmarks()
	{
		bookmarks = [];
		urls = {};

		return cp.bookmarks.getTree()
			.then(function(bookmarkNodes) {
				processNodes(bookmarkNodes);
				urls = null;

				return bookmarks;
			});
	}


	return getBookmarks;
});
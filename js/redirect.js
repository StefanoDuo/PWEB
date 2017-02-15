function start() {
	window.setInterval(function() {
		var textNode = document.getElementById('counter').firstChild;
		if(parseInt(textNode.nodeValue, 10) === 0)
			window.location = "index.php";
		else
			textNode.nodeValue = (parseInt(textNode.nodeValue, 10) - 1).toString();
	}, 1000);
}
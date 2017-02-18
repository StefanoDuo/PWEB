// the callback will receive the responseText as the first parameter
function ajaxRequest(url, method, queryString, async, successCallback, failureCallback) {
	method = method.toUpperCase();
	var getString = '', postString = null;
	if(method == 'GET')
		getString = '?' + queryString;
	else if(method == 'POST')
		postString = queryString;
	else
		throw 'method must be either GET or POST';

	var request = new XMLHttpRequest();
	console.log('UNSENT, ' + request.readyState);

	if(method === 'POST')
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// this function gets invoked every time request.readystate changes
	request.onreadystatechange = function() {
		var status;
		if(request.readyState === XMLHttpRequest.OPENED)
			status = 'OPENED ';
		else if(request.readyState === XMLHttpRequest.HEADERS_RECEIVED)
			status = 'HEADERS_RECEIVED ';
		else if(request.readyState === XMLHttpRequest.LOADING)
			status = 'LOADING ';
		else if(request.readyState === XMLHttpRequest.DONE)
			status = 'DONE ';

		console.log('READYSTATE: ' + status + request.readyState + ', STATUS: ' + request.status);

		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status === 200) {
				if(successCallback) successCallback(request.responseText);
			}
			else if(failureCallback)
				failureCallback(request.responseText);
		}
	};
	
	request.open(method, url + getString, async);
	if(method === 'POST')
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(postString);
}
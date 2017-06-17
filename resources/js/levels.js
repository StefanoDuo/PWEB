function getScores() {
	var whichButton = this.id;
	var levelInfo = whichButton.split('-');
	var creatorNickname = levelInfo[0];
	var levelName = levelInfo[1];
	var method = 'GET';
	var queryString = 'levelName=' + levelName + '&creatorNickname=' + creatorNickname;
	var async = true;
	var url = 'endpoints/getLevelScores.php';

	ajaxRequest(url, method, queryString, async, function(textResponse) {
		var parsedResponse = JSON.parse(textResponse);
		var buttonID = parsedResponse.creatorNickname + '-' + parsedResponse.levelName;
		var buttonElement = document.getElementById(buttonID);
		var scoresTable = document.getElementById(buttonID + '-' + 'scoresTable');
		var errorMessage = document.getElementById(buttonID + '-' + 'errorMessage');
		var parentListElement = document.getElementById(buttonID).parentElement;

		// first we remove the old generated content
		if(scoresTable) {
		 	buttonElement.textContent = 'Show scores';
			scoresTable.remove();
			return;
		}
		if(errorMessage) {
		 	buttonElement.textContent = 'Show scores';
			errorMessage.remove();
			return;
		}

		// then we create the new one
		if(!parsedResponse.success) {
	 		buttonElement.textContent = 'Hide scores';
			errorMessage = document.createElement('p');
			errorMessage.id = buttonID + '-' + 'errorMessage';
			errorMessage.textContent = parsedResponse.errorMessage;
			parentListElement.appendChild(errorMessage);
			return;
		}

		scoresTable = document.createElement('table');
		scoresTable.id = buttonID + '-' + 'scoresTable';

		var body = document.createElement('thead');
		var row = document.createElement('tr');
		var cell = document.createElement('th');
		cell.textContent = 'Nickname';
		row.appendChild(cell);
		cell = document.createElement('th');
		cell.textContent = 'Score';
		row.appendChild(cell);
		scoresTable.appendChild(row);
		var cell = document.createElement('th');
		row.appendChild(cell);
		body.appendChild(row);
		scoresTable.appendChild(body);

	 	buttonElement.textContent = 'Hide scores';
		body = document.createElement('tbody');
		for(var i = 0; i < parsedResponse.scores.length; i++) {
			var score = parsedResponse.scores[i];
			row = document.createElement('tr');
			cell = document.createElement('td');
			cell.textContent = score.playerNickname;
			row.appendChild(cell);

			cell = document.createElement('td');
			cell.textContent = score.score;
			row.appendChild(cell);

			cell = document.createElement('td');
			var replay = document.createElement('a');
			replay.href = 'replay.php?id=' + score.id;
			replay.textContent = 'Replay';
			replay.className = 'flatButton'
			cell.appendChild(replay);
			row.appendChild(cell);

			body.appendChild(row);
		}
		scoresTable.appendChild(body);
		parentListElement.appendChild(scoresTable);
	});

}

function start() {
	var buttons = document.getElementsByTagName('button');
	for(var i = 0; i < buttons.length; i++)
		buttons[i].addEventListener('click', getScores);
}
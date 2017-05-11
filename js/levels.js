function getScores() {
	var whichButton = this.id;
	var levelInfo = whichButton.split('-');
	var creatorNickname = levelInfo[0];
	var levelName = levelInfo[1];
	var method = 'GET';
	var queryString = 'levelName=' + levelName + '&creatorNickname=' + creatorNickname;
	var async = true;
	var url = 'getLevelScores.php';

	ajaxRequest(url, method, queryString, async, function(textResponse) {
		var parsedResponse = JSON.parse(textResponse);
		var buttonID = parsedResponse.creatorNickname + '-' + parsedResponse.levelName;
		var buttonElement = document.getElementById(buttonID);
		var scoresList = document.getElementById(buttonID + '-' + 'scoresList');
		var errorMessage = document.getElementById(buttonID + '-' + 'errorMessage');
		var parentListElement = document.getElementById(buttonID).parentElement;
		// first we remove the old generated content
		if(scoresList) {
		 	buttonElement.textContent = 'Show scores';
			scoresList.remove();
			return;
		}
		if(errorMessage) {
		 	buttonElement.textContent = 'Show scores';
			errorMessage.remove();
			return
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
		scoresList = document.createElement('ul');
		scoresList.id = buttonID + '-' + 'scoresList';
	 	buttonElement.textContent = 'Hide scores';
		parentListElement.appendChild(scoresList);
		for(var i = 0; i < parsedResponse.scores.length; i++) {
			var score = parsedResponse.scores[i];
			var scoreElement = document.createElement('li');
			scoreElement.textContent = 'Player: ' + score.playerNickname + ' | Score: ' + score.score;
			scoreElement.textContent += ' | ';
			var replay = document.createElement('a');
			replay.href = 'replay.php?creatorNickname=' + parsedResponse.creatorNickname + '&levelName=' + parsedResponse.levelName + '\
				&playerNickname=' + score.playerNickname + '&stamp=' + score.stamp;
			replay.textContent = 'Replay';
			scoreElement.appendChild(replay)
			scoresList.appendChild(scoreElement);
		}
	});

}

function start() {
	var buttons = document.getElementsByTagName('button');
	for(var i = 0; i < buttons.length; i++)
		buttons[i].addEventListener('click', getScores);
}
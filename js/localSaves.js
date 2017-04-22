function LocalSaves(ajaxRequest, scoreSaveKey, baseResumeSaveKey) {
   this.scoreSaveKey = scoreSaveKey || 'scoreSaves';
   this.baseResumeSaveKey = baseResumeSaveKey || 'resumeSaves';
   this.ajaxRequest = ajaxRequest;
}

// score saves are anonymouse so we can store all of them in an arrays under only one key and push
// all of them when the player logs in
LocalSaves.prototype.insertScoreSave = function(replay, score, levelCreatorNickname, levelName) {
   var currentSaves = this.getScoreSaves();
   var save = {
      'replay': replay,
      'score': score,
      'levelCreatorNickname': levelCreatorNickname,
      'levelName': levelName
   };
   currentSaves.push(save);
   localStorage.setItem(this.scoreSaveKey, JSON.stringify(currentSaves));
}


LocalSaves.prototype.getScoreSaves = function() {
   var saves = JSON.parse(localStorage.getItem(this.scoreSaveKey));
   if(!saves)
      saves = [];
   return saves;
}

LocalSaves.prototype.pushStoredScoreSaves = function(playerNickname) {
   var saves = this.getScoreSaves();
   for(var i = 0; i < saves.length; i++)
      this.pushScoreSave(playerNickname, saves[i].levelName, saves[i].levelCreatorNickname, saves[i].score, saves[i].replay);
   localStorage.removeItem(this.scoreSaveKey);
}

LocalSaves.prototype.pushScoreSave = function(playerNickname, levelName, levelCreatorNickname, score, replay) {
   var queryString = 'playerNickname=' + playerNickname + '&levelName=' + levelName + '&levelCreatorNickname=';
   queryString += levelCreatorNickname + '&score=' + score + '&replay=' + replay;
   this.ajaxRequest('insertScore.php', 'GET', queryString, true);
}

// instead game resume saves can be either anonymous or not therefore it makes more sense to store them
// separately based on the user owning them
LocalSaves.prototype.insertResumeSave = function(game, levelCreatorNickname, levelName, playerNickname) {
   var resumeSaveKey = this.baseResumeSaveKey + ',' + levelCreatorNickname + ',' + levelName;
   if(playerNickname)
      resumeSaveKey += ',' + playerNickname;
   localStorage.setItem(resumeSaveKey, JSON.stringify(game));
}

LocalSaves.prototype.getResumeSave = function(levelCreatorNickname, levelName, playerNickname) {
   var resumeSaveKey = this.baseResumeSaveKey + ',' + levelCreatorNickname + ',' + levelName;
   if(playerNickname)
      resumeSaveKey += ',' + playerNickname;
   var save = JSON.parse(localStorage.getItem(resumeSaveKey));
   if(!save)
      return null;
   localStorage.removeItem(resumeSaveKey);
   // transforming simple parsed object into Vectors etc.
   save.levelObject.player = new Vector(save.levelObject.player.x, save.levelObject.player.y);
   save.levelObject.ball = new Vector(save.levelObject.ball.x, save.levelObject.ball.y);
   save.levelObject.hole = new Vector(save.levelObject.hole.x, save.levelObject.hole.y);
   save.levelObject.rocks.forEach(function(element, index, array) {
         array[index] = new Vector(element.x, element.y);
   });
   var rowNumber = save.gameField.rowNumber;
   var columnNumber = save.gameField.columnNumber;
   var game = new Game(new Matrix(rowNumber, columnNumber), save.levelObject, Vector);
   game.ballMovingDirection = new Vector(save.ballMovingDirection.x, save.ballMovingDirection.y);
   game.ballPosition = new Vector(save.ballPosition.x, save.ballPosition.y);
   game.playerPosition = new Vector(save.playerPosition.x, save.playerPosition.y);
   save.redoStack.forEach(function(element, index, array) {
      element.ballPosition = new Vector(element.ballPosition.x, element.ballPosition.y)
      element.playerPosition = new Vector(element.playerPosition.x, element.playerPosition.y)

   });
   save.undoStack.forEach(function(element, index, array) {
      element.ballPosition = new Vector(element.ballPosition.x, element.ballPosition.y)
      element.playerPosition = new Vector(element.playerPosition.x, element.playerPosition.y)

   });
   game.redoStack = save.redoStack;
   game.undoStack = save.undoStack;
   game.score = save.score;
   var gameField = save.gameField;
   for(var j = 0; j < gameField.columnNumber; j++)
      for(var k = 0; k < gameField.rowNumber; k++)
         game.gameField.matrix[j][k] = gameField.matrix[j][k];
   return game;
}
function Game() {
	
}

Game.prototype.init = function() {
	app.canvas = document.createElement ("canvas");
	document.body.appendChild(app.canvas);	

	app.canvas.height = window.innerHeight;
	app.canvas.width = window.innerWidth;

	app.ctx = app.canvas.getContext("2d");

	thePlayer = new Player(0,0, colour(150, 0, 0));

	touchDetection = new TouchDetection();
	app.gravity = 10;
	app.playerVelocity = [10, 0]; // player velocity held in app for time being
	app.horizontalDirection = "Left"; // used to tell what direction the player is moving in horizontally
	app.gravity = 0.1;
	
	app.m_gravityPower = 0;
	app.maxGravityPower = 100;
	app.isGravityOn = true;
	app.gravityPowerRegen = 1;
}

Game.prototype.update = function() {
	app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
	var tempText = "Gravity : "+String(app.m_gravityPower);
	app.ctx.fillText(tempText,30,30);
	app.ctx.font = "14px Verdana";
	thePlayer.draw();

	app.playerVelocity[1]=app.playerVelocity[1]+app.gravity;
	if(app.m_gravityPower+app.gravityPowerRegen < app.maxGravityPower)
	{
		app.m_gravityPower += 0.5;
	}
	if(app.isGravityOn === false & app.m_gravityPower > 0)
	{
		app.m_gravityPower -=2;
		if(app.m_gravityPower < 0)
		{
			app.m_gravityPower = 0;
			app.gravity = 0.2;
			app.isGravityOn = true;
		}
	}
	// if player velocity is moving left
	if (app.horizontalDirection === "Left") {
		// decelerates the player
		if (app.playerVelocity[0] >= 0) {
			app.playerVelocity[0] = 0;
		}
		else {
			app.playerVelocity[0] += 0.2;
		}
	}
	// if player velocity is moving right
	else if (app.horizontalDirection === "Right") {
		// decelerates the player
		if (app.playerVelocity[0] <= 0) {
			app.playerVelocity[0] = 0;
		}
		else {
			app.playerVelocity[0] -= 0.1;
		}
	}

	thePlayer.update(app.playerVelocity[0], app.playerVelocity[1]);

	window.requestAnimationFrame(game.update);
}

function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}

function colour(r, b, g) {
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}
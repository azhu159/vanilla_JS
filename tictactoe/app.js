// select all required elements
const selectBox = document.querySelector('.select-box')
selectXBtn = selectBox.querySelector('.playerX')
selectOBtn = selectBox.querySelector('.playerO')
playBoard = document.querySelector('.play-board')
allBox = document.querySelectorAll('section span')
players = document.querySelector('.players')
resultBox = document.querySelector('.result-box')
wonText = resultBox.querySelector('.won-text')
replayBtn = resultBox.querySelector('button')

window.onload = () => { //once window loaded
	for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all available section's spans
		allBox[i].setAttribute("onclick", "clickedBox(this)")
		
	}

	selectXBtn.onclick = () => {
		selectBox.classList.add('hide') // hide the select-box on playerX button called
		playBoard.classList.add('show') // show playBoard
	}
	selectOBtn.onclick = () => {
		selectBox.classList.add('hide') 
		playBoard.classList.add('show')
		players.setAttribute("class", "players active player") // adding three className
	}
}

let playerXIcon = "fas fa-times"
let playerOIcon = "far fa-circle"
let playerSign = "X"
let runBot = true

// user click function
function clickedBox(element){
	// if player choose to be O
	if(players.classList.contains("player")) {
		element.innerHTML = `<i class="${playerOIcon}"></i>`
		players.classList.add("active")
		playerSign = 'O'
		element.setAttribute('id', playerSign)
	// if player choose to be X
	} else {
		element.innerHTML = `<i class="${playerXIcon}"></i>`
		players.classList.add("active")
		element.setAttribute('id', playerSign)
	}
	selectWinner()
	playBoard.style.pointerEvents = 'none' // user have to wait for bot to select
	element.style.pointerEvents = 'none' // once user select any box that box can't be selected again
	let randomDelayTime = ((Math.random() * 1000) + 200).toFixed()
	setTimeout(()=>{
		bot(runBot)
	}, randomDelayTime)
	
}

// bot click function
function bot(runbot) {
	if (runbot) {
		// change playerSign, counterpart of player's sign
		playerSign = 'O'
		let array = [] //create empty array, store unselected box index
		for (let i = 0; i < allBox.length; i++) {
			if (allBox[i].childElementCount === 0) { // once a box is clicked, will be inserted with an icon, which make it has a child
				array.push(i) // we find those not selected box and insert to the array
			}
		}
		let randomBox = array[Math.floor(Math.random() * array.length)]
		
		if (array.length > 0) {
			if (players.classList.contains('player')){
				allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
				players.classList.remove('active')
				// if player choose O 
				playerSign = 'X'
				allBox[randomBox].setAttribute('id', playerSign)
			} else {
				allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
				players.classList.remove('active')
				allBox[randomBox].setAttribute('id', playerSign)
			}
			selectWinner()
		}
		allBox[randomBox].style.pointerEvents = 'none' // player can't choose what robot choose
		playBoard.style.pointerEvents = 'auto'
		playerSign = 'X'
	}
}

// let work on select the winner
function getClass(idname){
	return document.querySelector('.box'+idname).id
}

function checkThreeClasses(val1, val2, val3, sign){
	if (getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign){
		return true
	}
}

function selectWinner(){
	if (checkThreeClasses(1,2,3,playerSign) || 
		checkThreeClasses(4,5,6,playerSign) || 
		checkThreeClasses(7,8,9,playerSign) || 
		checkThreeClasses(1,4,7,playerSign) ||
		checkThreeClasses(2,5,8,playerSign) ||
		checkThreeClasses(3,6,9,playerSign) ||
		checkThreeClasses(1,5,9,playerSign) ||
		checkThreeClasses(3,5,7,playerSign)
	) {
		console.log(playerSign+'is the winner')
		runBot = false
		// bot(runBot)
		setTimeout(()=>{
			playBoard.classList.remove('show')
			resultBox.classList.add('show')
		}, 700)

		wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
	} else { // the match is a draw
		if (getClass(1) !== "" &&
			getClass(2) !== "" && 
			getClass(3) !== "" &&
			getClass(4) !== "" && 
			getClass(5) !== "" && 
			getClass(6) !== "" &&
			getClass(7) !== "" && 
			getClass(8) !== "" &&
			getClass(9) !== ""
		) {
			runBot = false 
			setTimeout(()=>{
				playBoard.classList.remove('show')
				resultBox.classList.add('show')
			}, 700)

			wonText.textContent = `This is a draw`
		}
	}
}

replayBtn.onclick = () => {
	window.location.reload()
}
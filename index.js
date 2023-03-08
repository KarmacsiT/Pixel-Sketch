let isMouseDown;
let userColor;

window.onload = initializePage();

document.addEventListener("coloris:pick", (userColorPick) => {
	userColor = userColorPick.detail.color;
});

function initializePage() {
	let resizeButton =
		document.querySelector(".button-wrapper").firstElementChild;
	resizeButton.onclick = function () {
		getNewGridSize();
	};

	drawGrid();
}

function getNewGridSize() {
	let gridSize = prompt("Please enter your desired grid size!");
	const container = document.querySelector(".grid");
	container.replaceChildren();
	drawGrid(gridSize);
}

function drawGrid(gridSize = 16) {
	const container = document.querySelector(".grid");

	for (let i = 0; i < gridSize * gridSize; i++) {
		let block = document.createElement("div");

		block.classList.add("block");
		block.setAttribute("draggable", "false");

		block.addEventListener("mousemove", () => {
			checkCellColoringCondition(block);
		});
		block.addEventListener("mousedown", () => {
			isMouseDown = true;
		});
		block.addEventListener("mouseup", () => {
			isMouseDown = false;
		});
		block.addEventListener("drag", () => {
			isMouseDown = false;
		});
		container.addEventListener("mouseleave", () => {
			isMouseDown = false;
		});

		container.appendChild(block);
	}
	container.style.gridTemplateColumns = `repeat(${gridSize}, minmax(5px, 60px))`;
	container.style.gridTemplateRows = `repeat(${gridSize}, minmax(5px, 60px))`;
}

function checkCellColoringCondition(cell) {
	if (isMouseDown) {
		setUserCellColor(cell);
	}
}

function setUserCellColor(cell) {
	cell.style.backgroundColor = userColor;
}

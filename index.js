let mouseDown;
let userColor;
let eraserActive = false;

const moveEraserCursor = (e) => {
	const mouseY = e.clientY;
	const mouseX = e.clientX;
	const customCursor = document.getElementById("customCursor");

	customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.onload = initializePage();

document.addEventListener("coloris:pick", (userColorPick) => {
	userColor = userColorPick.detail.color;
	eraserActive = false;
});

function initializePage() {
	const eraserButton = document
		.querySelector(".button-wrapper")
		.children.item(0);
	const resizeButton = document
		.querySelector(".button-wrapper")
		.children.item(1);
	const clearButton = document
		.querySelector(".button-wrapper")
		.children.item(2);
	eraserButton.onclick = function () {
		eraserMode();
	};
	resizeButton.onclick = function () {
		getNewGridSize();
	};
	clearButton.onclick = function () {
		clearGrid();
	};

	window.addEventListener("mousemove", moveEraserCursor);

	drawGrid();
}

async function getNewGridSize() {
	const container = document.querySelector(".grid");

	const { value: gridSize } = await Swal.fire({
		title: "Resize Grid",
		background: "#40454A",
		color: "white",
		input: "text",
		inputLabel:
			"Enter a number between 0 and 100. You can only generate square grids.",
		confirmButtonText: "Resize!",
		buttonStyling: false,
		confirmButtonColor: "#f7d51d",
		customClass: {
			confirmButton: "eightbit-btn eightbit-btn--proceed",
		},
		showCloseButton: true,
		showClass: {
			popup: "animate__animated animate__fadeInDown",
		},
		hideClass: {
			popup: "animate__animated animate__fadeOutUp",
		},
		inputValidator: (value) => {
			if (!value) {
				return "You can't leave this field blank.";
			} else if (isNaN(value)) {
				return "You have to input a numeric value!";
			} else if (value < 0 || value > 100) {
				return "You have to input a value between 0 and 100!";
			}
		},
	});

	if (gridSize) {
		container.replaceChildren();
		drawGrid(gridSize);
	}
}

function drawGrid(gridSize = 16) {
	const grid = document.querySelector(".grid");

	for (let i = 0; i < gridSize * gridSize; i++) {
		let cell = document.createElement("div");

		cell.classList.add("cell");
		cell.setAttribute("draggable", "false");

		cell.addEventListener("mousemove", () => {
			checkCellColoringCondition(cell);
		});
		cell.addEventListener("mousedown", () => {
			mouseDown = true;
		});
		cell.addEventListener("mouseup", () => {
			mouseDown = false;
		});
		cell.addEventListener("drag", () => {
			mouseDown = false;
		});
		grid.addEventListener("mouseleave", () => {
			mouseDown = false;
		});

		grid.appendChild(cell);
	}
	grid.style.gridTemplateColumns = `repeat(${gridSize}, minmax(5px, 60px))`;
	grid.style.gridTemplateRows = `repeat(${gridSize}, minmax(5px, 60px))`;
}

function checkCellColoringCondition(cell) {
	if (mouseDown && !eraserActive) {
		setUserCellColor(cell);
	} else if (mouseDown && eraserActive) {
		eraseCellColor(cell);
	}
}

function setUserCellColor(cell) {
	cell.style.backgroundColor = userColor;
}

function eraserMode() {
	eraserActive = !eraserActive;
	if (eraserActive) {
		document.body.style.cursor = 'url("./cursor/eraser.cur"),auto';
	} else {
		document.body.style.cursor = "default";
	}
}

function eraseCellColor(cell) {
	cell.style.backgroundColor = "transparent";
}

function clearGrid() {
	const grid = document.querySelector(".grid");

	for (const cell of grid.childNodes) {
		cell.style.backgroundColor = "transparent";
	}
}

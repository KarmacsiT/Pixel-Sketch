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

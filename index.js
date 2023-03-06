let isMouseDown;

window.onload = drawGrid();

function drawGrid() {
	const container = document.querySelector(".grid");

	for (let i = 0; i < 256; i++) {
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

		container.appendChild(block);
	}
}

function checkCellColoringCondition(cell) {
	if (isMouseDown) {
		setUserCellColor(cell);
	}
}

function setUserCellColor(cell) {
	cell.style.backgroundColor = getUserSelectedColor();
}

function getUserSelectedColor() {
	return document.querySelector(".user-color").value;
}

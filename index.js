window.onload = drawGrid();

function drawGrid() {
	const container = document.querySelector(".grid");

	for (let i = 0; i < 256; i++) {
		let block = document.createElement("div");

		block.classList.add("block");
		block.addEventListener("mouseover", () => {
			setRandomCellColor(block);
		});

		container.appendChild(block);
	}
}

function setRandomCellColor(cell) {
	cell.style.backgroundColor = generateRandomColor();
}

function generateRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

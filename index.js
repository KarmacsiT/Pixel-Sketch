window.onload = drawGrid();

function drawGrid() {
	const container = document.querySelector(".grid");

	for (let i = 0; i < 256; i++) {
		let block = document.createElement("div");

		block.classList.add("block");
		container.appendChild(block);
	}
}

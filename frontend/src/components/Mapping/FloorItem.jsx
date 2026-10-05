import styles from "@styles/Mapping/ToolBar.module.css";
import { useEffect } from "react";
import { dictCharToColor, dictColorToChar } from "@constants/map";

export default function FloorItem(props) {
	useEffect(() => {
		setVars();
	}, []);

	let size = null;
	let color = null;

	let draw = false;

	let floors = [];

	let floorNumber = 0;

	let sizeEl = null;

	// const mapPlan = [
	//     [ // Floor 1
	//         ['P', 'W', 'E', 'P', 'P', 'P'],
	//         ['P', 'W', 'P', 'W', 'P', 'P'],
	//         ['P', 'W', 'P', 'W', 'S', 'P'],
	//         ['P', 'W', 'W', 'W', 'P', 'W'],
	//         ['P', 'P', 'P', 'P', 'P', 'W'],
	//         ['P', 'W', 'W', 'P', 'P', 'W'],
	//     ],  [ // Floor 2
	//         ['P', 'P', 'E', 'P', 'W', 'W'],
	//         ['P', 'W', 'W', 'P', 'P', 'W'],
	//         ['P', 'W', 'P', 'W', 'P', 'W'],
	//         ['P', 'W', 'W', 'P', 'P', 'W'],
	//         ['P', 'W', 'P', 'W', 'P', 'P'],
	//         ['P', 'W', 'W', 'P', 'P', 'P'],
	//     ], [ // Floor 3
	//         ['P', 'P', 'E', 'P', 'P', 'W'],
	//         ['P', 'W', 'W', 'W', 'P', 'W'],
	//         ['P', 'W', 'X', 'W', 'W', 'W'],
	//         ['P', 'W', 'P', 'W', 'P', 'P'],
	//         ['P', 'P', 'P', 'P', 'P', 'P'],
	//         ['P', 'W', 'W', 'W', 'P', 'P'],
	//     ]];

	let mapPlan = null;

	let container = null;

	let main = null;

	function setVars() {
		main = document.getElementById("test");
		console.log(main);

		container = document.querySelector(".cont");
		console.log(container);

		sizeEl = document.querySelector(".size");

		console.log(sizeEl.value);
		size = sizeEl.value;

		mapPlan = props.mapPlan;

		const colorEl = document.querySelector(".color");
		color = colorEl.value;

		const resetBtn = document.querySelector(".btnReset");
		const saveBtn = document.querySelector(".btnSave");

		const setStart = document.querySelector(".btnStart");
		const setWall = document.querySelector(".btnWall");
		const setEnd = document.querySelector(".btnEnd");
		const setElevator = document.querySelector(".btnElevator");
		const erase = document.querySelector(".btnErase");

		window.addEventListener("mousedown", function () {
			draw = true;
		});
		window.addEventListener("mouseup", function () {
			draw = false;
		});

		if (!resetBtn) {
			console.log("failed");
		} else {
			console.log("succ -----------------------------------");
		}
		resetBtn.addEventListener("click", reset);

		saveBtn.addEventListener("click", saveToDB);

		setWall.addEventListener("click", function () {
			setColor("#000000");
		});
		setStart.addEventListener("click", function () {
			setColor("#ff0000");
		});
		setEnd.addEventListener("click", function () {
			setColor("#0000ff");
		});
		setElevator.addEventListener("click", function () {
			setColor("#ff00ff");
		});
		erase.addEventListener("click", function () {
			setColor("#ffffff");
		});

		sizeEl.addEventListener("keyup", function () {
			size = sizeEl.value;
			reset();
		});

		load(mapPlan);
	}

	function load(mapPlan) {
		console.log(mapPlan);

		let floorCount = 0;

		mapPlan.forEach(() => {
			floors[floorCount] = "Floor: " + floorCount;

			floorCount++;
		});

		var floorSel = document.getElementById("floors");

		for (var floor in floors) {
			floorSel.options[floorSel.options.length] = new Option(
				floor,
				floor
			);
		}

		floorSel.onchange = function () {
			saveFloor(floorNumber);
			loadFloor(mapPlan[this.value]);
			sizeEl.value = mapPlan[this.value].length;
			floorNumber = this.value;
		};

		loadFloor(mapPlan[0]);
	}

	function loadFloor(floor) {
		let rowCount = 0;

		const divContainerExists = document.getElementById("container");
		let divContainer;

		if (!divContainerExists) {
			divContainer = document.createElement("div");

			divContainer.classList = styles.container;
		} else {
			divContainer = divContainerExists;

			divContainer.replaceChildren();
		}

		console.log(divContainer);

		floor.forEach((row) => {
			let colCount = 0;

			row.forEach((char) => {
				const divChar = document.createElement("div");

				divChar.classList = char;
				divChar.style.background = dictCharToColor[char];

				divChar.id = "row:" + rowCount + " col:" + colCount;

				divChar.addEventListener("mouseover", function () {
					if (!draw) return;
					divChar.style.backgroundColor = color;
					divChar.classList = dictColorToChar[color];
				});
				divChar.addEventListener("mousedown", function () {
					divChar.style.backgroundColor = color;
					divChar.classList = dictColorToChar[color];
				});

				divContainer.appendChild(divChar);
				container.appendChild(divContainer);

				colCount++;
			});

			rowCount++;

			divContainer.style.setProperty("--size", rowCount);
		});
	}

	function saveFloor(floor) {
		mapPlan[floor] = save();
		console.log(mapPlan);
	}

	function populate(size) {
		let row = 0;
		let col = 0;

		const divContainerExists = document.getElementById("container");
		let divContainer;

		if (!divContainerExists) {
			divContainer = document.createElement("div");

			divContainer.classList = "container";
		} else {
			divContainer = divContainerExists;

			divContainer.replaceChildren();
		}

		divContainer.style.setProperty("--size", size);

		for (let i = 0; i < size * size; i++) {
			const div = document.createElement("div");
			// div.classList.add('pixel')

			div.style.backgroundColor = "#ffffff";
			div.classList = dictColorToChar["#ffffff"];

			if (col == size) {
				col = 0;
				row++;
			}

			div.id = "row:" + row + " col:" + col;

			div.addEventListener("mouseover", function () {
				if (!draw) return;
				div.style.backgroundColor = color;
				div.classList = dictColorToChar[color];
			});
			div.addEventListener("mousedown", function () {
				div.style.backgroundColor = color;
				div.classList = dictColorToChar[color];
			});

			divContainer.appendChild(div);
			container.appendChild(divContainer);

			col++;
		}
		console.log(divContainer);
	}

	function reset() {
		container.innerHTML = "";
		populate(sizeEl.value);
	}

	function saveToDB() {
		saveFloor(floorNumber);
		alert("Saving...");
		props.save(mapPlan);
	}

	function save() {
		size = sizeEl.value;

		console.log(size);

		const big_array = [];

		for (let i = 0; i < size; i++) {
			const small_array = [];
			for (let e = 0; e < size; e++) {
				const div = document.getElementById("row:" + i + " col:" + e);
				if (div.style.backgroundColor) small_array[e] = div.className;
			}

			big_array[i] = small_array;
		}

		console.log(big_array);
		console.log(mapPlan);
		return big_array;
	}

	function setColor(color2) {
		console.log(color2);
		color = color2;
	}
}

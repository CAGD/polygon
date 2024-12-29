let rotationAngleX = 0; // X-axis rotation (pitch)
let rotationAngleY = 0; // Y-axis rotation (yaw)
let rotationAngleZ = 0; // Z-axis rotation (spin)
let zoomFactor = 1; // Default zoom level
let maxDepth = 2; // Recursion depth
let hexagonColors = []; // Store precomputed colors
let hexagonCounter = 0; // Global counter for hexagons

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // Enable 3D rendering
	noFill();
	strokeWeight(1);
	precomputeColors(); // Precompute colors for the hexagons
	// Extract the CSS variable
	const cssVariable = getComputedStyle(document.documentElement)
		.getPropertyValue("--hexaflake-color")
		.trim();
	// Parse the RGB values (no alpha present)
	[r, g, b, a] = parseHexColor(cssVariable);

	// Automatically update the recursion depth every 2 seconds
	setInterval(() => {
		maxDepth = ((maxDepth + 1) % 3) + 1; // Cycle depth from 1 to 3
	}, 20000);
}

function parseHexColor(hex) {
	// Remove the "#" if present
	hex = hex.replace("#", "");

	if (hex.length === 3) {
		// Expand short-hand (#abc => #aabbcc)
		hex = hex
			.split("")
			.map((char) => char + char)
			.join("");
	}

	if (hex.length === 6) {
		// Add default alpha if not provided
		hex += "ff"; // Fully opaque
	}

	if (hex.length === 8) {
		// Parse the hex string
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		const a = parseInt(hex.substring(6, 8), 16) / 255; // Convert alpha to 0-1
		return [r, g, b, a];
	}

	throw new Error(`Invalid hex color: ${hex}`);
}

function draw() {
	// background(38); // Match page background color (#262626)
	clear();
	// Adjust rotation for slow spinning
	rotationAngleZ += 0.0005; // Slow automatic rotation along Y-axis

	// Adjust pitch and yaw based on mouse
	let pitch = map(mouseY, 0, height, PI / 4, -PI / 4);
	let yaw = map(mouseX, 0, width, -PI / 4, PI / 4);

	// Translate Hexaflake's center to align with "Polygon"
	const xOffset = width / 10; // Convert top-left offset to WEBGL center
	const yOffset = -90; // Convert top-left offset to WEBGL center
	const zOffset = 0; // No Z offset

	translate(xOffset, yOffset, 0);

	// Apply 3D transformations
	rotateX(pitch); // Mouse controls pitch
	rotateY(yaw); // Combine slow spin with mouse yaw
	rotateZ(rotationAngleZ); // Combine slow spin with mouse yaw
	zoomFactor = Math.pow(1.3, maxDepth);
	scale(zoomFactor);

	// Reset counter and draw Hexaflake
	hexagonCounter = 0;
	drawHexaflake(0, 0, min(width, height) / 3, maxDepth);
}

function drawHexaflake(x, y, size, depth) {
	if (depth === 0) {
		drawHexagon(x, y, size);
		return;
	}

	let newSize = size / 3;
	let offsets = [
		{ dx: 0, dy: 0 }, // Center
		{ dx: -2 * newSize, dy: 0 }, // Left
		{ dx: 2 * newSize, dy: 0 }, // Right
		{ dx: -newSize, dy: -newSize * sqrt(3) }, // Top Left
		{ dx: newSize, dy: -newSize * sqrt(3) }, // Top Right
		{ dx: -newSize, dy: newSize * sqrt(3) }, // Bottom Left
		{ dx: newSize, dy: newSize * sqrt(3) }, // Bottom Right
	];

	offsets.forEach((offset) => {
		push();
		translate(offset.dx, offset.dy, 0);
		drawHexaflake(x, y, newSize, depth - 1);
		pop();
	});
}

function drawHexagon(x, y, size) {
	stroke(r, g, b, hexagonColors[hexagonCounter % hexagonColors.length]); // Cycle through colors
	hexagonCounter++;

	beginShape();
	for (let i = 0; i < 6; i++) {
		let angle = (TWO_PI / 6) * i;
		let xOffset = cos(angle) * size;
		let yOffset = sin(angle) * size;
		vertex(x + xOffset, y + yOffset);
	}
	endShape(CLOSE);
}

// Helper function to detect if the mouse is over an HTML element
function mouseIsOverHTMLElement() {
	return document.querySelector(":hover") !== canvas.elt;
}

function precomputeColors() {
	hexagonColors = []; // Clear previous colors
	for (let i = 0; i < 400; i++) {
		let c = random(10, 50);
		hexagonColors.push(c); // Store precomputed colors
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

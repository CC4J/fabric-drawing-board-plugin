# fabric-drawing-board

- Just simple drawing board lib by fabric

- repo: https://github.com/CC4J/fabric-drawing-board-plugin

# Install

```js
npm i --save fabric-drawing-board
```

# How to use

Prepare your canvas element

```html
<div style="width: 1000px;height: 600px">
	<!-- fabric-drawing-board automatically set the width and height of the canvas to the width and height of the canvas parent node -->
	<canvas id="myCanvasId"></canvas>
</div>
```

```js
import FabricDrawingBoard from "fabric-drawing-board";

const fdb = new FabricDrawingBoard({ canvasId: "myCanvasId" });
```

# Demo

- https://github.com/CC4J/fabric-drawing-board-plugin-demo

or

- clone this repo
- npm install
- npm run serve
- open localhost:8080

# APIs

## init

```js
const fdb = new FabricDrawingBoard({ canvasId: "myCanvasId" });

// or pass more params

const fdb = new FabricDrawingBoard({
	canvasId: "myCanvasId", // canvas element id, Required
	brushColor: "rgb(0, 0, 0)", // free draw color
	strokeColor: "rgb(0, 0, 0)", // stroke color of line, rect, circle, text
	fillColor: "rgba(0, 0, 0, 0)", // fill color of rect, circle
	bgColor: "rgba(0, 0, 0, 0)", // background color of canvas
	brushSize: 4, // free draw width
	strokeSize: 4, // stroke width of line, rect, circle
	eraserSize: 4, // eraser width
	fontSize: 18, // font size of text
});
```

## getFabric()

```js
// return fabric
const fabric = fdb.getFabric();
```

## getFabricCanvas()

```js
// return new fabric.Canvas()
const fabric_canvas = fdb.getFabricCanvas();
```

## setBrushColor()

```js
// set free draw color
fdb.setBrushColor("#000");
fdb.setBrushColor("rgb(0,0,0)");
fdb.setBrushColor("black");
```

## setStrokeColor()

```js
// set line, rect, circle, text stroke coloe
fdb.setStrokeColor("#000");
fdb.setStrokeColor("rgb(0,0,0)");
fdb.setStrokeColor("black");
```

## setFillColor()

```js
// set rect, circle fill color
fdb.setFillColor("#000");
fdb.setFillColor("rgb(0,0,0)");
fdb.setFillColor("rgba(0,0,0,0)");
fdb.setFillColor("black");
```

## setBgColor()

```js
// set canvas background color
fdb.setBgColor("#000");
fdb.setBgColor("rgb(0,0,0)");
fdb.setBgColor("rgba(0,0,0,0)");
fdb.setBgColor("black");
```

## setBrushSize()

```js
// set free draw width
fdb.setBrushSize(4);
```

## setEraserSize()

```js
// set eraser width
fdb.setEraserSize(4);
```

## setStrokeSize()

```js
// set line, rect, circle stroke width
fdb.setStrokeSize(4);
```

## setFontSize()

```js
// set text font size
fdb.setFontSize(18);
```

## drawBrush()

```js
// draw freely on canvas
fdb.drawBrush();
```

## drawLine()

```js
// mouse to draw line freely on canvas
fdb.drawLine();
```

## drawRect()

```js
// use mouse to draw rect freely on canvas
fdb.drawRect();
```

## drawCircle()

```js
// use mouse to draw circle freely on canvas
fdb.drawCircle();
```

## drawText()

```js
// input everything on canvas
fdb.drawText();
```

## useEraser()

```js
// use mouse to erasing anything on canvas
fdb.useEraser();
```

## useMove()

```js
// use mouse to move canvas
fdb.useMove();
```

## canvasZoomUp()

```js
// enlarge canvas
fdb.canvasZoomUp();
```

## canvasZoomDown()

```js
// zoom out the canvas
fdb.canvasZoomDown();
```

## canvasUndo()

```js
// undo the current operation
fdb.canvasUndo();
```

## canvasRedo()

```js
// restore current operation
fdb.canvasRedo();
```

## canvasClear()

```js
// empty canvas
fdb.canvasClear();
```

## canvasExport()

```js
// export canvas to base64 data
fdb.canvasExport((data) => {
	// save to local or upload here
});
```

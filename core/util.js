import { ACTION_BRUSH, ACTION_LINE, ACTION_RECT, ACTION_CIRCLE, ACTION_TEXT, ACTION_ERASER, ACTION_MOVE } from '../util/const'

export function utilMixin (DrawingBoard) {
	// draw brush
	DrawingBoard.prototype.drawBrush = function () {
		if (this._curAction == ACTION_BRUSH) return
		this._curAction = ACTION_BRUSH
		resetCanvas(this)

		// 设置绘画模式画笔类型为 铅笔类型
		this._fcvs.freeDrawingBrush = new this._fabric.PencilBrush(this._fcvs)
		// 设置画布模式为绘画模式
		this._fcvs.isDrawingMode = true
		// 设置绘画模式 画笔颜色与画笔线条大小
		this._fcvs.freeDrawingBrush.color = this._brushColor
		this._fcvs.freeDrawingBrush.width = this._brushSize
	}
	// draw line
	DrawingBoard.prototype.drawLine = function () {
		if (this._curAction == ACTION_LINE) return
		this._curAction = ACTION_LINE
		resetCanvas(this)
	}
	// draw rect
	DrawingBoard.prototype.drawRect = function () {
		if (this._curAction == ACTION_RECT) return
		this._curAction = ACTION_RECT
		resetCanvas(this)
	}
	// draw circle
	DrawingBoard.prototype.drawCircle = function () {
		if (this._curAction == ACTION_CIRCLE) return
		this._curAction = ACTION_CIRCLE
		resetCanvas(this)
	}
	// draw text
	DrawingBoard.prototype.drawText = function () {
		if (this._curAction == ACTION_TEXT) return
		this._curAction = ACTION_TEXT
		resetCanvas(this)
	}
	// use eraser
	DrawingBoard.prototype.useEraser = function () {
		if (this._curAction == ACTION_ERASER) return
		this._curAction = ACTION_ERASER
		resetCanvas(this)
		this._fcvs.freeDrawingBrush = new this._fabric.EraserBrush(this._fcvs);
		this._fcvs.freeDrawingBrush.width = this._eraserSize;
		this._fcvs.isDrawingMode = true;
	}
	// use move
	DrawingBoard.prototype.useMove = function () {
		if (this._curAction == ACTION_MOVE) return
		this._curAction = ACTION_MOVE
		resetCanvas(this)
	}
	// use zoom up
	DrawingBoard.prototype.canvasZoomUp = function () {
		zoomCanvas(this, 1)
	}
	// use zoom down
	DrawingBoard.prototype.canvasZoomDown = function () {
		zoomCanvas(this, -1)
	}
	// use undo
	DrawingBoard.prototype.canvasUndo = function () {
		const fdb = this
	}
	// use redo 
	DrawingBoard.prototype.canvasRedo = function () {
		const fdb = this
	}
	// use clear 
	DrawingBoard.prototype.canvasClear = function () {
		const fdb = this
	}
	// use save
	DrawingBoard.prototype.canvasExport = function () {
		const fdb = this
	}
}

function resetCanvas (fdb) {
	// something need reset when use brush line rect circle text eraser move
	
	// 禁用画笔模式
	fdb._fcvs.isDrawingMode = false;
	// 禁止图形选择编辑
	let drawObjects = fdb._fcvs.getObjects();
	if (drawObjects.length > 0) {
		drawObjects.map((item) => {
			item.set("selectable", false);
		});
	}
}

function zoomCanvas (fdb, flag) {
	// flag -1 缩小 1 放大
	let zoom = fdb._fcvs.getZoom();
	if (flag > 0) {
		// 放大
		zoom *= 1.1;
	} else {
		// 缩小
		zoom *= 0.9;
	}
	// zoom 不能大于 20 不能小于0.01
	zoom = zoom > 20 ? 20 : zoom;
	zoom = zoom < 0.01 ? 0.01 : zoom;
	fdb._fcvs.setZoom(zoom);
}
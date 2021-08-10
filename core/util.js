import { ACTION_BRUSH, ACTION_LINE, ACTION_RECT, ACTION_CIRCLE, ACTION_TEXT, ACTION_ERASER, ACTION_MOVE } from '../util/const'
import { resetTmpText } from '../util/handlerText'

export function utilMixin (DrawingBoard) {
	// draw brush
	DrawingBoard.prototype.drawBrush = function () {
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
		this._curAction = ACTION_LINE
		resetCanvas(this)
	}
	// draw rect
	DrawingBoard.prototype.drawRect = function () {
		this._curAction = ACTION_RECT
		resetCanvas(this)
	}
	// draw circle
	DrawingBoard.prototype.drawCircle = function () {
		this._curAction = ACTION_CIRCLE
		resetCanvas(this)
	}
	// draw text
	DrawingBoard.prototype.drawText = function () {
		this._curAction = ACTION_TEXT
		resetCanvas(this)
	}
	// use eraser
	DrawingBoard.prototype.useEraser = function () {
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
		changeCanvasHistory(this, -1)
	}
	// use redo 
	DrawingBoard.prototype.canvasRedo = function () {
		changeCanvasHistory(this, 1)
	}
	// use clear 
	DrawingBoard.prototype.canvasClear = function () {
		let children = this._fcvs.getObjects()
		if (children.length > 0) {
			this._fcvs.remove(...children)
		}
	}
	// use save
	DrawingBoard.prototype.canvasExport = function (callback) {
		// 判断是否存在 临时文字对象
		if (this._tmpText) {
			resetTmpText(this)
		}
		const fdb = this
		fdb._fcvs.clone(cvs => {
			//遍历所有对对象，获取最小坐标，最大坐标
			let top = 0
			let left = 0
			let width = fdb._fcvs.width
			let height = fdb._fcvs.height

			var objects = cvs.getObjects();
			if(objects.length > 0 ){
				var rect = objects[0].getBoundingRect();
				var minX = rect.left;
				var minY = rect.top;
				var maxX = rect.left + rect.width;
				var maxY = rect.top + rect.height;
				for(var i = 1; i<objects.length; i++){
					rect = objects[i].getBoundingRect();
					minX = Math.min(minX, rect.left);
					minY= Math.min(minY, rect.top);
					maxX = Math.max(maxX, rect.left + rect.width);
					maxY= Math.max(maxY, rect.top + rect.height);
				}
				top = minY - 100
				left = minX - 100
				width = maxX - minX + 200
				height = maxY - minY + 200
				cvs.sendToBack(new fdb._fabric.Rect({
					left,
					top,
					width,
					height,
					stroke: 'rgba(0,0,0,0)',
					fill: fdb._bgColor,
					strokeWidth: 0
				}))
			}
			const dataURL = cvs.toDataURL({
				format: 'png',
				multiplier: cvs.getZoom(),
				left,
				top,
				width,
				height
			});
			if (callback) {
				callback(dataURL)
			}
		})
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

function changeCanvasHistory (fdb, flag) {
	fdb._isEditHistory = true
	let historyIdx = fdb._historyIdx + flag
	// 判断是否已经到了第一步操作
	if (historyIdx < 0) return;
	// 判断是否已经到了最后一步操作
	if (historyIdx >= fdb._historyArr.length) return;
	// 如果退回到了第0步，则要清空历史数组的其余项，画布从头开始
	if (historyIdx == 0) {
		fdb._historyArr = [fdb._historyArr[historyIdx]]
		fdb._fcvs.loadFromJSON(fdb._historyArr[historyIdx])
		fdb._historyIdx = historyIdx
		return;
	}
	// 没有退回到第0项
	if (fdb._historyArr[historyIdx]) {
		fdb._fcvs.loadFromJSON(fdb._historyArr[historyIdx])
		if (fdb._fcvs.getObjects().length > 0) {
			fdb._fcvs.getObjects().forEach(item => {
				item.set('selectable', false)
			})
		}
		fdb._historyIdx = historyIdx
	}
}
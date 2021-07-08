import { ACTION_BRUSH } from '../util/const'

export function stateMixin (DrawingBoard) {
	
	DrawingBoard.prototype.getFabric = function () {
		return this._fabric
	}
	
	DrawingBoard.prototype.getFabricCanvas = function () {
		return this.__fcvs
	}

	DrawingBoard.prototype.setBrushColor = function (color) {
		this._brushColor = color
		if (this._curAction == ACTION_BRUSH) {
			this._fcvs.freeDrawingBrush.color = this._brushColor
		}
	}

	DrawingBoard.prototype.setStrokeColor = function (color) {
		this._strokeColor = color
	}

	DrawingBoard.prototype.setFillColor = function (color) {
		this._fillColor = color
	}

	DrawingBoard.prototype.setBgColor = function (color) {
		this._bgColor = color
		if (this._fcvs && this._fcvs.setBackgroundColor) {
			this._fcvs.setBackgroundColor(this._bgColor, undefined, {
        erasable: false,
      });
      this._fcvs.renderAll();
		}
	}

	DrawingBoard.prototype.setBrushSize = function (size) {
		this._brushSize = parseInt(size, 10)
	}
	DrawingBoard.prototype.setEraserSize = function (size) {
		this._eraserSize = parseInt(size, 10)
	}

	DrawingBoard.prototype.setStrokeSize = function (size) {
		this._strokeSize = parseInt(size, 10)
	}

	DrawingBoard.prototype.setFontSize = function (size) {
		this._fontSize = parseInt(size, 10)
	}
}
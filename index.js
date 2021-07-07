import { fabric } from "fabric";
import './lib/eraser_brush.mixin'

import { initMixin } from './core/init'
import { stateMixin } from './core/state'

function DrawingBoard (options) {
	this._init(options)
}

DrawingBoard.prototype._fabric = fabric

initMixin(DrawingBoard)
stateMixin(DrawingBoard)

export default DrawingBoard
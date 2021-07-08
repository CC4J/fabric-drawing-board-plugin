import { fabric } from "fabric";
import initFabricEraserPlugin from './lib/eraser_brush.mixin'

initFabricEraserPlugin(fabric)

import { initMixin } from './core/init'
import { stateMixin } from './core/state'
import { utilMixin } from './core/util'
import { eventMixin } from './core/event'

function DrawingBoard (options) {
	this._init(options)
	this._bindEvent()
}

DrawingBoard.prototype._fabric = fabric

initMixin(DrawingBoard)
stateMixin(DrawingBoard)
utilMixin(DrawingBoard)
eventMixin(DrawingBoard)

export default DrawingBoard
import { STROKE_COLOR, FILL_COLOR, STROKE_SIZE, FONT_SIZE } from '../util/const'

export function initMixin (DrawingBoard) {
	// 初始化参数
	DrawingBoard.prototype._init = function (options) {
		const fdb = this
		
		fdb._fcvs = null // fabric canvas 对象
		fdb._curAction = null // 当前操作类型
		fdb._mouseFrom = {x: 0, y: 0} // 鼠标操作开始点
		fdb._mouseTo = {x: 0, y: 0} // 鼠标操作结束点

		fdb._canvasId = options.canvasId || '' // canvasId
		
		fdb._brushColor = options.brushColor || STROKE_COLOR // 画笔颜色
		fdb._strokeColor = options.strokeColor || STROKE_COLOR // 线条颜色
		fdb._fillColor = options.fillColor || FILL_COLOR // 填充色
		fdb._bgColor = options._bgColor || FILL_COLOR // 背景色

		fdb._brushSize = options.brushSize || STROKE_SIZE // 画笔大小
		fdb._strokeSize = options.strokeSize || STROKE_SIZE // 线条大小
		fdb._eraserSize = options.eraserSize || STROKE_SIZE // 橡皮大小
		fdb._fontSize = options.fontSize || FONT_SIZE // 文字大小

		if (!options.canvasId) {
			throw new Error('you need to pass in a canvasId to constructed function')
		}
		let canvasEl = document.getElementById(fdb._canvasId)
		if (!canvasEl) {
			throw new Error('you need to pass in a valid canvasId to constructed function')
		}else {
			// 动态设置canvas画布的宽高
			canvasEl.width = canvasEl.parentNode.offsetWidth
			canvasEl.height = canvasEl.parentNode.offsetHeight
		}
		// 初始化 fabric canvas
		fdb._fcvs = new fdb._fabric.Canvas(fdb._canvasId)
		// 设置画布背景色不受缩放与平移的影响
		fdb._fcvs.set('backgroundVpt', false)
		// 禁止用户进行组选择
		fdb._fcvs.selection = false
		// 设置鼠标悬浮在绘图上的样式
		fdb._fcvs.hoverCursor = 'default'
		// 设置画布背景色
		fdb.setBgColor(this._bgColor)
	}
}
import { ACTION_LINE, ACTION_RECT, ACTION_CIRCLE, ACTION_TEXT, ACTION_MOVE } from '../util/const'
import { initText, initLine, initRect, initCircle, initMove } from './handler'
import { resetTmpText } from '../util/handlerText'

export function eventMixin (DrawingBoard) {
	DrawingBoard.prototype._bindEvent = function () {
		mouseDown(this)
		mouseMove(this)
		mouseUp(this)
		afterRender(this)
	}
}

function mouseDown (fdb) {
	fdb._fcvs.on('mouse:down', options => {
		// 如果存在临时绘制的文字对象，在操作前，需要让文字退出编辑模式
		if (fdb._curAction != ACTION_TEXT && fdb._tmpText) {
			resetTmpText(fdb)
		}
		let mouse_action_arr = [ACTION_LINE, ACTION_RECT, ACTION_CIRCLE, ACTION_TEXT, ACTION_MOVE]
		if (mouse_action_arr.indexOf(fdb._curAction) >= 0) {
			// 记录当前鼠标的起点坐标 (减去画布在 x y轴的偏移，因为画布左上角坐标不一定在浏览器的窗口左上角)
			fdb._mouseFrom.x = options.e.clientX - fdb._fcvs._offset.left;
			fdb._mouseFrom.y = options.e.clientY - fdb._fcvs._offset.top;
		
			if (fdb._curAction == ACTION_TEXT) { 
				// 绘制文本只需要一个坐标点
				initText(fdb)
			}else {
				fdb._beginMouseDoing = true
			}
		}
	})
}

function mouseMove (fdb) {
	// 监听鼠标移动事件
	fdb._fcvs.on("mouse:move", (options) => {
		if (fdb._beginMouseDoing) {
			// 记录当前鼠标移动终点坐标 (减去画布在 x y轴的偏移，因为画布左上角坐标不一定在浏览器的窗口左上角)
			fdb._mouseTo.x = options.e.clientX - fdb._fcvs._offset.left
			fdb._mouseTo.y = options.e.clientY - fdb._fcvs._offset.top
			switch (fdb._curAction) {
				case ACTION_LINE:
					// 当前绘制直线，初始化直线绘制
					initLine(fdb);
					break;
				case ACTION_RECT:
					// 初始化 矩形绘制
					initRect(fdb);
					break;
				case ACTION_CIRCLE:
					// 初始化 绘制圆形
					initCircle(fdb);
					break;
				case ACTION_MOVE:
					// 初始化画布移动
					initMove(fdb);
			}
		}
	});
}

function mouseUp (fdb) {
	// 监听鼠标松开事件
	fdb._fcvs.on("mouse:up", () => {
		let handler_action_arr = [ACTION_LINE, ACTION_RECT, ACTION_CIRCLE, ACTION_MOVE]
		if (handler_action_arr.indexOf(fdb._curAction) >= 0) {
			// 清空鼠标移动时保存的临时绘图对象
			fdb._tmpDrawingObj = null;
			// 结束鼠标操作
			fdb._beginMouseDoing = false
			// 清空鼠标保存记录
			fdb._mouseFrom = {x: 0, y: 0}
      fdb._mouseTo = {x: 0, y: 0}
			// 如果当前进行的是移动操作，鼠标松开重置当前视口缩放系数
			if (fdb._curAction == ACTION_MOVE) {
				fdb._fcvs.setViewportTransform(fdb._fcvs.viewportTransform);
			}
		}
	})
}

function afterRender (fdb) {
	// 监听画布渲染完成
	fdb._fcvs.on("after:render", () => {
		if (!fdb._isEditHistory) {
			// 当前不是进行撤销或重做操作

			// 在绘画时会频繁触发该回调，所以间隔0.1s记录当前状态,文字输入断断续续，所以当前输入的是文字时，间隔2s进行保存
			if (fdb._drawingTimer) {
				clearTimeout(fdb._drawingTimer)
				fdb._drawingTimer = null
			}
			fdb._drawingTimer = setTimeout(() => {
				// 如果当前索引位置在0，则覆盖掉索引0之后的内容
				if (fdb._historyIdx == 0) {
					fdb._historyArr = [fdb._historyArr[0]]
				}
				fdb._historyArr.push(JSON.stringify(fdb._fcvs))
				fdb._historyIdx++
			}, fdb._curAction != ACTION_TEXT ? 100 : 2000)
		}else {
			// 当前正在执行撤销或重做操作，不记录重新绘制的画布
			fdb._isEditHistory = false
		}
	})
}
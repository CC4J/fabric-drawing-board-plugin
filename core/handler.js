import { getTransformedPosX, getTransformedPosY } from '../util/transformedPos'
import { resetTmpText } from '../util/handlerText'

export function initText (fdb) {
	if (!fdb._tmpText) {
		// 创建文本对象
		fdb._tmpText = new fdb._fabric.Textbox("", {
			left: getTransformedPosX(fdb._fcvs, fdb._mouseFrom.x),
			top: getTransformedPosY(fdb._fcvs, fdb._mouseFrom.y),
			fontSize: fdb._fontSize,
			fill: fdb._strokeColor,
			hasControls: false,
			editable: true,
			width: 30,
			backgroundColor: fdb._textEditBgColor,
			selectable: false,
		});

		fdb._fcvs.add(fdb._tmpText);
		// 文本打开编辑模式
		fdb._tmpText.enterEditing();
		// 文本编辑框获取焦点
		fdb._tmpText.hiddenTextarea.focus();
	}else {
		// 将当前文本对象退出编辑模式
		resetTmpText(fdb)
	}
	
}

function drawing (fdb, drawObj) {
	// 禁止用户选择当前正在绘制的图形
	drawObj.selectable = false
	// 如果当前图形已绘制，清除上一次绘制的图形
	if (fdb._tmpDrawingObj) {
		fdb._fcvs.remove(fdb._tmpDrawingObj)
	}
	// 将绘制对象添加到 canvas中
	fdb._fcvs.add(drawObj)
	// 保存当前绘制的图形
	fdb._tmpDrawingObj = drawObj
}

export function initLine (fdb) {
	// 根据保存的鼠标起始点坐标 创建直线对象
	drawing(
		fdb,
		new fdb._fabric.Line(
			[
				getTransformedPosX(fdb._fcvs, fdb._mouseFrom.x),
				getTransformedPosY(fdb._fcvs, fdb._mouseFrom.y),
				getTransformedPosX(fdb._fcvs, fdb._mouseTo.x),
				getTransformedPosY(fdb._fcvs, fdb._mouseTo.y),
			],
			{
				fill: fdb._fillColor,
				stroke: fdb._strokeColor,
				strokeWidth: fdb._strokeSize,
			}
		)
	)
}

export function initRect (fdb) {
	// 计算矩形长宽
	let left = fdb._mouseTo.x > fdb._mouseFrom.x ? getTransformedPosX(fdb._fcvs, fdb._mouseFrom.x) : getTransformedPosX(fdb._fcvs, fdb._mouseTo.x)
	let top = fdb._mouseTo.y > fdb._mouseFrom.y ? getTransformedPosY(fdb._fcvs, fdb._mouseFrom.y) : getTransformedPosY(fdb._fcvs, fdb._mouseTo.y)
	let width = Math.abs(fdb._mouseTo.x - fdb._mouseFrom.x)
	let height = Math.abs(fdb._mouseTo.y - fdb._mouseFrom.y)
	// 绘制矩形
	drawing(
		fdb,
		new fabric.Rect({
			left: left,
			top: top,
			width: width,
			height: height,
			stroke: fdb._strokeColor,
			fill: fdb._fillColor,
			strokeWidth: fdb._strokeSize,
		})
	)
}

export function initCircle (fdb) {
	// 绘制椭圆
	// 坐标
	let left = fdb._mouseFrom.x < fdb._mouseTo.x ? getTransformedPosX(fdb._fcvs, fdb._mouseFrom.x) : getTransformedPosX(fdb._fcvs, fdb._mouseTo.x)
	let top = fdb._mouseFrom.y < fdb._mouseTo.y ? getTransformedPosY(fdb._fcvs, fdb._mouseFrom.y) : getTransformedPosX(fdb._fcvs, fdb._mouseTo.y)

	// 水平半径与垂直半径
	let rx = Math.abs(fdb._mouseTo.x - fdb._mouseFrom.x) / 2
	let ry = Math.abs(fdb._mouseTo.y - fdb._mouseFrom.y) / 2

	drawing(
		fdb,
		new fdb._fabric.Ellipse({
			left: left,
			top: top,
			stroke: fdb._strokeColor,
			fill: fdb._fillColor,
			strokeWidth: fdb._strokeSize,
			rx: rx,
			ry: ry
		})
	)
	
	// 绘制正圆
	// let left = getTransformedPosX(fdb._fcvs, fdb._mouseFrom.x);
	// let top = getTransformedPosY(fdb._fcvs, fdb._mouseFrom.y);
	// // 计算圆形半径
	// let radius =
	// 	Math.sqrt(
	// 		(getTransformedPosX(fdb._fcvs, fdb._mouseTo.x) - left) *
	// 			(getTransformedPosY(fdb._fcvs, fdb._mouseTo.x) - left) +
	// 			(getTransformedPosX(fdb._fcvs, fdb._mouseTo.y) - top) *
	// 				(getTransformedPosY(fdb._fcvs, fdb._mouseTo.y) - top)
	// 	) / 2
	// // 绘制圆形对象
	// drawing(
	// 	fdb,
	// 	new fdb._fabric.Circle({
	// 		left: left,
	// 		top: top,
	// 		stroke: fdb._strokeColor,
	// 		fill: fdb._fillColor,
	// 		radius: radius,
	// 		strokeWidth: fdb._strokeSize,
	// 	})
	// )
}

export function initMove (fdb) {
	var vpt = fdb._fcvs.viewportTransform;
	vpt[4] += fdb._mouseTo.x - fdb._mouseFrom.x;
	vpt[5] += fdb._mouseTo.y - fdb._mouseFrom.y;
	fdb._fcvs.requestRenderAll();
	fdb._mouseFrom.x = fdb._mouseTo.x;
	fdb._mouseFrom.y = fdb._mouseTo.y;
}
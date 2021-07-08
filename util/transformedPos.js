// 计算画布移动之后的x坐标点
export function getTransformedPosX(fcvs, x) {
	let zoom = Number(fcvs.getZoom())
	return (x - fcvs.viewportTransform[4]) / zoom;
}
export function getTransformedPosY(fcvs, y) {
	let zoom = Number(fcvs.getZoom())
	return (y - fcvs.viewportTransform[5]) / zoom;
}
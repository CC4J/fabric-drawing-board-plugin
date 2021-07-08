export function resetTmpText (fdb) {
	// 将当前文本对象退出编辑模式
	fdb._tmpText.exitEditing();
	fdb._tmpText.set("backgroundColor", "rgba(0,0,0,0)");
	// 如果文字对象中内容为空，则清除当前文字
	if (fdb._tmpText.text == "") {
		fdb._fcvs.remove(fdb._tmpText);
	}
	fdb._fcvs.renderAll();
	fdb._tmpText = null;
}
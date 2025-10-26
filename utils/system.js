const SYSTEM_INFO = uni.getSystemInfoSync();
// 小程序数据
export const getStatusBarHight = () => SYSTEM_INFO.statusBarHeight || 0;

export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let {top, height} = uni.getMenuButtonBoundingClientRect(); // H5数据
		return height + (top - getStatusBarHight()) * 2;
	} else {
		return 40;
	}
}

export const getNavBarHeight = () => getStatusBarHight()+getTitleBarHeight();

export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let { leftIcon: { left, width } } = tt.getCustomButtonBoundingClentRect();
	return left + parseInt(width) + 5;
	// #endif
	
	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}
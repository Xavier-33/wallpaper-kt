export function compareTimestamp(timestamp) {
	const currentTime = new Date().getTime();
	const timeDiff = currentTime - timestamp;
	
	if (timeDiff < 60000) {
		return '1分钟内';
	} else if (timeDiff < 360000) {
		return Math.floor(timeDiff / 60000) + '分钟';
	} else if (timeDiff < 86400000) {
		return Math.floor(timeDiff / 360000) + '小时';
	} else if (timeDiff < 2592000000) {
		return Math.floor(timeDiff / 86400000) + '天';
	} else if (timeDiff < 7776000000) {
		return Math.floor(timeDiff / 2592000000) + '月';
	} else {
		return null;
	}
}
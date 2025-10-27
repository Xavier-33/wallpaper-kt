const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
const ACCESS_KEY = "xavier";

export function request(config = {}) {
	let { 
		url, 
		method = 'GET', 
		header = {}, 
		data = {} 
	} = config;
	
	url = BASE_URL + url;
	header['access-key'] = ACCESS_KEY;
	
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: res => {
				if (res.data.errCode === 0) {
					resolve(res.data);
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "网络请求失败，请重新获取 access-key",
						content: res.data.errMsg,
						showCancel: false
					});
					reject(res.data);
				} else {
					uni.showToast({
						title:res.data.errMsg,
						icon:"none"
					});
					reject(res.data);
				}
			},
			fail: err => {
				reject(err);
			}
		})
	})
}
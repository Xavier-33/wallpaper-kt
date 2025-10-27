import { request } from "@/utils/request.js"

export function apiGetBanner() {
	return request({
		url: "/homeBanner"
	});
}

export function apiGetDayRandom() {
	return request({
		url: "/randomWall"
	});
}

export function apiGetNews(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	});
}

export function apiGetClassify(data = {}) {
	return request({
		url: "/classify",
		data
	});
}

export function apiGetWallList() {
	return request({
		url: "/wallList",
		header: {
			"classid": "6524a48f6523417a8a8b825d"
		}
	});
}

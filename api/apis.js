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
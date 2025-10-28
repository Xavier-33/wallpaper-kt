import { request } from "@/utils/request.js"
// 获取轮播图数据
export function apiGetBanner() {
	return request({
		url: "/homeBanner"
	});
}
// 获取每日推荐
export function apiGetDayRandom() {
	return request({
		url: "/randomWall"
	});
}
// 获取公告栏数据
export function apiGetNews(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	});
}
// 获取专题精选、"分类"导航栏的数据
export function apiGetClassify(data = {}) {
	return request({
		url: "/classify",
		data
	});
}
// 获取"分类"导航栏中，点击单个壁纸classlist的数据
export function apiGetWallList(data = {}) {
	return request({
		url: "/wallList",
		data
	})
}

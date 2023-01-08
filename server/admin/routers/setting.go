package routers

import (
	"github.com/gin-gonic/gin"
	"likeadmin/admin/schemas/req"
	"likeadmin/admin/service/setting"
	"likeadmin/core"
	"likeadmin/core/response"
	"likeadmin/util"
)

var SettingGroup = core.Group("/setting")

func init() {
	group := SettingGroup
	group.AddGET("/website/detail", websiteDetail)
	group.AddPOST("/website/save", websiteSave)
}

//websiteDetail 获取网站信息
func websiteDetail(c *gin.Context) {
	response.OkWithData(c, setting.SettingWebsiteService.Detail())
}

//websiteSave 保存网站信息
func websiteSave(c *gin.Context) {
	var wsReq req.SettingWebsiteReq
	util.VerifyUtil.VerifyJSON(c, &wsReq)
	setting.SettingWebsiteService.Save(wsReq)
	response.Ok(c)
}

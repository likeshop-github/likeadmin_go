package system

import (
	"encoding/json"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"likeadmin/admin/schemas/req"
	"likeadmin/admin/schemas/resp"
	"likeadmin/config"
	"likeadmin/core"
	"likeadmin/core/request"
	"likeadmin/core/response"
	"likeadmin/models/system"
	"likeadmin/utils"
	"strconv"
	"strings"
)

var SystemAuthAdminService = systemAuthAdminService{}

//systemAuthAdminService 系统管理员服务实现类
type systemAuthAdminService struct{}

//FindByUsername 根据账号查找管理员
func (adminSrv systemAuthAdminService) FindByUsername(username string) (admin system.SystemAuthAdmin, err error) {
	err = core.DB.Where("username = ?", username).Limit(1).First(&admin).Error
	return
}

//Self 当前管理员
func (adminSrv systemAuthAdminService) Self(adminId uint) (res resp.SystemAuthAdminSelfResp) {
	// 管理员信息
	var sysAdmin system.SystemAuthAdmin
	err := core.DB.Where("id = ? AND is_delete = ?", adminId, 0).Limit(1).First(&sysAdmin).Error
	if err != nil {
		core.Logger.Errorf("Self First err: err=[%+v]", err)
		panic(response.SystemError)
	}
	// 角色权限
	var auths []string
	if adminId > 1 {
		roleId, _ := strconv.Atoi(sysAdmin.Role)
		menuIds := SystemAuthPermService.SelectMenuIdsByRoleId(uint(roleId))
		if len(menuIds) > 0 {
			var menus []system.SystemAuthMenu
			err = core.DB.Where(
				"id in ? AND is_disable = ? AND menu_type in ?", menuIds, 0, []string{"C", "A"}).Order(
				"menu_sort, id").Find(&menus).Error
			if err != nil {
				core.Logger.Errorf("Self SystemAuthMenu Find err: err=[%+v]", err)
				panic(response.SystemError)
			}
			if len(menus) > 0 {
				for _, v := range menus {
					auths = append(auths, strings.Trim(v.Perms, " "))
				}
			}
		}
		if len(auths) > 0 {
			auths = append(auths, "")
		}
	} else {
		auths = append(auths, "*")
	}
	var admin resp.SystemAuthAdminSelfOneResp
	response.Copy(&admin, sysAdmin)
	admin.Dept = strconv.Itoa(int(sysAdmin.DeptId))
	admin.Avatar = utils.UrlUtil.ToAbsoluteUrl(sysAdmin.Avatar)
	return resp.SystemAuthAdminSelfResp{User: admin, Permissions: auths}
}

//List 管理员列表
func (adminSrv systemAuthAdminService) List(page request.PageReq, listReq req.SystemAuthAdminListReq) response.PageResp {
	// 分页信息
	var res response.PageResp
	response.Copy(&res, page)
	limit := page.PageSize
	offset := page.PageSize * (page.PageNo - 1)
	// 查询
	admin := system.SystemAuthAdmin{}
	adminTbName := core.DBTableName(&admin)
	roleTbName := core.DBTableName(&system.SystemAuthRole{})
	deptTbName := core.DBTableName(&system.SystemAuthDept{})
	adminModel := core.DB.Model(&admin).Joins(
		fmt.Sprintf("LEFT JOIN %s ON %s.role = %s.id", roleTbName, adminTbName, roleTbName)).Joins(
		fmt.Sprintf("LEFT JOIN %s ON %s.dept_id = %s.id", deptTbName, adminTbName, deptTbName)).Select(
		fmt.Sprintf("%s.*, %s.name as dept, %s.name as role", adminTbName, deptTbName, roleTbName))
	// 条件
	if listReq.Username != "" {
		adminModel = adminModel.Where("username like ?", "%"+listReq.Username+"%")
	}
	if listReq.Nickname != "" {
		adminModel = adminModel.Where("nickname like ?", "%"+listReq.Nickname+"%")
	}
	if listReq.Role >= 0 {
		adminModel = adminModel.Where("role = ?", listReq.Role)
	}
	// 总数
	var count int64
	err := adminModel.Count(&count).Error
	if err != nil {
		core.Logger.Errorf("List Count err: err=[%+v]", err)
		panic(response.SystemError)
	}
	// 数据
	var adminResp []resp.SystemAuthAdminResp
	err = adminModel.Limit(limit).Offset(offset).Order("id desc, sort desc").Find(&adminResp).Error
	if err != nil {
		core.Logger.Errorf("List Find err: err=[%+v]", err)
		panic(response.SystemError)
	}
	for i := 0; i < len(adminResp); i++ {
		adminResp[i].Avatar = utils.UrlUtil.ToAbsoluteUrl(adminResp[i].Avatar)
		if adminResp[i].ID == 1 {
			adminResp[i].Role = "系统管理员"
		}
	}
	return response.PageResp{
		PageNo:   page.PageNo,
		PageSize: page.PageSize,
		Count:    count,
		Lists:    adminResp,
	}
}

//Detail 管理员详细
func (adminSrv systemAuthAdminService) Detail(id uint) (res resp.SystemAuthAdminResp) {
	var sysAdmin system.SystemAuthAdmin
	err := core.DB.Where("id = ? AND is_delete = ?", id, 0).Limit(1).First(&sysAdmin).Error
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		panic(response.AssertArgumentError.Make("账号已不存在！"))
	} else if err != nil {
		core.Logger.Errorf("Detail First err: err=[%+v]", err)
		panic(response.SystemError)
	}
	response.Copy(&res, sysAdmin)
	res.Avatar = utils.UrlUtil.ToAbsoluteUrl(res.Avatar)
	if res.Dept == "" {
		res.Dept = strconv.Itoa(int(res.DeptId))
	}
	return
}

//Add 管理员新增
func (adminSrv systemAuthAdminService) Add(addReq req.SystemAuthAdminAddReq) {
	var sysAdmin system.SystemAuthAdmin
	// 检查username
	err := core.DB.Where("username = ? AND is_delete = ?", addReq.Username, 0).Limit(1).Find(&sysAdmin).Error
	if err != nil {
		core.Logger.Errorf("Add Find by username err: err=[%+v]", err)
		panic(response.SystemError)
	}
	if sysAdmin.ID > 0 {
		panic(response.AssertArgumentError.Make("账号已存在换一个吧！"))
	}
	// 检查nickname
	err = core.DB.Where("nickname = ? AND is_delete = ?", addReq.Nickname, 0).Limit(1).Find(&sysAdmin).Error
	if err != nil {
		core.Logger.Errorf("Add Find by nickname err: err=[%+v]", err)
		panic(response.SystemError)
	}
	if sysAdmin.ID > 0 {
		panic(response.AssertArgumentError.Make("昵称已存在换一个吧！"))
	}
	roleResp := SystemAuthRoleService.Detail(addReq.Role)
	if roleResp.IsDisable > 0 {
		panic(response.AssertArgumentError.Make("当前角色已被禁用!"))
	}
	passwdLen := len(addReq.Password)
	if !(passwdLen >= 6 && passwdLen <= 20) {
		panic(response.Failed.Make("密码必须在6~20位"))
	}
	salt := utils.ToolsUtil.RandomString(5)
	response.Copy(&sysAdmin, addReq)
	sysAdmin.Role = strconv.Itoa(int(addReq.Role))
	sysAdmin.Salt = salt
	sysAdmin.Password = utils.ToolsUtil.MakeMd5(strings.Trim(addReq.Password, " ") + salt)
	if addReq.Avatar == "" {
		addReq.Avatar = "/api/static/backend_avatar.png"
	}
	sysAdmin.Avatar = utils.UrlUtil.ToRelativeUrl(addReq.Avatar)
	err = core.DB.Create(&sysAdmin).Error
	if err != nil {
		core.Logger.Errorf("Add Create err: err=[%+v]", err)
		panic(response.SystemError)
	}
}

//CacheAdminUserByUid 缓存管理员
func (adminSrv systemAuthAdminService) CacheAdminUserByUid(id uint) (err error) {
	var admin system.SystemAuthAdmin
	err = core.DB.Where("id = ?", id).Limit(1).First(&admin).Error
	if err != nil {
		return
	}
	b, err := json.Marshal(admin)
	if err != nil {
		return
	}
	utils.RedisUtil.HSet(config.AdminConfig.BackstageManageKey, strconv.Itoa(int(admin.ID)), string(b), 0)
	return nil
}

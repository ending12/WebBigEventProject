$(function() {
    // let element = layui.element
    // ,layer = layui.layer
    // ,util = layui.util
    // ,$ = layui.$;
    let layer = layui.layer;
    let util =layui.util;

    //头部事件
    util.event('lay-header-event', {
      //左侧菜单事件
      menuLeft: function(othis){
        layer.msg('展开左侧菜单的操作', {icon: 0});
      }
      ,menuRight: function(){
        layer.open({
          type: 1
          ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
          ,area: ['260px', '100%']
          ,offset: 'rt' //右上角
          ,anim: 5
          ,shadeClose: true
        });
      }
    });
    getUserInfo();  
    logOut();
});
function getUserInfo(){
  $.ajax({
    url: '/my/userinfo',
    type: 'GET',
    //配置请求头
    // headers: {
    //   'Authorization': localStorage.getItem('token') || ''
    // },
    success: e => {
      // console.log(e);
      if(e.status === 1){
        return layer.message;
      }
      renderAvatar(e.data);
      // console.log(username);
      // console.log();
    }
  });

}
function renderAvatar(user) {
  let name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
  // 渲染图片头像
  if (user.user_pic !== null){
    $('.layui-nav-img').attr('src',user.user_pic).show();
    $('.text-avatar').hide();
  }else{
    $('.layui-nav-img').hide();
    let pre = name[0].toUpperCase();
    $('.text-avatar').html(pre).show();

  }
}

function logOut() {
  $('#logout').on('click',e => {
    // layer.open({
    //   content: '退出确认'
    //   ,btn: ['是', '否']
    //   ,yes: function(index, layero){
    //     //按钮【按钮一】的回调
    //   }
    //   ,btn2: function(index, layero){
    //     //按钮【按钮二】的回调
        
    //     //return false 开启该代码可禁止点击该按钮关闭
    //   }
    //   ,cancel: function(){ 
    //     //右上角关闭回调
        
    //     //return false 开启该代码可禁止点击该按钮关闭
    //   }
    // });
    layer.confirm('确认是否退出', {
      btn: ['是', '否'] //可以无限个按钮
    }, function(index, layero){
      //按钮【按钮一】的回调
      // localStorage.clear();
      localStorage.removeItem('token');
      location.href = '/login.html';
    }, function(index){
      //按钮【按钮二】的回调
    });
  });
}
//JS 
// layui.use(['element', 'layer', 'util'], function(){

//   });
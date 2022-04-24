$(function() {
    // let element = layui.element
    // ,layer = layui.layer
    // ,util = layui.util
    // ,$ = layui.$;
    let layer = layui.layer;
    let util =layui.util;
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
      console.log(e);
      renderAvatar(e.data);
      // console.log(username);
      // console.log();
    },
    // //加入comple 无论成功或失败 都进行调用
    // complete: res => {
    //   // console.log(res);
    //   //返回responseJSON 对 status和 message进行验证
    //   if(res.responseJSON.status === 1 && 
    //     res.responseJSON.message === '身份认证失败！'){
    //       localStorage.removeItem('token');
    //       location.href = '/login.html';
    //   }
    // }
  });

}
function renderAvatar(user) {
  let name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
  // 渲染图片头像
  if (user.user_pic !== null){
    // let pic = user.user_pic;
    // pic = pic.replace("data:image/png;base64,","")
    // pic = pic.replace("/+\/","");
    
    // console.log(pic);
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
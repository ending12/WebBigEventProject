$(function () {
    $('#link_reg').on('click',() => {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click',() => {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
        }
        if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
        }
        if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
        }
        
        //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
        if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
        }
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,password: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: v => {
            let pwd = $('.reg-box [name=password]').val();//类间要加一个空格
            console.log(v,pwd);
            if(v !== pwd){
                return  'Password not equail'; 
            }
        }
  });
  //登录
  $('#login-form').submit(function(e) {
      e.preventDefault();
      //快速获取表单数据
      let userData = $(this).serialize();
      $.post('/api/login',userData,res => {
        if(res.status === 1 ){
            return  layer.msg(result.message);
        }
        layer.msg(res.message);
        // console.log(res.token);

        //跳转到index页面
        location.href = '/index.html';
        // 把token存到localStorage中 方便以后拿取
        localStorage.setItem("token",res.token)
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzY5MiwidXNlcm5hbWUiOiJjbGllbnQiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY1MDM3NDU2MiwiZXhwIjoxNjUwNDEwNTYyfQ.1dHa4lb6kXv1vi5RyuwcUeI6WQNAPtkiLlCAAH6A0cg
      });
    //   let userData = {username: $('#login-form [name=username]').val(),
    //   password: $('#login-form [name=password]').val()};
    //   $.ajax({
    //       url: "http://www.liulongbin.top:3007/api/login",
    //       type: "POST",
    //       data: userData,
    //       success: result => {
    //           if(result.status === 1 ){
    //               return  layer.msg(result.message);

    //           }
    //           layer.msg(result.message);
    //         }
    //   })
  })
  //注册
  $('#reg-form').on('submit',(e) => {
      e.preventDefault();
      let userData = {username: $('#reg-form [name=username]').val()
          ,password: $('#reg-form [name=password]').val()};
      $.ajax({
          url: "/api/reguser",
          type: "POST",
          data: userData,
          success: result => {
              if(result.status === 1){
                  return layer.msg(result.message);
                //   return console.log(result.message);
              }
              layer.msg(result.message);
            }
      })
  })      
});

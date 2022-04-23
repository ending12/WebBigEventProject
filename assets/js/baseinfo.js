$(function(){
    let layer = layui.layer;
    let form = layui.form;
    form.verify({
        nickname: function(value) {
            if(value.length > 0){
                return 'nickname must be 6 - 12 ';
            }
        }
    });
    initUserInfo();
    //监听提交
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        updateUserInfo($(this).serialize());
        // 调用父页面的函数，刷新父页面信息
        window.parent.getUserInfo();
    })
    // form.on('submit(formDemo)', function(data){

    //     layer.msg(JSON.stringify(data.field));
    //   return false;
    // });
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: e=>{
                if(e.status === 1){
                    return layer.msg(e.message);
                }
                console.log(e);
                // 快速对表单进行赋值
                form.val('userInfoForm', e.data);
            }
        });
    } 
    $('#btnReset').on('click',e => {
        //阻止默认重置
        e.preventDefault();
        initUserInfo();

    });
    function updateUserInfo(data){
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: data,
            success: e=>{
                if(e.status === 1){
                    return layer.msg(e.message);
                }
                layer.msg(e.message);
            }
        });
    }
});


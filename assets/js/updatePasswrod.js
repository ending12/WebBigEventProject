$(function(){
    const form = layui.form;
    const layer = layui.layer;
    // console.log(form,'fdsfds');
    form.verify({
        oldPwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
            ],
        newPwd: value => {
            if(value === $('.layui-input-block [name=oldPwd]').val()){
                return 'old and new password not equal';
            }
        },
        rePwd: value => {
            let newPwd = $('.layui-input-block [name=newPwd]').val();
            console.log(value,newPwd);

            if(value !== newPwd){
                // console.log('test');
                return  'Password not equal'; 
            }

        }
    });
    $('#passwordForm').on('submit',function(e) {
        e.preventDefault();

        let userData = $(this).serialize();
        $.post('/my/updatepwd',userData,res => {
            console.log(res);
            if(res.status === 1 ){
                return  layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#passwordForm')[0].reset();
      });
    })
});
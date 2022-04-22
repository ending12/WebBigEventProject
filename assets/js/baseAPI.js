// 注意:每次调用$.get()或$.post()或$.ajax()的时候,
//会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(options => {
    //发起ajax前，拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options,'\n',options.url);
    //统一为 /my 加header请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization : localStorage.getItem('token') || ''
        };
    }
    //加入comple 无论成功或失败 都进行调用
    options.complete = res => {
        // console.log(res);
        //返回responseJSON 对 status和 message进行验证
        if(res.responseJSON.status === 1 && 
          res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
      }
    
})
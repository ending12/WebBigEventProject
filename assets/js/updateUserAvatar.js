$(function(){
  let layer = layui.layer;
// 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImage').on('click',e => {
    $('#file').click();
  });

  // 绑定change，当图片改变时重新获取上传图片
  $('#file').on('change',e => {

    let fileList = e.target.files[0];
    // console.log(fileList);
    if (fileList.length === 0) {
      layer.msg('please select your pic');
    }

    let file = e.target.files[0];
    let newImgURL = URL.createObjectURL(file);

    // console.log(newImgURL);
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
   });
   //点击确认，将图片转换成base64编码，上传
  $('#btnUpload').on('click',function(){
    // let picUrl = 
    // let picUrl = $image
    // .cropper('getCroppedCanvas',{
    //   width: 100,
    //   height: 100
    // })
    // .toDataURL('image/png');
  //  console.log(picUrl);
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {'avatar':dataURL},
      success: e => {
        if(e.status === 1){
          layer.msg(e.message);

        }
        layer.msg(e.message);
        window.parent.getUserInfo();

      }
    });
  });
    
});
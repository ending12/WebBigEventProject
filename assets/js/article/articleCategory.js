$(function(){

    let layer = layui.layer;
    let laytpl = layui.laytpl;
    // let layerIndex = null;
    loadCategoryInfo();
    // 增加文章类别
    $('#addCategory').on('click',e => {
        const layerIndex = layer.open({
            type: 1,
            area: ['380px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
            addArticle(layerIndex);
        });

    // 文章编辑
    $('body').on('click','#articleEdit',function(){
        let id = $(this).attr('data-id');
        let username = $('#name').text();
        let alias = $('#alias').text();
        let index = layer.open({
                type: 1,
                area: ['380px','250px'],
                title: '修改文章分类',
                content: $('#dialog-update').html()
            });
        editArticle(index,id);
        console.log('id',id);
    }); 

    // 文章删除
    $('body').on('click','#articleDel',function() {
        let id = $(this).attr('data-id');
        // console.log('del',id);
        layer.confirm('确认是否删除', {
            btn: ['是', '否'] //可以无限个按钮
          }, function(index, layero){
            //按钮【按钮一】的回调
            $.ajax({
                url: `/my/article/deletecate/${id}`,
                type: 'GET',
                success: res => {
                    if(res.status === 1){
                        return layer.msg(res.message);
                    }
                    loadCategoryInfo();
                    layer.msg(res.message);
                }
            })
          }, function(index){
            //按钮【按钮二】的回调
          });
    }); 

    //渲染文章分类页面
    function loadCategoryInfo(){
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: e => {
                if(e.status === 1){
                    return layer.msg(e.message);
                }
                console.log(e.data);
                let table =  tpl_table.innerHTML;
                laytpl(table).render(e.data,function(html){
                    $('tbody').html(html);
                });
            }
        });
    }
    //增加文章
    function addArticle(index){
        // 监听文章类别表单
        $('#categoryForm').submit(function(e){
            e.preventDefault();
            let data = $(this).serialize();
            console.log(data);
                $.ajax({
                    url: '/my/article/addcates',
                    type: 'POST',
                    data:data,
                    success: res => {
                        if(res.status === 1){
                            return layer.msg(res.message);
                        }
                        loadCategoryInfo();
                        layer.msg(res.message);
                        layer.close(index);
                    }
                });
            });
    }
    //编辑文章 注意API标签的参数大小写
    function editArticle(index,id,username,alias){
        // 监听文章类别表单
        $('#updateCategoryForm').submit(function(e){
            e.preventDefault();
            let data = $(this).serialize();
            data = data + '&Id='+id;
                $.ajax({
                    url: '/my/article/updatecate',
                    type: 'POST',
                    data:data,
                    success: res => {
                        if(res.status === 1){
                            return layer.msg(res.message);
                        }
                        loadCategoryInfo();
                        layer.msg(res.message);
                        layer.close(index);
                    }
                });
            });
            $('#btnclose').click(e => {
                layer.close(index);
                // $('.layui-layer-close1').click();
                return false;
            });
    }
/*
     table.render({
      elem: '.layui-table'
      ,url: '/my/article/cates' //数据接口
      ,page: true //开启分页
      ,skin: 'line'
      ,even: true
      ,size: 'lg'
      ,cols: [[ //表头
        ,{field: 'name', title: '分类名称'}
        ,{field: 'alias', title: '分类别名'}
        ,{title: '操作',toolbar: '#barDemo'}
      ]]
      ,parseData: function(res){ //res 即为原始返回的数据
        return {
          "code": res.status, //解析接口状态
          "msg": res.message, //解析提示文本
          "count": res.data.length, //解析数据长度
          "data": res.data //解析数据列表
        };
    }
});*/
  });


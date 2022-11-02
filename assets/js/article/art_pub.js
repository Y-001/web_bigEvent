$(function () {
    var layer = layui.layer

    var form = layui.form


    initCate()

    // 初始化富文本编辑器
    initEditor()

    //加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    //coverFile的change事件
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        if(!file) return layer.msg('请选择图片')
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //定义文章的发布状态
    var art_state='已发布'
    //为存草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click',function(){
        art_state='草稿'
    })
    //表单的提交事件
    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        //console.log('提交了表单')
        //基于一个表单，立即创建formdata对象
        var fd=new FormData($(this)[0])
        //将发布状态追加到表单对象
        fd.append('state',art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                //发起ajax请求
                publishArticle(fd)
            })
    })

    //发表文章的方法
    function publishArticle(fd){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            //如果向服务器提交的是formdata，必须有两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0) return layer.msg(res.message)
                layer.msg('发布成功')
                console.log(res.message)
                location.href='./art_list.html'
            }
        })
    }
})
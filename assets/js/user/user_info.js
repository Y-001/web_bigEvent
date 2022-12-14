$(function(){
    var form =layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '长度在1-6之间'
            }
        },
    })
    initUserInfo()

    //初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0) return layer.msg(res.message)

                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status!==0) return layer.msg(res.message)
                layer.msg('更新用户信息成功')
                //调用父页面中的方法，重新渲染用户头像与信息
                window.parent.getUserInfo()
                //initUserInfo()
                //console.log('chenggong')
            }
        })
    })





})
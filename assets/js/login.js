$(function(){
    //点击去注册账户的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //去登录的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从layui中获取form对象
    var form=layui.form
    var layer=layui.layer
    //console.log(form)
    //通过form.verify()自定义校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd:function(value){
            var pwd=$('.reg-box [name=password]').val()
            //console.log(value,pwd)
            if(pwd!==value){
                return '两次密码的值必须一致';
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#username').val(),password:$('#password').val()},function(res){
            //console.log(res)
            if(res.status!==0){
                
                return layer.msg(res.message)
            }
            //console.log('注册成功')
            layer.msg('注册成功,请登录!')
            $('#link_login').click()
        })
    })
    
    /* $(function(){
        console.log($('#form_login [name=password]'))
        console.log($('.reg-box [name=password]'))
    }) */

    //监听登录表单提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        //快速获得表单中的数据
        data=$(this).serialize()
        //console.log(this,data)
        $.post('/api/login',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            
            layer.msg('登录成功')
            //将登陆成功存在本地存储里面
            localStorage.setItem('token',res.token)
            window.location.href='./index.html'
            
        })
    })
})
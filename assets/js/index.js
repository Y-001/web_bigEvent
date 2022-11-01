$(function(){
    getUserInfo();

    var layer=layui.layer

    //实现退出功能
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //console.log(index)
            localStorage.removeItem('token')
            location.href='./login.html'
            layer.close(index);
          });
    })

})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user){
    var name=user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp; ${name}`)
    if(user.user_pic!==null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user.pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
    }
}




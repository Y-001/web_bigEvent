//每次调用发起请求的函数之前，要调用这个函数，可以拿到参数
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    //统一为有权限的接口，设置请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete=function(res){
        //console.log(res)
        if(res.responseJSON.status=='1'&&res.responseJSON.message=='身份认证失败！'){
            //1、强制清空token2、跳转到登录页
            localStorage.removeItem('token')
            //console.log(window)
            window.location.href='./login.html'
        }
    }
    
})
//每次调用发起请求的函数之前，要调用这个函数，可以拿到参数
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
})
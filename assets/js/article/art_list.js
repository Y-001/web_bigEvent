$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDay())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }




    //定义一个查询的参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()
    initCate()

    //获取文章列表的值
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                console.log(res)
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
                //console.log(res)
                //layer.msg('假装成功')
                renderPage(res.total)
            }
        })
    }


    //初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                //console.log(res)
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //让layui重新渲染一下
                form.render()
            }
        })
    }


    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        //获取表单选项中的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    //定义渲染分页的方法
    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:q.pagesize,
            curr:q.pagenum,
            //分页发生切换的时候，触发jump回调
            jump:function(obj,first){
                q.pagenum=obj.curr
                if(!first){
                    initTable()
                }

            }
        });
    }

    //删除按钮的点击事件
    $('tbody').on('click','#btn-delete',function(){
        var len=$('#btn-delete').length
        var id=$(this).attr('data-id')
        layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0) return layer.msg(res.message)
                    layer.msg('删除成功')
                    if(len===1){
                        //删除完成后，页面上就没有数据了
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})
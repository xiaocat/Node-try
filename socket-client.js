<script type="text/javascript" src="/javascripts/socket.io.js"></script>
<script type="text/javascript" src="/javascripts/jquery-1.8.2.min.js"></script>
<script type="text/javascript">
  var socket = io.connect("http://tmm.ihaveu.com:3000");
  socket.on('conn', function(data){
    var postdata = {
      'c_id': 'dagahhxhh3123095xasd',  //用户id
      'c_name': '测试', //用户昵称
      'guid': 1024, //拍卖id
      'price': 888
    }

    socket.emit('login', postdata, function(result){
      console.log('登录成功');
    });

    socket.emit('postprice', {'guid': 1024});

    socket.on('receive',function(maxprice){
      console.log(maxprice);
      $('h1').html('￥'+ maxprice.nowprice);
    });

  });
</script>

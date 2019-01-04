/*banner效果开始*/
	$(function(){
		var id="1";
		$(".button a").each(function(){
			if($(this).attr("data-id")===id){
				$(this).addClass("on");
			}
		})
	})



  $(window).resize(function() {
    bg_resize();
  })
  function bg_resize() {
    var windowwidth = $(window).width();
    var bannerheight = (windowwidth / 1920) * 876;
    $(".banner").height(bannerheight).find("li img").width(windowwidth);
  }
  $(function(){
    bg_resize();
  })

  // $(function(){
  //   $("#pic").each(function(){
  //     var num = $(this).find("li").length;
  //     for(var i=0;i<num;i++){
  //     if(i==0){ht="<span class='cur'></span>";}
  //     else{ht="<span></span>";}
  //     $(".banner-btn").append(ht);
  //     }
  //   })
  //   $(".banner").Xslider({
  //       affect: 'fade', //效果  有scrollx|scrolly|fade|none
  //       speed: 1500, //动画速度
  //       space: 6000, //时间间隔
  //       auto: true, //自动滚动
  //       trigger: 'mouseover', //触发事件 注意用mouseover代替hover
  //       conbox: '#pic', //内容容器id或class
  //       ctag: 'li', //内容标签 默认为<a>
  //       switcher: '.banner-btn', //切换触发器id或class
  //       stag: 'span', //切换器标签 默认为a
  //       current:'cur', //当前切换器样式名称
  //       moveLeft:'.arrow-l',//向左slide，加的代码
  //       moveRight:'.arrow-r',//向右slide，加的代码。
  //     });
  //   $('.banner-btn').children("span").eq(0).addClass('cur');
  // })
/*banner效果结束*/
/*
jQuery(document).ready(function($) {
  $('#menu-handler').click (function () {
        document.getElementById("nav_mobile").classList.toggle("show");
    })
}) */
var navItem = 0,
    $menuBox=jQuery(".menuBox");
     $('#menu-handler').bind("click", function () {
        if (navItem == 0) {
            jQuery(this).addClass("active");
            $menuBox.show().stop(false,false).animate({top:0});
            navItem = 1;
        } else {
            jQuery(this).removeClass("active");
            $menuBox.stop(false,false).animate({top:-$menuBox.height()},function(){
                $(this).hide();
            });
            navItem = 0;
        };
    });


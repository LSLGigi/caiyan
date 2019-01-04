/**
 * @package Xslider - A slider plugin for jQuery
 * @version 0.5
 * @author xhowhy <http://x1989.com> 
 **/
;(function($){
	$.fn.Xslider = function(options){var settings ={
			affect: 'scrollx', //效果  有scrollx|scrolly|fade|none
			speed: 1200, //动画速度
			space: 6000, //时间间隔
			auto: true, //自动滚动
			trigger: 'mouseover', //触发事件 注意用mouseover代替hover
			conbox: '.conbox', //内容容器id或class
			ctag: 'a', //内容标签 默认为<a>
			switcher: '.switcher', //切换触发器id或class
			stag: 'a', //切换器标签 默认为a
			current:'cur', //当前切换器样式名称
			rand:false ,//是否随机指定默认幻灯图片
			moveLeft:'.arrowl',//向左slide，加的代码
			moveRight:'.arrowr',//向右slide，加的代码。
			mult:1   //滚动多张图基数，默认为1.
		};
		settings = $.extend({}, settings, options);
		var Timer = null;
		var index = 1;
		var last_index = 0;
		var $conbox = $(this).find(settings.conbox),$contents = $conbox.find(settings.ctag);
		var $switcher = $(this).find(settings.switcher),$stag = $switcher.find(settings.stag);
		var $sldL = $switcher.find(settings.moveLeft).length>0?$switcher.find(settings.moveLeft):$(settings.moveLeft);   
		var $sldR = $switcher.find(settings.moveRight).length>0?$switcher.find(settings.moveRight):$(settings.moveRight); //加的代码
		if(settings.rand) {index = Math.floor(Math.random()*$contents.length);slide();}
		if(settings.affect == 'fade'){$.each($contents,function(k, v){(k === 0) ? $(this).css({'position':'absolute','z-index':9}):$(this).css({'position':'absolute','z-index':1,'opacity':0});
			});
		}
		function slide(){if (index >= Math.ceil($contents.length/settings.mult)) index = 0;
			if (index < 0 ) index = Math.ceil($contents.length/settings.mult)-1;// 加的代码。
			$stag.removeClass(settings.current).eq(index).addClass(settings.current);
			// $contents.removeClass("active").eq(index).addClass("active");
			switch(settings.affect){case 'scrollx':
					$conbox.width($contents.length*$contents.width());
					$conbox.stop().animate({left:-$contents.width()*index},settings.speed);
					break;
				case 'scrolly':
					$contents.css({display:'block'});
					$conbox.stop().animate({top:-$contents.height()*index+'px'},settings.speed);
					break;
				case 'fade':
					$contents.eq(last_index).stop().animate({'opacity': 0}, settings.speed/2).css('z-index',1)
							 .end()
							 .eq(index).css('z-index',9).stop().animate({'opacity': 1}, settings.speed/2);
							 //alert('123');
					break;
				case 'none':
					$contents.hide().eq(index).show();
					break;
				case 'mult-scroll':

					$conbox.width(Math.ceil($contents.length*$contents.outerWidth(true)));
					$conbox.stop().animate({left:-$contents.outerWidth(true)*index*settings.mult},settings.speed);
				    break;
			}
			last_index = index;
			index++;
		};
		if(settings.auto) {
			 Timer = setInterval(slide, settings.space);
			 $stag.eq(0).addClass('cur');
			 // $contents.eq(0).addClass('active');
		};
		$stag.bind(settings.trigger,function(){
			_pause();
			
			if($(this).attr('data-ind')!=null && $(this).attr('data-ind')!=undefined && $(this).attr('data-ind')!=''){
				index = $(this).attr('data-ind');
			}else{
				index = $(this).index();
			}
			slide();
			_continue()
		});
		$sldL.bind('click',function(){
			_pause();
			
			index = last_index-1;
			slide();
			_continue()
		});

		$sldR.bind('click',function(){
			_pause();
			
			index = last_index+1;
			slide();
			_continue()
		});


		$conbox.hover(_pause,_continue);
		function _pause(){
			if(settings.auto) {
				clearInterval(Timer);
			}
		}
		function _continue(){
			if(settings.auto) {
				if(settings.auto)Timer = setInterval(slide, settings.space);
			}
		}	
	}
})(jQuery);
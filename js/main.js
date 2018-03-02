$(function() {
	var initInfo = [
		{
			name: 'JavaScript',
			value: 80,
			color: 'progress-bar-js'
		},
		{
			name: 'HTML 5',
			value: 80,
			color: 'progress-bar-html'
		},
		{
			name: 'CSS 3',
			value: 80,
			color: 'progress-bar-css'
		},
		{
			name: 'Vue',
			value: 65,
			color: 'progress-bar-vue'
		},
		{
			name: 'jQuery',
			value: 75,
			color: 'progress-bar-jq'
		},
		{
			name: 'Node',
			value: 40,
			color: 'progress-bar-node'
		},
		{
			name: 'MongoDB',
			value: 40,
			color: 'progress-bar-mongo'
		}
	];
	var imgs = $("img");
	var init = {
	    flag: -1,
	    index: 0,
	    max: $('.item').length,
	    size: 1
	};
	var opus = [
		{
			name: "Totoro社区",
			img: "./image/totoro.png",
			desc: "一个使用PHP+MySQL实现的一个博客系统，前端使用原生JavaScript实现交互，通过ajax请求完成各类信息的验证，可切换主题样式。",
			href: "http://www.pinkbluecp.cn/"
		},
		{
			name: "2048小游戏",
			img: "./image/2048.png",
			desc: "一个使用jQuery实现的网页版2048小游戏，三种模式可切换，最高记录会被保存。",
			href: "http://www.pinkbluecp.cn/other/2048"
		},
		{
			name: "任务清单",
			img: "./image/todo.png",
			desc: "一个使用Vue实现的响应式的任务清单，通过localStorage来存储数据，每日自动更新任务状态。",
			href: "https://cjwbiu.github.io/TaskList/"
		}
	];
	initPage(initInfo);
	//图片预加载
	preLoad(imgs);
	//fullpage
	fullPage(init);  

	//add event
	$('.aside-btn-item').on('click',function() {
		init.index = $(this)[0].dataset.index;
		_nextPage($(document).height(), init.index, init.flag);
		$(this).addClass('btn-active').siblings().removeClass('btn-active');
	})

	$('.nextpage').click(function() {
		changePage(init);
	});

	$('.dot').on('click',function(event) {
		var curr = event.currentTarget.dataset.index;
		$(this).addClass('active').siblings()
			   .removeClass('active');

		$('.new').attr('src',opus[curr].img)
				 .parent().find('.title').html(opus[curr].name).next().html(opus[curr].desc)
			     .next().find('.btn').attr('href',opus[curr].href);
		
	})

	$('.link').mouseover(function() {
		$(this).prev().show();
	})
	$('.link').mouseout(function() {
		$(this).prev().hide();
	})
})

function changePage(options) {
	if(options.index < options.max-1) {
		options.index ++;
	}else if(options.index == options.max-1) {
		options.index = 0;
	}else {
		return;
	}
	_nextPage($(document).height(), options.index, options.flag)
}
function initPage(initInfo) {
	var html = '';
	initInfo.forEach((item) => {
		html += `
			<li>
                <span>${item.name}</span>
                <div class="progress">
                    <div class="progress-bar ${item.color}" style="width:${item.value}%"></div>
                </div>
            </li>
		`;
	});
	$('.skill-list').html(html);
}
//preload
function preLoad(imgs) {
	var i = 0;
	imgs.each((index,item) => {
		var imageObj = new Image();
		$(imageObj).on('load error',() => {
			// console.log(i)
			if(i == imgs.length - 1) {
				// console.log('hide')
				$('.loading').hide();
			}
			i++;
		})
		imageObj.src = item.src;
	})
}
//fullpage
function fullPage(options) {
    $(document).on("DOMMouseScroll mousewheel", function(event) {
        var chrome_wheel = event.originalEvent.wheelDelta,
        firfox_wheel = event.originalEvent.detail;

        if($(document).width() > 900) { 
            if(options.size != 1) {	//从小屏切换到大屏
                options.index = 0
                _nextPage($(document).height(), options.index, options.flag);
                options.size = 1;
            }
            
            if(((chrome_wheel && chrome_wheel < 0 ) || (firfox_wheel && firfox_wheel > 0)) && (options.index < options.max - 1)) {
                options.index ++;
                // console.log(options.index);
            }else if(((chrome_wheel && chrome_wheel > 0) || (firfox_wheel && firfox_wheel < 0)) && (options.index > 0)) {
                options.index --;
                // console.log(options.index);
            }else {
                return;
            }
            _nextPage($(document).height(), options.index, options.flag);
        }else {
            if(options.size != 0) {
                options.size = 0;
            }
        }
        
    
    });
}
//next page
function _nextPage(high,index,flag) {
	// console.log(index * high * flag);
	$('.item').css("transform","translate3d(0,"+ index * high * flag +"px,0)");
	$('.aside-btn-item').eq(index).addClass('btn-active').siblings().removeClass('btn-active');
}

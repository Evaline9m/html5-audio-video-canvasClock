$(document).ready(function() {
	var sound = true;
	var star = true;
	$("video").get(0).autoplay = 'autoplay';
	$("aside").height($(".main").height())
	var sound = true;
	Time();

	$("li").click(function() {
		change($(this))
	})

	$("progress").click(function(e) {
		ChangeTime(e)
	})
	
	$("footer").find("i").eq(0).click(function() {
		Stop();		
	})
	
	$(".icon-yinliang").click(function() {
		Voice()
	})
	
	$(".icon-zhongxin-").click(function() {
		$("video").get(0).load();
	})
	
	$(".sound").find(".progress").click (function(e){
		ChangeVoice(e)
	})

	$("video").get(0).onloadeddata = function(){  
		Time();
		setInterval(function(){Time()},200)
	}
	
	$("video").click(function() {
		Stop();		
	})
	
	$(".jd").find(".progress").click (function(e){
		ChangeTime(e)
	})
	
	function Stop(){   //  暂停视频
		$("footer").find("i").eq(0).toggleClass("icon-bofang").toggleClass("icon-zanting-copy");
		if(star){
			$("video").trigger('pause')
			star = false;
		}else{
			$("video").trigger('play')
			star = true;
		}
	}
	
	function change(e) { //切换视频
		var name = e.find("img").attr("name");
		$("source").attr("src", "../videos/" + name + ".mp4");
		$("video").get(0).load();
	}

	function Time() { //显示时间
		$("#time").find('span').eq(0).html(Math.round($("video").eq(0).get(0).currentTime / 60));
		$("#time").find('span').eq(1).html(Math.round($("video").eq(0).get(0).currentTime % 60));
		$("#time").find('span').eq(2).html(Math.round($("video").eq(0).get(0).duration / 60));
		$("#time").find('span').eq(3).html(Math.round($("video").eq(0).get(0).duration % 60));
		(function() { //进度条
			$(".jd").find(".progress-bar").css("width", ($("video").eq(0).get(0).currentTime / $("video").eq(0).get(0).duration) * 100 + "%")
		})()
	}
	
	function Voice(){  //静音
		if(sound){
			$(".sound").find(".progress-bar").width(0);
			$("video").eq(0).get(0).muted = true;
			sound = false;
		}else{
			$(".sound").find(".progress-bar").width("100%");
			$("video").eq(0).get(0).muted = false;
			sound = true;
		}
	}

	function ChangeTime(e){  //改变时间
		var percent = (e.offsetX/$(".jd").find(".progress").width())
		$(".jd").find(".progress-bar").width(e.offsetX);
		$("video").get(0).currentTime=$("video").eq(0).get(0).duration*percent;  
	}	

	function ChangeVoice(e){  //  改变声音
		var percent = (e.offsetX/$(".sound").find(".progress").width())
		$(".sound").find(".progress-bar").width(e.offsetX);
		$("video").eq(0).get(0).volume = percent;
	}
})
$(document).ready(function(){
	var Tim   
	var star = true;
	var sound = true;
	var voice = 1;
	Deg = true;
	
	$(".right").find("i").eq(0).click(function(){
		Next(0);
	})
	$(".right").find("i").eq(1).click(function(){
		Turn()
	})
	$(".right").find("i").eq(2).click(function(){
		Next(1);
	})
	$(".right").find("i").eq(3).click(function(){
		$(".right").find("i").eq(3).toggleClass("icon-danquxunhuan").toggleClass("icon-suijibofang");
	})
	$(".right").find("i").eq(4).click(function(){
		Load()
	})
	
	$(".right").find("i").eq(5).click(function(){
		Voice()
	})
	
	$(".jd").find(".progress").click (function(e){
		ChangeTime(e)
	})
	
	$(".sound").find(".progress").click (function(e){
		ChangeVoice(e)
	})
	
	
	$("li").click(function(){  //切换歌曲
		Change($(this))
	})

	setInterval(function(){  //时间
		Time();
		if($("audio").eq(0).get(0).ended){
			Random()
		}
	},2000)

	function ChangeTime(e){  //改变时间
		var percent = (e.offsetX/$(".jd").find(".progress").width())
		$(".jd").find(".progress-bar").width(e.offsetX);
		$("audio").get(0).currentTime=$("audio").eq(0).get(0).duration*percent;  
	}
	
	function Turn(){  //唱片转动
		if(star){
			$(".left").find('img').css({"transform":"rotate(-10deg)"});
			if(Deg){
				let Deg = 0;
			}
			Tim = setInterval(function(){
				Deg += 1;
				$(".left").find("#bj").css({"transform":"rotate("+ Deg +"deg)"});
			},50);
			$("audio").eq(0).get(0).play();
			$(".right").find("i").eq(1).removeClass("icon-bofang").addClass("icon-zanting-copy")
			star = false;
		}else{
			$(".left").find('img').css({"transform":"rotate(-26deg)"});
			clearInterval(Tim);
			star = true;
			$("audio").eq(0).get(0).pause();
			$(".right").find("i").eq(1).removeClass("icon-zanting-copy").addClass("icon-bofang")
		}
	}
	
	function Time(){  //显示时间
		$("#time").find('span').eq(0).html( Math.round($("audio").eq(0).get(0).currentTime/60) );
		$("#time").find('span').eq(1).html( Math.round($("audio").eq(0).get(0).currentTime%60) );
		$("#time").find('span').eq(2).html( Math.round($("audio").eq(0).get(0).duration/60) );
		$("#time").find('span').eq(3).html( Math.round($("audio").eq(0).get(0).duration%60) );
	
		//进度条
		(function(){
			$(".jd").find(".progress-bar").css("width",($("audio").eq(0).get(0).currentTime/$("audio").eq(0).get(0).duration)*100+"%" ) 
		})()
		
	}
	
	function Load(){  //重新加载
		$("audio").eq(0).get(0).load()
		Deg = true;
		$(".left").find("#bj").css({"transform":"rotate(0deg)"});
		Turn();
		Turn();
	}
	
	function Voice(){  //静音
		if(sound){
			voice = $("audio").eq(0).get(0).volume;
			$(".sound").find(".progress-bar").width(0);
			$("audio").eq(0).get(0).muted = true;
			sound = false;
		}else{
			$("audio").eq(0).get(0).muted = false;
			$(".sound").find(".progress-bar").width( ($("audio").eq(0).get(0).volume)*$(".sound").find(".progress").width() );
			sound = true;
		}
	}
	
	function ChangeVoice(e){  //  改变声音
		var percent = (e.offsetX/$(".sound").find(".progress").width())
		$(".sound").find(".progress-bar").width(e.offsetX);
		$("audio").eq(0).get(0).volume = percent;
	}
	
	function Random(){	//播放结束切歌
		if($(".right").find("i").eq(3).hasClass("icon-danquxunhuan")){
			Load();
		}else{
			let n = Math.ceil(Math.random()*4)
			while( $("li").eq(n).find(".liTop").html() == $(".right").find("h2").eq(0).html() ){
				n = Math.ceil(Math.random()*4)
			}
			Change($("li").eq(n))
		}
	}
	
	function Next(n){	//上下一首
		for(var i = 0;i<$("li").length;i++){
			if($("li").eq(i).find(".liTop").html() == $("h2").html()){
				if(n==0){
						console.log('a')
					if(i==0){
						Change( $("li").eq($("li").length-1) ) 
					}
					else{
						Change( $("li").eq(i-1) );
						break;
					}
				}else{
					if(i==$("li").length-1){
						Change( $("li").eq(0) ) 
					}
					else{
						Change( $("li").eq(i+1) );
						break;
					}
				}
			}
		}
	}
	
	function Change(e){  //切换歌曲
		$(".right").find("h2").eq(0).html(e.find(".liTop").html());
		$("audio").find("source").eq(0).attr("src","../music/"+ e.find(".liTop").html() +" - 薛之谦.mp3"); 
		$("audio").find("source").eq(1).attr("src","../music/"+ e.find(".liTop").html() +" - 薛之谦.mp3"); 
		$("audio").get(0).load();
		Deg = true;
		Time();
		$(".left").find("#bj").css({"transform":"rotate(0deg)"});
		Turn();
		Turn();
	}
	
})

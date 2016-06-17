$(function () {
	(function( boy, $ ) {
	    //Private Property
	    
	    var health = 10;
	    var love = 10;
	    var happiness = 10;
	 
	    //Public Property
	    
	     
	    //Public Method(可以被外來參數操控)
		
		 //boy object底下feed屬性是function，然後執行L13~L24
		 //health的數值會隨機增加--->mouth的class添加feed的行為--->1秒之後移除feed的行為--->love & happiness的數值隨機減少
		 boy.feed = function() {
	        health += randomInt(2,4);      
			
	        $('.mouth').addClass('feed');

	        setTimeout(function () {
	        	$('.mouth').removeClass('feed');
	        }, 1000);

	        decrementVitalSigns('feed');
	    };
		 //love的數值會隨機增加--->head的class添加hug的行為--->0.7秒之後移除hug的行為--->health & happiness的狀態數值減少
	    boy.hug = function() {
	        love += randomInt(2,4);

	        $('.head').addClass('hug');

	        setTimeout(function () {
	        	$('.head').removeClass('hug');
	        }, 700);

	       	decrementVitalSigns('hug');
	    };
		 //hapiness的數值會隨機增加--->boy_container的class添加play的行為--->1秒之後移除play的行為--->health & love的數值隨機減少
	    boy.play = function() {
	        happiness += randomInt(2,4);

	        $('#boy_container').addClass('play');

	        setTimeout(function () {
	        	$('#dude_container').removeClass('play');
	        }, 1000);

	        decrementVitalSigns('play');
	    };
	     
	    //Private Method(無法被外來參數操控)
		//定義遊戲數值隨機減少
	    function decrementVitalSigns(action) {
	    	if (action == 'feed') {
		    	love -= randomInt(1,2);
		    	happiness -= randomInt(1,2);
	    	} else if (action == 'hug') {
	    		health -= randomInt(1,2);	    	
		    	happiness -= randomInt(0,2);	    		
	    	} else {
	    		health -= randomInt(1,2);	    	
		    	love -= randomInt(1,2);	
	    	}

	    	updateStats();   //執行顯示遊戲數畫面
	    	styleBoy();
			
	    	if (health <= 0 || love <= 0 || happiness <= 0) {
	    		$('#module').show();
	    	}	    	
	    };
		//定義遊戲主角的狀況顯示
	    function styleBoy() {
	    	//設定角色變大的狀況（用health的狀況來判斷）
			if (health >= 23) {
	    		$('.head').css({top: 50, left:50, height:350, width:415});
	    	} else if (health >= 18) {
	    		$('.head').css({top: 100, left:100, height:250, width:300});
	    	} else if (health >= 12) {
	    		$('.head').css({top: 125, left:130, height:200, width:240});
	    	} else {
	    		$('.head').css({top: 150, left:160, height:150, width:180});
	    	}
			
			//設定角色嘴巴的狀況
	    	if ((love < 6 )|| (happiness < 6) || (health < 6)) {
	    		$('.mouth').addClass('frown');
	    		$('.mouth').removeClass('smile');
	    		$('.mouth').removeClass('joy');
	    	} else if (happiness >= 14) {
	    		$('.mouth').addClass('joy');
	    		$('.mouth').removeClass('smile');
	    	} else if (happiness < 14 && happiness >= 6) {
	    		$('.mouth').addClass('smile');
	    		$('.mouth').removeClass('joy');
	    		$('.mouth').removeClass('frown');
	    	} 
			
			//設定角色變色的狀況(用love的數值來判斷)
	    	if (love >= 23) {
	    		$('.head').css({backgroundColor: '#FF3399'});
	    	} else if (love >=18) {
	    		$('.head').css({backgroundColor: '#FF9966'});
	    	} else if (love >= 14) {
	    		$('.head').css({backgroundColor: '#FFCC99'});	    		
	    	} else if (love < 14 && love >= 6) {
	    		$('.head').css({backgroundColor: 'white'});	    			    		
	    	} else {
	    		$('.head').css({backgroundColor: 'red'});	    			    			    		
	    	}
	    }
		//定義遊戲數值顯示
	    function updateStats() {
	    	if (health <= 0 || love <= 0 || happiness <= 0) {
	    		$('#health').text('Health: XXX');           //text() 方法是设置或返回被选元素的文本内容。      html() 方法是返回或设置被选元素的内容
	    		$('#love').text('Love: XXX');
	    		$('#happiness').text('Happiness: XXX');
	    	} else {
		    	$('#health').text('Health: ' + health);
		    	$('#love').text('Love: ' + love);
		    	$('#happiness').text('Happiness: ' + happiness);	    		
	    	}
	    }

	}( window.boy = window.boy	|| {}, jQuery ));

	$('.btn_feed').on('click', boy.feed);
	$('.btn_hug').on('click', boy.hug);
	$('.btn_play').on('click', boy.play);

});

//設定隨機數值
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

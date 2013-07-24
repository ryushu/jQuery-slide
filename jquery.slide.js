/*
 *	jQuery slide plugin
 *	Copyright (C) Ryuhei Shudo
 *	Lisensed under the MIT Lisence
 */
(function($){
	/*
	 *	swipe
	 *	@params
	 *	p:{ auto : true/false }
	 *	fn: callback function
	 */
	$.fn.slide = function(p,fn){
		// closure
		var _ = {};
		//全般の情報
		_.width = $(this).width();			//スライド幅
		_.ms = 300;					//animation duration value
		_.cacheX = 0;					//タッチした場所のキャッシュ
		_.cnt = 0;					//touchmove count
		_.cancel = false;				//移動キャンセル
		_.$box = [];					//スライドするボックス配列
		_.pos = [];					//スライドするボックスのtranslateXの値
		_.$children = $(this).children();		//スライドする要素
		_.len  = _.$children.length;			//スライドする要素数
		_.now = 0;					//表示しているデータ番号
		_.timerId = 0;					//自動スライド用タイマーID
		
		/*
		 *	スライド処理
		 */
		_.slide = function(n){
			var $t;
			for(var i=3;i--;){
				var ms = _.ms;
				var $d = _.$box[i];
				var x = _.pos[i];
				//移動する場所
				//左にスライドする場合
				if(n){
					x -= _.width;
					if(x < -_.width){
						x = _.width;
						ms = 0;
						$t = $d;
					}
				//右にスライドする場合
				}else{
					x += _.width;
					if(x > _.width){
						x = -_.width;
						ms = 0;
						$t = $d;
					}
				}
				$d.css({
					'-webkit-transform':'translate('+x+'px,0px)',
					'-webkit-transition-duration':ms +'ms'
				});
				_.pos[i] = x;
			}
			//中身のすげ替え
			_.change(n,$t);
			//callback function
			if(fn) fn.call(_.$children[_.now]);
			
		};
		/*
		 *	表示データの変更
		 */
		_.change = function(n,$t){
			var no,now;
			//データ番号
			//左へ
			if(n){	
				//スライド後に表示されているデータ番号
				now = _.now + 1;
				if(now > _.len-1) now = 0;
				//すげ替えが必要なデータ番号
				no = now + 1;
				if(no > _.len-1) no = 0;
				
			//右へ
			}else{
				now = _.now - 1;
				if(now < 0) now = _.len - 1;
				no = now - 1 ;
				if(no < 0) no = _.len - 1;
			}
			_.now = now;
			var $c = $(_.$children[no]).clone(true).css({'visibility':'visible'});
			$t.empty().queue(function(){
					$(this).append($c).dequeue();
			});

		};
		
		/*
		 *	自動スライド
		 */
		_.autoRun = function(){
			_.timerId = setTimeout(function(){
				_.slide(1);
				_.autoRun();
			},3000);
		};

		_.reset = function(){
			clearTimeout(_.timerId);
			_.autoRun();
		};
		
		//childnodeが複数あるのでスライドさせる
		if(_.len > 1){
			//componentを3つappendする
			$(this).css({'display':'-webkit-box','-webkit-box-align':'center','-webkit-box-pack':'center','overflow':'hidden'});
			for(var i=0;i<3;i++){
				var no = (!i|| i >= _.len) ? _.len-1 : i-1;
				var $c = $(_.$children[no]).clone(true).css({'visibility':'visible'});
				var x = (i * _.width) - _.width;
				if(!x) _.now = no;
				var $b = $('<div>').css({
					width:'100%'
					,height:'100%'
					,position:'absolute'
					,'-webkit-transform':'translate('+x+'px,0px)'
				}).attr('data-i',i).append($c);
				$(this).append($b);
				_.$box.push($b);
				_.pos.push(x);
			}
        
			//イベント登録
			$(this).on('touchstart',function(e){
				e.preventDefault();
				//touch start位置の取得
				_.cacheX = e.originalEvent.touches[0].pageX;
				 
			}).on('touchmove',function(e){
				_.cnt++;
				if(_.cnt>2){
					_.cnt = 0;
					var tmX = e.originalEvent.touches[0].pageX;
					var gpX = tmX - _.cacheX;
					if(!_.cancel){
						//左にスライド
						if(gpX < -20){
							_.cancel = true;
							_.slide(1);
							if(_.timerId) _.reset();
						//右にスライド
						}else if(gpX > 20){
							_.cancel = true;
							_.slide(0);		
							if(_.timerId) _.reset();
						}
					}
					_.cacheX = tmX;
				}
			}).on('touchend',function(e){
				_.cnt = 0;
				_.cacheX = 0;
				_.cancel = false;
			//destructor
			}).on('remove',function(e){
				$(this).off('revmove');
				if(_.timerId) clearTimeout(_.timerId);
				_ = null;
				fn = null;

			});

			//autoで動かす
			if(p.auto){
				_.autoRun();
			}

        	//childnodeが一つしかないのでスライドさせずにそのままappend
		}else{
			//componentをappendする
			$(this).css({'display':'-webkit-box','-webkit-box-align':'center','-webkit-box-pack':'center','overflow':'hidden'});
			var $c = $(_.$children[0]).css({'visibility':'visible'});
		}

		return this;
	}
	//create remove event
	$.event.special.remove = {
		remove : function(o){
			if(o.handler){
				o.handler();
			}
		}
	};
})(jQuery);



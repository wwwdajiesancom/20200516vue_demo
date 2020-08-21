let CEI = {
    // 获取事件;
    getEvent:function(e){
        // 事件兼容,window.event(IE中存在的模式)
        return e||window.event;
    },
    // 获取事件源对象,
    getEventElement:function(e){
        var event = this.getEvent(e);
        return event.target||event.srcElement;
    },
    addEvent:function(ele,eventType,hander){
        if(eventType.startsWith('on')){
            eventType = eventType.substr(2);
        }
        if(ele.addEventListener){
            // hander,它里面的this指向ele
            ele.addEventListener(eventType,hander,false);
        }else{
            ele.attachEvent('on' + eventType,function(e){
                // 因为当前function的this指向是window,所以这里面的this需要重新的指向
                hander.apply(ele,[...arguments]);
            });
        }
    }  
};
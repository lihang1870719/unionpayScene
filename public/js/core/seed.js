var process = (function(){
    var mission = [];
    var taskQueue;
    var isFunction = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Function]"
    };
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]"
    };

    // ����promise��
    function deal() {
        while(mission.length > 0) {
            if(curTask = mission.shift()) {
                if(!taskQueue)
                    taskQueue = curTask();
                else
                    taskQueue = taskQueue.then(curTask);
            }
        }
    }
    function load(src) {
        var script = document.createElement("script");
        script.src = src;
        document.body.appendChild(script);
        return this
    }
    return {
        config: {
            autoRun: true,  // ������в�Ϊ��ʱ���Զ�ִ������
            beforeTask: function(){}, // ִ������ǰ����
            afterTask: function(){} // ִ������֮��Ĳ���
        },
        add: function(item, sign) {
            if(isFunction(item)) mission.push(item)
            else if(isArray(item)) sign ? mission = item : mission = mission.concat(item);
            this.config.autoRun && deal();
            return this;
        },
        go: function() {
            if(!this.config.autoRun) {
                deal()
            }
            return this;
        },
        reset: function() {
            mission = [];
            taskQueue = '';
            return this;
        },
        load: load
    }
})();
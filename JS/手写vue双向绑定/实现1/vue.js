function Vue(options){
    this.data = options.data
    new Observer(this.data,this)
}

class Observer {
    constructor(data,vm){
        this.data = data
        Object.kyes(data).forEach((key,index)=>{
            defineReactive(data,key,data[key])
        })
    }
}

function defineReactive(data,key,val){
    let dep = new Dep()
    Object.defineProperties(data,key,{
        configable:true,
        get:function(){
            dep
            return val
        },
        set:function(newVal){
            if(val === newVal){
                return
            } 
            val = newVal
        }
    })
}


// 消息订阅器 
function Dep(){
    this.subs = []
}

Dep.prototype = {
    addsub:function(sub){
        this.subs.add(sub)
    },
    depend:function(){
        if(Dep.target){
            this.addsub(Dep.target)
        }
    },
    removeSub:function(sub){
     // 执行删除逻辑  
    },
    notify:function(){
        this.subs.forEach((sub)=>{
            sub.update()
        })
    }
}




export default Vue
// 准备翻译的语言环境信息
var messages_lj = {
    en: en_lj,
    cn: zh_lj
};
// 通过选项创建 VueI18n 实例
var i18n_lj = new VueI18n({
    locale: 'en', // 设置地区
    messages:messages_lj, // 设置地区信息
});

var vm_lj = new Vue({
    el:'#app',
    i18n:i18n_lj,
    data:{
        metaInfo:{
            title: 'This is the test',
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ]
        },
        name:'jiege'
    },
    methods: {
        qiehuan(){
            this.$i18n.locale = 'cn';
        },
        getI18n(name){
            return this.$i18n.t(name);
        }
    },
    mounted() {
        common.init(this);
    },
});
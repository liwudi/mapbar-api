/**
 * Created by cryst on 2017/6/21.
 */


new Vue({
    el: '#app',
    data: {
        menuData: [],
        frameSrc: '',
        mapDesc: '',
        showCode: false,
        showDesc: true,
        pageCode: ''
    },
    mounted: function () {
        this.getMenu();
    },
    methods: {
        turnDemo: function (item) {
            if(item.type === 'file') {
                this.frameSrc = item.path;
                this.mapDesc = item.desc;
                this.getPageCode(item.path);
                return true;
            }
        },
        getMenu: function () {
            var url = './frame/data.json',
                method = 'GET';
            this.$http({url: url, method: method}).then(function(res) {
                this.menuData = res.data;
                this.menuData.some(this.turnDemo);
            }, function() {
                console.info('error')
            });
        },
        getPageCode: function (url) {
            var method = 'GET';
            this.$http({url: url, method: method}).then(function(res) {
                this.pageCode = res.body;
            }, function() {
                console.info('error')
            });
        },
        setCodeVisible: function (visible) {
            this.showCode = visible;
        },
        setDescVisible: function () {
            this.showDesc = !this.showDesc;
        }
    }
});
/**
 * Created by cryst on 2017/6/21.
 */

new Vue({
    el: '#app',
    data: {
        menuData: [],
        page: {
            path: '',
            desc: '',
            title: '',
            code: ''
        },
        showCode: false,
        showDesc: true,
        active: ''
    },
    mounted: function () {
        this.getMenu();
    },
    methods: {
        setBs: function () {
            setTimeout(function () {
                $('.panel-collapse').each(function () {
                    $(this).collapse('show');
                });
            }, 1000);
        },
        turnDemo: function (item) {
            if (item.code) {
                this.active = item.path;
                this.page = item;
                window.location.hash = encodeURIComponent(item.path);
            } else {
                this.getPageCode(item.path).then(function (code) {
                    item.code = code;
                    this.turnDemo(item);
                });
            }
        },
        getMenu: function () {
            var url = './frame/data.json?' + new Date().valueOf(),
                method = 'GET';
            this.$http({url: url, method: method}).then(function (res) {
                var menuData = this.menuData = res.data;
                this.setBs();
                var hash = window.location.hash;
                    hash = hash ? decodeURIComponent(hash) : null;
                var find = false;
                for (var k in menuData) {
                    var list = menuData[k] || [];
                    for(var i = 0; i < list.length; i ++) {
                        var item = list[i];
                        find = !hash || ('#' + item.path === hash);
                        if(find) {
                            this.turnDemo(item);
                            break;
                        }
                    }
                    if(find) break;
                }
            }, function () {
                console.info('error')
            });
        },

        getPageCode: function (url) {
            return this.$http({url: url + '?' + new Date().valueOf(), method: 'GET'}).then(function (res) {
                return res.body;
            }, function () {
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
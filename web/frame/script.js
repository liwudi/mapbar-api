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
                this.menuData = res.data;
                this.setBs();
                for (var k in this.menuData) {
                    var item = this.menuData[k];
                    if (item && item.length) {
                        this.turnDemo(item[0]);
                        break;
                    }
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
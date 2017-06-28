new Vue({
    el: '#app',
    data: {
        menuData: [],
        page: {
            path: '', desc: '', title: '', code: ''
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
            $('.panel-collapse').collapse('show');
        },
        getHash: function () {
            var hash = window.location.hash;
            return hash ? decodeURIComponent(hash) : null;
        },
        turnDemo: function (item) {
            if (item.code) {
                this.active = item.path;
                this.page = item;
                window.location.hash = encodeURIComponent(item.path);
            } else {
                this.request(item.path).then(function (res) {
                    item.code = res.body;
                    this.turnDemo(item);
                });
            }
        },
        request: function (url) {
            return this.$http({url: url + '?' + new Date().valueOf(), method: 'GET'});
        },
        getMenu: function () {
            this.request('./frame/data.json').then(function (res) {
                var menuData = this.menuData = res.data;
                setTimeout(this.setBs, 1000);
                var hash = this.getHash(), find = false;
                for (var k in menuData) {
                    for (var i = 0, list = menuData[k] || []; i < list.length; i++) {
                        var item = list[i];
                        if (find = !hash || ('#' + item.path === hash)) {
                            this.turnDemo(item);
                            break;
                        }
                    }
                    if (find) break;
                }
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
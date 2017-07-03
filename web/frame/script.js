new Vue({
    el: '#app',
    data: {
        menuData: [],
        page: {
            path: '', code: '', desc: '', title: ''
        },
        showCode: false,
        showDesc: true,
        active: ''
    },
    mounted: function () {
        this.getMenu();
        this.setActive();
        window.addEventListener('hashchange', this.setActive);
    },
    methods: {
        setBs: function () {
            $('.panel-collapse').collapse('show');
        },
        setActive: function () {
            this.active = this.page.path = this.getHash();
        },
        getHash: function () {
            return window.location.hash.replace('#', '') || './demo/map/map.html';
        },
        turnDemo: function (item) {
            if (item.code) {
                this.page.title = item.title;
                this.page.desc = item.desc;
                this.page.code = item.code;
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
                        if (find = !hash || (item.path === hash)) {
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
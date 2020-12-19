const everyDay = new Vue({
    el: "#everyDay",
    data: {
        content: ""
    },
    created() {
        axios({
            url: "/blog/getEveryDay",
            method: "get"
        }).then(resp => {
            this.content = resp.data[0].content
        })
    }
})
const blogList = new Vue({
    el: "#blogList",
    data: {
        list: [],
        limit: 5,
        page: 0
    },
    methods: {
        jumpTo(id) {
            axios({
                url: "/blog/addViews?id=" + id,
                method: "get"
            }).then(resp => {
                console.log(resp)
                location.href = "/blogDetail.html?id=" + id;
            })
        }
    },
    computed: {
        offset() {
            return () => {
                return this.page * this.limit
            }
        }
    },
    created() {
        axios({
            url: `/blog/getBlogByPage?offset=${this.offset()}&limit=${this.limit}`,
            method: "get"
        }).then(resp => {
            blogList.list = resp.data
        });
    }
})
const pageTools = new Vue({
    el: "#pageTools",
    data: {
        total: 0,
        nowPage: 1,
        limit: 5,
        pageList: []
    },
    methods: {
        refresh() {
            const totalPage = Math.ceil((this.total) / this.limit)
            this.pageList = []
            // this.pageList.push({ text: "<<", pageNum: 1 });
            // this.pageList.push({ text: this.nowPage, pageNum: this.nowPage })
            // this.pageList.push({ text: ">>", pageNum: totalPage })
            pageTools.pageList.push({ text: "首页", pageNum: 1 });
            if (pageTools.nowPage - 2 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 2, pageNum: pageTools.nowPage - 2 });
            }
            if (pageTools.nowPage - 1 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 1, pageNum: pageTools.nowPage - 1 });
            }
            pageTools.pageList.push({ text: pageTools.nowPage, pageNum: pageTools.nowPage });
            if (pageTools.nowPage + 1 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 1, pageNum: pageTools.nowPage + 1 });
            }
            if (pageTools.nowPage + 2 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 2, pageNum: pageTools.nowPage + 2 });
            }
            pageTools.pageList.push({ text: "尾页", pageNum: totalPage });
        },
        changePage(pageNum) {
            console.log(222)
            this.nowPage = pageNum;
            this.refresh();
            axios({
                url: `/blog/getBlogByPage?offset=${(pageNum - 1) * this.limit}&limit=${this.limit}`,
                method: "get"
            }).then(res => {
                blogList.list = res.data
            })
        }
    },
    // computed: {
    //     changePage() {
    //         return function (pageNum) {
    //             this.nowPage = pageNum;
    //             this.refresh();
    //             axios({
    //                 url: `/blog/getBlogByPage?offset=${(pageNum - 1) * this.limit}&limit=${this.limit}`,
    //                 method: "get"
    //             }).then(res => {
    //                 blogList.list = res.data
    //             })
    //         }
    //     }
    // },
    created() {
        axios({
            url: "/blog/getTotalBlogCount",
            method: "get"
        }).then(resp => {
            this.total = resp.data[0].count;
            this.refresh()
        })
    }
})

const search = new Vue({
    el: "#search",
    data: {
        search: ""
    },
    methods: {
        sendSearch() {
            axios({
                url: "/blog/search?search=" + this.search,
                method: "get"
            }).then(resp => {
                for (let i = 0; i < resp.data.list.length; i++) {
                    resp.data.list[i].content = resp.data.list[i].content.replace(/<[a-zA-Z]+>/g, "");
                    resp.data.list[i].content = resp.data.list[i].content.replace(/<\/[a-zA-Z]+>/g, "");
                    resp.data.list[i].content = resp.data.list[i].content.replace(/&nbsp|&gt|&lt/g, "");
                    resp.data.list[i].content = resp.data.list[i].content.replace(/;/g, "");

                    resp.data.list[i].content = resp.data.list[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
                    function timeFormat(unixTime) {
                        const date = new Date(unixTime * 1000);
                        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                    }
                    resp.data.list[i].ctime = timeFormat(resp.data.list[i].ctime)
                    if (resp.data.list[i].content.length > 500) {
                        resp.data.list[i].content = resp.data.list[i].content.substr(0, 500)
                    }
                }
                pageTools.total = resp.data.count[0]['count(1)'];
                pageTools.nowPage = 1;
                pageTools.refresh();
                blogList.list = resp.data.list.slice(0, blogList.limit);
                pageTools.changePage = (pageNum) => {

                    console.log(resp.data.list)
                    const newArr = resp.data.list.slice((pageNum - 1) * blogList.limit, pageNum * blogList.limit)
                    console.log(newArr)
                    pageTools.nowPage = pageNum;
                    pageTools.refresh();
                    blogList.list = newArr;
                }
            })
        }
    }
})
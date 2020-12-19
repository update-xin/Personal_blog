const tagsCloud = new Vue({
    el: "#tags_cloud",
    data: {
        tags: []
    },
    computed: {
        randColor() {
            return () => {
                const r = 50 + Math.floor(Math.random() * 200);
                const g = 50 + Math.floor(Math.random() * 200);
                const b = 50 + Math.floor(Math.random() * 200);
                return `rgb(${r},${g},${b})`
            }
        },
        randSize() {
            return () => {
                return (15 + Math.floor(Math.random() * 30)) + 'px'
            }
        }
    },
    created() {
        axios({
            url: "/getTagsCloud",
            method: "get"
        }).then(resp => {
            const result = [];
            for (let i = 0; i < resp.data.length; i++) {
                result.push({ tag: resp.data[i].name, url: "/blog/tags?tags=" + resp.data[i].name })
            }
            tagsCloud.tags = result;
        })
    },
    methods: {
        handleClick(url) {
            axios({
                url: url,
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
});

const hotBlog = new Vue({
    el: "#hot_blog",
    data: {
        blogList: []
    },
    created() {
        axios({
            url: "/blog/getHotBlog",
            method: "get"
        }).then(resp => {
            const result = [];
            for (let i = 0; i < resp.data.length; i++) {
                result.push({ name: resp.data[i].title, url: "/blogDetail.html?id=" + resp.data[i].id })
            }
            this.blogList = result;
        })
    }
})

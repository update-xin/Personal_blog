const blog = new Vue({
    el: "#blogs",
    data: {
        blogList: []
    },
    methods: {
        jumpTo(id) {
            location.href = "/blogDetail.html?id=" + id;
        }
    },
    created() {
        axios({
            url: "/blog/getAllBlogMsg",
            method: "get"
        }).then(resp => {
            this.blogList = resp.data;
        })
    }
}) 
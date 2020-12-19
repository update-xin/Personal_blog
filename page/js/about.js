const blogComment = new Vue({
    el: "#blogComment",
    data: {
        commentList: [],
        randomCode: "",
        randomSvg: null,
        name: "",
        email: "",
        comment: "",
        inputRandomCode: "",
        commentId: 0
    },
    methods: {
        sendComment() {
            if (this.name === "" || this.email === "" || this.comment === "") {
                alert("信息未填写完全");
                return;
            }
            if (this.inputRandomCode.toLowerCase() != this.randomCode.toLowerCase()) {
                alert("二维码输入不正确");
                this.changeCode()
                return;
            }
            let blogId = -1;
            axios({
                url: "/blog/sendComment?blogId=" + blogId + "&commentId=" + this.commentId + "&content=" + this.comment + "&name=" + this.name + "&email=" + this.email,
                method: "get"
            }).then(resp => {
                axios({
                    url: "/blog/getComment?id=" + blogId,
                    method: "get"
                }).then(resp => {
                    this.commentList = resp.data;
                })
                alert("留言成功");
                this.changeCode();
                this.name = "";
                this.email = "";
                this.comment = "";
                this.inputRandomCode = "";
                this.commentId = 0;

            })
        },
        changeCode() {
            axios({
                url: "/blog/getRandomCode",
                method: "get"
            }).then(res => {
                this.randomCode = res.data.text;
                this.randomSvg = res.data.data;
            })
        },
        huifu(commentId) {
            this.commentId = commentId;
        }
    },
    created() {
        this.changeCode();

        axios({
            url: "/blog/getComment?id=-1",
            method: "get"
        }).then(resp => {
            this.commentList = resp.data;
        })



    }
})
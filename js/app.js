new Vue ({
    el: "#app",
    data: {
        todos: [],
        authors: [],
        author_id: null,
        title: null,
        body:null,
        updateId: null,
    },
    methods: {
        getInfor(){
            let base_url = "http://localhost:3000/api/books/";
            axios.get(base_url).then((res)=>{
                console.log(res.data);
                this.todos = res.data;
            })
        },
        createTodo(){
            let base_url = "http://localhost:3000/api/books/";
            let data = {
                author_id:parseInt(this.author_id), 
                title:this.title,
                body:this.body, 
                
            };
            axios.post(base_url, data).then((res)=>{
                this.getInfor();  
            }).catch(()=>{
                console.log("Error 404 not found!")
            });
            this.author_id = "";
            this.title = "";
            this.body = "";
           
        },
        deleteTodo(todos) {
            let id = todos.id;
            let url = "http://localhost:3000/api/books/";
            axios.delete(url + id).then(response => {
                this.todos = response.data.data;
                console.log("Deleted")
            });
        },
        //Edit TODO
        editTodo(todos) {
            this.author_id = todos.author_id;
            this.title = todos.title;
            this.body = todos.body;
            this.updateId = todos.id;
        },
        // Update TODO
        updateTodo(){
            let data = {
                author_id: parseInt(this.author_id),
                title: this.title,
                body: this.body,
            }
            axios.put("http://localhost:3000/api/books/"+ parseInt(this.updateId), data).then(()=>{
                window.location.reload();
            })
            this.isHidden = false
        }
    },
    mounted() {
        this.getInfor();
    },
});
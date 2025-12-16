<script>

    export default{
        // components:{
        //     thisBook: {
        //         BookID: "",
        //         Name: "",
        //         Description: "desc",
        //         ReadingTimeMin: 100,
        //         PageCount: 100,
        //         Language: "",
        //         ReleaseYear: 1999,
        //         ISBN: 123456789876,
        //         CoverImageUrl: "url",
        //         Rating: "5"
        //         }
        // },

        props: {
            seekID:{
                type: String,
                required:true
            },
        },

        data() {return { thisBook: 
            {
            BookID: "",
            Name: "",
            Description: "desc",
            ReadingTimeMin: 100,
            PageCount: 100,
            Language: "",
            ReleaseYear: 1999,
            ISBN: 123456789876,
            CoverImageUrl: "url",
            Rating: "5"
        }
        }
    
        },
        
        beforeMount(){
            this.getDetails()
        },

        methods:{
            async getDetails() {
            this.thisBook = await (await fetch(`http://localhost:8080/books/${this.seekID}`)).json();
            }
        },
    }
    
</script>
<template>
    <table class="table table-striped">
        <tbody>
        <tr>
            <td>Book ID</td>
            <td>{{ thisBook.BookID }}</td>
        </tr>
        <tr>
            <td>Name</td>
            <td>{{ thisBook.Name }}</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>{{ thisBook.Description}}</td>
        </tr>
        <tr>
            <td>ReadingTimeMin</td>
            <td>{{ thisBook.ReadingTimeMin }}</td>
        </tr>
        <tr>
            <td>PageCount</td>
            <td>{{ thisBook.PageCount }}</td>
        </tr>
        <tr>
            <td>Language</td>
            <td>{{ thisBook.Language }}</td>
        </tr>
        <tr>
            <td>Release Year</td>
            <td>{{ thisBook.ReleaseYear }}</td>
        </tr>
        <tr>
            <td>ISBN</td>
            <td>{{ thisBook.ISBN }}</td>
        </tr>
        <tr>
            <td>CoverImageUrl</td>
            <td>{{ thisBook.CoverImageUrl }}</td>
        </tr>

        </tbody>
    </table>
</template>
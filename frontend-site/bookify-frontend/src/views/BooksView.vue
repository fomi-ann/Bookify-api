<script>
    import BooksTable from '../components/BooksTable.vue'
    export default {
        components: {
           BooksTable
        },
        data() {
            return {
                allBooks: [],
                me: null
            }
        },
          computed: {
            isAdmin() {
            return this.me?.IsAdmin === true
            }
        },
    async created() {
    this.allBooks = await (await fetch('http://localhost:8080/books')).json()

    const saved = localStorage.getItem("bookify_user")
    this.me = saved ? JSON.parse(saved) : null
  }
}
</script>


<template>
    <main class="container py-4">
        <div v-if="isAdmin" class="d-flex justify-content-center mb-4">
            <router-link 
                :to="{ name: 'book-create' }" 
                class="btn btn-light border text-secondary px-4"
                title="Create New Book"
            >
                <i class="bi bi-plus-lg"></i> Add New Book
            </router-link>
        </div> 

        <BooksTable :items="allBooks" />
    </main>
</template>

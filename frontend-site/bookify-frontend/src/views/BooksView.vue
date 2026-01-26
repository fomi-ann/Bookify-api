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
    <main>
        <div v-if="isAdmin">
            <router-link :to="{ name: 'book-create' }">
                <button>Create</button>
            </router-link>
        </div> 

        <BooksTable :items="allBooks" />
    </main>
</template>
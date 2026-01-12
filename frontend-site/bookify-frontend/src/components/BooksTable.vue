<script>
    export default {
        name: "BooksTable",
        props: {
            items: Array
        },
        methods: {
            async deleteBook(BookID) {
                await (await fetch(`http://localhost:8080/books/${BookID}`, {method: 'DELETE'}))
                window.location.reload();
            }
        }
    }
</script>

<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Book ID</th>
            <th>Book Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.BookID">
            <td>{{ item.BookID }}</td>
            <td>
                <router-link :to="{name:'book', params: {seekID: item.BookID}}">
                    <button @click="navigate">Click Here</button>
                </router-link>
            </td>
            <td>
                <router-link :to="{name:'books'}">
                    <button @click="deleteBook(item.BookID)">Delete</button>
                </router-link>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped/>
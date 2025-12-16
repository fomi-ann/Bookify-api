<script>
    export default {
        name: "BooksTable",
        props: {
            items: Array
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
        </tr>
        </tbody>
    </table>
</template>

<style scoped/>
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
        <tr>
            <th>Raamatu ID</th>
            <th>Raamatu pealkiri</th>
        </tr>
        <tr v-for="item in items" :key="item.BookID">
            <td>{{ item.BookID }}</td>
            <td>{{ item.Name }}</td>
        </tr>
    </table>
</template>

<style scoped/>
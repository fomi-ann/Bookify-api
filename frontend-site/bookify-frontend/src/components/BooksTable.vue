<script>
export default {
  name: "BooksTable",
  props: {
    items: Array
  },
  data() {
    return {
      me: null
    };
  },
async mounted() {
  const saved = localStorage.getItem("bookify_user");
  this.me = saved ? JSON.parse(saved) : null;
},
  computed: {
    isAdmin() {
      return this.me?.IsAdmin === true;
    }
  },
  methods: {
    async deleteBook(BookID) {
      await (await fetch(`http://localhost:8080/books/${BookID}`, { method: 'DELETE' }))
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
        <th>Details</th>
        <th></th>
        <th></th>
        <th v-if="isAdmin"></th>
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

        <td v-if="isAdmin">
          <router-link :to="{ name: 'book-edit', params: { BookID: item.BookID } }">
            <button>Update</button>
          </router-link>
        </td>

        <td v-if="isAdmin">
          <router-link
            :to="{ name: 'delete-book', params: { seekID: item.BookID } }"
          >
            Delete
          </router-link>
        </td>

      </tr>
    </tbody>
  </table>
  </template>

<style scoped/>
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

<p>BooksTable loaded ✅</p>

<template>
  <div v-if="IsAdmin">
    <router-link :to="{ name: 'book-create' }">
      <button>Create</button>
    </router-link>
</div>

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
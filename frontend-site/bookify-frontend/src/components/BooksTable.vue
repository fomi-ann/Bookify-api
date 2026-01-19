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
    try {
      const res = await fetch("http://localhost:8080/users/sessions/me", {
        credentials: "include"
      });

      if (res.ok) {
        const data = await res.json();
        this.me = Array.isArray(data) ? data[0] : data;
      } else {
        this.me = null;
      }
    } catch (e) {
      this.me = null;
    }
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
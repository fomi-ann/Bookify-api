<template>
  <div>
    <div v-if="loading">Loading details...</div>

<div v-if="list">
  <h1>{{ list.ListName }}</h1>
  <p>{{ list.Comment }}</p>

  <router-link :to="{ name: 'UpdateReadingBookList', params: { id: list.ReadingBookListID }}">
    <button type="button">Modify List</button>
  </router-link>
      
      <router-link to="/reading-book-list">
        <button type="button">Back to My Lists</button>
      </router-link>
    </div>

    <div v-else style="color: red;">
      {{ error || 'List not found.' }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsReadingBookListView",
  data() {
    return {
      list: null,
      loading: true,
      error: ""
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.fetchDetails(id);
  },
  methods: {
    async fetchDetails(id) {
      try {
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to load list details.");
        }
        
        this.list = await res.json();
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching details:", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
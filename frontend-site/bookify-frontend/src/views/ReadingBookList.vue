<template>
  <div>
    <h1>Reading Lists</h1>

    <ul>
      <li v-for="list in lists" :key="list.ReadingBookListID">
        {{ list.ListName }} — {{ list.Comment }}
      </li>
    </ul>

    <h2>Create New List</h2>
    <form @submit.prevent="submitForm">
      <input v-model="listName" placeholder="List name" required />
      <input v-model="comment" placeholder="Comment" />
      <button type="submit">Create List</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lists: [],
      listName: '',
      comment: '',
    };
  },
  mounted() {
    this.fetchLists();
  },
  methods: {
    async fetchLists() {
      try {
        const res = await axios.get('http://localhost:8080/reading-book-list', { withCredentials: true });
        this.lists = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async submitForm() {
      if (!this.listName.trim()) {
        alert('List name cannot be empty');
        return;
      }

      try {
        await axios.post(
          'http://localhost:8080/reading-book-list',
          { ListName: this.listName, Comment: this.comment },
          { withCredentials: true }
        );

        this.listName = '';
        this.comment = '';
        this.fetchLists(); // refresh after creation
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Failed to create reading list');
      }
    },
  },
};
</script>
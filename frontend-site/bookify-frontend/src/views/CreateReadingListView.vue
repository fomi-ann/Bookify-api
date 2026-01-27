<template>
  <div>
    <h1>Create Reading List</h1>
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
      listName: '',
      comment: ''
    };
  },
  methods: {
    async submitForm() {
      if (!this.listName.trim()) {
        alert('List name cannot be empty');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:8080/reading-book-list',
          {
            ListName: this.listName,
            Comment: this.comment
          },
          { withCredentials: true }
        );

        console.log('Created list:', response.data);

        // Redirect to reading lists page after successful creation
        this.$router.push('/reading-book-list');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || 'Failed to create reading list');
      }
    }
  }
};
</script>

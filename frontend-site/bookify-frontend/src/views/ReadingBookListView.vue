<template>
  <div>
    <h1>Reading Lists</h1>

    <div class="list-container">
      <ul v-if="lists.length > 0">
        <li v-for="list in lists" :key="list.ReadingBookListID">
          {{ list.ListName }}
          
          <router-link :to="'/reading-book-list/' + list.ReadingBookListID">
            <button type="button">Details</button>
          </router-link>

          <button type="button" @click="deleteList(list.ReadingBookListID)">
            Delete
          </button>
        </li>
      </ul>

      <p v-else-if="!loading" style="color: gray;">
        No reading lists found.
      </p>
      
      <p v-else>Loading lists...</p>
    </div>

    <hr />

    <div class="form-container">
      <h2>Create New List</h2>
      <form @submit.prevent="submitForm">
        <input v-model="listName" placeholder="List name" required />
        <input v-model="comment" placeholder="Comment" />
        <button type="submit">Create List</button>
      </form>
    </div>
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
    // get by ID
    async fetchDetails(id) {
    this.error = "";
    try {
      const res = await fetch(`http://localhost:8080/readingBookLists/${id}`);
      if (!res.ok) {
        throw new Error("Could not find that list.");
      }

      const data = await res.json();
      this.selectedList = data;
    } catch (err) {
      this.error = err.message;
      console.error(err);
    }
  },
  // get all
    async fetchLists() {
      try {
        const res = await axios.get('http://localhost:8080/reading-book-list', { withCredentials: true });
        this.lists = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    
    // delete
    async deleteList(id) {
      if (!confirm("Are you sure you want to delete this list?")) return;

      try {
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`, {
          method: "DELETE",
        });

        if (res.status === 204) {
          this.lists = this.lists.filter(l => l.ReadingBookListID !== id);
        } else if (res.status === 404) {
          const data = await res.json();
          throw new Error(data.error);
        } else {
          throw new Error("Failed to delete the list.");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Delete Error:", err);
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
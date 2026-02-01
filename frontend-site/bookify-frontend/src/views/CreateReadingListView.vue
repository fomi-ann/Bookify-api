<script>
export default {
  name: "ReadingBookList",
  data() {
    return {
      loading: false,
      error: "",
      success: "",
      // Consolidated data into one object
      readingList: {
        ListName: "",
        Comment: ""
      }
    };
  },
  methods: {
    async create() {
      this.error = "";
      this.success = "";
      this.loading = true;

      const savedUser = localStorage.getItem("bookify_user");
      const user = savedUser ? JSON.parse(savedUser) : null;

      if (!user || !user.UserID) {
        this.error = "User not found. Please log in again.";
        this.loading = false;
        return;
      }
try {
    const res = await fetch("http://localhost:8080/readingBookLists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ListName: this.readingList.ListName,
        Comment: this.readingList.Comment,
        UserID: user.UserID
      })
    });

    if (!res.ok) throw new Error("Failed to create list.");
    this.success = "List created!";
  } catch (e) {
    this.error = e.message;
  } finally {
    this.loading = false;
  }
    }
  }
};
</script>

<template>
  <div>
    <h1>Create Reading List</h1>

    <div v-if="success" style="color: green; margin-bottom: 10px;">
      <strong>Success!</strong> {{ success }}
      <button type="button" @click="success = ''">×</button>
    </div>

    <div v-if="error" style="color: red; margin-bottom: 10px;">
      <strong>Error!</strong> {{ error }}
      <button type="button" @click="error = ''">×</button>
    </div>

    <form @submit.prevent="create">
      <div>
        <label>List Name</label><br>
        <input 
          v-model.trim="readingList.ListName" 
          type="text" 
          placeholder="My Favorites" 
          required 
        />
      </div>

      <div style="margin-top: 10px;">
        <label>Comment</label><br>
        <textarea 
          v-model.trim="readingList.Comment" 
          placeholder="Books I want to read this summer..."
        ></textarea>
      </div>

      <div style="margin-top: 20px;">
        <button type="submit" :disabled="loading">
          {{ loading ? "Creating..." : "Create List" }}
        </button>
      </div>
    </form>
  </div>
</template>
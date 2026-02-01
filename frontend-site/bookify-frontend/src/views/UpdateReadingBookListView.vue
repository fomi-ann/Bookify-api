<template>
  <div>
    <h1>Modify Reading List</h1>

    <form @submit.prevent="updateList">
      <div>
        <label>List Name:</label>
        <input v-model="form.ListName" type="text" required />
      </div>

      <div style="margin-top: 10px;">
        <label>Comment:</label>
        <textarea v-model="form.Comment"></textarea>
      </div>

      <div style="margin-top: 20px;">
        <button type="submit" :disabled="loading">Save Changes</button>
        <button type="button" @click="$router.go(-1)">Cancel</button>
      </div>
    </form>

    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { ListName: "", Comment: "" },
      loading: false,
      error: ""
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await fetch(`http://localhost:8080/reading-book-list/${id}`);
      if (!res.ok) throw new Error("Could not fetch list data.");
      const data = await res.json();
      this.form.ListName = data.ListName;
      this.form.Comment = data.Comment;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async updateList() {
      this.loading = true;
      try {
        const id = this.$route.params.id;
        const res = await fetch(`http://localhost:8080/reading-book-list/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Update failed");
        }

        this.$router.push({ name: 'DetailReadingBookList', params: { id } });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
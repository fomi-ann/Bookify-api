<script>
import defaultCover from '@/assets/default-book.png'

export default {
  props: {
    seekID: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      defaultCover,
      thisBook: {
        BookID: "",
        Name: "",
        Description: "",
        ReadingTimeMin: 0,
        PageCount: 0,
        Language: "",
        ReleaseYear: null,
        ISBN: "",
        CoverImageUrl: "",
        Rating: ""
      }
    }
  },

  beforeMount() {
    this.getDetails()
  },

  methods: {
    async getDetails() {
      this.thisBook = await (
        await fetch(`http://localhost:8080/books/${this.seekID}`)
      ).json()
    },

    onImageError(event) {
      event.target.src = this.defaultCover
    }
  }
}
</script>


<template>
  <div class="container mt-5">
    <div class="row g-5">

      <!-- Book image -->
      <div class="col-md-6 text-center">
        <img
            :src="thisBook.CoverImageUrl || defaultCover"
            @error="onImageError"
            alt="Book cover"
            class="img-fluid rounded"
            style="max-height: 400px;"
            />

      </div>

      <!-- Book info -->
      <div class="col-md-6">


        <h1 class="fw-bold mb-2">
          {{ thisBook.Name }}
        </h1>

        <!-- <p class="text-muted mb-3">
          {{ thisBook.Author }}
        </p> -->

        <p class="mb-4">
          {{ thisBook.Description }}
        </p>

        <!-- Collapse Button -->
        <p class="d-inline-flex gap-1">
          <button
            class="btn btn-outline-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bookDetails"
            aria-expanded="false"
            aria-controls="bookDetails"
          >
            Show details
          </button>
        </p>

        <!-- Book Details-->
        <div class="row">
          <div class="col">
            <div class="collapse multi-collapse" id="bookDetails">
              <div class="card card-body border-0 px-0">

                <table class="table table-sm mb-0">
                  <tbody>
                    <tr>
                      <th scope="row" class="text-muted">Pages</th>
                      <td>{{ thisBook.PageCount }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-muted">Reading time</th>
                      <td>{{ thisBook.ReadingTimeMin }} min</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-muted">Language</th>
                      <td>{{ thisBook.Language }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-muted">Release year</th>
                      <td>{{ thisBook.ReleaseYear }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-muted">ISBN</th>
                      <td>{{ thisBook.ISBN }}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

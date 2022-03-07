<template>
  <h1>chat {{user.name}}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['chat'],
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: mapState(["user"])
}
</script>

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title><h1>Nuxt Chat</h1></v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Enter the room"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  layout: 'empty',
  head: {
    title: "Welcome to Nuxt chat"
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Enter the name',
      v => (v && v.length <= 16) || 'Name must be less than 16 characters',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Enter the room']
  }),
  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if ((this.$refs.form.validate())) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('/chat')
          }
        })
      }
    }
  }
}
</script>

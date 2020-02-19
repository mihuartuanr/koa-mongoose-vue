<template>
  <div>
    Home
  </div>
</template>
<script>
import http from '@/utils/http'

export default {
  async created () {
    const users = await http.get('/users')
    console.info(users)
  }
}
</script>

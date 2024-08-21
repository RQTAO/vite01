<template>
  <div class="profile">
    <img :src="user.avatar" alt="头像" />
    <p>用户名: {{ user.username }}</p>
    <p>邮箱: {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '张三',
        email: 'zhangsan@example.com',
        avatar: 'path/to/avatar.jpg'
      }
    };
  }
}
</script>

<style scoped>
/* 样式 */
</style>
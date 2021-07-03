<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <users-list :fields="fields" :items="users" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import UsersList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      UsersList,
    },
    data() {
      return {
        title: 'pages.users.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.users.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          {key: "name", sortable: true, label:this.$t('tables.users.name')},
          { key: "email", sortable: true, label:this.$t('tables.users.email')},
          { key: "role", sortable: true, label:this.$t('tables.users.role')},
          { key: "created", sortable: true, label:this.$t('tables.users.created')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-user',
          deleteActionName:'users/deleteUserByID',
          title:this.$t('tables.users.title')
        }
      },
      users(){
        return this.$store.getters['users/users']
      }
    },
    created(){
      console.log(this.users);
      this.$store.dispatch('users/getUsers');
    }
  }
</script>

<style lang="scss" scoped>

</style>
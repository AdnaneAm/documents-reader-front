<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <documents-list :fields="fields" :items="documents" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import DocumentsList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      DocumentsList,
    },
    data() {
      return {
        title: this.$t( 'pages.documents.title'),
        userID: this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.documents.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          {key: "name", sortable: true, label:this.$t('tables.documents.name')},
          {key: "language", sortable: true, label:this.$t('tables.documents.language')},
          { key: "type", sortable: true, label:this.$t('tables.documents.type')},
          { key: "status", sortable: true, label:this.$t('tables.documents.status')},
          { key: "created", sortable: true, label:this.$t('tables.documents.date')},
          { key: "approve"},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-user-document',
          deleteActionName:'users/deleteUserDocument',
          title:this.$t('tables.documents.title'),
          userID:this.userID,
        }
      },
      documents(){
        return this.$store.getters['users/userDocuments'](this.userID)
      }
    },
    created(){
      this.$store.dispatch('users/getUserDocuments',this.userID);
    }
  }
</script>

<style lang="scss" scoped>

</style>
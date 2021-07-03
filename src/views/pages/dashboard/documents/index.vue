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
        title: 'pages.documents.title',
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
          { key: "type", sortable: true, label:this.$t('tables.documents.type')},
          { key: "status", sortable: true, label:this.$t('tables.documents.status')},
          { key: "createdAt", sortable: true, label:this.$t('tables.documents.date')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-document',
          deleteActionName:'documents/deleteDocumentByID',
          title:this.$t('tables.documents.title')
        }
      },
      documents(){
        return this.$store.getters['documents/documents']
      }
    },
    created(){
      this.$store.dispatch('documents/getDocuments');
    }
  }
</script>

<style lang="scss" scoped>

</style>
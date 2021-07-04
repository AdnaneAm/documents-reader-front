<template>
  <Layout>
      <PageHeader :title="title" :items="items" />
      <div v-if="resultIsLoading" class="d-flex">
        <p class="mr-2">{{$t('pages.showdocument.description')}}</p>
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div>
        <b-form-textarea
          id="textarea-rows"
          :placeholder="$t('pages.showdocument.placeholder')"
          rows="8"
          v-model="content"
        ></b-form-textarea>
      </div>
      
  </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  export default {
    components: {
      Layout,
      PageHeader,
    },
    data() {
      return {
        userID: this.$route.params.userID,
        documentID: this.$route.params.documentID,
        resultIsLoading: false,
        content:''
      }
    },
    computed: {
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.showdocument.title'),
            active: true
          }
        ]
      },
      user(){
        return this.$store.getters['users/user'](this.userID);
      },
      document(){
        return this.user.documents.filter(doc => doc.id == this.documentID)[0];
      },
      title(){
        return this.$t('pages.showdocument.title') + ' ' +  this.document.name
      }
    },
    async created(){
      this.resultIsLoading = true;
      await this.$store.dispatch('users/readUserDocument', {
        userID:this.userID,
        documentID:this.documentID
      }).then( ({message}) => {
        this.content = message;
        this.resultIsLoading = false;
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
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
          rows="25"
          v-model="content"
        ></b-form-textarea>
        <!-- <b-form-group class="mt-2" :label="$t('pages.showdocument.radioplaceholder')" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-1"
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group> -->
        <b-button class="mt-3" @click="downloadContent" variant="outline-primary">{{$t('pages.showdocument.download')}}</b-button>
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
        content:'',
        options: [
          { text: 'Text (.txt)', value: 'txt' },
          { text: 'PDF', value: 'pdf' },
          { text: 'Word document (.docx)', value: 'docx'},
        ],
        selected:'txt'
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
    methods:{
      downloadContent(){
        var fileURL = window.URL.createObjectURL(new Blob([this.content]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${this.document.name.split('.')[0]}.txt`);
        document.body.appendChild(fileLink);
        fileLink.click();
      }
    },
    async created(){
      this.resultIsLoading = true;
      await this.$store.dispatch('users/readUserDocument', {
        userID:this.userID,
        documentID:this.documentID
      }).then( (content) => {
        this.content = content;
        this.resultIsLoading = false;
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
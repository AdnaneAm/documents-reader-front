<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <documents-form :options="options" :id="documentID"/>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import DocumentsForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      DocumentsForm,
    },
    data() {
      return {
        title: 'pages.editdocument.title',
        documentID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editdocument.title'),
            active: true
          }
        ]
      },
      document(){
        return this.$store.getters['documents/document'](this.documentID);
      },
      options(){
        return {
          title: this.$t('pages.edidocument.title'),
          description: this.$t('pages.editdocument.description'),
          updateItemAction:'documents/setDocument',
          editItemButton:'pages.editdocument.title',
          redirectRouteName:'documents',
          initialItem:Object.assign({},this.document),
          formFields:[
            {
              id:'type',
              key:'type',
              label:'forms.documents.type',
              labelFor:'type',
              type:'select',
              options:[
                {
                  value:'facture',
                  text:this.$t('forms.documents.typeOptions.invoice')
                },
                {
                  value:'relevé bancaire',
                  text:this.$t('forms.documents.typeOptions.bankstatement')
                },
                {
                  value:'relevé bancaire',
                  text:this.$t('forms.documents.typeOptions.workcertificate')
                },
                {
                  value:'autres',
                  text:this.$t('forms.documents.typeOptions.other')
                },
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
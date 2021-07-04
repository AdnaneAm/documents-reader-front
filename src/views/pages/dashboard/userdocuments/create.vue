<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <documents-form :options="options" />
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
        title: this.$t( 'pages.adddocument.title'),
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.adddocument.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.adddocument.title'),
          description: this.$t('pages.adddocument.description'),
          createItemAction:'documents/createDocument',
          createItemButton:'pages.adddocument.button',
          redirectRouteName:'documents',
          initialItem:{
            type:'',
          },
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
            },
            {
              id:'document',
              key:'document',
              label:'forms.documents.document',
              labelFor:'document',
              type:'file'
            }
          ]
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>
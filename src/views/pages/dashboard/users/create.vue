<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <users-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import UsersForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      UsersForm,
    },
    data() {
      return {
        title: 'pages.adduser.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.adduser.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.adduser.title'),
          description: this.$t('pages.adduser.description'),
          createItemAction:'users/createUser',
          createItemButton:'pages.adduser.button',
          redirectRouteName:'users',
          initialItem:{
            type:'',
          },
          formFields:[
            {
              id:'type',
              key:'type',
              label:'forms.users.type',
              labelFor:'type',
              type:'select',
              options:[
                {
                  value:'facture',
                  text:this.$t('forms.users.typeOptions.invoice')
                },
                {
                  value:'relevé bancaire',
                  text:this.$t('forms.users.typeOptions.bankstatement')
                },
                {
                  value:'relevé bancaire',
                  text:this.$t('forms.users.typeOptions.workcertificate')
                },
                {
                  value:'autres',
                  text:this.$t('forms.users.typeOptions.other')
                },
              ]
            },
            {
              id:'user',
              key:'user',
              label:'forms.users.user',
              labelFor:'user',
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
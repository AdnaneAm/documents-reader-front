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
        title: this.$t( 'pages.adduser.title'),
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
            name:'',
            email:'',
            password:'',
            role:'',
          },
          formFields:[
            {
              id:'name',
              key:'name',
              label:'forms.users.name',
              labelFor:'name',
              type:'text',
            },
            {
              id:'email',
              key:'email',
              label:'forms.users.email',
              labelFor:'email',
              type:'text',
            },
            {
              id:'password',
              key:'password',
              label:'forms.users.password',
              labelFor:'password',
              type:'password'
            },
            {
              id:'role',
              key:'role',
              label:'forms.users.role',
              labelFor:'type',
              type:'select',
              options:[
                {
                  value:'admin',
                  text:this.$t('forms.users.roleOptions.admin')
                },
                {
                  value:'user',
                  text:this.$t('forms.users.roleOptions.user')
                }
              ]
            }
          ]
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>
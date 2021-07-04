<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <users-form :options="options" :id="userID"/>
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
        title: this.$t( 'pages.edituser.title'),
        userID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.edituser.title'),
            active: true
          }
        ]
      },
      user(){
        return this.$store.getters['users/user'](this.userID);
      },
      options(){
        return {
          title: this.$t('pages.edituser.title'),
          description: this.$t('pages.edituser.description'),
          updateItemAction:'users/setUser',
          editItemButton:'pages.edituser.title',
          redirectRouteName:'users',
          initialItem:Object.assign({},this.user),
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
            // {
            //   id:'password',
            //   key:'password',
            //   label:'forms.users.password',
            //   labelFor:'password',
            //   type:'text'
            // },
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
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
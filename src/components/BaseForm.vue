<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{{options.title}}</h4>
          <p class="card-title-desc">
            {{options.description}}
          </p>
          <div class="row">
            <div class="col-12">
              <form @submit.prevent="createOrUpdateItem" class="form-horizontal" role="form">
                <b-form-group
                  v-for="field in options.formFields"
                  :key="field.id"
                  :id="field.id"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  :label="$t(field.label)"
                  :label-for="field.labelFor"
                >
                  <b-form-select
                   v-if="field.type=='select'" 
                   :for="field.labelFor" 
                   v-model="item[field.key]"
                   :placeholder="field.label"
                   :options="field.options"
                   :value="item[field.key]"
                   @change="field.affects && $emit('select-change', {
                     field:field.affects,
                     value:item[field.key]
                   })"
                  >
                  </b-form-select>
                  <b-form-checkbox
                    v-else-if="field.type=='check'"
                    v-model="item[field.key]"
                    :value="true"
                    :unchecked-value="false"
                  >
                    {{$t(field.check_message)}}
                  </b-form-checkbox>
                  <b-form-file
                    v-else-if="field.type=='file'"
                    v-model="item[field.key]"
                    :state="Boolean(item[field.key])"
                    :placeholder="$t('forms.documents.documentPlaceholder')"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                  <b-form-input v-else :for="field.labelFor" v-model="item[field.key]" :type="field.type">
                  </b-form-input>
                </b-form-group>
                <button class="btn btn-primary" type="submit">{{submitMessage}}</button>
              </form>
            </div>
          </div>
          <!-- end row -->
        </div>
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item:this.options.initialItem,
      }
    },
    computed: {
      submitMessage() {
        if(this.id){
          return this.$t(this.options.editItemButton)
        }
        else{
          return this.$t(this.options.createItemButton)
        }
      },
    },
    props: {
      options: {
        type: Object,
        required:true,
      },
      id:{
        type:String,
        required:false,
        default:null
      }
    },
    methods:{
      createOrUpdateItem(){
        if(this.id){
          this.$store.dispatch(this.options.updateItemAction,this.item)
        }
        else{
          this.$store.dispatch(this.options.createItemAction,this.item);
        }
        this.$router.push({name:this.options.redirectRouteName})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{options.title}}</h4>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
            </label>
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_filter" class="dataTables_filter text-md-right">
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input
                v-model="filter"
                type="search"
                class="form-control form-control-sm ml-2"
              ></b-form-input>
            </label>
          </div>
        </div>
        <!-- End search -->
      </div>
      <div class="table-responsive">
        <b-table
          :items="items"
          :fields="fields"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        > 
          <template v-slot:cell(action)="row">
            <router-link
              v-if="userRole == 'admin' && row.item.status == 'approved' && row.item.path.split('.')[1] != 'pdf'"
              class="text-dark mr-2"
              v-b-tooltip.hover
              data-toggle="tooltip"
              :title="$t('tables.documents.extract')"
              :to="{name:'read-user-document',params:{userID:options.userID, documentID: row.item.id}}"
            >
              <i class="ri-qr-scan-line font-size-18"></i>
            </router-link>
            <span v-if="resultIsLoading">Loading</span>
            <router-link
              v-if="userRole == 'admin' && row.item.email"
              :to="{name:'user-documents',params:{id:row.item.id}}"
              class="text-primary mr-2"
              v-b-tooltip.hover
              data-toggle="tooltip"
              :title="$t('tables.documents.showdocuments')"
            >
              <i class="ri-attachment-line font-size-18"></i>
            </router-link>
            <a
            v-if="row.item.path" 
            class="mr-2 text-primary"
            target="_blank" 
            v-b-tooltip.hover
            data-toggle="tooltip"
            :title="$t('tables.documents.show')"
            :href="`${apiUrl}${row.item.path.substr(7)}`">
              <i class="ri-eye-line font-size-18"></i>
            </a>
            <router-link
              :to="{name:options.editRouteName,params:{id:row.item.id}}"
              class="mr-2 text-secondary"
              v-b-tooltip.hover
              data-toggle="tooltip"
              :title="$t('tables.documents.edit')"
            >
            <i class="ri-edit-line font-size-18"></i>
            </router-link>
            <a 
              @click="deleteRow(row.item.id)" 
              href="javascript:void(0);" 
              class="text-danger" 
              v-b-tooltip.hover 
              :title="$t('tables.documents.delete')"
            >
              <i class="ri-delete-bin-line font-size-18"></i>
            </a>
          </template>
          <template #cell(created)="data">
            {{ data.value ? data.value.substr(0,10) : ''}}
          </template>
          <template #cell(status)="data">
            {{ $t(`forms.documents.statusOptions.${data.value}`) }}
          </template>
          <template #cell(role)="data">
            {{ $t(`forms.users.roleOptions.${data.value}`) }}
          </template>
          <template #cell(approve)="data">
            <a
              v-if="data.item.status != 'approved'"
              @click.prevent="changeStatus({status:'approved',documentID:data.item.id})"
              class="mr-2 text-success"
              v-b-tooltip.hover
              data-toggle="tooltip"
              title="Approve"
            >
              <i class="ri-check-line font-size-18"></i>
            </a>
            <a 
              @click.prevent="changeStatus({status:'declined',documentID:data.item.id})"
              class="mr-2 text-danger"
              v-b-tooltip.hover
              data-toggle="tooltip"
              title="Decline"
            >      
              <i class="ri-close-fill font-size-18"></i>   
            </a>
          </template>
          <template #cell(language)="data">
            {{$t(`forms.documents.languageOptions.${data.value}`)}}
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  props: {
    items: {
      type: Array,
      required:true
    },
    fields:{
      type: Array,
      required:true
    },
    options:{
      type: Object,
      required:true
    }
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      userRole: 'user',
      resultIsLoading: false,
      apiUrl: process.env.VUE_APP_API_BASE_URL,
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  created(){
    this.$store.dispatch('auth/validate').then( ({user}) => {
      this.userRole = user.role;
    });
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    /**
     * @brief Delete farmer when delete button is clicked 
     */
    deleteRow(rowId){
      if(this.options.userID){
        this.$store.dispatch(this.options.deleteActionName,{
          userID:this.options.userID,
          documentID: rowId
        });
      }
      else{
        this.$store.dispatch(this.options.deleteActionName,rowId);
      }
    },
    async changeStatus(payload){
      payload.userID = this.options.userID;
      await this.$store.dispatch('users/updateUserDocument', payload);
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>
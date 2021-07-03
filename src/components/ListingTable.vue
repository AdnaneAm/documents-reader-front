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
            <a 
            class="mr-3 text-primary"
            target="_blank" 
            :href="`http://localhost:3000/${row.item.path.substr(7)}`">
              <i class="mdi mdi-eye font-size-18"></i>
            </a>
            <router-link
              :to="{name:options.editRouteName,params:{id:row.item._id}}"
              class="mr-3 text-primary"
              v-b-tooltip.hover
              data-toggle="tooltip"
              title="Edit"
            >
            <i class="mdi mdi-pencil font-size-18"></i>
            </router-link>
            <a @click="deleteRow(row.item._id)" href="javascript:void(0);" class="text-danger" v-b-tooltip.hover title="Delete">
              <i class="mdi mdi-trash-can font-size-18"></i>
            </a>
          </template>
          <template #cell(createDate)="data">
            {{data.value.substr(0,10)}}
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
      userRole: 'user'
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
      this.$store.dispatch(this.options.deleteActionName,rowId);
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>
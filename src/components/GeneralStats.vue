<template>
  <div class="row">
    <div class="col-md-3 col-sm-6" v-for="(data, index) in statData" :key="index">
      <div class="card">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="text-truncate font-size-14 mb-2">{{data.title}}</p>
              <h4 class="mb-0">{{data.value}}</h4>
            </div>
            <div class="text-primary">
              <i :class="`${data.icon} font-size-24`"></i>
            </div>
          </div>
        </div>
        <div class="card-body border-top py-3">
          <div class="text-truncate">
            <span class="badge badge-soft-success font-size-11">
              <i class="mdi mdi-menu-up"></i>
              {{data.subvalue}}
            </span>
            <span class="text-muted ml-2">{{$t('stats.documents.previous')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Widget Component
 */
export default {
  data(){
    return {
      cropsCount:0,
    }
  },
  computed:{
    statData(){
      return [
        {
          title: this.$t('stats.documents.total'),
          icon: "ri-attachment-line",
          value: this.documentsCount('all'),
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.documents.pending'),
          icon: "ri-time-line",
          value: this.documentsCount('pending'),
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.documents.rejected'),
          icon: "ri-delete-bin-7-line",
          value: this.documentsCount('declined'),
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.documents.approved'),
          icon: "ri-check-double-line",
          value: this.documentsCount('approved'),
          subvalue: " 2.4% "
        }
      ]
    }
  },
  methods:{
    documentsCount(status){
      return this.$store.getters['documents/documentsCount'](status);
    }
  },
  created(){
    this.$store.dispatch('documents/getDocuments');
  }
};
</script>
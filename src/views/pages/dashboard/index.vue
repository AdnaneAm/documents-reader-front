<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <GeneralStats />
  </Layout>
</template>


<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import GeneralStats from "@/components/GeneralStats";
export default {
  components: {
    Layout,
    PageHeader,
    GeneralStats,
  },
  data() {
    return {
      title: "Tableau de bord",
      items: [
        {
          text: "Documents reader"
        },
        {
          text: "Tableau de bord",
          active: true
        }
      ]
    };
  }
};
</script>
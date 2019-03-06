<template>
  <Page>
    <ActionBar backgroundColor="#FF8063" title="Photo App"/>
    <StackLayout orientation="vertical" backgroundColor="#ffffff">
      <Button class="take" text="Create" @tap="createCollection"/>
      <ScrollView orientation="vertical">
        <StackLayout orientation="vertical" backgroundColor="#ffffff">
          <Label v-for="collection in collections" :text="collection.name" @tap="goToCollection(collection)"></Label>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
  import Collection from "./Collection";

  export default {
    name: "Collections",
    components:{
      Collection
    },
    data(){
      return {
        collections: this.$store.getters.collections
      }
    },
    methods:{
      createCollection(){
        prompt({
          title: "Create a new collection",
          message: "Provide a name for the collection",
          okButtonText: "Create",
          cancelButtonText: "Cancel",
          defaultText: "My collection",
        }).then(result => {
          if(result.result){
            let collection = {
              'name': result.text,
              'images': []
            };
            this.$store.commit('addCollection', collection);
          }
        });
      },
      goToCollection(_collection){
        this.$navigateTo(Collection, {
          props: {
            collection: _collection,
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
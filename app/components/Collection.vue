<template>
  <Page>
    <ActionBar backgroundColor="#FF8063" :title="collection.name"/>
    <StackLayout orientation="vertical" backgroundColor="#ffffff">
      <ScrollView orientation="vertical">
        <WrapLayout backgroundColor="#ffffff" class="images-container">
          <AbsoluteLayout backgroundColor="#3c495e" class="picture" v-for="image in collection_images" @tap="askAction(image)">
            <Image :src="image.file" top="0" left="0" width="100%" height="100%" stretch="aspectFit"></Image>
            <Label textWrap="true" :text="image.name" top="0" left="0" width="100%"/>
          </AbsoluteLayout>
        </WrapLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
  export default {
    name: "Collection",
    props: ['collection'],
    data(){
      return {
        collection_images: this.$store.getters.collectionImages(this.collection)
      }
    },
    methods: {
      askAction(_image){
        action("Your message", "Cancel button text", ["Delete from collection"])
          .then(result => {
            alert('Can\'t be deleted from a collection for now.... But can be moved from a collection to another on the first screen. IN PROGRESS');
          });
      }
    }
  }
</script>

<style scoped>

</style>
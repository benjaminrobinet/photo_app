<template>
  <Page>
    <ActionBar backgroundColor="#FF8063" title="Photo App"/>
    <StackLayout orientation="vertical" backgroundColor="#ffffff">
      <Button class="take" text="Take" @tap="openCamera" />
      <ScrollView orientation="vertical">
        <WrapLayout backgroundColor="#ffffff" class="images-container">
            <AbsoluteLayout backgroundColor="#3c495e" class="picture" v-for="image in images" @tap="askAction(image)">
              <Image :src="image.file" top="0" left="0" width="100%" height="100%" stretch="aspectFit"></Image>
              <Label textWrap="true" :text="image.name" top="0" left="0" width="100%"/>
            </AbsoluteLayout>
        </WrapLayout>
      </ScrollView>
      <Button class="take" text="Collections" @tap="goToCollections" />
    </StackLayout>
  </Page>
</template>

<script >
  import * as camera from "nativescript-camera";
  import toBase64String, {ImageSource} from "tns-core-modules/image-source";
  import Collections from "./Collections";

  export default {
    components:{
      Collections
    },
    data() {
      return {
        images: this.$store.getters.images,
        msg: 'Hello World!'
      }
    },
    methods:{
      openCamera(){
        if(camera.isAvailable()){
          camera.requestPermissions().then(function success(){
            console.log("Success");
            this.savePhoto();
          }, function failure(){
            console.log("No....");
          });
        } else {
          this.savePhoto();
        }
      },
      savePhoto(){
        confirm({
          title: "Confirm save",
          message: "Are you sure you want to save this picture ?",
          okButtonText: "Save",
          cancelButtonText: "Cancel"
        }).then(result => {
          if(result){
            // let source = new ImageSource();
            // source.fromAsset('~/assets/images/NativeScript-Vue.png')
            this.$store.commit('addImage', {'name': 'IMG_' + Date.now() + '.png', 'file': '~/assets/images/NativeScript-Vue.png', 'collection_name': null});
          }
        });
      },
      askAction(image){
        action("What do you want to do ?", "Cancel", ["Delete", "Move to collection..."])
          .then(result => {
            // console.log(result);
            if(result === "Delete"){
              // console.log(image);
              this.$store.commit('removeImageByName', image);
            } else if (result === "Move to collection..."){
              console.log('move');
              let collections = this.$store.getters.collections;
              let collectionsName = [];
              collections.forEach(collection => {
                collectionsName.push(collection.name);
              });
              action("Choose the destination collection", "Cancel", collectionsName)
                .then(result => {
                  let collection = collections.find(elem => elem.name === result);
                  this.$store.commit('addImageCollection', {collection: collection, image: image});
                });
            }
          });
      },
      goToCollections(){
        return this.$navigateTo(Collections);
      }
    }
  }
</script>

<style lang="scss">
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .take{
    width: 100;
    height: 40;
    border-radius: 20;
    background-color: #ffffff;
    border-width: 2;
    border-style: solid;
    border-color: #ff8063;
    margin: 10;
    color: #FF8063;
  }

  .picture{
    width: 25%;
    height: 110;

    Label{
      text-align: center;
      background-color: transparent;
      color: #ffffff;
    }
  }

  .images-container{
    margin: auto;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>

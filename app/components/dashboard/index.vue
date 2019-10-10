<template>
  <Page actionBarHidden="true">
    <GridLayout class="app" columns="*" rows="auto, *, *, auto">
      <Label class="fas title" textWrap="true" :text="`${String.fromCharCode(0xf2bd)} Mi Cuenta`"
             col="0" row="0"/>
      <Image :src="cameraImage" id="image" stretch="aspectFit" margin="10" row="1" v-if="cameraImage"/>
      <Image :src="photo" id="image" stretch="aspectFill" margin="10" row="1" v-else-if="photo" />
      <FlexboxLayout class="form" flexDirection="column" col="0" row="2" verticalAlignment="middle">
        <TextField v-model="displayName" autocapitalizationType="words"
                   hint="Ej: Alexander Von Humboldt" flexGrow="1"/>
        <Button :class="classes" :text="saveButtonText" @tap="save" flexGrow="1"/>
        <Button text="Take pic" @tap="onTakePictureTap" flexGrow="1"/>
      </FlexboxLayout>
      <Menu col="0" row="3" :profileActive="true"></Menu>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {takePicture, requestPermissions} from 'nativescript-camera';
import {ImageSource} from 'tns-core-modules/image-source';
import * as constants from '@/store/constants';
import Menu from '@/components/common/Menu'
import {knownFolders, path, File} from 'tns-core-modules/file-system';

@Component({
  computed: {
    ...mapState({
      name: state => state['Session'].displayName,
      profileUpdated: state => state['Session'].profileUpdated,
      email: state => state['Session'].email,
    })
  },
  components: {
    Menu,
  }
})
export default class Dashboard extends Vue {
  cameraImage = null;
  name: string;
  profileUpdated: boolean;downloadFile
  displayName: string = null;
  email: string;
  photoURL: string = null;
  photo: string = null;

  save() {
    this.$firebase.storage.uploadFile({
      remoteFullPath: `avatar/${this.email}.jpg`,
      localFile: File.fromPath(this.photoURL),
    })
      .then(uploadedFile => {
        this.$store.dispatch(constants.SESSION_SAVE_ACCOUNT_INFO, {
          displayName: this.displayName,
          photoURL: `avatar/${this.email}.png`
        });
      }, console.error);
  }

  get classes() {
    const classes = ['fas', 'btn', 'btn-normal'];
    if (this.profileUpdated)
      classes.push('btn-updated');
    return classes;
  }

  get saveButtonText() {
    if (this.profileUpdated)
      return `${String.fromCharCode(0xf560)}  Guardado`;
    return `${String.fromCharCode(0xf0c7)}  Guardar`;
  }

  @Watch('profileUpdated')
  onProfileUpdated() {
    setTimeout(() => {
      this.$store.commit(constants.SESSION_SET_PROPERTY, {
        property: 'profileUpdated',
        value: false,
      })
    }, 2000);
  }

  onTakePictureTap(args) {
    let page = (args.object).page;
    requestPermissions().then(() => {
      takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false,
        allowsEditing: false,
      })
        .then((imageAsset) => {
          this.cameraImage = imageAsset;
          const source = new ImageSource();
          source.fromAsset(imageAsset)
            .then((imageSource: ImageSource) => {
              const folderPath = knownFolders.documents().path;
              const fileName = `${this.email}.jpg`;
              const filePath = path.join(folderPath, fileName);
              const saved: boolean = imageSource.saveToFile(filePath, 'jpg');
              if (saved) {
                console.log(`Saved: ${filePath}`);
                this.photoURL = filePath;
                console.log('Image saved successfully!');
              }
            });
        })
        .catch(console.error)
    })
  }

  mounted() {
    this.displayName = this.name;
    this.$firebase.storage.getDownloadUrl({
      remoteFullPath: `avatar/${this.email}.jpg`
    })
      .then(url => this.photo = url);
  }
}

</script>

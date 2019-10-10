<template>
  <Page actionBarHidden="true">
    <GridLayout class="app" columns="*" rows="auto, *, auto">
      <Label class="fas title" textWrap="true" :text="`${String.fromCharCode(0xf030)} Diagnóstico`"
             col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
        <GridLayout rows="*, auto, auto, auto, auto">
          <Image row="0" :src="cameraImage" id="image" stretch="aspectFit" margin="10"/>
          <TextView row="1" :text="result" editable="false" v-if="result"></TextView>>
          <Button row="2"  text="Take Picture" @tap="onTakePictureTap"  padding="10"/>
          <Button row="3"  text="Recognize" @tap="onRecognize"  padding="10"/>
          <Button row="4"  text="Save" @tap="save"  padding="10"/>
        </GridLayout>
      </FlexboxLayout>
      <Menu col="0" row="2" :cameraActive="true"></Menu>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {takePicture, requestPermissions} from 'nativescript-camera';
import { MLKitCustomModelResult, useCustomModel } from "nativescript-plugin-firebase/mlkit/custommodel";
import Menu from '@/components/common/Menu';
import {ImageSource} from 'tns-core-modules/image-source';

@Component({
  components: {
    Menu,
  }
})
export default class Camera extends Vue {
  cameraImage = null;
  width = 320;
  height = 320;
  keepAspectRatio: boolean = true;
  saveToGallery: boolean = false;
  allowsEditing: boolean = false;
  image: ImageSource = null;
  result = null;

  onTakePictureTap(args) {
    let page = (args.object).page;
    requestPermissions().then(() => {
      takePicture({
        width: this.width,
        height: this.height,
        keepAspectRatio: this.keepAspectRatio,
        saveToGallery: this.saveToGallery,
        allowsEditing: this.allowsEditing,
      })
        .then((imageAsset) => {
          this.cameraImage = imageAsset;
          new ImageSource().fromAsset(imageAsset)
            .then(imageSource => {
              this.image = imageSource;
            });
        })
        .catch(console.error)
    })
  }

  onRecognize() {
    useCustomModel({
      image: this.image,
      localModelFile: '~/custommodel/inception_v3_quant.tflite',
      labelsFile: '~/custommodel/inception_labels.txt',
      modelInput: [{
        shape: [1, 299, 299, 3],
        type: 'QUANT',
      }],
    })
      .then((result: MLKitCustomModelResult) => {
        console.log(JSON.stringify(result.result));
        this.result = '';
        result.result.forEach(element => {
          this.result += `${element.text} → ${(element.confidence * 100).toFixed(2)}%\n`;
        });
      })
      .catch(console.error);
  }

  save() {

  }
}
</script>

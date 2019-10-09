<template>
  <Page actionBarHidden="true">
    <GridLayout class="app" columns="*" rows="auto, *, auto">
      <Label class="fas title" textWrap="true" :text="`${String.fromCharCode(0xf030)} Diagnóstico`"
             col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
        <GridLayout rows="auto, *, auto, auto, auto">
          <StackLayout row="0" orientation="vertical" padding="5">
            <StackLayout orientation="horizontal" row="0" padding="5">
              <Label text="saveToGallery" />
              <Switch v-model="saveToGallery"/>
            </StackLayout>
            <StackLayout android:visibility="collapsed" orientation="horizontal" row="0" padding="5">
              <Label text="allowsEditing" />
              <Switch v-model="allowsEditing"/>
            </StackLayout>
            <StackLayout orientation="horizontal" row="0" padding="5">
              <Label text="keepAspectRatio" />
              <Switch v-model="keepAspectRatio"/>
            </StackLayout>
            <StackLayout orientation="horizontal" padding="5">
              <Label text="width"></Label>
              <TextField hint="Enter width" keyboardType="number" v-model="width" class="input"></TextField>
              <Label text="height"></Label>
              <TextField hint="Enter height" keyboardType="number" v-model="height" class="input"></TextField>
            </StackLayout>
          </StackLayout>
          <Image row="1" :src="cameraImage" id="image" stretch="aspectFit" margin="10"/>
          <TextView row="2" :text="labelText" editable="false"></TextView>>
          <Button row="3"  text="Take Picture" @tap="onTakePictureTap"  padding="10"/>
          <Button row="4"  text="Recognize" @tap="onRecognize"  padding="10"/>
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
  height = 240;
  keepAspectRatio: boolean = true;
  saveToGallery: boolean = false;
  allowsEditing: boolean = false;
  labelText: string = '';
  image: ImageSource = null;

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
          imageAsset.getImageAsync((nativeImage) => {
            let scale = 1;
            let actualWidth = 0;
            let actualHeight = 0;
            if(imageAsset.android) {
              scale = nativeImage.getDensity() / android.util.DisplayMetrics.DENSITY_DEFAULT;
              actualWidth = nativeImage.getWidth();
              actualHeight = nativeImage.getHeight();
            } else {
              scale = nativeImage.scale;
              actualWidth = nativeImage.size.width * scale;
              actualHeight = nativeImage.size.height * scale;
            }
            this.labelText = `Displayed size: ${actualWidth}x${actualHeight} with scale ${scale}\nImageSize: ${Math.round(actualWidth/scale)}x${Math.round(actualHeight/scale)}`;
          })
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
      .then((result: MLKitCustomModelResult) => console.log(JSON.stringify(result.result)))
      .catch(console.error)
  }
}
</script>

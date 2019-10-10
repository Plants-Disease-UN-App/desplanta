import {Component, Vue} from 'vue-property-decorator';
import {PropertyChangeData} from 'tns-core-modules/data/observable';

export {Component};
export abstract class AbstractMlkitviewComponent extends Vue {
  torchOn: boolean = false;

  toggleTorch(args: PropertyChangeData): void {
    if (args.value !== null && args.value !== this.torchOn) {
      this.torchOn = args.value;
    }
  }
}

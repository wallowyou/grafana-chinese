import coreModule from 'app/core/core_module';

const obj2string = (obj: any) => {
  return Object.keys(obj)
    .reduce((acc, curr) => acc.concat(curr + '=' + obj[curr]), [])
    .join();
};

export class GeneralTabCtrl {
  panelCtrl: any;

  /** @ngInject */
  constructor($scope: any) {
    this.panelCtrl = $scope.ctrl;
    // this.onColorChange = this.onColorChange.bind(this);
    const updatePanel = () => {
      console.log('panel.render()');
      // console.log(this);
      this.panelCtrl.panel.render();
    };
    const generateValueFromPanel = (scope: any) => {
      const { panel } = scope.ctrl;
      const panelPropsToTrack = [
        'title',
        'description',
        'transparent',
        'borderWidth',
        'boderColor',
        'borderRadius',
        'repeat',
        'repeatDirection',
        'minSpan',
      ];
      const panelPropsString = panelPropsToTrack
        .map(prop => prop + '=' + (panel[prop] && panel[prop].toString ? panel[prop].toString() : panel[prop]))
        .join();
      const panelLinks = panel.links || [];
      const panelLinksString = panelLinks.map(obj2string).join();
      return panelPropsString + panelLinksString;
    };
    $scope.$watch(generateValueFromPanel, updatePanel, true);
  }
  // onColorChange(newColor: string) {
  //   console.log(newColor);
  //   this.panelCtrl.panel.borderColor = newColor;
  // }
}

/** @ngInject */
export function generalTab() {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/panel/partials/general_tab.html',
    controller: GeneralTabCtrl,
  };
}

coreModule.directive('panelGeneralTab', generalTab);

import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import coreModule from 'app/core/core_module';
import { DashboardModel } from 'app/features/dashboard/state';
import DatasourceSrv from '../plugins/datasource_srv';
import appEvents from 'app/core/app_events';

export class AnnotationsEditorCtrl {
  mode: any;
  datasources: any;
  annotations: any;
  currentAnnotation: any;
  currentDatasource: any;
  currentIsNew: any;
  dashboard: DashboardModel;

  annotationDefaults: any = {
    name: '',
    datasource: null,
    iconColor: 'rgba(255, 96, 96, 1)',
    enable: true,
    showIn: 0,
    hide: false,
  };

  // emptyListCta = {
  //   title: 'There are no custom annotation queries added yet',
  //   buttonIcon: 'gicon gicon-annotation',
  //   buttonTitle: 'Add Annotation Query',
  //   infoBox: {
  //     __html: `<p>Annotations provide a way to integrate event data into your graphs. They are visualized as vertical lines
  //   and icons on all graph panels. When you hover over an annotation icon you can get event text &amp; tags for
  //   the event. You can add annotation events directly from grafana by holding CTRL or CMD + click on graph (or
  //   drag region). These will be stored in Grafana's annotation database.
  // </p>
  // Checkout the
  // <a class='external-link' target='_blank' href='http://docs.grafana.org/reference/annotations/'
  //   >Annotations documentation</a
  // >
  // for more information.`,
  //   },
  //   infoBoxTitle: 'What are annotations?',
  // };
  emptyListCta = {
    title: '尚未添加自定义注释查询',
    buttonIcon: 'gicon gicon-annotation',
    buttonTitle: '添加注释查询',
    infoBox: {
      __html: `<p>注解提供了一种将事件数据集成到图形中的方法。它们在所有图形面板上均显示为垂直线和图标。将鼠标悬停在注解图标上时，您可以获取事件的文本和标签。
      您可以通过按住CTRL或CMD +单击图形（或拖动区域）直接添加注解事件。 这些将存储在系统的注解数据库中。
  </p>
查看
  <a class='external-link' target='_blank' href='http://docs.grafana.org/reference/annotations/'
    >注解文档</a
  >
  了解更多`,
    },
    infoBoxTitle: '什么是注解?',
  };

  showOptions: any = [{ text: 'All Panels', value: 0 }, { text: 'Specific Panels', value: 1 }];

  /** @ngInject */
  constructor(private $scope: any, private datasourceSrv: DatasourceSrv) {
    $scope.ctrl = this;

    this.dashboard = $scope.dashboard;
    this.mode = 'list';
    this.datasources = datasourceSrv.getAnnotationSources();
    this.annotations = this.dashboard.annotations.list;
    this.reset();

    this.onColorChange = this.onColorChange.bind(this);
  }

  async datasourceChanged() {
    const newDatasource = await this.datasourceSrv.get(this.currentAnnotation.datasource);
    this.$scope.$apply(() => {
      this.currentDatasource = newDatasource;
    });
  }

  edit(annotation: any) {
    this.currentAnnotation = annotation;
    this.currentAnnotation.showIn = this.currentAnnotation.showIn || 0;
    this.currentIsNew = false;
    this.datasourceChanged();
    this.mode = 'edit';
    $('.tooltip.in').remove();
  }

  reset() {
    this.currentAnnotation = angular.copy(this.annotationDefaults);
    this.currentAnnotation.datasource = this.datasources[0].name;
    this.currentIsNew = true;
    this.datasourceChanged();
  }

  update() {
    this.reset();
    this.mode = 'list';
  }

  setupNew = () => {
    this.mode = 'new';
    this.reset();
  };

  backToList() {
    this.mode = 'list';
  }

  move(index: number, dir: number) {
    // @ts-ignore
    _.move(this.annotations, index, index + dir);
  }

  add() {
    const sameName: any = _.find(this.annotations, { name: this.currentAnnotation.name });
    if (sameName) {
      appEvents.emit('alert-warning', ['Validation', 'Annotations with the same name already exists']);
      return;
    }
    this.annotations.push(this.currentAnnotation);
    this.reset();
    this.mode = 'list';
    this.dashboard.updateSubmenuVisibility();
  }

  removeAnnotation(annotation: any) {
    const index = _.indexOf(this.annotations, annotation);
    this.annotations.splice(index, 1);
    this.dashboard.updateSubmenuVisibility();
  }

  onColorChange(newColor: string) {
    this.currentAnnotation.iconColor = newColor;
  }
}

coreModule.controller('AnnotationsEditorCtrl', AnnotationsEditorCtrl);

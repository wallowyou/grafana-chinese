import _ from 'lodash';
import coreModule from 'app/core/core_module';
import { variableTypes } from './variable';
import appEvents from 'app/core/app_events';
import DatasourceSrv from '../plugins/datasource_srv';
import { VariableSrv } from './all';
import { TemplateSrv } from './template_srv';

export class VariableEditorCtrl {
  /** @ngInject */
  constructor($scope: any, datasourceSrv: DatasourceSrv, variableSrv: VariableSrv, templateSrv: TemplateSrv) {
    $scope.variableTypes = variableTypes;
    $scope.ctrl = {};
    $scope.namePattern = /^(?!__).*$/;
    $scope._ = _;
    $scope.optionsLimit = 20;
    // $scope.emptyListCta = {
    //   title: 'There are no variables yet',
    //   buttonTitle: 'Add variable',
    //   buttonIcon: 'gicon gicon-variable',
    //   infoBox: {
    //     __html: ` <p>
    //   Variables enable more interactive and dynamic dashboards. Instead of hard-coding things like server or
    //   sensor names in your metric queries you can use variables in their place. Variables are shown as dropdown
    //   select boxes at the top of the dashboard. These dropdowns make it easy to change the data being displayed in
    //   your dashboard. Check out the
    //   <a class="external-link" href="http://docs.grafana.org/reference/templating/" target="_blank">
    //     Templating documentation
    //   </a>
    //   for more information.
    // </p>`,
    //     infoBoxTitle: 'What do variables do?',
    //   },
    // };
    $scope.emptyListCta = {
      title: '暂无变量',
      buttonTitle: '增加变量',
      buttonIcon: 'gicon gicon-variable',
      infoBox: {
        __html: ` <p>
        变量可启用更多交互式和动态仪表板。
        您可以在变量中使用变量，而不必在指标查询中对服务器或传感器名称之类的东西进行硬编码。
        变量在仪表板顶部显示为下拉选择框。
        这些下拉菜单使更改仪表盘中显示的数据变得容易。查看
      <a class="external-link" href="http://docs.grafana.org/reference/templating/" target="_blank">
      模板
      </a>
     获取更多信息
    </p>`,
        infoBoxTitle: '变量的作用?',
      },
    };

    $scope.refreshOptions = [
      { value: 0, text: 'Never' },
      { value: 1, text: 'On Dashboard Load' },
      { value: 2, text: 'On Time Range Change' },
    ];

    $scope.sortOptions = [
      { value: 0, text: 'Disabled' },
      { value: 1, text: 'Alphabetical (asc)' },
      { value: 2, text: 'Alphabetical (desc)' },
      { value: 3, text: 'Numerical (asc)' },
      { value: 4, text: 'Numerical (desc)' },
      { value: 5, text: 'Alphabetical (case-insensitive, asc)' },
      { value: 6, text: 'Alphabetical (case-insensitive, desc)' },
    ];

    $scope.hideOptions = [{ value: 0, text: '' }, { value: 1, text: 'Label' }, { value: 2, text: 'Variable' }];

    $scope.init = () => {
      $scope.mode = 'list';

      $scope.variables = variableSrv.variables;
      $scope.reset();

      $scope.$watch('mode', (val: string) => {
        if (val === 'new') {
          $scope.reset();
        }
      });
    };

    $scope.setMode = (mode: any) => {
      $scope.mode = mode;
    };

    $scope.setNewMode = () => {
      $scope.setMode('new');
    };

    $scope.add = () => {
      if ($scope.isValid()) {
        variableSrv.addVariable($scope.current);
        $scope.update();
      }
    };

    $scope.isValid = () => {
      if (!$scope.ctrl.form.$valid) {
        return false;
      }

      if (!$scope.current.name.match(/^\w+$/)) {
        appEvents.emit('alert-warning', ['Validation', 'Only word and digit characters are allowed in variable names']);
        return false;
      }

      const sameName: any = _.find($scope.variables, { name: $scope.current.name });
      if (sameName && sameName !== $scope.current) {
        appEvents.emit('alert-warning', ['Validation', 'Variable with the same name already exists']);
        return false;
      }

      if (
        $scope.current.type === 'query' &&
        _.isString($scope.current.query) &&
        $scope.current.query.match(new RegExp('\\$' + $scope.current.name + '(/| |$)'))
      ) {
        appEvents.emit('alert-warning', [
          'Validation',
          'Query cannot contain a reference to itself. Variable: $' + $scope.current.name,
        ]);
        return false;
      }

      return true;
    };

    $scope.validate = () => {
      $scope.infoText = '';
      if ($scope.current.type === 'adhoc' && $scope.current.datasource !== null) {
        $scope.infoText = 'Adhoc filters are applied automatically to all queries that target this datasource';
        datasourceSrv.get($scope.current.datasource).then(ds => {
          if (!ds.getTagKeys) {
            $scope.infoText = 'This datasource does not support adhoc filters yet.';
          }
        });
      }
    };

    $scope.runQuery = () => {
      $scope.optionsLimit = 20;
      return variableSrv.updateOptions($scope.current).catch((err: { data: { message: any }; message: string }) => {
        if (err.data && err.data.message) {
          err.message = err.data.message;
        }
        appEvents.emit('alert-error', ['Templating', 'Template variables could not be initialized: ' + err.message]);
      });
    };

    $scope.onQueryChange = (query: any, definition: any) => {
      $scope.current.query = query;
      $scope.current.definition = definition;
      $scope.runQuery();
    };

    $scope.edit = (variable: any) => {
      $scope.current = variable;
      $scope.currentIsNew = false;
      $scope.mode = 'edit';
      $scope.validate();
      datasourceSrv.get($scope.current.datasource).then(ds => {
        $scope.currentDatasource = ds;
      });
    };

    $scope.duplicate = (variable: { getSaveModel: () => void; name: string }) => {
      const clone = _.cloneDeep(variable.getSaveModel());
      $scope.current = variableSrv.createVariableFromModel(clone);
      $scope.current.name = 'copy_of_' + variable.name;
      variableSrv.addVariable($scope.current);
    };

    $scope.update = () => {
      if ($scope.isValid()) {
        $scope.runQuery().then(() => {
          $scope.reset();
          $scope.mode = 'list';
          templateSrv.updateIndex();
        });
      }
    };

    $scope.reset = () => {
      $scope.currentIsNew = true;
      $scope.current = variableSrv.createVariableFromModel({ type: 'query' });

      // this is done here in case a new data source type variable was added
      $scope.datasources = _.filter(datasourceSrv.getMetricSources(), ds => {
        return !ds.meta.mixed && ds.value !== null;
      });

      $scope.datasourceTypes = _($scope.datasources)
        .uniqBy('meta.id')
        .map((ds: any) => {
          return { text: ds.meta.name, value: ds.meta.id };
        })
        .value();
    };

    $scope.typeChanged = function() {
      const old = $scope.current;
      $scope.current = variableSrv.createVariableFromModel({
        type: $scope.current.type,
      });
      $scope.current.name = old.name;
      $scope.current.label = old.label;

      const oldIndex = _.indexOf(this.variables, old);
      if (oldIndex !== -1) {
        this.variables[oldIndex] = $scope.current;
      }

      $scope.validate();
    };

    $scope.removeVariable = (variable: any) => {
      variableSrv.removeVariable(variable);
    };

    $scope.showMoreOptions = () => {
      $scope.optionsLimit += 20;
    };

    $scope.datasourceChanged = async () => {
      datasourceSrv.get($scope.current.datasource).then(ds => {
        $scope.current.query = '';
        $scope.currentDatasource = ds;
      });
    };
  }
}

coreModule.controller('VariableEditorCtrl', VariableEditorCtrl);

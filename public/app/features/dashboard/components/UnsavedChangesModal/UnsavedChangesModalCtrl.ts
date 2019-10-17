import coreModule from 'app/core/core_module';

const template = `
<div class="modal-body">
  <div class="modal-header">
    <h2 class="modal-header-title">
      <i class="fa fa-exclamation"></i>
      <span class="p-l-1">
      <!-- Unsaved changes -->
      未保存的更改
      </span>
    </h2>

    <a class="modal-header-close" ng-click="ctrl.dismiss();">
      <i class="fa fa-remove"></i>
    </a>
  </div>

  <div class="modal-content text-center">

    <div class="confirm-modal-text">
      <!-- Do you want to save your changes? -->
      您想要保存修改吗?
    </div>

    <div class="confirm-modal-buttons">
      <button type="button" class="btn btn-primary" ng-click="ctrl.save()">
      保存
      <!-- Save -->
      </button>
      <button type="button" class="btn btn-danger" ng-click="ctrl.discard()">
      <!-- Discard -->
      丢弃
      </button>
      <button type="button" class="btn btn-inverse" ng-click="ctrl.dismiss()">
      <!-- Cancel -->
      取消
      </button>
    </div>
  </div>
</div>
`;

export class UnsavedChangesModalCtrl {
  clone: any;
  dismiss: () => void;

  /** @ngInject */
  constructor(private unsavedChangesSrv: any) {}

  discard() {
    this.dismiss();
    this.unsavedChangesSrv.tracker.discardChanges();
  }

  save() {
    this.dismiss();
    this.unsavedChangesSrv.tracker.saveChanges();
  }
}

export function unsavedChangesModalDirective() {
  return {
    restrict: 'E',
    template: template,
    controller: UnsavedChangesModalCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: { dismiss: '&' },
  };
}

coreModule.directive('unsavedChangesModal', unsavedChangesModalDirective);

import { FolderDTO } from 'app/types';
import { NavModelItem, NavModel } from '@grafana/data';

export function buildNavModel(folder: FolderDTO): NavModelItem {
  // return {
  //   icon: 'fa fa-folder-open',
  //   id: 'manage-folder',
  //   subTitle: 'Manage folder dashboards & permissions',
  //   url: '',
  //   text: folder.title,
  //   breadcrumbs: [{ title: 'Dashboards', url: 'dashboards' }],
  //   children: [
  //     {
  //       active: false,
  //       icon: 'fa fa-fw fa-th-large',
  //       id: `folder-dashboards-${folder.uid}`,
  //       text: 'Dashboards',
  //       url: folder.url,
  //     },
  //     {
  //       active: false,
  //       icon: 'fa fa-fw fa-lock',
  //       id: `folder-permissions-${folder.uid}`,
  //       text: 'Permissions',
  //       url: `${folder.url}/permissions`,
  //     },
  //     {
  //       active: false,
  //       icon: 'gicon gicon-cog',
  //       id: `folder-settings-${folder.uid}`,
  //       text: 'Settings',
  //       url: `${folder.url}/settings`,
  //     },
  //   ],
  // };
  return {
    icon: 'fa fa-folder-open',
    id: 'manage-folder',
    subTitle: '管理文件夹仪表板和权限',
    url: '',
    text: folder.title,
    breadcrumbs: [{ title: '仪表盘', url: 'dashboards' }],
    children: [
      {
        active: false,
        icon: 'fa fa-fw fa-th-large',
        id: `folder-dashboards-${folder.uid}`,
        text: '仪表盘',
        url: folder.url,
      },
      {
        active: false,
        icon: 'fa fa-fw fa-lock',
        id: `folder-permissions-${folder.uid}`,
        text: '权限',
        url: `${folder.url}/permissions`,
      },
      {
        active: false,
        icon: 'gicon gicon-cog',
        id: `folder-settings-${folder.uid}`,
        text: '设置',
        url: `${folder.url}/settings`,
      },
    ],
  };
}

export function getLoadingNav(tabIndex: number): NavModel {
  const main = buildNavModel({
    id: 1,
    uid: 'loading',
    title: 'Loading',
    url: 'url',
    canSave: false,
    version: 0,
  });

  main.children[tabIndex].active = true;

  return {
    main: main,
    node: main.children[tabIndex],
  };
}

import React, { useState, ChangeEvent, useContext } from 'react';
import { DataLink } from '@grafana/data';
import { FormField, Switch } from '../index';
import { VariableSuggestion } from './DataLinkSuggestions';
import { css } from 'emotion';
import { ThemeContext, stylesFactory } from '../../themes/index';
import { DataLinkInput } from './DataLinkInput';
import { GrafanaTheme } from '../../types';

interface DataLinkEditorProps {
  index: number;
  isLast: boolean;
  value: DataLink;
  suggestions: VariableSuggestion[];
  onChange: (index: number, link: DataLink, callback?: () => void) => void;
  onRemove: (link: DataLink) => void;
}

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  listItem: css`
    margin-bottom: ${theme.spacing.sm};
  `,
  infoText: css`
    padding-bottom: ${theme.spacing.md};
    margin-left: 66px;
    color: ${theme.colors.textWeak};
  `,
}));

export const DataLinkEditor: React.FC<DataLinkEditorProps> = React.memo(
  ({ index, value, onChange, onRemove, suggestions, isLast }) => {
    const theme = useContext(ThemeContext);
    const styles = getStyles(theme);
    const [title, setTitle] = useState(value.title);

    const onUrlChange = (url: string, callback?: () => void) => {
      onChange(index, { ...value, url }, callback);
    };
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const onTitleBlur = () => {
      onChange(index, { ...value, title: title });
    };

    const onRemoveClick = () => {
      onRemove(value);
    };

    const onOpenInNewTabChanged = () => {
      onChange(index, { ...value, targetBlank: !value.targetBlank });
    };

    return (
      <div className={styles.listItem}>
        <div className="gf-form gf-form--inline">
          <FormField
            className="gf-form--grow"
            // label="Title"
            label="标题"
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            inputWidth={0}
            labelWidth={5}
            // placeholder="Show details"
            placeholder="显示详情"
          />
          <Switch
          // label="Open in new tab"
          label="在新的标签页打开"
           checked={value.targetBlank || false} onChange={onOpenInNewTabChanged} />
          <button className="gf-form-label gf-form-label--btn" onClick={onRemoveClick}
          // title="Remove link"
           title="移除链接"
          >
            <i className="fa fa-times" />
          </button>
        </div>
        <FormField
          // label="URL"
          label="链接地址"
          labelWidth={5}
          inputEl={<DataLinkInput value={value.url} onChange={onUrlChange} suggestions={suggestions} />}
          className={css`
            width: 100%;
          `}
        />
        {isLast && (
          <div className={styles.infoText}>
            {/* With data links you can reference data variables like series name, labels and values. Type CMD+Space,
            CTRL+Space, or $ to open variable suggestions. */}
            通过数据链接，您可以引用数据变量，例如系列名称，标签和值。
输入CMD + Space，
CTRL +空格键或$打开变量建议。
          </div>
        )}
      </div>
    );
  }
);

DataLinkEditor.displayName = 'DataLinkEditor';

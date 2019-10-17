import React, { useContext } from 'react';
import { css } from 'emotion';
import { ThemeContext, LinkButton, CallToActionCard } from '@grafana/ui';

export const NoDataSourceCallToAction = () => {
  const theme = useContext(ThemeContext);

  // const message =
  //   'Explore requires at least one data source. Once you have added a data source, you can query it here.';
  const message = '浏览需要至少一个数据源。添加数据源后，可以在此处查询。';
  const footer = (
    <>
      <i className="fa fa-rocket" />
      {/* <> ProTip: You can also define data sources through configuration files. </> */}
      <> 提示:您还可以通过配置文件定义数据源。 </>
      <a
        href="http://docs.grafana.org/administration/provisioning/#datasources?utm_source=explore"
        target="_blank"
        rel="noopener"
        className="text-link"
      >
        {/* Learn more */}
        了解更多
      </a>
    </>
  );

  const ctaElement = (
    <LinkButton size="lg" href="/datasources/new" icon="gicon gicon-datasources">
      {/* Add data source */}
      增加数据源
    </LinkButton>
  );

  const cardClassName = css`
    max-width: ${theme.breakpoints.lg};
    margin-top: ${theme.spacing.md};
    align-self: center;
  `;

  return (
    <CallToActionCard
      callToActionElement={ctaElement}
      className={cardClassName}
      footer={footer}
      message={message}
      theme={theme}
    />
  );
};

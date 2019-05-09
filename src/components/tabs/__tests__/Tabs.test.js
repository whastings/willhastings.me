import React from 'react';
import { render } from 'react-testing-library';

import Tabs from '../Tabs';
import TabsList from '../TabsList';
import Tab from '../Tab';
import TabPanel from '../TabPanel';

describe('Tabs', () => {
  const renderTabs = () => {
    render(
      <Tabs name="test-tabs">
        <TabsList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabsList>
        <TabPanel>
          Tab Panel 1
        </TabPanel>
        <TabPanel>
          Tab Panel 2
        </TabPanel>
        <TabPanel>
          Tab Panel 3
        </TabPanel>
      </Tabs>
    );
  };

  it('does not blow up', () => {
    renderTabs();
  });
});

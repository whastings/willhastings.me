import React from 'react';
import { render, within } from 'react-testing-library';

import Tabs from '../Tabs';
import TabsList from '../TabsList';
import Tab from '../Tab';
import TabPanel from '../TabPanel';

describe('Tabs', () => {
  const renderTabs = () => {
    return render(
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

  it('renders tabs inside a tablist', () => {
    const { getByRole } = renderTabs();
    const tabsList = getByRole('tablist');
    expect(tabsList).toBeInTheDocument();

    const tab1 = within(tabsList).getByText('Tab 1');
    const tab2 = within(tabsList).getByText('Tab 2');
    const tab3 = within(tabsList).getByText('Tab 3');

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab3).toHaveAttribute('aria-selected', 'false');

    expect(tab1).not.toHaveAttribute('tabIndex');
    expect(tab2).toHaveAttribute('tabIndex', '-1');
    expect(tab3).toHaveAttribute('tabIndex', '-1');
  });

  it('renders tab panels connected to the tabs', () => {
    const { getByText, getAllByRole } = renderTabs();

    const tab1 = getByText('Tab 1');
    const tab2 = getByText('Tab 2');
    const tab3 = getByText('Tab 3');
    const [panel1, panel2, panel3] = getAllByRole('tabpanel');

    expect(panel1).toHaveTextContent('Tab Panel 1');
    expect(panel2).toBeEmpty();
    expect(panel3).toBeEmpty();

    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');
    expect(panel3).toHaveAttribute('hidden');

    expect(tab1).toHaveAttribute('aria-controls', panel1.id);
    expect(tab2).toHaveAttribute('aria-controls', panel2.id);
    expect(tab3).toHaveAttribute('aria-controls', panel3.id);
    expect(panel1).toHaveAttribute('aria-labelledby', tab1.id);
    expect(panel2).toHaveAttribute('aria-labelledby', tab2.id);
    expect(panel3).toHaveAttribute('aria-labelledby', tab3.id);
  });
});

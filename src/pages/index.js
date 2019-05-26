import React from "react"

import Layout from "../components/layout"
import PostsTab from '../components/home/PostsTab';
import SEO from "../components/seo"
import Tabs from '../components/tabs/Tabs';
import TabsList from '../components/tabs/TabsList';
import Tab from '../components/tabs/Tab';
import TabPanel from '../components/tabs/TabPanel';

import AboutTabContent from '../content/home/AboutTabContent.mdx';
import WorkTabContent from '../content/home/WorkTabContent.mdx';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Tabs name="home-content">
      <TabsList>
        <Tab>About</Tab>
        <Tab>Work</Tab>
        <Tab>Posts</Tab>
      </TabsList>
      <TabPanel>
        <AboutTabContent />
      </TabPanel>
      <TabPanel>
        <WorkTabContent />
      </TabPanel>
      <TabPanel>
        <PostsTab />
      </TabPanel>
    </Tabs>
  </Layout>
)

export default IndexPage

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Tabs>
      <Tab index={0}>About</Tab>
      <Tab index={1}>Work</Tab>
      <Tab index={2}>Posts</Tab>
    </Tabs>
  </Layout>
)

export default IndexPage

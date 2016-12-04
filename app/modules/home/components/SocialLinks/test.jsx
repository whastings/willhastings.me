import React from 'react';
import SocialLinks from './index';
import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('SocialLinks', function() {
  it('renders three links', function() {
    let socialLinks = shallow(<SocialLinks/>);
    let links = socialLinks.find('a');

    assert.equal(links.length, 3);
  });
});

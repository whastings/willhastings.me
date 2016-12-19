import React from 'react';
import SocialLinks from '../index';
import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('Home - SocialLinks component', function() {
  let socialLinks;
  let links;

  beforeEach(function() {
    socialLinks = shallow(<SocialLinks/>);
    links = socialLinks.find('li').find('a');
  });

  it('renders a list of three links', function() {
    assert.isOk(socialLinks.is('ul'), 'tag name is UL');
    assert.equal(socialLinks.find('li').length, 3, 'UL has three LIs');
    assert.equal(links.length, 3, 'has three links');
  });

  it('renders each link with an accessible title and icon', function() {
    links.forEach((link, i) => {
      assert.equal(link.find('.social-link-title').length, 1, `link ${i} has title`);
      assert.equal(link.find('svg').length, 1, `link ${i} has icon`);
    });
  });

  it('opens each link in a new tab', function() {
    links.forEach(
      (link, i) => assert.equal(link.prop('target'), '_blank', `link ${i} opens in a new tab`)
    );
  });
});

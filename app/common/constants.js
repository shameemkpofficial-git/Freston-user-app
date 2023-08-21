// @flow

import React from 'react';

const AppContext = React.createContext();

const version = '1.0.0';

const baseUrl = 'http://134.209.152.225:4000';

const colorComb = [
  { color1: '#fffa6e', color2: '#858120' },
  { color1: '#57b6ff', color2: '#1d5580' },
  { color1: '#fd85ff', color2: '#511852' },
  { color1: '#ff9ec0', color2: '#631933' },
  { color1: '#69ff98', color2: '#1d4f2d' }
];

const staticItems = {
  DATE_OF_JOINING: 'Select Date of Joining',
  FROM_DATE: 'From Date',
  LEAVE_DATE: 'Leave Date',
  LEAVE_TYPE: 'Leave Type',
  REJOIN_TO_WORK: 'Date of Reporting back to work',
  SELECT: '--Select--',
  SELECT_DATE: 'Select Date',
  TO_DATE: 'To Date',
  TYPE: 'Type'
};
const categoryList = {
  ASSETS: 'Assets',
  LEAVE: 'Leave',
  WORK_FROM_HOME: 'Work From Home'
};
const leaveItems = {
  CASUAL: 'Casual',
  EARNED: 'Earned',
  EMERGENCY: 'Emergency'
};
const wfh = {
  CASUAL: 'Casual',
  EARNED: 'Earned',
  EMERGENCY: 'Emergency'
};

const assetsItems = {
  CHARGER: 'charger',
  HEADPHONE: 'Head Phone',
  LAPTOP: 'Laptop'
};
const placeHolder = {
  DATE_OF_JOINING: 'Date Of Joining',
  DEPARTMENT: 'Department',
  DESIGNATION: 'Designation',
  FULL_NAME: 'Full Name',
  SELECT_AN_ITEM: 'Select an Item',
  SELECT_TYPE: 'Select the Type'
};
const imageType = {
  GIF: 'image/gif',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png'
};

export {
  AppContext,
  assetsItems,
  baseUrl,
  categoryList,
  colorComb,
  imageType,
  leaveItems,
  placeHolder,
  staticItems,
  version,
  wfh
};

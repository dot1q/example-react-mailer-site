if (process.env.NODE_ENV !== 'production') {
  console.log('**** Development mode enabled ****');
}

const global = {
  header: {
    siteTitleAbv: 'Change me!',
    siteTitle: 'Deez Forms',
    version: '1.0.0.0',
  },
};

export { global };

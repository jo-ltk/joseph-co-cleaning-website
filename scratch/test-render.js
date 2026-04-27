const { render } = require('@react-email/render');
const React = require('react');

const TestEmail = ({ name }) => React.createElement('div', null, `Hello ${name}`);

async function test() {
  try {
    const html = await render(React.createElement(TestEmail, { name: 'World' }));
    console.log('Rendered HTML:', html);
  } catch (err) {
    console.error('Render error:', err);
  }
}

test();

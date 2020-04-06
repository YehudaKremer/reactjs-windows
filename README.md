# reactjs-windows

> react popup window with options like resize, drag and more..

[![NPM](https://img.shields.io/npm/v/reactjs-windows.svg)](https://www.npmjs.com/package/reactjs-windows) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Sample
[Demo](https://reactwindow.z19.web.core.windows.net/)
![Sample Gif](https://raw.githubusercontent.com/YehudaKremer/reactjs-windows/master/example/react-windows.gif)

## Install

```bash
npm install --save reactjs-windows
```

## Usage

```tsx
import React, { Component } from 'react'

import ReactWindow from 'reactjs-windows'
import 'reactjs-windows/dist/index.css'

class Example extends Component {
  render() {
    return <ReactWindow title="Test Window">
            <p>content..</p>
           </ReactWindow>
  }
}
```

## License

MIT © [YehudaKremer](https://github.com/YehudaKremer)

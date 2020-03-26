<div align='center'>
    <br/>
    <h1>mini graphiql</h1>
    <br/>
    <br/>
    <img src='https://media.giphy.com/media/Ih0HNPjRlo8OosdzGl/source.gif'>
    <br/>
</div>

## Install

```
yarn add mini-graphiql
```

## Usage

```tsx
import React from 'react'
import 'mini-graphiql/dist/style.css'
import { getSchemaFormUrl, MiniGraphiQL } from 'mini-graphiql'

const query1 = `
{
    continents {
      code
      name
    }
}
`

const App = () => {
    return (
        <div style={{ margin: '40px' }}>
            <MiniGraphiQL
                url='https://countries.trevorblades.com'
                query={query1}
            />
        </div>
    )
}


```

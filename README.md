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

## Usage in mdx

```mdx
---
route: /docs/pagination
title: pagination
---
import { MiniGraphiQL } from 'mini-graphiql'
import 'mini-graphiql/dist/style.css'
export const query1 = `
{
    continents {
      code
      name
    }
}
`
## Paging forward

Page forward using `first` and `after` arguments.

<MiniGraphiQL url='https://countries.trevorblades.com' query={query1} />

```

import React from 'react'
import { render } from 'react-dom'
import { usePromise } from 'react-extra-hooks'
import 'regenerator-runtime/runtime'
import '../dist/style.css'
import { getSchemaFormUrl, MiniGraphiQL } from '../src'

const query1 = `
{
    continents {
      code
      name
    }
}
`

const App = () => {
    const fetchShema = () => {
        return getSchemaFormUrl({ url: 'https://countries.trevorblades.com' })
    }
    const { result, loading } = usePromise(fetchShema, { cache: true })

    if (loading) {
        return <div className=''>loading</div>
    }

    return (
        <div>
            <MiniGraphiQL schema={result} query={query1} />
        </div>
    )
}

render(<App />, document.getElementById('root'))

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept()
}

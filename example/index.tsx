import React from 'react'
import { render } from 'react-dom'
import { MiniGraphiQL, fetchRemoteSchema } from '../src'
import { usePromise } from 'react-extra-hooks'
import '../dist/style.css'
import {
    buildSchema,
    buildClientSchema,
    introspectionQuery,
    getIntrospectionQuery,
} from 'graphql'

const query1 = `
{
    continents {
      code
      name
    }
}
`

const App = () => {
    const fetchShema = async () => {
        return fetchRemoteSchema({ url: 'https://countries.trevorblades.com' })
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

import fetch from 'isomorphic-unfetch'
import { wrapSchema, introspectSchema } from '@graphql-tools/wrap'

import { print } from 'graphql'

const makeExecutor = (url) => async ({ document, variables }) => {
    const query = print(document)
    const fetchResult = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    })
    return await fetchResult.json()
}

export async function getSchemaFormUrl({ url: uri }) {
    const executor = makeExecutor(uri)
    const schema = wrapSchema({
        schema: await introspectSchema(executor),
        executor,
    })
    return schema
}

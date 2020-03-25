export { MiniGraphiQL } from './MiniGraphiQL'
import {buildClientSchema, getIntrospectionQuery} from 'graphql'

export async function fetchRemoteSchema({url, insecure=false}) {
    // const agent =
    //     /^https:\/\//i.test(url) && insecure
    //         ? new https.Agent({ rejectUnauthorized: false })
    //         : undefined
    const body = JSON.stringify({ query: getIntrospectionQuery() })
    const method = 'POST'
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    try {
        const response = await fetch(url, {
            // agent,
            method,
            headers,
            body,
        })
        const result = await response.json()

        if (result.errors) {
            throw new Error(
                `Errors in introspection query result: ${result.errors}`,
            )
        }
        if (!result.data) {
            throw new Error(
                `No introspection query result data from: ${JSON.stringify(
                    result,
                )}`,
            )
        }
        return buildClientSchema(result.data)
    } catch (e) {
        throw new Error(
            `Error while fetching introspection query: ${e.message}`,
        )
    }
}

import React from 'react'
import { MiniGraphiQL as MiniGraphiQLComponent } from './MiniGraphiQL'
import { HttpLink } from 'apollo-link-http'
import { buildClientSchema, getIntrospectionQuery } from 'graphql'
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { usePromise } from 'react-extra-hooks'

export const MiniGraphiQL = ({ url = '', height = '200px', ...rest }) => {
    const fetchShema = () => {
        return getSchemaFormUrl({ url })
    }
    const { result, loading, error } = usePromise(url ? fetchShema : null, {
        promizeId: url,
        cache: true,
    })

    if (loading) {
        return <Container height={height}>loading...</Container>
    }

    if (error) {
        return (
            <Container height={height} color='red'>
                error: {error?.message}
            </Container>
        )
    }

    return (
        <Container height={height}>
            <MiniGraphiQLComponent
                styles={{ editor: { height } }}
                schema={result}
                {...rest}
            />
        </Container>
    )
}

export async function fetchRemoteSchema({ url, insecure = false }) {
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
        const schema = await buildClientSchema(result.data)
        return schema
    } catch (e) {
        throw new Error(
            `Error while fetching introspection query: ${e.message}`,
        )
    }
}

export async function getSchemaFormUrl({ url: uri }) {
    const link = new HttpLink({ uri, fetch: fetch })
    const schema = await introspectSchema(link)
    return makeRemoteExecutableSchema({ schema, link })
}

const Container = ({ height, color = 'black', ...props }) => {
    return (
        <div
            style={{
                height,
                width: '100%',
                color,
                background: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
            {...props}
        />
    )
}

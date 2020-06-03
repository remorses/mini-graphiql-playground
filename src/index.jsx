import React from 'react'
import { MiniGraphiQL as MiniGraphiQLComponent } from './MiniGraphiQL'
import { buildClientSchema, getIntrospectionQuery } from 'graphql'
import { usePromise } from 'react-extra-hooks'
import { getSchemaFormUrl } from './instrospectSchema.js'

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

const Container = ({ height, color = 'black', ...props }) => {
    return (
        <div
            style={{
                height,
                borderRadius: '10px',
                overflow: 'hideden',
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

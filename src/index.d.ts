import React, { Component, FC } from 'react'
import { GraphQLSchema, GraphQLSchema } from 'graphql'

export interface MiniGraphiQLProps {
    variables?: string
    query: string
    schema: GraphQLSchema
}

export declare const MiniGraphiQL: FC<MiniGraphiQLProps>
export declare const fetchRemoteSchema: (arg: {
    insecure?: boolean
    url: string
}) => Promise<GraphQLSchema>

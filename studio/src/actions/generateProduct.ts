import {useState, useEffect} from 'react'
import {useClient} from 'sanity'
import {uuid} from '@sanity/uuid'

export function generateProduct(props) {
  // console.log(props)
  const client = useClient({apiVersion: '2023-01-01'})

  if (props.type !== 'album') {
    return null
  }

  // const {patch, publish} = useDocumentOperation(props.id, props.type)
  const _onHandle = async () => {
    const {_id, rmIndex, title, slug, seo, artist, images, releaseDate} = props.published
    // console.log(location.origin)
    const mutations = [
      {
        create: {
          _id: `drafts.${uuid()}`,
          _type: 'product',
          catalogNumber: rmIndex,
          title: title,
          slug: slug,
          seo: seo,
          artist: artist,
          images: images,
          releaseDate: releaseDate,
          // ...props.published,
        },
      },
    ]
    console.log(props)
    const res = await client.mutate(mutations)
    console.log(res)
    if (res.results.length) {
      window.location.href = `${location.origin}/production/desk/product;${res.results[0].id}`
    }
  }

  return {
    label: 'Generate Product',
    onHandle: _onHandle,
  }
}

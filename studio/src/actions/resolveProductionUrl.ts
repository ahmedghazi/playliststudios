const baseURL = 'https://preview-lomestudiomain.gatsbyjs.io'
// const baseURL = 'http://localhost:8000/'
export function resolveProductionUrl(props) {
  console.log(props)
  const _onHandle = async () => {
    const {_type, slug} = props.published
    // console.log(location.origin)
    let pagePath = ''

    switch (_type) {
      case 'home':
        pagePath = ''
        break
      case 'project':
        pagePath = `project/${slug.current}`
        break

      default:
        pagePath = `${slug.current}`
        break
    }

    if (window) window.open(`${baseURL}/${pagePath}`, '_blank')
    // window.location.href = `${baseURL}/${pagePath}`
  }

  return {
    label: 'Open Preview',
    onHandle: _onHandle,
  }
}

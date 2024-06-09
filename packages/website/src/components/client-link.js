import Link from 'next/link'

export const ClientLink = props => {
  const onClick = event => {
    event.preventDefault()
    window.history.pushState(null, '', `/use-eye-dropper${props.href}`)
  }
  return <Link {...props} onClick={onClick} />
}

export default ClientLink

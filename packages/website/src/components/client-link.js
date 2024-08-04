import Link from 'next/link'

const onClick = () => {
  if (typeof window !== 'undefined') {
    const button = document.getElementById('ued-color')
    if (button) {
      button.setAttribute('data-text', window.UED_COLOR)
    }
  }
}

export const ClientLink = props => {
  return <Link {...props} onClick={onClick} />
}

export default ClientLink

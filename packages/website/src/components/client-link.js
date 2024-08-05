import Link from 'next/link'

const onClick = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const button = document.getElementById('ued-color')
      if (button) {
        button.setAttribute('data-text', window.UED_COLOR)
      }
    }, 50)
  }
}

export const ClientLink = props => {
  return <Link {...props} onClick={onClick} />
}

export default ClientLink

const Button = ({ text, onClick }: { text: string, onClick: (e: any) => void }) => {
  return (<div className="button" onClick={onClick}>{text}</div>)
}

export default Button;
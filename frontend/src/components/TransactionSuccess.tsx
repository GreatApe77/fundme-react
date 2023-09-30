export type TransactionSuccessProps = {
    transactionHash:string
}
export default function TransactionSuccess({transactionHash}:TransactionSuccessProps) {
  return (
    <div>
        <h4 className="text-muted">Transaction Result</h4>
    
        <small><a className="nav-link text-primary" target="_blank" href={`https://testnet.ftmscan.com/tx/${transactionHash}`}>Acompanhe o resultado da transacao AQUI</a></small>
        <p>Obrigado por ajudar!</p>
    </div>
  )
}

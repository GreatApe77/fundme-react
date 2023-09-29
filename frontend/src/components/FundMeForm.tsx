
export type FormProps={
    totalDonatedEth:string
}
export default function FundMeForm({totalDonatedEth} :FormProps) {
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">Obrigado pela atenção! Falta pouco para você contribuir!</h1>
        <h4 className="display-3 fw-bold lh-1 mb-3 text-success">Total: {totalDonatedEth} ETH <img className="img-fluid" width={"30"} src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026" alt=" ether logo" /></h4>
        <p className="col-lg-10 fs-4">Preencha o Formulário com o valor que deseja doar. E você terá ajudado bastante!</p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light">
          
          <div className="form-floating mb-3">
            <input type="number" min={"0.02"} step={"0.01"} className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Valor (ETH)</label>
          </div>
         
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
          <hr className="my-4" />
          <small className="text-muted">Quando a doação for concluida o recibo aparecerá aqui.</small>
        </form>
      </div>
    </div>
  </div>
  )
}

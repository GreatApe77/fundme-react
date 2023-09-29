import React, { useEffect, useState } from "react"
import { fund } from "../web3-services/fund"
import { useAddress } from "@thirdweb-dev/react"
import { getTotalBalance } from "../web3-services/getTotalBalance"

import  Spinner from "react-bootstrap/Spinner"


export default function FundMeForm() {
  const account = useAddress()
  const [donateValue,setDonateValue] = useState("0.01")
  const [totalBalance,setTotalBalance] = useState<string>()
  useEffect(()=>{
    getTotalBalance(account!)
    .then((balance)=>{
      
      setTotalBalance((Number(balance)/10**18).toFixed(2))
    }).catch((err)=>{
      console.error(err)
    })
  },[])
  function handleSubmit(e:React.MouseEvent<HTMLFormElement>){
    e.preventDefault()
    
    fund(donateValue,account!)
    .then((transaction)=>{
      alert(transaction.transactionHash)
    }).catch((err)=>{
      console.error(err)
    })
  }
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
    setDonateValue(e.target.value)
  }
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">Obrigado pela atenção! Falta pouco para você contribuir!</h1>
        <h4 className="display-3 fw-bold lh-1 mb-3 text-success">Total: {totalBalance?(totalBalance):(<Spinner animation="grow"/>)} ETH <img className="img-fluid" width={"30"} src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026" alt=" ether logo" /></h4>
        <p className="col-lg-10 fs-4">Preencha o Formulário com o valor que deseja doar. E você terá ajudado bastante!</p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-light">
          
          <div className="form-floating mb-3">
            <input value={donateValue} onChange={handleInputChange} required type="number" min={"0.01"} step={"0.01"} className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Valor (ETH)</label>
          </div>
         
          <button  className="w-100 btn btn-lg btn-primary" type="submit">Doar</button>
          <hr className="my-4" />
          <small className="text-muted">Quando a doação for concluida o recibo aparecerá aqui.</small>
        </form>
      </div>
    </div>
  </div>
  )
}

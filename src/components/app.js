import ReactDOM from "react-dom";
import React from 'react';
import { invokeScript, broadcast } from '@waves/waves-transactions'

class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    deposit: {
                      seed: '',
                      amount: '',
                      txid: ''
                    },
                    invest: {
                      seed: '',
                      amount: '',
                      address: '',
                      txid: ''
                    },
                    getFunds: {
                      seed: '',
                      amount: '',
                      txid: ''
                    }
                };
                this.baseUri = 'https://testnodes.wavesnodes.com';
                this.wavelet = 100000000;
                this.dappaddress = '3N4GgQWCckqUn1H9y8rNRyCXZPkgKTNKznT';
                this.explorerUrl = "https://wavesexplorer.com/testnet";
                this.deposit = this.deposit.bind(this);
                this.invest = this.invest.bind(this);
                this.getFunds = this.getFunds.bind(this);
                this.updateValue = this.updateValue.bind(this);
            }
            updateValue(scope, key, value) {
              const newState = this.state[scope];
              newState[key] = value;
              this.setState(
                      {
                        [scope]: newState
                      }
                );
            }
            deposit(){
              if (window.confirm("Are you sure you wish to deposit?")) {
                  const params = {
                      dappAddress: this.dappaddress,
                      call: {
                          function: "deposit",
                          args:[]
                      },
                      payment: [ {amount: this.state.deposit.amount*this.wavelet, asset:null } ],
                      chainId: 84
                  };
                  console.log(this.state.deposit);
                  console.log(params);
                  let tx = invokeScript(params, this.state.deposit.seed);
                  this.updateValue("deposit", "txid", tx.id);
                  broadcast(tx, this.baseUri);
              }
            }
            invest() {
            }
            getFunds() {
            }
            render() {
                return (
                    <div className="container">
                      <div className="deposit">
                        <span>[Investor] Deposit</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("deposit", "seed", e.target.value)}/>
                        <input type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("deposit", "amount", e.target.value)}/>
                        <input type="submit" value="Deposit" className="submit button" onClick={this.deposit}/>
                        <a href={this.explorerUrl + "/tx/" + this.state.deposit.txid}>Transaction: {this.state.deposit.txid}</a>
                        <br/>
                      </div>
                      <div className="invest">
                        <span>[Investor] Invest</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase"/>
                        <input type="text" placeholder="WAVES - Amount"/>
                        <input type="text" placeholder="Proposal Address"/>
                        <input type="submit" value="Invest" className="submit button"/>
                        <a href="https://www.youtube.com/watch?v=k7gK7FgUFiU">Transaction: ...</a>
                        <br/>
                      </div>
                      <div className="Get Funds">
                        <span>[Startup] Get Funds</span>
                        <span>: </span>
                        <input type="text" placeholder="Seed phrase"/>
                        <input type="text" placeholder="WAVES - Amount"/>
                        <input type="submit" value="Get Funds" className="submit button"/>
                        <a href="https://www.youtube.com/watch?v=k7gK7FgUFiU">Transaction: ...</a>
                        <br/>
                      </div>
                    </div>
                );
            }
        }

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}
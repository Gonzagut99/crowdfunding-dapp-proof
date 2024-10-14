import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import type { V3ContractABI } from 'ethers';

const contractABI: V3ContractABI = [
  "event TokensPurchased(address indexed purchaser, uint256 amountSpent, uint256 tokensMinted)",
  "event SaleFinalized()",
  "function buyTokens() external payable",
  "function finalizeSale() external",
  "function isSaleActive() public view returns (bool)",
  "function cap() public view returns (uint256)",
  "function saleStart() public view returns (uint256)",
  "function saleEnd() public view returns (uint256)",
  "function rate() public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
];

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

export default function Index() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [saleActive, setSaleActive] = useState<boolean>(false);
  const [cap, setCap] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<string>('');
  const [saleStart, setSaleStart] = useState<string>('');
  const [saleEnd, setSaleEnd] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        setProvider(provider);
        setContract(contract);
        setAccount(await signer.getAddress());

        // Get contract data
        const active = await contract.isSaleActive();
        const capValue = await contract.cap();
        const supplyValue = await contract.totalSupply();
        const startValue = await contract.saleStart();
        const endValue = await contract.saleEnd();
        const rateValue = await contract.rate();

        setSaleActive(active);
        setCap(ethers.formatEther(capValue));
        setTotalSupply(ethers.formatEther(supplyValue));
        setSaleStart(new Date(Number(startValue) * 1000).toLocaleString());
        setSaleEnd(new Date(Number(endValue) * 1000).toLocaleString());
        setRate(rateValue.toString());

        // Listen for events
        contract.on("TokensPurchased", (purchaser, amountSpent, tokensMinted) => {
          console.log(`Tokens Purchased: ${ethers.formatEther(tokensMinted)} by ${purchaser}`);
          // Update total supply
          contract.totalSupply().then((newSupply: bigint) => {
            setTotalSupply(ethers.formatEther(newSupply));
          });
        });

        contract.on("SaleFinalized", () => {
          console.log("Sale Finalized");
          setSaleActive(false);
        });
      }
    };

    init();

    return () => {
      if (contract) {
        contract.removeAllListeners();
      }
    };
  }, []);

  const buyTokens = async () => {
    if (contract && amount) {
      try {
        const tx = await contract.buyTokens({ value: ethers.parseEther(amount) });
        await tx.wait();
        console.log("Tokens purchased successfully");
      } catch (error) {
        console.error("Error buying tokens:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Crowdfunding Dapp</h1>
      <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg shadow-xl">
        <p className="mb-4"><span className="font-semibold">Connected Account:</span> {account}</p>
        <p className="mb-4"><span className="font-semibold">Sale Active:</span> {saleActive ? 'Yes' : 'No'}</p>
        <p className="mb-4"><span className="font-semibold">Cap:</span> {cap} tokens</p>
        <p className="mb-4"><span className="font-semibold">Total Supply:</span> {totalSupply} tokens</p>
        <p className="mb-4"><span className="font-semibold">Sale Start:</span> {saleStart}</p>
        <p className="mb-4"><span className="font-semibold">Sale End:</span> {saleEnd}</p>
        <p className="mb-4"><span className="font-semibold">Rate:</span> {rate} tokens per ETH</p>
        <div className="mt-8">
          <input 
            type="text" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount in ETH"
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
          />
          <button 
            onClick={buyTokens} 
            disabled={!saleActive}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Tokens
          </button>
        </div>
      </div>
    </div>
  );
}
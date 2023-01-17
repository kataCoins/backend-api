import { Injectable } from '@nestjs/common';
import { Web3Service } from 'nest-web3';
import * as ContractAddress from './data/kata-address.json';
import * as ContractData from './data/KataCoins.json';
import { Contract } from 'web3-eth-contract';
import { KataDefinition } from './interfaces/kata-definition.interface';
import * as process from 'process';
import { SignedTransaction } from 'web3-eth-accounts';

@Injectable()
export class ContractService {
  constructor(private readonly web3Service: Web3Service) {}

  private async getContract(): Promise<Contract> {
    const client = this.web3Service.getClient('eth');
    const { abi } = ContractData;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new client.eth.Contract(abi, ContractAddress.KataCoins);
  }
  async getKata(id: number): Promise<KataDefinition> {
    const contract = await this.getContract();
    const kata = await contract.methods.getKata(id).call({
      from: process.env.OWNER_ADDRESS,
    });
    if (!kata) {
      return null;
    }
    return kata[0] as KataDefinition;
  }

  async executeKata(kataId: number, userAddress: string): Promise<void> {
    const contract = await this.getContract();
    return contract.methods.executeKata(userAddress, kataId).call({
      from: process.env.OWNER_ADDRESS,
    });
  }

  async setKataSolved(kataId: number, userAddress: string): Promise<void> {
    const contract = await this.getContract();
    return contract.methods.setHasSolvedKata(userAddress, kataId).call({
      from: process.env.OWNER_ADDRESS,
    });
  }

  async signTransaction(
    kataId: number,
    userAddress: string,
  ): Promise<SignedTransaction> {
    const contract = await this.getContract();
    const client = this.web3Service.getClient('eth');
    const account = client.eth.accounts.privateKeyToAccount(
      process.env.OWNER_PRIVATE_KEY,
    );

    return await account.signTransaction({
      to: ContractAddress.KataCoins,
      from: process.env.OWNER_ADDRESS,
      data: await this.getContract().then((contract) =>
        contract.methods.transfer(userAddress, kataId).encodeABI(),
      ),
      gas: await contract.methods.getExecFee().call(),
    });
  }
}

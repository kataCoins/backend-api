import { Injectable } from '@nestjs/common';
import { Web3Service } from 'nest-web3';
import * as ContractData from './data/KataCoins.json';
import { Contract } from 'web3-eth-contract';
import { KataDefinition } from './interfaces/kata-definition.interface';
import * as process from 'process';

@Injectable()
export class ContractService {
  constructor(private readonly web3Service: Web3Service) {}

  private async getContract(): Promise<Contract> {
    const client = this.web3Service.getClient('matic');
    const { abi } = ContractData;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new client.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
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
    return contract.methods.executeKata(userAddress, kataId).send({
      from: process.env.OWNER_ADDRESS,
    });
  }

  async setKataSolved(kataId: number, userAddress: string): Promise<void> {
    const contract = await this.getContract();
    return contract.methods.setHasSolvedKata(userAddress, kataId).send({
      from: process.env.OWNER_ADDRESS,
    });
  }
}

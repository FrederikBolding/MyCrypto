import React, { ReactNode } from 'react';

import { Fiats } from '@config';
import { devContacts } from '@database/seed';
import { defaultZapId, IZapConfig, ZAPS_CONFIG } from '@features/DeFiZap/config';
import { IMembershipId, MEMBERSHIP_CONFIG } from '@features/PurchaseMembership/config';
import {
  fAccount,
  fERC20NonWeb3TxConfigJSON,
  fERC20Web3TxReceipt,
  fSettings,
  fTxConfig,
  fTxReceipt
} from '@fixtures';
import { DataContext, IDataContext } from '@services/Store';
import { ExtendedContact, ITxStatus, ITxType } from '@types';
import { noOp } from '@utils';

import { constructSenderFromTxConfig } from './helpers';
import { TxReceiptUI } from './TxReceipt';

// Define props
const assetRate = 1.34;
const timestamp = 1583266291;
const txStatus = ITxStatus.SUCCESS;
const senderContact = Object.values(devContacts)[0] as ExtendedContact;
const recipientContact = Object.values(devContacts)[1] as ExtendedContact;
const resetFlow = noOp;
const handleTxCancelRedirect = noOp;
const handleTxSpeedUpRedirect = noOp;

export default { title: 'TxReceipt' };

const wrapInProvider = (component: ReactNode) => (
  <DataContext.Provider
    value={({ createActions: noOp, userActions: [] } as unknown) as IDataContext}
  >
    {component}
  </DataContext.Provider>
);

export const transactionReceiptPending = wrapInProvider(
  <div className="sb-container" style={{ maxWidth: '620px' }}>
    <TxReceiptUI
      settings={fSettings}
      txStatus={ITxStatus.PENDING}
      timestamp={timestamp}
      resetFlow={resetFlow}
      assetRate={assetRate}
      senderContact={senderContact}
      recipientContact={recipientContact}
      txConfig={fTxConfig}
      sender={constructSenderFromTxConfig(fTxConfig, [fAccount])}
      baseAssetRate={assetRate}
      fiat={Fiats.USD}
      handleTxCancelRedirect={handleTxCancelRedirect}
      handleTxSpeedUpRedirect={handleTxSpeedUpRedirect}
    />
  </div>
);

export const transactionReceipt = wrapInProvider(
  <div className="sb-container" style={{ maxWidth: '620px' }}>
    <TxReceiptUI
      settings={fSettings}
      txStatus={txStatus}
      displayTxReceipt={fTxReceipt}
      timestamp={timestamp}
      resetFlow={resetFlow}
      assetRate={assetRate}
      senderContact={senderContact}
      recipientContact={recipientContact}
      txConfig={fTxConfig}
      sender={constructSenderFromTxConfig(fTxConfig, [fAccount])}
      baseAssetRate={assetRate}
      fiat={Fiats.USD}
      handleTxCancelRedirect={handleTxCancelRedirect}
      handleTxSpeedUpRedirect={handleTxSpeedUpRedirect}
    />
  </div>
);

export const transactionReceiptToken = wrapInProvider(
  <div className="sb-container" style={{ maxWidth: '620px' }}>
    <TxReceiptUI
      settings={fSettings}
      txStatus={txStatus}
      displayTxReceipt={fERC20Web3TxReceipt}
      timestamp={timestamp}
      resetFlow={resetFlow}
      assetRate={assetRate}
      senderContact={senderContact}
      recipientContact={recipientContact}
      txConfig={{ ...fERC20NonWeb3TxConfigJSON, network: fAccount.network }}
      sender={constructSenderFromTxConfig(fTxConfig, [fAccount])}
      baseAssetRate={assetRate}
      fiat={Fiats.USD}
      handleTxCancelRedirect={handleTxCancelRedirect}
      handleTxSpeedUpRedirect={handleTxSpeedUpRedirect}
    />
  </div>
);

const zapSelected: IZapConfig = ZAPS_CONFIG[defaultZapId];

export const transactionReceiptDeFiZap = wrapInProvider(
  <div className="sb-container" style={{ maxWidth: '620px' }}>
    <TxReceiptUI
      settings={fSettings}
      txStatus={txStatus}
      txType={ITxType.DEFIZAP}
      zapSelected={zapSelected}
      displayTxReceipt={fERC20Web3TxReceipt}
      timestamp={timestamp}
      resetFlow={resetFlow}
      assetRate={assetRate}
      senderContact={senderContact}
      recipientContact={recipientContact}
      txConfig={{ ...fERC20NonWeb3TxConfigJSON, network: fAccount.network }}
      sender={constructSenderFromTxConfig(fTxConfig, [fAccount])}
      baseAssetRate={assetRate}
      fiat={Fiats.USD}
      handleTxCancelRedirect={handleTxCancelRedirect}
      handleTxSpeedUpRedirect={handleTxSpeedUpRedirect}
    />
  </div>
);

export const transactionReceiptMembership = wrapInProvider(
  <div className="sb-container" style={{ maxWidth: '620px' }}>
    <TxReceiptUI
      settings={fSettings}
      txReceipt={fTxReceipt}
      txConfig={fTxConfig}
      txType={ITxType.PURCHASE_MEMBERSHIP}
      membershipSelected={MEMBERSHIP_CONFIG[IMembershipId.threemonths]}
      timestamp={timestamp}
      txStatus={txStatus}
      assetRate={assetRate}
      displayTxReceipt={fERC20Web3TxReceipt}
      senderContact={senderContact}
      recipientContact={recipientContact}
      sender={constructSenderFromTxConfig(fTxConfig, [fAccount])}
      resetFlow={resetFlow}
      baseAssetRate={assetRate}
      fiat={Fiats.USD}
      handleTxCancelRedirect={handleTxCancelRedirect}
      handleTxSpeedUpRedirect={handleTxSpeedUpRedirect}
    />
  </div>
);

// Uncomment this for Figma support:

(transactionReceipt as any).story = {
  name: 'TransactionReceipt-Standard',
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/BY0SWc75teEUZzws8JdgLMpy/%5BMyCrypto%5D-GAU-Master?node-id=8544%3A116927'
    }
  }
};

(transactionReceiptDeFiZap as any).story = {
  name: 'TransactionReceipt-DeFiZap',
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/BY0SWc75teEUZzws8JdgLMpy/%5BMyCrypto%5D-GAU-Master?node-id=8544%3A117793'
    }
  }
};

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";

describe("hello-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.helloSolana as Program<HelloSolana>;

  // signer wallet
  const signer = anchor.web3.Keypair.generate();
  // data_account wallet
  const data_account = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.provider.connection.confirmTransaction(await program.provider.connection.requestAirdrop(signer.publicKey, 100 * anchor.web3.LAMPORTS_PER_SOL), "confirmed");


    // Add your test here.
    const tx = await program.methods
      .initialize("Helllo Solana")
      .accounts({
        signer: signer.publicKey,
        dataAccount: data_account.publicKey,
      }).signers([signer, data_account])
      .rpc();
    console.log("Your transaction signature", tx);

    const dataAccount = await program.account.whatever.fetch(data_account.publicKey);

    console.log("Data Account", dataAccount);



  });
});

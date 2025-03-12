use anchor_lang::prelude::*;

declare_id!("GTkEw42PW9FXdodPVz1Zt7JjikJv9LXPQNesWcZFBima");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, hello: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);

        let data_account = &mut ctx.accounts.data_account;
        data_account.hello = hello;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer= signer,
        space=200,
    )]
    pub data_account: Account<'info, Whatever>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Whatever {
    pub hello: String,
}

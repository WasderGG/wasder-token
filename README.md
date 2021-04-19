# wasder-erc20

The Wasder Token is a ERC20 standard token, with added functionality

Name = Wasder Token
Symbol = WAS
Max supply = 1 000 000 000 tokens 
Decimals = 18 decimals

## The token is Snapshot'able
This means that at any time a snapshot can be stored and looked at, and the exact ownershit at a specific point in time is known. That could for example be used to mitigate flashloan attacks.

## Token is Burnable
The token implements a burn function that removes tokens from the total supply. It can only be executed by a account having the BURNER_ROLE (which is in turn given by the admin). When a accounts burns, it destroys its own tokens and lowers the total supply at the same time

## Token follows EIP712
The EIP defines a method to provide prompts to users to sign human readable messages instead of the normal case of signing a bunch of bytes. This way the user can tell what they are signing, and when signing just bytes it is not easy to verify for the user.

## Token is enabled for ERC677 - transfer and call
This enables a user to approve tokens and call a function on another contract in one transaction.
That way only one transaction needs to be signed and sent to the network to be able to perform the requested action.
The token can then be used as a method of payment for executing a special feature on a contract providing a service.
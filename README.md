# Wild-Carbon-Mobile

- Get backend [here](https://github.com/AlexisFaugeroux/wild-carbon)

1. Clone the repo
2. run `npm install`
3. run `npx expo`

## Troubleshooting

### I want to remove token from local storage for testing purpose

- in `src/hooks/useLoginContext/index.tsx`, un-comment the `await removeUserTokenFromLocalStorage` to force remove it at every reload, don't forget to comment it back before pushing
